import LocalizedString from "react-native-localization";

let strings = new LocalizedString({
  en: {
    loginTitle: "Log In",
    logOut: "Log Out",
    forgottenPassword: "Forgotten password?",
    deleteAccount: "Delete account",
    legal: "LEGAL",
  }
});
// TODO: Set dynamical language from somewere
strings.setLanguage('en');
export default strings;
