import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import * as yup from "yup";
const AddNotesRule = yupResolver(
  yup
    .object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
    })
    .required()
);
const AddNotes = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: AddNotesRule,
    defaultValues: {
        title: "",
      description: "",
    },
  });
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const onSubmit = async (data) => {
    setIsLogin(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/notes`,
        data
      );
      if (response.status === 200) {
        setIsLogin(false);
        enqueueSnackbar("Add Notes Successfully", { variant: "success" });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.error, { variant: "error" });
      } else {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
      setIsLogin(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-100 main_page py-5">
      <Card
        border="light"
        className="w-100 mx-auto pt-3 pb-4 px-4"
        style={{ maxWidth: 400 }}
      >
        <Card.Header className="d-flex align-items-center gap-2">
          <FaArrowLeft size={20} onClick={() => handleGoBack()} />
          Add Notes
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={12}>
                <Form.Group
                  className="mb-4 position-relative"
                  controlId="formBasicTitle"
                >
                  <input
                    type="text"
                    label={"Enter title"}
                    {...register("title")}
                  />
                  <label>Enter Title</label>
                  {errors.title && (
                    <span className="input-error">{errors.title.message}</span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group
                  className="mb-4 position-relative"
                  controlId="formBasicDescription"
                >
                  <input
                    type="text"
                    label={"Enter Description"}
                    {...register("description")}
                  />
                  <label>Enter Description</label>
                  {errors.description && (
                    <span className="input-error">
                      {errors.description.message}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 primary mt-3"
                  disabled={isLogin}
                >
                  {!isLogin && <span>Add</span>}
                  {isLogin && <Spinner animation="border" />}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddNotes;
