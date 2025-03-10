//

import {
  DocumentType,
  Ref,
  getModelForClass,
  modelOptions,
  prop
} from "@typegoose/typegoose";
import {
  EditableExample as EditableExampleSkeleton,
  Example as ExampleSkeleton
} from "/client/skeleton/dictionary";
import {
  WithSize
} from "/server/controller/internal/type";
import {
  DiscardableSchema
} from "/server/model/base";
import {
  Dictionary,
  DictionarySchema,
  LinkedWordCreator,
  Word,
  WordModel
} from "/server/model/dictionary";
import {
  LinkedWordSchema
} from "/server/model/dictionary/linked-word";
import {
  CustomError
} from "/server/model/error";
import {
  LogUtil
} from "/server/util/log";
import {
  QueryRange
} from "/server/util/query";


@modelOptions({schemaOptions: {collection: "examples"}})
export class ExampleSchema extends DiscardableSchema {

  @prop({required: true, ref: "DictionarySchema"})
  public dictionary!: Ref<DictionarySchema>;

  @prop({required: true})
  public number!: number;

  @prop({required: true, type: LinkedWordSchema})
  public words!: Array<LinkedWordSchema>;

  @prop({required: true})
  public sentence!: string;

  @prop({required: true})
  public translation!: string;

  @prop()
  public createdDate?: Date;

  @prop()
  public updatedDate?: Date;

  public static async fetchByDictionary(dictionary: Dictionary, range?: QueryRange): Promise<WithSize<Example>> {
    const query = ExampleModel.findExist().where("dictionary", dictionary).sort("-createdDate");
    const result = await QueryRange.restrictWithSize(query, range);
    return result;
  }

  public static async fetchByWord(word: Word): Promise<Array<Example>> {
    const query = ExampleModel.findExist().where("dictionary", word.dictionary).where("words.number", word.number).sort("-createdDate");
    const result = await query.exec();
    return result;
  }

  public static async edit(dictionary: Dictionary, example: EditableExampleSkeleton): Promise<Example> {
    const currentExample = await ExampleModel.findOneExist().where("dictionary", dictionary).where("number", example.number);
    let resultExample;
    if (currentExample) {
      resultExample = new ExampleModel(example);
      resultExample.dictionary = dictionary;
      resultExample.createdDate = currentExample.createdDate;
      resultExample.updatedDate = new Date();
      await this.filterWords(dictionary, resultExample);
      await currentExample.flagDiscarded();
      await resultExample.save();
    } else {
      if (example.number === undefined) {
        example.number = await this.fetchNextNumber(dictionary);
      }
      resultExample = new ExampleModel(example);
      resultExample.dictionary = dictionary;
      resultExample.createdDate = new Date();
      resultExample.updatedDate = new Date();
      await this.filterWords(dictionary, resultExample);
      await resultExample.save();
    }
    LogUtil.log("model/example/edit", {number: dictionary.number, currentId: currentExample?.id, resultId: resultExample.id});
    return resultExample;
  }

  public static async discard(dictionary: Dictionary, number: number): Promise<Example> {
    const example = await ExampleModel.findOneExist().where("dictionary", dictionary).where("number", number);
    if (example) {
      await example.flagDiscarded();
    } else {
      throw new CustomError("noSuchExampleNumber");
    }
    LogUtil.log("model/example/discard", {number: dictionary.number, currentId: example.id});
    return example;
  }

  private static async filterWords(dictionary: Dictionary, example: Example): Promise<void> {
    const linkedNumbers = example.words.map((word) => word.number);
    const linkedWords = await WordModel.findExist().where("dictionary", dictionary).where("number", linkedNumbers);
    example.words = example.words.filter((word) => linkedWords.some((linkedWord) => linkedWord.number === word.number));
  }

  private static async fetchNextNumber(dictionary: Dictionary): Promise<number> {
    const examples = await ExampleModel.find().where("dictionary", dictionary).select("number").sort("-number").limit(1);
    if (examples.length > 0) {
      return examples[0].number + 1;
    } else {
      return 1;
    }
  }

}


export class ExampleCreator {

  public static create(raw: Example): ExampleSkeleton {
    const id = raw.id;
    const number = raw.number;
    const words = raw.words.map(LinkedWordCreator.create);
    const sentence = raw.sentence;
    const translation = raw.translation;
    const skeleton = {id, number, words, sentence, translation};
    return skeleton;
  }

}


export type Example = DocumentType<ExampleSchema>;
export const ExampleModel = getModelForClass(ExampleSchema);