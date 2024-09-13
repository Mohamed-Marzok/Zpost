import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { HiDotsVertical } from "react-icons/hi";
import Input from "./ui/Input";
import { IconButton } from "@mui/material";
import BasicModal from "./ui/BasicModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TDispatch } from "../redux/store";
import { deletePost, editPost } from "../redux/postSlice";
import { editPostInputs } from "../data";

import { useForm, SubmitHandler } from "react-hook-form";
import { addPostSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

interface IFormInput {
  title: string;
  body: string;
}

interface IProps {
  anchorRef: React.RefObject<HTMLButtonElement>;
  open: boolean;
  handleToggle: () => void;
  handleClose: (event: Event | React.SyntheticEvent) => void;
  handleListKeyDown: (event: React.KeyboardEvent) => void;
  postId: number;
}
export default function PostEditDeleteBtn({
  anchorRef,
  open,
  handleToggle,
  handleClose,
  handleListKeyDown,
  postId,
}: IProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const dispatch: TDispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addPostSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setOpenDeleteModal(false);
    dispatch(editPost({ postData: data, postId }));
  };
  //   handler
  const handleDeleteBtn = (e: Event | React.SyntheticEvent) => {
    setOpenDeleteModal(true);
    handleClose(e);
  };
  const handleEditBtn = (e: Event | React.SyntheticEvent) => {
    setOpenEditModal(true);
    handleClose(e);
  };
  const handleDeletePost = () => {
    dispatch(deletePost(postId));
    setOpenDeleteModal(false);
  };

  return (
    <div>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{ position: "absolute", top: 0, right: 0 }}
        color="info"
      >
        <HiDotsVertical />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={(e) => handleEditBtn(e)}>Edit</MenuItem>
                  <MenuItem onClick={(e) => handleDeleteBtn(e)}>
                    Delete
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* delete modal */}
      <BasicModal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <p className="mb-5 text-lg font-semibold text-red-800 dark:text-red-500">
          {t("Are you sure you want to delete the post?")}
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200"
            onClick={() => setOpenDeleteModal(false)}
          >
            {t("Close")}
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
            onClick={handleDeletePost}
          >
            {t("delete")}
          </button>
        </div>
      </BasicModal>
      {/* edit modal */}
      <BasicModal open={openEditModal} setOpen={setOpenEditModal}>
        <p className="mb-5 text-lg font-semibold text-sky-800 dark:text-sky-500">
          {t("Edit The Post")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {editPostInputs.map((input) => {
            return (
              <Input
                label={t(input.lable)}
                errormsg={errors[input.name]?.message}
                {...register(input.name)}
              />
            );
          })}
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200"
              onClick={() => setOpenEditModal(false)}
            >
              {t("Close")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-all duration-200"
            >
              {t("edit")}
            </button>
          </div>
        </form>
      </BasicModal>
    </div>
  );
}
