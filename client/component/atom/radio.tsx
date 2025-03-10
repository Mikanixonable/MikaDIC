//

import {
  ChangeEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useContext
} from "react";
import {
  radioContext
} from "/client/component/atom/radio-group";
import {
  create
} from "/client/component/create";
import {
  aria
} from "/client/util/data";


export const Radio = create(
  require("./radio.scss"), "Radio",
  function <V extends {}>({
    value,
    valueString,
    label,
    className,
    children
  }: {
    value: V,
    valueString?: string,
    label?: string,
    className?: string,
    children?: ReactNode
  }): ReactElement {

    const contextValue = useContext(radioContext);

    const handleChange = useCallback(function (event: ChangeEvent<HTMLInputElement>): void {
      if (event.target.checked) {
        contextValue.onSet?.(value);
      }
      contextValue.onChange?.(event);
    }, [value, contextValue]);

    const checked = contextValue.value === value;
    const node = (
      <label styleName="root" className={className}>
        <div styleName="original-wrapper">
          <input styleName="original" type="radio" name={contextValue.name} value={valueString ?? String(value)} checked={checked} onChange={handleChange}/>
          <div styleName="box" {...aria({hidden: true})}>
            <div styleName="icon"/>
          </div>
        </div>
        {(label !== undefined) && <span styleName="label">{label}</span>}
        {children}
      </label>
    );
    return node;

  }
);


export default Radio;