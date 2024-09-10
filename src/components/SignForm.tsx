import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./ui/Button";
import { signupInputs } from "../data";
import { signSchema } from "../validation";
import { useDispatch } from "react-redux";
import { TDispatch } from "../redux/store";
import { userSignup } from "../redux/UserSlice";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

export default function SignForm() {
  const dispatch: TDispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(signSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const userData = {
      username: data.firstname + data.lastname,
      password: data.password,
      name: data.firstname,
      email: data.email,
    };
    console.log(userData);
    dispatch(userSignup(userData));
  };

  const formInputsList = signupInputs.map((input) => {
    return (
      <Input
        key={input.name}
        label={input.lable}
        {...register(input.name as keyof IFormInput)}
        errormsg={errors[input.name]?.message}
      />
    );
  });

  return (
    <form
      className="container mx-auto p-2 md:w-1/2 mt-10 grow flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formInputsList}
      <Button />
    </form>
  );
}
