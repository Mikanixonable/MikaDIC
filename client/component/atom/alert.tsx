//

import {
  MouseEvent,
  ReactElement,
  useCallback
} from "react";
import Button from "/client/component/atom/button";
import Icon from "/client/component/atom/icon";
import Modal from "/client/component/atom/modal";
import {
  create
} from "/client/component/create";
import {
  useTrans
} from "/client/component/hook";


const Alert = create(
  require("./alert.scss"), "Alert",
  function ({
    text,
    iconName = "triangle-exclamation",
    confirmLabel = null,
    cancelLabel = null,
    open = false,
    outsideClosable = false,
    onClose,
    onConfirm,
    onCancel
  }: {
    text: string,
    iconName?: string,
    confirmLabel?: string | null,
    cancelLabel?: string | null,
    open?: boolean,
    outsideClosable?: boolean,
    onClose?: (event: MouseEvent<HTMLElement>) => void,
    onConfirm?: (event: MouseEvent<HTMLButtonElement>) => void,
    onCancel?: (event: MouseEvent<HTMLButtonElement>) => void
  }): ReactElement {

    const {trans} = useTrans("alert");

    const handleConfirm = useCallback(function (event: MouseEvent<HTMLButtonElement>): void {
      onClose?.(event);
      onConfirm?.(event);
    }, [onClose, onConfirm]);

    const handleCancel = useCallback(function (event: MouseEvent<HTMLButtonElement>): void {
      onClose?.(event);
      onCancel?.(event);
    }, [onClose, onCancel]);

    const node = (
      <Modal open={open} outsideClosable={outsideClosable} onClose={onClose}>
        <div styleName="content">
          <div styleName="text-container">
            <div styleName="icon"><Icon name={iconName}/></div>
            <p styleName="text">{text}</p>
          </div>
          <div styleName="button-group">
            <Button label={cancelLabel ?? trans("cancel")} variant="light" onClick={handleCancel}/>
            <Button label={confirmLabel ?? trans("confirm")} scheme="red" onClick={handleConfirm}/>
          </div>
        </div>
      </Modal>
    );
    return node;

  }
);


export default Alert;