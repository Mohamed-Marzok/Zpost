import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";
import i18n from "../../i18n";
interface IProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ children, setOpen, open }: IProps) {
  const handleClose = () => setOpen(false);
  const currentLanguage = i18n.language;

  return (
    <div>
      <Modal
        sx={{ direction: currentLanguage === "en" ? "ltr" : "rtl" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="dark:bg-gray-700">
          {children}
        </Box>
      </Modal>
    </div>
  );
}
