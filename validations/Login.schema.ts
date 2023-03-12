import * as Yup from "yup";
import type { Asserts } from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Please enter username."),
  password: Yup.string().required("Please enter password."),
});

interface ILoginSchema extends Asserts<typeof LoginSchema> {}

export type { ILoginSchema };
export default LoginSchema;
