import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ObjectId } from "mongoose";
import { Button, Container } from "@mui/material";
import { InputNumber, Modal } from "antd";
import { useState } from "react";
import { ValueMaxDatePicker } from "./ValueMaxDatePicker";
import { patchGastos, deleteGastos } from "@/services/Api";

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

export const MyDataGrid = ({
  rows: initialRows,
  headerClassName,
}: MyDataGridProps) => {
  const [rows, setRows] = useState(initialRows);

  // Setup table params
  const [currentParams, setCurrentParams] = useState({
    data: "",
    quantidade: 0,
    dinheiro: 0,
    _id: "",
  });

  // Setup modais de edição e exclusão
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const hideModalEditar = () => {
    setModalEditar(false);
  };
  const showModalEditar = () => {
    setModalEditar(true);
  };

  const hideModalDeletar = () => {
    setModalDeletar(false);
  };
  const showModalDeletar = () => {
    setModalDeletar(true);
  };

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
              setCurrentParams({
                data: params.row.data,
                quantidade: params.row.quantidade,
                dinheiro: params.row.dinheiro,
                _id: params.row._id.toString(),
              });
              console.log("Editando parametros...");
              showModalEditar();
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
              setCurrentParams({
                data: params.row.data,
                quantidade: params.row.quantidade,
                dinheiro: params.row.dinheiro,
                _id: params.row._id.toString(),
              });
              console.log("Deletando parametros...");
              console.log(currentParams);
              showModalDeletar();
            }}
          >
            Deletar
          </Button>
        </strong>
      ),
    },
  ];

  const handleEditarEntrada = function () {
    console.log("Editando entrada...");
    patchGastos(currentParams);
    hideModalEditar();

    const updatedRows = rows.map((row) => {
      if (row._id.toString() === currentParams._id) {
        return {
          ...row,
          data: currentParams.data,
          quantidade: currentParams.quantidade,
          dinheiro: currentParams.dinheiro,
        };
      } else {
        return row;
      }
    });

    setRows(updatedRows);
  };

  const handleDeletarEntrada = function () {
    console.log("Deletando entrada...");
    deleteGastos(currentParams);
    hideModalDeletar();
  };

  // }

  return (
    <Container>
      <DataGrid
        rows={initialRows}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
      ></DataGrid>
      <Modal
        title="Editar entrada?"
        open={modalEditar}
        onCancel={hideModalEditar}
        onOk={handleEditarEntrada}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            // justifyContent: "center",
          }}
        >
          <div>
            <h3>Data:</h3>
            <ValueMaxDatePicker
              value={currentParams.data}
              onChange={(value) => {
                if (typeof value === "string")
                  setCurrentParams({ ...currentParams, data: value });
              }}
            />
          </div>
          <div>
            <h3>Quantidade:</h3>
            <InputNumber
              size="large"
              value={currentParams.quantidade}
              onChange={(value) => {
                if (typeof value === "number")
                  setCurrentParams({ ...currentParams, quantidade: value });
              }}
            />
          </div>
          <div>
            <h3>Valor gasto:</h3>
            <InputNumber
              size="large"
              value={currentParams.dinheiro}
              onChange={(value) => {
                if (typeof value === "number")
                  setCurrentParams({ ...currentParams, dinheiro: value });
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        title="Deletar entrada?"
        open={modalDeletar}
        onCancel={hideModalDeletar}
        onOk={handleDeletarEntrada}
      >
        <div style={{ alignContent: "center", alignItems: "center" }}>
          <h2>
            Tem certeza que deseja deletar a entrada de {currentParams.data}?
          </h2>
        </div>
      </Modal>
    </Container>
  );
};
