//

import {
  DocumentType,
  Ref,
  getModelForClass,
  modelOptions,
  prop
} from "@typegoose/typegoose";
import {
  Example as ExampleSkeleton
} from "/client/skeleton/dictionary";
import {
  RemovableSchema
} from "/server/model/base";
import {
  DictionarySchema,
  LinkedWord,
  LinkedWordCreator
} from "/server/model/dictionary";


@modelOptions({schemaOptions: {collection: "examples"}})
export class ExampleSchema extends RemovableSchema {

  @prop({required: true, ref: "DictionarySchema"})
  public dictionary!: Ref<DictionarySchema>;

  @prop({required: true})
  public number!: number;

  @prop({required: true})
  public words!: Array<LinkedWord>;

  @prop({required: true})
  public sentence!: string;

  @prop({required: true})
  public translation!: string;

}


export class ExampleCreator {

  public static create(raw: Example): ExampleSkeleton {
    let id = raw.id;
    let number = raw.number;
    let words = raw.words.map(LinkedWordCreator.create);
    let sentence = raw.sentence;
    let translation = raw.translation;
    let skeleton = {id, number, words, sentence, translation};
    return skeleton;
  }

}


export type Example = DocumentType<ExampleSchema>;
export let ExampleModel = getModelForClass(ExampleSchema);