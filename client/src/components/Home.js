import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  console.log(data);

  const getUserData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 401 || !res.data) {
      console.log("error");
    } else {
      setData(res.data.getUser);
    }
  };

  const dltUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 401 || !res.data) {
      console.log("error");
    } else {
      console.log("User Deleted");
      setShow(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, [dltUser]);

  return (
    <>
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          User Deleted Successfully!!
        </Alert>
      ) : (
        ""
      )}
      <div className="container mt-2">
        <h1 className="text-center mt-2">MERN Image Upload Project</h1>
        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add User
            </NavLink>
          </Button>
        </div>

        <div className="row d-flex justify-content-between align-items-center mt-5">
          {data.length > 0
            ? data.map((el, i) => {
                return (
                  <>
                    <Card
                      style={{ width: "20rem", height: "22rem" }}
                      className="mb-3"
                    >
                      <Card.Img
                        variant="top"
                        style={{
                          width: "250px",
                          height: "55%",
                          textAlign: "center",
                          margin: "auto",
                          marginLeft: "25px",
                        }}
                        src={`/uploads/${el.imgpath}`}
                        className="mt-2"
                      />
                      <Card.Body className="text-center">
                        <Card.Title>User Name: {el.fname}</Card.Title>
                        <Card.Title>
                          Date Added :{moment(el.date).format("L")}
                        </Card.Title>
                        <Button
                          variant="danger"
                          className="col-lg-6 text-center"
                          onClick={() => dltUser(el._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Home;
