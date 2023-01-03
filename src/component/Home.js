import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadAllUser();
  }, []);

  const loadAllUser = async () => {
    await axios
      .get("http://localhost:5000/user/get")
      .then((res) => {
        setAllUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error-->", err);
      });
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    if (id) {
      navigate(`/addedit/${id}`);
    } else {
      navigate("/addedit/");
    }
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/user/delete/${id}`)
      .then((res) => {
        console.log("delete successful");
        alert("delete successful");
        loadAllUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="adduser">
        <a href="/adduser" onClick={handleClick}>
          <button className="button">Add User</button>
        </a>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>mobile</th>
            <th>address1</th>
            <th>address2</th>
            <th>country</th>
            <th>state</th>
            <th>city</th>
            <th>zipcode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((val, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.email}</td>
                <td>
                  +{val.countryCode} {val.mobile}
                </td>
                <td>{val.address1}</td>
                <td>{val.address2}</td>
                <td>{val.country}</td>
                <td>{val.state}</td>
                <td>{val.city}</td>
                <td>{val.zipcode}</td>
                <td>
                  <a
                    href={`/addedit/${val.id}`}
                    onClick={(e) => handleClick(e, val.id)}
                  >
                    <Button>Edit</Button>
                  </a>
                  <Button
                    className="btn-danger"
                    onClick={(e) => deleteUser(val.id)}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
