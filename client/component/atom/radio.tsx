//

import * as react from "react";
import {
  ChangeEvent,
  Component,
  ReactNode
} from "react";
import {
  applyStyle
} from "/client/util/decorator";


@applyStyle(require("./radio.scss"))
export class Radio extends Component<Props, State> {

  private handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  public render(): ReactNode {
    let node = (
      <label styleName="root">
        <input styleName="radio" type="radio" name={this.props.name} value={this.props.value} checked={this.props.checked} onChange={this.handleChange.bind(this)}/>
        <span styleName="label">{this.props.label}</span>
      </label>
    );
    return node;
  }

}


type Props = {
  name: string,
  value: string,
  label: string,
  checked: boolean,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
};
type State = {
};