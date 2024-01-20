import { Modal } from "../../components/Modal";

interface IDeleteTrainProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

export const DeleteTrain = ({
  open,
  handleClose,
  handleSubmit
}: IDeleteTrainProps) => {
  return (
    <Modal
      open={open}
      submitText="Yes"
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    >
      <>Do you really want to delete this train from schedule?</>
    </Modal>
  );
};
