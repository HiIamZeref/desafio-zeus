import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ObjectId } from "mongoose";

interface Row {
  _id: ObjectId;
  data: string;
  quantidade: number;
  dinheiro: number;
}

interface MyDataGridProps {
  rows: Row[];
  headerClassName: string;
}

export const MyDataGrid = ({ rows, headerClassName }: MyDataGridProps) => {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "data",
      headerName: "Data (YYYY-MM-DD)",
      width: 200,
      headerClassName: headerClassName,
    },
    {
      field: "quantidade",
      headerName: "Quantidade (Kg)",
      width: 200,
      headerClassName: headerClassName,
    },
    {
      field: "dinheiro",
      headerName: "Dinheiro (R$)",
      width: 200,
      headerClassName: headerClassName,
    },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        // style={{ width: "100%" }}
      ></DataGrid>
    </>
  );
};
