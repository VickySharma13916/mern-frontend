import axios from "axios";
import { useSnackbar } from "notistack";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const CardComponent = ({ data, fetchData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/notes/${id}`
      );
      if (response.status === 200) {
        enqueueSnackbar("Notes Delete Successfully", { variant: "success" });
        fetchData();
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error?.response?.data?.error, { variant: "error" });
      } else {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    }
  };
  return (
    <Card
      border="light"
      className="w-100 mx-auto pt-3 pb-4 px-4"
      style={{ maxWidth: 280 }}
    >
      <Card.Body className="d-flex justify-content-between flex-column">
        <Card.Title>
          <Link
            to={`/ViewNotes/${data?._id}`}
            state={{ item: data }} // Set the data in the state
            className="text-dark text-truncate"
          >
            {data?.title?.slice(0, 25)}
          </Link>
        </Card.Title>
        <Card.Text className="">{data?.description?.slice(0, 150)}</Card.Text>
        <div className="d-flex w-100 justify-content-between">
          <Button variant="primary" className="d-flex justify-content-between">
            <Link
              to={`/EditNotes/${data?._id}`}
              state={{ item: data }} // Set the data in the state
              className="text-white d-flex justify-content-center align-items-center gap-1"
            >
              <FaEdit size={20} /> Edit
            </Link>
          </Button>
          <Button
            variant="danger"
            className="justify-content-between d-flex align-items-center gap-1"
            onClick={() => handleDelete(data?._id)}
          >
            <MdDelete size={20} /> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
