//

import * as react from "react";
import {
  Component,
  ComponentType,
  PropsWithChildren,
  ReactElement,
  ReactNode
} from "react";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import {
  DashboardPage,
  DictionaryPage,
  LoginPage,
  RegisterPage,
  TopPage
} from "/client/component/page";
import {
  GuestRoute,
  PrivateRoute
} from "/client/component/routing/authentication";
import * as http from "/client/util/http";


export class Root extends Component<{}, {}> {

  // 認証済みかどうかを確認し、その結果に応じて表示するコンポーネントを切り返るコンポーネントを返します。
  private switch(guestComponent: ComponentType<any>, privateComponent: ComponentType<any>): ComponentType<any> {
    let component = function (props: PropsWithChildren<any>): ReactElement {
      if (http.hasToken()) {
        return react.createElement(privateComponent, props);
      } else {
        return react.createElement(guestComponent, props);
      }
    };
    return component;
  }

  public render(): ReactNode {
    return (
      <BrowserRouter>
        <Switch>
          <GuestRoute exact path="/" redirect="/dashboard" component={TopPage}/>
          <GuestRoute exact path="/login" redirect="/dashboard" component={LoginPage}/>
          <GuestRoute exact path="/register" redirect="/dashboard" component={RegisterPage}/>
          <PrivateRoute path="/dashboard/:mode" redirect="/login" component={DashboardPage}/>
          <PrivateRoute path="/dashboard" redirect="/login" component={DashboardPage}/>
          <Route path ="/dictionary/:number" component={DictionaryPage}/>
        </Switch>
      </BrowserRouter>
    );
  }

}