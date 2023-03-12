import * as Yup from "yup";
import type { Asserts } from "yup";
import "yup-phone-lite";
import YupPassword from "yup-password";
YupPassword(Yup);

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(1000, "Name must be less than or equal 1000 characters long.")
    .required("Please enter name."),
  password: Yup.string()
    .minNumbers(1, "Password should have at least 1 number.")
    .minSymbols(1, "Password should have at least 1 special character.")
    .min(8, "Password must be at least 8 characters long.")
    .required("Please enter password."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match.")
    .required("Please confirm password."),
  phone: Yup.string()
    .phone("VN", "Please enter Vietnamese phone number.")
    .required("Please enter phone number."),
  email: Yup.string()
    .email("Please enter valid email address.")
    .required("Please enter email address."),
});

interface IRegistrationSchema extends Asserts<typeof RegistrationSchema> {}

export type { IRegistrationSchema };
export default RegistrationSchema;
