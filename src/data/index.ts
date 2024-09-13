import {
  IAddPostInput,
  IEditPostInput,
  ILoginInput,
  ISignupInput,
} from "../interfaces";

export const loginInputs: ILoginInput[] = [
  {
    lable: "email",
    name: "username",
  },
  {
    lable: "password",
    name: "password",
  },
];

export const signupInputs: ISignupInput[] = [
  {
    lable: "First Name",
    name: "firstname",
    type: "text",
  },
  {
    lable: "Last Name",
    name: "lastname",
    type: "text",
  },
  {
    lable: "email",
    name: "email",
    type: "email",
  },
  {
    lable: "image",
    name: "image",
    type: "file",
  },
  {
    lable: "password",
    name: "password",
    type: "password",
  },
  {
    lable: "Confirm Password",
    name: "confirmPassword",
    type: "password",
  },
];
export const addPostInputs: IAddPostInput[] = [
  {
    lable: "title",
    name: "title",
    type: "text",
  },
  {
    lable: "body",
    name: "body",
    type: "text",
  },
  {
    lable: "image",
    name: "image",
    type: "file",
  },
];
export const editPostInputs: IEditPostInput[] = [
  {
    lable: "title",
    name: "title",
  },
  {
    lable: "body",
    name: "body",
  },
];
