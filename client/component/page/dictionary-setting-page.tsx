//

import * as react from "react";
import {
  ReactNode
} from "react";
import Component from "/client/component/component";
import ChangeDictionaryExplanationForm from "/client/component/compound/dictionary-setting/change-dictionary-explanation-form";
import ChangeDictionaryNameForm from "/client/component/compound/dictionary-setting/change-dictionary-name-form";
import ChangeDictionaryParamNameForm from "/client/component/compound/dictionary-setting/change-dictionary-param-name-form";
import ChangeDictionarySecretForm from "/client/component/compound/dictionary-setting/change-dictionary-secret-form";
import DeleteDictionaryForm from "/client/component/compound/dictionary-setting/delete-dictionary-form";
import InviteEditDictionaryForm from "/client/component/compound/dictionary-setting/invite-edit-dictionary-form";
import UploadDictionaryForm from "/client/component/compound/dictionary-setting/upload-dictionary-form";
import Menu from "/client/component/compound/menu";
import SettingPane from "/client/component/compound/setting-pane";
import {
  applyStyle
} from "/client/component/decorator";
import Page from "/client/component/page/page";
import {
  Dictionary
} from "/server/skeleton/dictionary";


@applyStyle(require("./dictionary-setting-page.scss"))
export default class DictionarySettingPage extends Component<Props, State, Params> {

  public state: State = {
    dictionary: null,
    authorized: false
  };

  public async componentDidMount(): Promise<void> {
    let promise = Promise.all([this.fetchDictionary(), this.checkAuthorization()]);
    await promise;
  }

  private async fetchDictionary(): Promise<void> {
    let number = +this.props.match!.params.number;
    let response = await this.requestGet("fetchDictionary", {number});
    if (response.status === 200 && !("error" in response.data)) {
      let dictionary = response.data;
      this.setState({dictionary});
    } else {
      this.setState({dictionary: null});
    }
  }

  private async checkAuthorization(): Promise<void> {
    let number = +this.props.match!.params.number;
    let authority = "own" as const;
    let response = await this.requestGet("checkDictionaryAuthorization", {number, authority});
    if (response.status === 200) {
      this.setState({authorized: true});
    }
  }

  private renderChangeDictionaryNameForm(): ReactNode {
    let label = this.trans("dictionarySettingPage.changeDictionaryNameForm.label");
    let description = this.trans("dictionarySettingPage.changeDictionaryNameForm.description");
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <ChangeDictionaryNameForm number={this.state.dictionary!.number} currentName={this.state.dictionary!.name} onSubmit={this.fetchDictionary.bind(this)}/>
      </SettingPane>
    );
    return node;
  }

  private renderChangeDictionaryParamNameForm(): ReactNode {
    let label = this.trans("dictionarySettingPage.changeDictionaryParamNameForm.label");
    let description = this.trans("dictionarySettingPage.changeDictionaryParamNameForm.description");
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <ChangeDictionaryParamNameForm number={this.state.dictionary!.number} currentParamName={this.state.dictionary!.paramName} onSubmit={this.fetchDictionary.bind(this)}/>
      </SettingPane>
    );
    return node;
  }

  private renderChangeDictionaryExplanationForm(): ReactNode {
    let label = this.trans("dictionarySettingPage.changeDictionaryExplanationForm.label");
    let description = this.trans("dictionarySettingPage.changeDictionaryExplanationForm.description");
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <ChangeDictionaryExplanationForm number={this.state.dictionary!.number} currentExplanation={this.state.dictionary!.explanation ?? ""}/>
      </SettingPane>
    );
    return node;
  }

  private renderChangeDictionarySecretForm(): ReactNode {
    let label = this.trans("dictionarySettingPage.changeDictionarySecretForm.label");
    let description = this.trans("dictionarySettingPage.changeDictionarySecretForm.description");
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <ChangeDictionarySecretForm number={this.state.dictionary!.number} currentSecret={this.state.dictionary!.secret}/>
      </SettingPane>
    );
    return node;
  }

  private renderUploadDictionaryForm(): ReactNode {
    let label = this.trans("dictionarySettingPage.uploadDictionaryForm.label");
    let description = this.trans("dictionarySettingPage.uploadDictionaryForm.description");
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <UploadDictionaryForm number={this.state.dictionary!.number}/>
      </SettingPane>
    );
    return node;
  }

  private renderDeleteDictionaryForm(): ReactNode {
    let label = this.trans("dictionarySettingPage.deleteDictionaryForm.label");
    let description = this.trans("dictionarySettingPage.deleteDictionaryForm.description");
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <DeleteDictionaryForm number={this.state.dictionary!.number} onSubmit={() => this.pushPath("/dashboard", {}, true)}/>
      </SettingPane>
    );
    return node;
  }

  private renderInviteEditDictionaryForm(): ReactNode {
    let label = this.trans("dictionarySettingPage.inviteEditDictionaryForm.label");
    let description = this.trans("dictionarySettingPage.inviteEditDictionaryForm.description");
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <InviteEditDictionaryForm number={this.state.dictionary!.number} dictionary={this.state.dictionary!}/>
      </SettingPane>
    );
    return node;
  }

  public render(): ReactNode {
    let number = +this.props.match!.params.number;
    let mode = this.props.match?.params.mode || "general";
    let menuSpecs = [
      {mode: "general", label: this.trans("dictionarySettingPage.general"), iconLabel: "\uF013", href: "/dashboard/dictionary/" + number},
      {mode: "access", label: this.trans("dictionarySettingPage.access"), iconLabel: "\uF0C0", href: "/dashboard/dictionary/access/" + number}
    ];
    let contentNodes = [];
    if (this.state.dictionary && this.state.authorized) {
      if (mode === "general") {
        contentNodes.push(this.renderChangeDictionaryNameForm());
        contentNodes.push(this.renderChangeDictionaryParamNameForm());
        contentNodes.push(this.renderChangeDictionaryExplanationForm());
        contentNodes.push(this.renderChangeDictionarySecretForm());
        contentNodes.push(this.renderUploadDictionaryForm());
        contentNodes.push(this.renderDeleteDictionaryForm());
      } else if (mode === "access") {
        contentNodes.push(this.renderInviteEditDictionaryForm());
      }
    }
    let node = (
      <Page dictionary={this.state.dictionary} showDictionary={true}>
        <Menu mode={mode} specs={menuSpecs}/>
        {contentNodes}
      </Page>
    );
    return node;
  }

}


type Props = {
};
type State = {
  dictionary: Dictionary | null,
  authorized: boolean
};
type Params = {
  number: string,
  mode: string
};