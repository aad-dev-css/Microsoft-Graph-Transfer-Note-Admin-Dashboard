import Axios from "axios";
import { customApiRequest } from "../configs/authConfig";
import { msalInstance } from "../main";
import { WorkloadData } from "../types/types";

const workloadApiUrl = "https://workloads-api.azurewebsites.net/workloads/";

// Function to list all the workloads objects
export const listWorkloads = async (): Promise<any> => {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const authResponse = await msalInstance.acquireTokenSilent({
    ...customApiRequest,
    account: account,
  });

  return Axios.get(workloadApiUrl, {
    headers: {
      Authorization: "Bearer " + authResponse.accessToken,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

// Function to create a workload object
export async function postWorkload(workloadData: WorkloadData) {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const authResponse = await msalInstance.acquireTokenSilent({
    ...customApiRequest,
    account: account,
  });

  return Axios.post(workloadApiUrl, JSON.stringify(workloadData), {
    headers: {
      Authorization: "Bearer " + authResponse.accessToken,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
}

// Function to delete a workload object
export const deleteWorkload = async (workloadId: string): Promise<any> => {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const authResponse = await msalInstance.acquireTokenSilent({
    ...customApiRequest,
    account: account,
  });

  return Axios.delete(workloadApiUrl + workloadId, {
    headers: {
      Authorization: "Bearer " + authResponse.accessToken,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};
