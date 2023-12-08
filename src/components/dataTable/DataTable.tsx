import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import { DataTableProps } from "../../types/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteWorkload } from "../../utils/workloadsRequests";

const DataTable = (dataTableProps: DataTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectedWorkload, setSelectedWorkload] = useState("");

  const handleOk = () => {
    deleteWorkload(selectedWorkload)
      .then(() => {
        setOpen(false);
      })
      .catch((e) => console.log(e));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (targetWorkloadId: string) => {
    setSelectedWorkload(targetWorkloadId);
    setOpen(true);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 80,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${dataTableProps.slug}/${params.row.TargetWorkloadId}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div
            className="delete"
            onClick={() => handleDelete(params.row.TargetWorkloadId)}
          >
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  const getRowId = (row: any) => {
    return row._id;
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={dataTableProps.rows}
        getRowId={getRowId}
        columns={[...dataTableProps.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to Delete the {selectedWorkload} entry? This is a
            non-reversible action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
