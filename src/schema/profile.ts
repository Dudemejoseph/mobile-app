import * as Yup from "yup";

export const EditProfileSchema = Yup.object().shape({
  firstname: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Firstname is required"),
  lastname: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Lastname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().min(11, "Phone number invalid").required("Phone number is required"),
  address: Yup.string().min(3, "Too Short!"),
});
