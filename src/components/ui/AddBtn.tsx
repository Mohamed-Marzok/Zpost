import { Fab } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import BasicModal from "./BasicModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TDispatch } from "../../redux/store";
import { addPostInputs } from "../../data";
import Input from "../ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { addPostSchema } from "../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPost } from "../../redux/postSlice";
export default function AddBtn() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const dispatch: TDispatch = useDispatch();
  interface IFormInput {
    title: string;
    body: string;
    image?: FileList;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(addPostSchema) });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    dispatch(addPost(data));
    setOpenAddModal(false);
  };
  // Handler for opening modal
  const handleAddBtn = () => {
    setOpenAddModal(true);
  };

  return (
    <div>
      <Fab
        onClick={handleAddBtn}
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: "20px", bottom: "20px" }}
      >
        <IoMdAdd />
      </Fab>

      <BasicModal open={openAddModal} setOpen={setOpenAddModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            {addPostInputs.map((input) => (
              <Input
                key={input.lable}
                label={input.lable}
                errormsg={errors[input.name]?.message}
                {...register(input.name)}
                type={input.type}
              />
            ))}
          </>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200"
              onClick={() => setOpenAddModal(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-all duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </BasicModal>
    </div>
  );
}
