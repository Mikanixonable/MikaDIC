//

import {
  getModelForClass,
  prop
} from "@typegoose/typegoose";
import {
  DictionarySettings as DictionarySettingsSkeleton
} from "/server/skeleton/dictionary";


export class DictionarySettingsSchema {

  @prop({required: true, type: String})
  public punctuations!: Array<string>;

  @prop({required: true})
  public enableMarkdown!: boolean;

  public static createDefault(): DictionarySettings {
    let settings = new DictionarySettingsModel({});
    settings.punctuations = [",", "、"];
    settings.enableMarkdown = false;
    return settings;
  }

}


export class DictionarySettingsCreator {

  public static create(raw: DictionarySettings): DictionarySettingsSkeleton {
    let punctuations = raw.punctuations;
    let enableMarkdown = raw.enableMarkdown;
    let skeleton = DictionarySettingsSkeleton.of({punctuations, enableMarkdown});
    return skeleton;
  }

}


export type DictionarySettings = DictionarySettingsSchema;
export let DictionarySettingsModel = getModelForClass(DictionarySettingsSchema);