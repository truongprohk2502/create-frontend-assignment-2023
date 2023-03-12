"use client";

import Input from "@/components/Input";
import styles from "./page.module.css";
import LoginSchema, { ILoginSchema } from "@/validations/Login.schema";
import { useFormik } from "formik";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { useEffect } from "react";

export default function LoginPage() {
  const { errorDetails, loading, login } = useAuth();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    values,
    errors,
    touched,
  } = useFormik<ILoginSchema>({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: login,
  });

  useEffect(() => {
    if (errorDetails) {
      setFieldValue("password", "");
      setFieldTouched("password", false);
    }
  }, [errorDetails]);

  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>Login Form</div>
      {errorDetails && <div className={styles.mainError}>{errorDetails}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Username"
          name="username"
          placeholder="Enter your username"
          value={values.username}
          error={touched.username ? errors.username : ""}
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
        <Button type="submit" className={styles.submitButton} loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
}
