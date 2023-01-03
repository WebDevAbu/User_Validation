import * as Yup from "yup";

export const userSchema = Yup.object({
  firstName: Yup.string()
    .min(2)
    .max(15)
    .required("Please enter your firstname"),
  lastName: Yup.string().min(2).max(15).required("Please enter your lastname"),
  email: Yup.string().email().required("Please enter your email"),
  countryCode: Yup.string().required("select country code"),
  mobile: Yup.number().min(10).required("enter mobile number"),
  address1: Yup.string().required("enter address"),
  address2: Yup.string(),
  country: Yup.string().required("select country"),
  state: Yup.string().required("select state"),
  zipcode: Yup.string().min(5).required("enter zipcode"),
});
