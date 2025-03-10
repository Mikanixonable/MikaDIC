//

import {
  MouseEvent,
  ReactElement,
  ReactNode
} from "react";
import Button from "/client/component/atom/button";
import Modal from "/client/component/atom/modal";
import {
  create
} from "/client/component/create";
import {
  useTrans
} from "/client/component/hook";
import {
  data
} from "/client/util/data";


const Overlay = create(
  require("./overlay.scss"), "Overlay",
  function ({
    size = "small",
    open = false,
    outsideClosable = false,
    title,
    page,
    showBack,
    onClose,
    onBack,
    children
  }: {
    size?: "large" | "small",
    open?: boolean,
    outsideClosable?: boolean,
    title?: string,
    page?: number,
    showBack?: boolean,
    onClose?: (event: MouseEvent<HTMLElement>) => void,
    onBack?: (event: MouseEvent<HTMLButtonElement>) => void,
    children?: ReactNode
  }): ReactElement {

    const node = (
      <Modal open={open} outsideClosable={outsideClosable} onClose={onClose}>
        <div styleName="content-container" {...data({size})}>
          {(title !== undefined) && <OverlayHeader {...{title, page, showBack, onClose, onBack}}/>}
          <div styleName="content">
            {(page !== undefined && Array.isArray(children)) ? children[page] : children}
          </div>
        </div>
      </Modal>
    );
    return node;

  }
);


const OverlayHeader = create(
  require("./overlay.scss"),
  function ({
    title,
    page,
    showBack,
    onClose,
    onBack
  }: {
    title?: string,
    page?: number,
    showBack?: boolean,
    onClose?: (event: MouseEvent<HTMLElement>) => void,
    onBack?: (event: MouseEvent<HTMLButtonElement>) => void
  }): ReactElement {

    const {trans} = useTrans("overlay");

    const node = (
      <div styleName="header">
        <div styleName="left">
          <div styleName="title">{title}</div>
        </div>
        <div styleName="right">
          {(page !== undefined && ((showBack === undefined && page > 0) || showBack)) && (
            <Button label={trans("back")} iconName="backward" variant="simple" hideLabel={true} onClick={onBack}/>
          )}
          {(
            <Button label={trans("close")} iconName="times" variant="simple" hideLabel={true} onClick={onClose}/>
          )}
        </div>
      </div>
    );
    return node;

  }
);


export default Overlay;