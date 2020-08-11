import { root } from './index';

export const testId = (id) => `[data-testid="${id}"]`;

export const testElem = async (id) => {
  const app = await root();
  return await app.$(testId(id));
};