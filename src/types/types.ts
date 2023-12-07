import { IPublicClientApplication } from "@azure/msal-browser";

export type AppProps = {
  pca: IPublicClientApplication;
};

export type LayoutProps = {
  children: JSX.Element;
};

export type WorkloadData = {
  TargetWorkloadId: string;
  Team: string;
  Routing: string;
};
