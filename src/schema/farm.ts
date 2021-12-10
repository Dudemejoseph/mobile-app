import * as Yup from "yup";

export const CreateFarmSchema = Yup.object().shape({
  country_id: Yup.number().required("Please select a country"),
  state_id: Yup.number().required("Please select a state"),
  name: Yup.string().required("Please enter name of farm"),
  size: Yup.number().required("Please enter size of farm"),
  ownership: Yup.string().required("Please select type of ownership"),
  location: Yup.string().required("Please enter location of farm"),
  location_type: Yup.string().required("Please select location type of farm"),
});
