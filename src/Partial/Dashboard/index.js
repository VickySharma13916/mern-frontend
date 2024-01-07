import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import CardComponent from "../../Component/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import ShimmerCard from "../../Component/ShimmerCard";
const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/notes`
      );
      if (response.status === 200) {
        setData(response?.data);
        setIsLogin(false);
        enqueueSnackbar("Notes Fetch Successfully", { variant: "success" });
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Container fluid>
        <Row className="w-100 py-3">
          <Col xs={12} className=" d-flex justify-content-end">
            <Button
              variant="primary"
              className="d-flex justify-content-between"
            >
              <Link
                to={"/AddNotes"}
                className="text-white justify-content-between d-flex align-items-center gap-1"
              >
                <IoMdAddCircle size={20} />
                <span className="ps-1">Add Notes</span>
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row xs={1} md={2} lg={3} xl={4} className="gap-4">
          {isLogin ? (
            <>
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
            </>
          ) : (
            data &&
            data?.map((item) => {
              return (
                <CardComponent
                  data={item}
                  fetchData={fetchData}
                  key={item?._id}
                />
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
