import React from "react";
import { Card } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const ViewNotes = () => {
  const location = useLocation();
  const data = location?.state?.item;
  const navigate = useNavigate();
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
          View Notes
        </Card.Header>
        <Card.Body>
          <Card.Title>{data?.title}</Card.Title>
          <Card.Text>{data?.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewNotes;
