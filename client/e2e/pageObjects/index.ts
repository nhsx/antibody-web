import config from "../config";
import { ElementHandle } from "puppeteer";

const rootSelector = '#root';

export const root = async () => await page.$(rootSelector) as ElementHandle;

// Expects url in forms /someUrl
export const load = async (url = "/") => {
  await page.goto(`${config.baseUrl}${url}`, {
    waitUntil: "networkidle0",
    timeout: 60000
  });
  await root();
};

export const getTitle = async () => await page.title();