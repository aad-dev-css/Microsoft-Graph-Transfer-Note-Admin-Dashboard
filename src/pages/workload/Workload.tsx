import { useEffect, useState } from "react";
import "./workload.scss";
import { useParams } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { WorkloadData } from "../../types/types";
import {
  AccountInfo,
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { getWorkload } from "../../utils/workloadsRequests";
import { customApiRequest } from "../../configs/authConfig";
import { CircularProgress } from "@mui/material";
import Single from "../../components/single/Single";

const Workload = () => {
  const { id } = useParams();
  const { instance, inProgress } = useMsal();
  const [loading, setLoading] = useState(true);
  const [workloadData, setWorkloadData] = useState<WorkloadData>({
    TargetWorkloadId: "",
    Team: "",
    Routing: "",
  });

  useEffect(() => {}, []);

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      getWorkload(id as string)
        .then((response) => {
          console.log(response);
          setWorkloadData(response);
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

  return (
    <div className="workload">
      {loading ? <CircularProgress /> : <Single {...workloadData} />}
    </div>
  );
};

export default Workload;
