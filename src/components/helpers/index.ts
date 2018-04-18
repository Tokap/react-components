import * as jsCookie from "js-cookie";

export interface CookieParams {
  name: string;
  value: any;
  expiration?: {
    expires: number;
  };
}

export function classNameFactory(
  defaultClass: string,
  classList?: Array<string>
) {
  return classList == null || classList.length === 0
    ? defaultClass
    : classList.reduce(
        (nameString, className) => `${nameString} ${className}`,
        defaultClass
      );
}

// Type Helpers:
function isObject(val: any) {
  return typeof val === "object" && !Array.isArray(val) && val !== null;
}

function isArray(val: any) {
  return Array.isArray(val);
}

function isString(val: any) {
  return typeof val === "string";
}

export function isEmptyOrNil(val: any) {
  if (isObject(val)) {
    return Object.keys(val).length === 0;
  } else if (isArray(val) || isString(val)) {
    return val.length === 0;
  } else if (val == null) {
    return true;
  } else {
    return false;
  }
}

export function createSessionCookies(cookies: Array<CookieParams>) {
  cookies.forEach(cookieDetail => {
    const expirationObj = cookieDetail.expiration || {};
    jsCookie.set(cookieDetail.name, cookieDetail.value, expirationObj);
  });
}

export function createSessionAlpha(authDetails: Object) {
  jsCookie.set("accessToken", authDetails["accessToken"]);
  jsCookie.set("user", authDetails["user"]);
  jsCookie.set("expiration", authDetails["expiration"]);
  jsCookie.set("account", authDetails["account"]);
  jsCookie.set("projects", authDetails["projects"]);

  // Assign the nullable params after a null check
  if (authDetails["projectId"] != null) {
    jsCookie.set("projectId", String(authDetails["projectId"]));
  }
  if (authDetails["currentProjectId"] != null) {
    jsCookie.set("currentProjectId", String(authDetails["currentProjectId"]));
  }
}

export function createSession(authDetails: Object) {
  const sessionCookie = JSON.stringify(authDetails);
  jsCookie.set("session", sessionCookie);
}

export function getSessionDetails(): Object {
  return jsCookie.getJSON("session") as Object;
}

// TODO: It took 2 clicks to clear both. Investigate??
export function clearSessionCookies() {
  jsCookie.remove("accessToken");
  jsCookie.remove("user");
  jsCookie.remove("expiration");
  jsCookie.remove("account");
  jsCookie.remove("projects");
  jsCookie.remove("projectId");
  jsCookie.remove("currentProjectId");

  return true;
}
