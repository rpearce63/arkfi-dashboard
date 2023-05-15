import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Typography } from "@mui/material";
import RewardsTimer from "./RewardsTimer";
// import { data } from "./makeData";

const Example = ({ data }) => {
  const columns = useMemo(
    () => [
      //column definitions...
      {
        accessorKey: "account",
        header: "Account",
        enableEditing: false,
        Cell: ({ cell }) => cell.getValue().slice(-5),
      },
      {
        accessorKey: "label",
        header: "Label",
        enableEditing: true,
      },
      {
        accessorKey: "lastAction",
        header: "Timer",
        enableEditing: false,
        Cell: ({ cell }) => <RewardsTimer toDate={cell.getValue()} />,
      },
      {
        accessorKey: "principalBalance",
        header: "Balance",
        enableEditing: false,
        Cell: ({ cell }) => Number(cell.getValue()).toFixed(2),
      },
      {
        accessorKey: "walletBalance",
        header: "Wallet Balance",
        enableEditing: false,
        Cell: ({ cell }) => Number(cell.getValue()).toFixed(2),
      },
      {
        accessorKey: "bnbBalance",
        header: "BNB",
        enableEditing: false,
        Cell: ({ cell }) => Number(cell.getValue()).toFixed(2),
      },
      {
        accessorKey: "busdBalance",
        header: "BUSD",
        enableEditing: false,
        Cell: ({ cell }) => Number(cell.getValue()).toFixed(2),
      },
      {
        accessorKey: "availableRewards",
        header: "Rewards",
        enableEditing: false,
        Cell: ({ cell }) => Number(cell.getValue()).toFixed(2),
      },
      {
        accessorKey: "maxCwr",
        header: "CWR",
        enableEditing: false,
        Cell: ({ cell }) => Number(cell.getValue()),
      },

      //end
    ],
    []
  );

  const [tableData, setTableData] = useState(data);
  useEffect(() => setTableData(data), [data]);

  const handleSaveCell = (cell, value) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    tableData[cell.row.index][cell.column.id] = value;
    //send/receive api updates here
    setTableData([...tableData]); //re-render with new data
    localStorage.setItem("arkFiAccountsData", JSON.stringify(tableData));
  };

  return (
    <MaterialReactTable
      columns={columns}
      defaultColumn={{
        minSize: 20,
        maxSize: 80,
        size: 30,
      }}
      data={tableData}
      editingMode="cell"
      enableEditing
      muiTableBodyCellEditTextFieldProps={({ cell }) => ({
        //onBlur is more efficient, but could use onChange instead
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
      })}
      renderBottomToolbarCustomActions={() => (
        <Typography sx={{ fontStyle: "italic", p: "0 1rem" }} variant="body2">
          Double-Click Label Cell to Edit
        </Typography>
      )}
    />
  );
};

export default Example;
