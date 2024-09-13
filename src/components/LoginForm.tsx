import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./ui/Button";
import { loginInputs } from "../data";
import { loginSchema } from "../validation";
import { useDispatch } from "react-redux";
import { TDispatch } from "../redux/store";
import { userLogin } from "../redux/userSlice";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { Link } from "react-router-dom";

interface IFormInput {
  username: string;
  password: string;
}

export default function LoginForm() {
  const dispatch: TDispatch = useDispatch();
  const currentLanguage = i18n.language;
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    dispatch(userLogin(data)); // Dispatch the login action
  };

  const formInputsList = loginInputs.map((input) => {
    return (
      <Input
        key={input.name}
        label={t(input.lable)} // Fixed the typo here
        {...register(input.name as keyof IFormInput)}
        errormsg={errors[input.name as keyof IFormInput]?.message}
      />
    );
  });

  return (
    <>
      <form
        className="container mx-auto p-2 md:w-1/2 mt-10 grow flex flex-col justify-center"
        style={{ direction: currentLanguage === "en" ? "ltr" : "rtl" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {formInputsList}
        <Button />
        <Link
          className="text-sky-500 hover:text-sky-700"
          style={{ whiteSpace: "nowrap" }}
          to="/signup"
        >
          {t("signup")}
        </Link>
      </form>
    </>
  );
}
