import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TState } from "../../redux/store";
import { closeLoginAlert } from "../../redux/userSlice";

interface IProps {
  msg: string;
}

export default function Alert({ msg }: IProps) {
  const open = useSelector((state: TState) => state.user.openLoginAlert);
  const dispatch: TDispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeLoginAlert());
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={msg}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </div>
  );
}
