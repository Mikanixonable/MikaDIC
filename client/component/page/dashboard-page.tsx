//

import {
  ReactElement,
  Suspense,
  useCallback
} from "react";
import ActivateUserForm from "/client/component/compound/activate-user-form";
import DictionaryList from "/client/component/compound/dictionary-list";
import InvitationList from "/client/component/compound/invitation-list";
import Loading from "/client/component/compound/loading";
import Menu from "/client/component/compound/menu";
import MenuItem from "/client/component/compound/menu-item";
import SettingPane from "/client/component/compound/setting-pane";
import {
  create
} from "/client/component/create";
import ChangeUserEmailForm from "/client/component/form/change-user-email-form";
import ChangeUserNameForm from "/client/component/form/change-user-name-form";
import ChangeUserPasswordForm from "/client/component/form/change-user-password-form";
import ChangeUserScreenNameForm from "/client/component/form/change-user-screen-name-form";
import CreateDictionaryForm from "/client/component/form/create-dictionary-form";
import DiscardUserForm from "/client/component/form/discard-user-form";
import {
  useLocation,
  useLogout,
  useMe,
  usePath,
  useSuspenseQuery,
  useTrans
} from "/client/component/hook";
import Page from "/client/component/page/page";
import {
  UserDictionary
} from "/client/skeleton/dictionary";
import {
  Invitation
} from "/client/skeleton/invitation";


const DashboardPage = create(
  require("./dashboard-page.scss"), "DashboardPage",
  function ({
  }: {
  }): ReactElement {

    const {trans} = useTrans("dashboardPage");
    const {pushPath} = usePath();
    const logout = useLogout();
    const location = useLocation();

    const [dictionaries] = useSuspenseQuery("fetchDictionaries", {});
    const [editInvitations] = useSuspenseQuery("fetchInvitations", {type: "edit"});
    const [transferInvitations] = useSuspenseQuery("fetchInvitations", {type: "transfer"});
    const [me] = useMe();

    const performLogout = useCallback(async function (): Promise<void> {
      const response = await logout();
      if (response.status === 200) {
        pushPath("/");
      }
    }, [pushPath, logout]);

    const mode = location.hash || "dictionary";
    const dictionaryCount = dictionaries.length;
    const editNotificationCount = editInvitations.length;
    const transferNotificationCount = transferInvitations.length;
    const notificationCount = editNotificationCount + transferNotificationCount;
    const node = (
      <Page title={trans("title")}>
        {(me !== null && !me.activated) && (
          <div styleName="activate">
            <ActivateUserForm/>
          </div>
        )}
        <Menu mode={mode}>
          <MenuItem mode="dictionary" label={trans("dictionary")} iconName="book" badgeValue={dictionaryCount} href="#dictionary"/>
          <MenuItem mode="notification" label={trans("notification")} iconName="bell" badgeValue={notificationCount} href="#notification"/>
          <MenuItem mode="account" label={trans("account")} iconName="id-card" href="#account"/>
          <MenuItem mode="logout" label={trans("logout")} iconName="sign-out-alt" onClick={performLogout}/>
        </Menu>
        <DashboardPageForms {...{dictionaries, editInvitations, transferInvitations, mode}}/>
      </Page>
    );
    return node;

  }
);


const DashboardPageForms = create(
  require("./dashboard-page.scss"),
  function ({
    dictionaries,
    editInvitations,
    transferInvitations,
    mode
  }: {
    dictionaries: Array<UserDictionary>,
    editInvitations: Array<Invitation>,
    transferInvitations: Array<Invitation>,
    mode: string
  }): ReactElement | null {

    const [me, {refetchMe}] = useMe();
    const {trans} = useTrans("dashboardPage");
    const {pushPath} = usePath();

    if (mode === "dictionary") {
      const node = (
        <Suspense fallback={<DashboardPageLoading/>}>
          <SettingPane
            label={trans("dictionaryList.label")}
            description={trans("dictionaryList.description")}
          >
            <DictionaryList dictionaries={dictionaries} showLinks={true} size={8}/>
          </SettingPane>
          <SettingPane
            label={trans("createDictionaryForm.label")}
            description={trans("createDictionaryForm.description")}
          >
            <CreateDictionaryForm/>
          </SettingPane>
        </Suspense>
      );
      return node;
    } else if (mode === "notification") {
      const node = (
        <Suspense fallback={<DashboardPageLoading/>}>
          <SettingPane
            label={trans("editInvitationList.label")}
            description={trans("editInvitationList.description")}
          >
            <InvitationList invitations={editInvitations} size={8}/>
          </SettingPane>
          <SettingPane
            label={trans("transferInvitationList.label")}
            description={trans("transferInvitationList.description")}
          >
            <InvitationList invitations={transferInvitations} size={8}/>
          </SettingPane>
        </Suspense>
      );
      return node;
    } else if (mode === "account") {
      const node = (me !== null) && (
        <Suspense fallback={<DashboardPageLoading/>}>
          <SettingPane
            label={trans("changeUserNameForm.label")}
            description={trans("changeUserNameForm.description")}
          >
            <ChangeUserNameForm currentName={me.name} onSubmit={refetchMe}/>
          </SettingPane>
          <SettingPane
            label={trans("changeUserScreenNameForm.label")}
            description={trans("changeUserScreenNameForm.description")}
          >
            <ChangeUserScreenNameForm currentScreenName={me.screenName} onSubmit={refetchMe}/>
          </SettingPane>
          <SettingPane
            label={trans("changeUserEmailForm.label")}
            description={trans("changeUserEmailForm.description")}
          >
            <ChangeUserEmailForm currentEmail={me.email} onSubmit={refetchMe}/>
          </SettingPane>
          <SettingPane
            label={trans("changeUserPasswordForm.label")}
            description={trans("changeUserPasswordForm.description")}
          >
            <ChangeUserPasswordForm/>
          </SettingPane>
          <SettingPane
            label={trans("discardUserForm.label")}
            description={trans("discardUserForm.description")}
          >
            <DiscardUserForm onSubmit={() => pushPath("/", {preservePopup: true})}/>
          </SettingPane>
        </Suspense>
      );
      return node || null;
    } else {
      return null;
    }

  }
);


const DashboardPageLoading = create(
  require("./dictionary-setting-page.scss"),
  function ({
  }: {
  }): ReactElement {

    const node = (
      <SettingPane>
        <Loading/>
      </SettingPane>
    );
    return node;

  }
);


export default DashboardPage;