//

import * as react from "react";
import {
  Fragment,
  ReactElement
} from "react";
import Link from "/client/component/atom/link";
import HeaderMenuItem from "/client/component/compound/header-menu-item";
import {
  create
} from "/client/component/create";
import {
  useIntl,
  useMe
} from "/client/component/hook";
import {EnhancedDictionary} from "/client/skeleton/dictionary";
import DictionaryHeader from "./dictionary-header";


const Header = create(
  require("./header.scss"), "Header",
  function ({
    dictionary,
    showDictionary,
    showAddLink,
    showSettingLink
  }: {
    dictionary?: EnhancedDictionary,
    showDictionary?: boolean,
    showAddLink?: boolean,
    showSettingLink?: boolean
  }): ReactElement {

    const node = (
      <header styleName="root">
        <div styleName="content">
          <div styleName="common-container">
            <CommonHeader/>
          </div>
          {(dictionary !== undefined) && (
            <div styleName="dictionary-container">
              <DictionaryHeader dictionary={dictionary} showAddLink={showAddLink} showSettingLink={showSettingLink}/>
            </div>
          )}
        </div>
      </header>
    );
    return node;

  }
);


const CommonHeader = create(
  require("./header.scss"), "CommonHeader",
  function ({
  }: {
  }): ReactElement {

    const [, {trans}] = useIntl();
    const [me] = useMe();

    const node = (
      <div styleName="common">
        <div styleName="left">
          <div styleName="title">
            <Link href="/" target="self" style="plane">ZpDIC</Link>
          </div>
        </div>
        <div styleName="right">
          <div styleName="menu">
            <HeaderMenuItem label={trans("header.dictionaryList")} iconName="book" href="/list"/>
            <HeaderMenuItem label={trans("header.notification")} iconName="info-circle" href="/notification"/>
            <HeaderMenuItem label={trans("header.document")} iconName="book-open" href="/document"/>
            <HeaderMenuItem label={trans("header.contact")} iconName="envelope" href="/contact"/>
            <HeaderMenuItem label={trans("header.language")} iconName="language" href="/language"/>
            {(me !== null) && (
              <Fragment>
                <div styleName="separator"/>
                <HeaderMenuItem label={trans("header.dashboard")} iconName="house-user" href="/dashboard"/>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
    return node;

  }
);


export default Header;