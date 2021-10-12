import * as Yup from "yup";

export const ActivitiesSchema = Yup.object().shape({
  farm_id: Yup.number().required("Please select a farm"),
  type: Yup.string().required("Please select a transaction type"),
  activity: Yup.string().required("Please enter purpose of transaction"),
  amount: Yup.number()
    .min(0.1, "Please enter an amount")
    .required("Amount is required"),
  note: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long! Max of 250 characters")
    .required("Please provide a brief description about this transaction"),
});
