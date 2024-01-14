import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import PasswordInput from "../../Component/passwordInput";

const loginRules = yupResolver(
  yup
    .object({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required()
);

const Login = ({ SetIsUserLogin }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: loginRules,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    // Check if the token is available in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Redirect to the dashboard or any other route
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const onSubmit = async (data) => {
    setIsLogin(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        data
      );
      setIsLogin(false);
      enqueueSnackbar("Login Successfully", { variant: "success" });
      const token = response?.data?.token;
      // Store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", response?.data?.user?.name);
      SetIsUserLogin(true);
      navigate("/dashboard");
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
    <div className="w-100 main_page py-5">
      <Card
        border="light"
        className="w-100 mx-auto pt-3 pb-4 px-4"
        style={{ maxWidth: 400 }}
      >
        <Card.Header>Sign in</Card.Header>
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
                <PasswordInput
                  type="password"
                  label="Enter Password"
                  register={register("password")}
                  errors={errors.password}
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
                  {!isLogin && <span>Sign In</span>}
                  {isLogin && <Spinner animation="border" />}
                </Button>
                <p className="mt-3 text-center">
                  Don't have an account?{" "}
                  <Link to="/register" className="fw-bold font-color">
                    Sign Up
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

export default Login;
