import * as yup from "yup";

export const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters with an uppercase, a lowercase, a digit, and a special character"
      ),
  })
  .required();

export const signSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
  })
  .required();

export const addPostSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .max(30, "Title must be at most 30 characters"),

  body: yup
    .string()
    .required("Body is required")
    .min(10, "Body must be at least 10 characters"),
});
