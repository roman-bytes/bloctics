import { createCookie } from "@remix-run/node";

export const blocticsMachineCookie = createCookie("bloctics-machine", {
  secrets: ["r3m1x-c0nF-2022"],
});
