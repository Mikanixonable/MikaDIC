//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  withRouter
} from "react-router-dom";
import {
  ComponentBase
} from "/client/component/component";
import {
  applyStyle
} from "/client/util/decorator";


@applyStyle(require("./logo.scss"))
class LogoBase extends ComponentBase<Props, State> {

  public render(): ReactNode {
    let node = (
      <div styleName="logo">
        <div styleName="title">ZpDIC</div>
        <div styleName="subtitle">Online</div>
        <div styleName="version">ver dev-2963</div>
      </div>
    );
    return node;
  }

}


type Props = {
};
type State = {
};

export let Logo = withRouter(LogoBase);