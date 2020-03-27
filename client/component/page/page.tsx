//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  Component
} from "/client/component/component";
import {
  DictionaryHeader,
  Header,
  PopupInformationPane
} from "/client/component/compound";
import {
  applyStyle
} from "/client/component/decorator";
import {
  SlimeDictionarySkeleton
} from "/server/skeleton/dictionary/slime";


@applyStyle(require("./page.scss"))
export class Page extends Component<Props, State> {

  public static defaultProps: Props = {
    showsDictionary: false,
    dictionary: null
  };

  public render(): ReactNode {
    let styleNames = ["page"];
    let dictionaryHeaderNode;
    if (this.props.showsDictionary) {
      styleNames.push("dictionary");
      dictionaryHeaderNode = <DictionaryHeader dictionary={this.props.dictionary}/>;
    }
    let node = (
      <div styleName={styleNames.join(" ")}>
        <Header/>
        {dictionaryHeaderNode}
        <PopupInformationPane/>
        <div styleName="content">
          {this.props.children}
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
  showsDictionary: boolean,
  dictionary: SlimeDictionarySkeleton | null;
};
type State = {
};