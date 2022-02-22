import * as Yup from "yup";

export const AddFinanceSchema = Yup.object().shape({
  farm_id: Yup.number().required("Please select a farm"),
  type: Yup.string().required("Please select a transaction type"),
  activity: Yup.string().required("Please enter purpose of transaction"),
  amount: Yup.number().min(0.1, "Please enter an amount").required("Amount is required"),
  note: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long! Max of 250 characters")
    .required("Please provide a brief description about this transaction"),
});

export const AddFarmExpenseSchema = Yup.object().shape({
  farm_id: Yup.number().integer("Pleaase select a farm o").required("Please select a farm"),
  farm_activity_id: Yup.number().required("Please select an activity"),
  quantity: Yup.number().integer("Invalid quantity").nullable(),
  unit_price: Yup.number().integer("Invalid price").nullable(),
  balance_to_be_paid: Yup.number().integer("Invalid price").required("Balance to be paid is required"),
  date: Yup.string().required("Please select date"),
  type: Yup.string(),
  brand: Yup.string().required("Please enter brand"),
  category_id: Yup.number().nullable(),
});
