//

import {
  Fragment,
  ReactElement,
  useCallback,
  useState
} from "react";
import Alert from "/client/component/atom/alert";
import Button from "/client/component/atom/button";
import {
  create
} from "/client/component/create";
import {
  useIntl,
  usePopup,
  useRequest
} from "/client/component/hook";


const DiscardDictionaryForm = create(
  require("./discard-dictionary-form.scss"), "DiscardDictionaryForm",
  function ({
    number,
    onSubmit
  }: {
    number: number,
    onSubmit?: () => void
  }): ReactElement {

    const [alertOpen, setAlertOpen] = useState(false);
    const [, {trans}] = useIntl();
    const {request} = useRequest();
    const [, {addInformationPopup}] = usePopup();

    const discardDictionary = useCallback(async function (): Promise<void> {
      const response = await request("discardDictionary", {number});
      if (response.status === 200) {
        addInformationPopup("dictionaryDiscarded");
        onSubmit?.();
      }
    }, [number, request, onSubmit, addInformationPopup]);

    const node = (
      <Fragment>
        <form styleName="root">
          <Button label={trans("discardDictionaryForm.confirm")} reactive={true} scheme="red" onClick={() => setAlertOpen(true)}/>
        </form>
        <p styleName="caution">
          {trans("discardDictionaryForm.caution")}
        </p>
        <Alert
          text={trans("discardDictionaryForm.alert")}
          confirmLabel={trans("discardDictionaryForm.confirm")}
          open={alertOpen}
          outsideClosable={true}
          onClose={() => setAlertOpen(false)}
          onConfirm={discardDictionary}
        />
      </Fragment>
    );
    return node;

  }
);


export default DiscardDictionaryForm;