import Axios, { AxiosResponse } from "axios";
import { loginRequest } from "../configs/authConfig";
import { msalInstance } from "../main";

const msGraphUrl = "https://graph.microsoft.com/v1.0/";

export const getPhoto = async (): Promise<AxiosResponse["data"]> => {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const authResponse = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account: account,
  });

  const url = msGraphUrl + "me/photo/$value";

  return Axios.get(url, {
    headers: {
      Authorization: "Bearer " + authResponse.accessToken,
    },
    responseType: "blob",
  })
    .then((response) => {
      return response.data;
    })
    .catch((e) => console.log(e));
};
