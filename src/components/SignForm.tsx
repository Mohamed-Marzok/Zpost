import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./ui/Button";
import { signupInputs } from "../data";
import { signSchema } from "../validation";
import { useDispatch } from "react-redux";
import { TDispatch } from "../redux/store";
import { userSignup } from "../redux/userSlice";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  image?: FileList;
}

export default function SignForm() {
  const dispatch: TDispatch = useDispatch();
  const currentLanguage = i18n.language;
  const { t } = useTranslation();
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
      image: data.image,
    };
    console.log(userData);
    dispatch(userSignup(userData));
  };

  const formInputsList = signupInputs.map((input) => {
    return (
      <Input
        key={input.name}
        label={t(input.lable)}
        type={input.type}
        {...register(input.name as keyof IFormInput)}
        errormsg={errors[input.name]?.message}
      />
    );
  });

  return (
    <form
      style={{ direction: currentLanguage === "en" ? "ltr" : "rtl" }}
      className="container mx-auto p-2 md:w-1/2 mt-10 grow flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formInputsList}
      <Button />
    </form>
  );
}
