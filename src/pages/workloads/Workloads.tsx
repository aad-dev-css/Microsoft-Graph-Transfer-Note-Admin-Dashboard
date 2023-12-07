import { useState, useEffect } from "react";
import "./workloads.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { useMsal } from "@azure/msal-react";
import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import CircularProgress from "@mui/material/CircularProgress";
import { listWorkloads } from "../../utils/workloadsRequests";
import { customApiRequest } from "../../configs/authConfig";

const columns: GridColDef[] = [
  {
    field: "TargetWorkloadId",
    type: "string",
    headerName: "Target Workload Id",
    width: 200,
  },
  {
    field: "Team",
    type: "string",
    headerName: "Team",
    width: 200,
  },
  {
    field: "Routing",
    type: "string",
    headerName: "Routing",
    width: 900,
  },
];

const Workloads = () => {
  const { instance, inProgress } = useMsal();
  const [open, setOpen] = useState(false);
  const [saps, setSaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      listWorkloads()
        .then((response) => {
          console.log(response);
          setSaps(response);
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...customApiRequest,
              account: instance.getActiveAccount() as AccountInfo,
            });
          } else {
            console.log(error);
          }
        });
    }
  }, []);

  return <div>{loading ? <CircularProgress /> : <span>Workloads</span>}</div>;
};

export default Workloads;
