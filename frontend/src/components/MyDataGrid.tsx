import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ObjectId } from "mongoose";
import { Button } from "@mui/material";

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
      headerName: "Data",
      width: 200,
      headerClassName: headerClassName,
    },
    {
      field: "quantidade",
      headerName: "Quantidade (kg)",
      width: 200,
      headerClassName: headerClassName,
    },
    {
      field: "dinheiro",
      headerName: "Dinheiro (R$)",
      width: 200,
      headerClassName: headerClassName,
    },
    {
      field: "editar",
      headerName: "Editar",
      width: 200,
      headerClassName: headerClassName,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              // Implemente a lógica de exclusão aqui
              //params.row.quantidade
              console.log("Editando parametros...");
              console.log(params.row.data);
              console.log(params.row.quantidade);
              console.log(params.row._id);
            }}
          >
            Editar
          </Button>
        </strong>
      ),
    },
    {
      field: "deletar",
      headerName: "Deletar",
      width: 200,
      headerClassName: headerClassName,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              console.log("Deletando parametros...");
              console.log(params.row.data);
              console.log(params.row.quantidade);
              console.log(params.row._id);
            }}
          >
            Deletar
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
      ></DataGrid>
    </>
  );
};
