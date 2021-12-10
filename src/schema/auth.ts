import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const passwordRegex: any =
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";

export const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Firstname is required"),
  lastname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Lastname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .trim()
    .matches(passwordRegex, "Password not strong enough")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("You need to confirm your password"),
});
