import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Row {
  id: number;
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
      headerName: "Data",
      width: 150,
      headerClassName: headerClassName,
    },
    {
      field: "quantidade",
      headerName: "Quantidade",
      width: 150,
      headerClassName: headerClassName,
    },
    {
      field: "dinheiro",
      headerName: "Dinheiro",
      width: 150,
      headerClassName: headerClassName,
    },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
      ></DataGrid>
    </>
  );
};
