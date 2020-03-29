//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  Component
} from "/client/component/component";
import {
  DictionaryPane,
  PaginationButton
} from "/client/component/compound";
import {
  applyStyle
} from "/client/component/decorator";
import {
  SlimeDictionarySkeleton
} from "/server/skeleton/dictionary/slime";


@applyStyle(require("./dictionary-list.scss"))
export class DictionaryList extends Component<Props, State> {

  public state: State = {
    page: 0
  };

  public render(): ReactNode {
    let offset = this.props.size * this.state.page;
    let previousDisabled = this.state.page <= 0;
    let nextDisabled = this.props.dictionaries.length <= offset + this.props.size;
    let dictionaries = this.props.dictionaries;
    let displayedDictionaries = dictionaries.slice(offset, offset + this.props.size);
    let dictionaryPanes = displayedDictionaries.map((dictionary) => {
      return <DictionaryPane dictionary={dictionary} showsSetting={this.props.showsSetting} key={dictionary.id}/>;
    });
    let node = (
      <div styleName="root">
        {dictionaryPanes}
        <div styleName="pagination-button">
          <PaginationButton previousDisabled={previousDisabled} nextDisabled={nextDisabled} onPreviousClicked={() => this.setState({page: this.state.page - 1})} onNextClicked={() => this.setState({page: this.state.page + 1})}/>
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
  dictionaries: Array<SlimeDictionarySkeleton>,
  showsSetting: boolean,
  size: number
};
type State = {
  page: number
};