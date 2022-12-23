import { createCookie } from "@remix-run/node";

export const swagStoreMachineCookie = createCookie("swag-store-machine", {
  secrets: ["r3m1x-c0nF-2022"],
});
