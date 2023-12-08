import { Button } from "@mui/material";
import { WorkloadData } from "../../types/types";
import "./single.scss";
import { useState } from "react";
import { updateWorkload } from "../../utils/workloadsRequests";
import { useNavigate } from "react-router-dom";

const Single = (workloadData: WorkloadData) => {
  const navigate = useNavigate();
  const [updatedWorkload, setUpdatedWorkload] = useState<WorkloadData>({
    TargetWorkloadId: workloadData.TargetWorkloadId,
    Team: workloadData.Team,
    Routing: workloadData.Routing,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkload(updatedWorkload).then((response) => {
      if (response) {
        navigate("/workloads");
      }
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLButtonElement;
    if (target) {
      setUpdatedWorkload((prevData) => ({
        ...prevData,
        [target.name]: target.value,
      }));
    }
  };

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{updatedWorkload.TargetWorkloadId}</h1>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="item" key={1}>
              <label>Team</label>
              <input
                type="text"
                name="Team"
                placeholder="Team"
                value={updatedWorkload.Team}
                onChange={handleInputChange}
              />
            </div>
            <div className="item" key={2}>
              <label>Routing</label>
              <input
                type="text"
                name="Routing"
                placeholder="Routing"
                value={updatedWorkload.Routing}
                onChange={handleInputChange}
              />
            </div>
            <Button variant="contained" type="submit">
              Update Workload
            </Button>
          </form>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Single;
