//

import * as react from "react";
import {
  MouseEvent,
  ReactNode
} from "react";
import {
  Button,
  Input
} from "/client/component/atom";
import {
  StoreComponent
} from "/client/component/component";
import {
  InformationPane
} from "/client/component/compound";
import {
  applyStyle,
  inject,
  route
} from "/client/component/decorator";
import {
  getMessage
} from "/client/component/message";


@route @inject
@applyStyle(require("./login-form.scss"))
export class RegisterForm extends StoreComponent<Props, State> {

  public state: State = {
    name: "",
    email: "",
    password: "",
    errorType: null
  };

  private async performRegister(event: MouseEvent<HTMLElement>): Promise<void> {
    let name = this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    let response = await this.requestPost("registerUser", {name, email, password}, true);
    let body = response.data;
    if (response.status === 200) {
      let loginResponse = await this.login({name, password});
      if (loginResponse.status === 200) {
        this.replacePath("/dashboard");
      } else {
        this.setState({errorType: "loginFailed"});
      }
    } else if (response.status === 400 && "error" in body) {
      this.setState({errorType: body.type});
    } else {
      this.setState({errorType: "unexpected"});
    }
  }

  public render(): ReactNode {
    let errorNode;
    let errorType = this.state.errorType;
    if (errorType) {
      errorNode = (
        <div styleName="error">
          <InformationPane texts={[getMessage(errorType)]} style="error" onClose={() => this.setState({errorType: null})}/>
        </div>
      );
    }
    let node = (
      <div>
        {errorNode}
        <form styleName="root">
          <Input label="ユーザー名" onSet={(value) => this.setState({name: value})}/>
          <Input label="メールアドレス" onSet={(value) => this.setState({email: value})}/>
          <Input label="パスワード" type="flexible" onSet={(value) => this.setState({password: value})}/>
          <div styleName="button-group">
            <Button label="新規登録" reactive={true} onClick={this.performRegister.bind(this)}/>
          </div>
        </form>
      </div>
    );
    return node;
  }

}


type Props = {
};
type State = {
  name: string,
  email: string,
  password: string,
  errorType: string | null
};