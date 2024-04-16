import { Modal } from "antd";

interface EditarValoresModalProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const EditarValoresModal = function (
  EditarValoresModalProps: EditarValoresModalProps
) {
  return (
    <Modal
      title={EditarValoresModalProps.title}
      visible={EditarValoresModalProps.open}
      onCancel={EditarValoresModalProps.onCancel}
      onOk={EditarValoresModalProps.onOk}
    >
      <p>Editar valores</p>
    </Modal>
  );
};

export default EditarValoresModal;
