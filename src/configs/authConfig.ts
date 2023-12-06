import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "fe25a528-0750-44e3-a781-50bf4166e5c9",
    authority:
      "https://login.microsoftonline.com/aea86db1-0845-4b94-9c5c-108a7d34c09c",
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
};

export const customApiRequest: PopupRequest = {
  scopes: [
    "api://734276de-90b0-4f4b-a5f8-3db023870af3/workloads.read.all",
    "api://734276de-90b0-4f4b-a5f8-3db023870af3/feedback.write.all",
    "api://734276de-90b0-4f4b-a5f8-3db023870af3/feedback.read.all",
    "api://734276de-90b0-4f4b-a5f8-3db023870af3/feedback.write",
    "api://734276de-90b0-4f4b-a5f8-3db023870af3/workloads.write.all",
  ],
};
