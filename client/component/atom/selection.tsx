//

import * as react from "react";
import {
  ReactNode
} from "react";
import Label from "/client/component/atom/label";
import Suggestion from "/client/component/atom/suggestion";
import Component from "/client/component/component";
import {
  style
} from "/client/component/decorator";


@style(require("./selection.scss"))
export default class Selection<V extends string> extends Component<Props<V>, State<V>> {

  private renderSelection(): ReactNode {
    let node = (
      <div styleName="selection">
        {this.props.value}
      </div>
    );
    return node;
  }

  public render(): ReactNode {
    let suggestionSpecs = Array.from(this.props.specs).map((spec) => ({replacement: spec.value, node: spec.text}));
    let selectionNode = this.renderSelection();
    let node = (
      <div styleName="root" className={this.props.className}>
        <Suggestion specs={suggestionSpecs} onSet={this.props.onSet}>
          <label styleName="label-wrapper">
            <Label text={this.props.label} showRequired={this.props.showRequired} showOptional={this.props.showOptional}/>
            {selectionNode}
          </label>
        </Suggestion>
      </div>
    );
    return node;
  }

}


type Props<V> = {
  value: V,
  label?: string,
  specs: ArrayLike<SelectionSpec<V>>,
  showRequired?: boolean,
  showOptional?: boolean,
  onSet?: (value: V) => void,
  className?: string
};
type State<V> = {
};

export type SelectionSpec<V> = {value: V, text: string};