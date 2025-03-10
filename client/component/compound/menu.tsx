//

import {
  ReactElement,
  createContext,
  useMemo
} from "react";
import {
  create
} from "/client/component/create";
import {
  StyleNameUtil
} from "/client/util/style-name";


type MenuContextValue = {
  mode?: string,
  direction: "horizontal" | "vertical"
};
export const menuContext = createContext<MenuContextValue>({
  direction: "horizontal"
});


export const Menu = create(
  require("./menu.scss"), "Menu",
  function ({
    mode,
    direction = "horizontal",
    children
  }: {
    mode: string,
    direction?: "horizontal" | "vertical",
    children: ReactElement | Array<ReactElement>
  }): ReactElement {

    const ContextProvider = menuContext["Provider"];
    const contextValue = useMemo(() => ({mode, direction}), [mode, direction]);

    const styleName = StyleNameUtil.create("root", direction);
    const node = (
      <nav styleName={styleName}>
        <ContextProvider value={contextValue}>
          {children}
        </ContextProvider>
      </nav>
    );
    return node;

  }
);


export default Menu;