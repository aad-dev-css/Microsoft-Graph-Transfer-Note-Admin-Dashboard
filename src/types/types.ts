import { IPublicClientApplication } from "@azure/msal-browser";
import { GridColDef } from "@mui/x-data-grid";

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

export type DataTableProps = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  setSeed: React.Dispatch<React.SetStateAction<number>>;
};

export type AddProps = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
