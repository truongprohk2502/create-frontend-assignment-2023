"use client";

import { useState } from "react";
import ProtectedRoute from "@/contexts/auth/ProtectedRoute";
import styles from "./page.module.css";
import { useFormik } from "formik";
import Input from "@/components/Input";
import Button from "@/components/Button";
import RegistrationSchema, {
  IRegistrationSchema,
} from "@/validations/Registration.schema";
import axiosRequest from "@/utils/axiosRequest";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export default function RegistrationPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik<IRegistrationSchema>({
    enableReinitialize: true,
    initialValues: {
      name: "",
      password: "",
      confirmPassword: "",
      phone: "",
      email: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values) => {
      try {
        setIsSuccess(false);
        setLoading(true);

        const data = await axiosRequest({
          url: "/api/create",
          method: "post",
          data: values,
        });

        if (data.success === true) {
          setIsSuccess(true);
          setErrorDetails("");
          resetForm();
        }
      } catch (err: any) {
        setErrorDetails(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.mainTitle}>Register Form</div>
        {errorDetails && <div className={styles.mainError}>{errorDetails}</div>}
        {isSuccess && (
          <div className={styles.mainSuccess}>
            User registration successfully.
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            error={touched.password ? errors.password : ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter your password again"
            value={values.confirmPassword}
            error={touched.confirmPassword ? errors.confirmPassword : ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="text"
            label="Phone number"
            name="phone"
            placeholder="Enter your phone number"
            value={values.phone}
            error={touched.phone ? errors.phone : ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="email"
            label="Email address"
            name="email"
            placeholder="Enter your email address"
            value={values.email}
            error={touched.email ? errors.email : ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            type="submit"
            className={styles.submitButton}
            loading={loading}
          >
            Register
          </Button>
        </form>
        <div className={styles.returnLink}>
          <Link href={ROUTES.MANAGE_USERS}>Return to users page</Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
