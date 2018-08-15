import router from "./Router";
import { displayByHashValue } from "./Router";

let defaultHashValue = ['', '#', '#/'];
if (defaultHashValue.indexOf(location.hash) !== -1) {
  router.forward(['home']);
} else {
  displayByHashValue(location.hash);
}
