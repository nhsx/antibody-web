import { testId, testElem } from "./utils";


export const getLoginInput = async () => {
  return await testElem("login-input");
};

export const getLoginSubmit = async () => {
  return page.click(testId("login-submit"));
};
