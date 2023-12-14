import "./add.scss";
import { useState } from "react";
import { AddProps, WorkloadData } from "../../types/types";
import { postWorkload } from "../../utils/workloadsRequests";

const Add = (addProps: AddProps) => {
  const [workloadData, setWorkloadData] = useState<WorkloadData>({
    TargetWorkloadId: "",
    Team: "",
    Routing: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const target = event.target as HTMLButtonElement;
    if (target) {
      setWorkloadData((prevData) => ({
        ...prevData,
        [target.name]: target.value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postWorkload(workloadData).then((response) => {
      if (response) {
        addProps.setOpen(false);
        window.location.reload();
      }
    });
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => addProps.setOpen(false)}>
          X
        </span>
        <h1>Add new Workload</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Target Workload Id</label>
            <input
              type="text"
              name="TargetWorkloadId"
              placeholder="Target Workload Id"
              value={workloadData.TargetWorkloadId}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Team</label>
            <input
              type="text"
              name="Team"
              placeholder="Team"
              value={workloadData.Team}
              onChange={handleInputChange}
            />
          </div>
          <div className="item">
            <label>Routing</label>
            <input
              type="text"
              name="Routing"
              placeholder="Routing"
              value={workloadData.Routing}
              onChange={handleInputChange}
            />
          </div>
          {/* {addProps.columns
            .filter((item) => item.field !== "_id")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  name={column.field}
                  onChange={handleInputChange}
                  value={workloadData[`${column.field}`]}
                />
              </div>
            ))} */}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
