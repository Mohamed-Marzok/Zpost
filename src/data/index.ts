import { IAddPostInput, ILoginInput, ISignupInput } from "../interfaces";

export const loginInputs: ILoginInput[] = [
  {
    lable: "Email",
    name: "username",
  },
  {
    lable: "Password",
    name: "password",
  },
];

export const signupInputs: ISignupInput[] = [
  {
    lable: "First Name",
    name: "firstname",
  },
  {
    lable: "Last Name",
    name: "lastname",
  },
  {
    lable: "Email",
    name: "email",
  },
  {
    lable: "Password",
    name: "password",
  },
  {
    lable: "confirm Password",
    name: "confirmPassword",
  },
];
export const addPostInputs: IAddPostInput[] = [
  {
    lable: "Title",
    name: "title",
    type: "text",
  },
  {
    lable: "Body",
    name: "body",
    type: "text",
  },
  {
    lable: "Image",
    name: "image",
    type: "file",
  },
];
