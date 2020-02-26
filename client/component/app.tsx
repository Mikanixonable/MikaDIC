//

import * as react from "react";
import {
  Component,
  ReactNode
} from "react";
import {
  TopPage
} from "./top-page";


export class App extends Component {

  public render(): ReactNode {
    return (
      <div className="app">
        <TopPage/>
      </div>
    );
  }

}