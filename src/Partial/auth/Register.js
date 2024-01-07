import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import PasswordInput from "../../Component/passwordInput";

const signUpRules = yupResolver(
  yup.object({
    email: yup.string().email().required("Email is required"),
    name: yup.string().required("Name is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
);

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: signUpRules,
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const onSubmit = async (data) => {
    setIsLogin(true);
    const newData = {
      email: data?.email,
      name: data?.name,
      password: data?.password,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/sign-up`,
        newData
      );
      setIsLogin(false);
      enqueueSnackbar("Sign Up Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.error, { variant: "error" });
      } else {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
      setIsLogin(false);
    }
  };

  return (
    <div className="w-100 vh-100 main_page py-5">
      <Card
        border="light"
        className="w-100 mx-auto pt-3 px-4"
        style={{ maxWidth: 400 }}
      >
        <Card.Header>Create An Account</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12}>
                <Form.Group
                  className="mb-4 position-relative"
                  controlId="formBasicEmail"
                >
                  <input
                    type="text"
                    label={"Enter Email Address"}
                    {...register("email")}
                  />
                  <label>Email address</label>
                  {errors.email && (
                    <span className="input-error">{errors.email.message}</span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group
                  className="mb-4 position-relative"
                  controlId="formBasicName"
                >
                  <input
                    type="text"
                    label={"Enter Name"}
                    {...register("name")}
                  />
                  <label>User Name</label>
                  {errors.email && (
                    <span className="input-error">{errors.name.message}</span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <PasswordInput
                  type="password"
                  label="Enter Password"
                  register={register("password")}
                  errors={errors.password}
                />
              </Col>
              <Col xs={12}>
                <PasswordInput
                  type="password"
                  label="Confirm Password"
                  register={register("confirmPassword")}
                  errors={errors.confirmPassword}
                />
              </Col>
              <Col xs={12}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 primary mt-3"
                  disabled={isLogin}
                >
                  {!isLogin && <span>Sign Up</span>}
                  {isLogin && <Spinner animation="border" />}
                </Button>
                <p className="mt-3 text-center">
                  Already an account?{" "}
                  <Link to="/" className="fw-bold font-color">
                    Login
                  </Link>
                </p>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
