//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  withRouter
} from "react-router-dom";
import {
  Button,
  Input
} from "/client/component/atom";
import {
  ComponentBase
} from "/client/component/component";
import {
  DictionaryList,
  Header,
  Menu,
  SettingPane
} from "/client/component/compound";
import {
  applyStyle
} from "/client/util/decorator";
import * as http from "/client/util/http";
import {
  SlimeDictionarySkeleton
} from "/server/model/dictionary/slime";


@applyStyle(require("./dashboard-page.scss"))
class DashboardPageBase extends ComponentBase<Props, State, Params> {

  public state: State = {
    dictionaries: []
  };

  public async componentDidMount(): Promise<void> {
    try {
      let response = await http.get("dictionaryList", {});
      let dictionaries = response.data;
      this.setState({dictionaries});
    } catch (error) {
      this.jumpLogin(error);
    }
  }

  private renderDictionaryListNode(): ReactNode {
    let label = "登録辞書一覧";
    let description = `
      このユーザーに登録されている辞書の一覧です。
      辞書の閲覧や編集ができます。
    `;
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <DictionaryList dictionaries={this.state.dictionaries}/>
      </SettingPane>
    );
    return node;
  }

  private renderCreateDictionaryNode(): ReactNode {
    let label = "新規作成";
    let description = `
      空の辞書を作成します。
    `;
    let node = (
      <SettingPane label={label} key={label} description={description}>
        <form styleName="create-dictionary">
          <Input label="名称"/>
          <Button label="新規作成"/>
        </form>
      </SettingPane>
    );
    return node;
  }

  private renderNothingNode(): ReactNode {
    let label = "?";
    let node = (
      <SettingPane label={label} key={label}>
        Not yet implemented
      </SettingPane>
    );
    return node;
  }

  public render(): ReactNode {
    let mode = this.props.match?.params.mode || "dictionary";
    let contentNodes = [];
    if (mode === "dictionary") {
      contentNodes.push(this.renderDictionaryListNode());
      contentNodes.push(this.renderCreateDictionaryNode());
    } else {
      contentNodes.push(this.renderNothingNode());
    }
    let node = (
      <div styleName="page">
        <Header/>
        <div styleName="content">
          <Menu mode={mode}/>
          {contentNodes}
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
};
type State = {
  dictionaries: Array<SlimeDictionarySkeleton>;
};
type Params = {
  mode: string
};

export let DashboardPage = withRouter(DashboardPageBase);