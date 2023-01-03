import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userSchema } from "./schema";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  mobile: "",
  address1: "",
  address2: "",
  country: "",
  state: "",
  city: "",
  zipcode: 0,
};

const AddEdit = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [countryCode, setCountryCode] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCountry();
    if (params.id > 0) {
      setValueForEdit();
    }
    clearData();
  }, []);

  const setValueForEdit = () => {
    axios
      .get(`http://localhost:5000/user/get/${params.id}`)
      .then((res) => {
        const data = res.data[0];
        console.log("res.data", data);
        reloadData(data);
      })
      .catch((err) => {
        console.log("axios error-->", err);
      });
  };

  const reloadData = (data) => {
    values.firstName = data.firstName;
    values.lastName = data.lastName;
    values.email = data.email;
    values.countryCode = data.countryCode;
    values.mobile = data.mobile;
    values.address1 = data.address1;
    values.address2 = data.address2;
    values.country = data.country;
    values.state = data.state;
    values.city = data.city;
    values.zipcode = data.zipcode;
  };

  const clearData = () => {
    values.firstName = "";
    values.lastName = "";
    values.email = "";
    values.countryCode = "";
    values.mobile = "";
    values.address1 = "";
    values.address2 = "";
    values.country = "";
    values.state = "";
    values.city = "";
    values.zipcode = 0;
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userSchema,
      onSubmit: (values) => {
        console.log("values--", values);
      },
    });

  // console.log("values.mobile", values.mobile);

  const getCountry = () => {
    axios
      .get("http://localhost:5000/user/getCountry")
      .then((res) => {
        setCountry(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
      });
  };

  const getState = (isoCode) => {
    console.log("check ", isoCode);
    axios
      .get(`http://localhost:5000/user/getState/${isoCode}`)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
      });
  };

  const getCity = (cName, sName) => {
    console.log(cName, sName);
    axios
      .post("http://localhost:5000/user/getCity", {
        country: cName,
        state: sName,
      })
      .then((res) => {
        setCity(res.data);
      })
      .catch((err) => {
        console.log("axios error", err);
      });
  };

  const getCountryIsoCode = (cName) => {
    country.map((val) => {
      if (val.name === cName) {
        setCountryCode(val.isoCode);
        return getState(val.isoCode);
      }
    });
  };

  const getStateCode = (stateName) => {
    console.log("stateName", stateName);
    state.map((val) => {
      if (val.name === stateName) {
        console.log("value--", val);
        return getCity(countryCode, val.isoCode);
      }
    });
  };

  const addUser = () => {
    axios
      .post("http://localhost:5000/user/post", values)
      .then((res) => {
        console.log(res);
        clearData();
        alert("Data inserted successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("axios error", err);
      });
  };

  const saveUser = () => {
    axios
      .put(`http://localhost:5000/user/update/${params.id}`, values)
      .then((res) => {
        console.log("updated");
        clearData();
        alert("update successful");
        navigate("/");
      })
      .catch((err) => {
        console.log("axios err");
      });
  };

  return (
    <div className="main-div">
      <div>
        <h2>Enter Details</h2>
      </div>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group className="mb-3">
          <Form.Label>
            FirstName<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            name="firstName"
            type="firstName"
            placeholder="enter firstname.."
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.firstName && touched.firstName ? (
            <Form.Text className="text-danger">{errors.firstName}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            LastName<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            name="lastName"
            type="lastName"
            placeholder="Enter lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.lastName && touched.lastName ? (
            <Form.Text className="text-danger">{errors.lastName}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Email address<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? (
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Choose country code<span className="text-danger">*</span>
          </Form.Label>
          <select
            name="countryCode"
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="">--select--</option>
            {country.map((val, index) => {
              return (
                <option value={val.phonecode} key={index}>
                  {val.phonecode}
                </option>
              );
            })}
          </select>
          {errors.countryCode && touched.countryCode ? (
            <Form.Text className="text-danger">{errors.countryCode}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Mobile Number<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            name="mobile"
            type="mobile"
            placeholder="Enter mobile"
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.mobile && touched.mobile ? (
            <Form.Text className="text-danger">{errors.mobile}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            address1<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            name="address1"
            type="address1"
            placeholder="Enter address1"
            value={values.address1}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.address1 && touched.address1 ? (
            <Form.Text className="text-danger">{errors.address1}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address(Optional)</Form.Label>
          <Form.Control
            name="address2"
            type="address2"
            placeholder="Enter address2"
            value={values.address2}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.address2 && touched.address2 ? (
            <Form.Text className="text-danger">{errors.address2}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Choose Country<span className="text-danger">*</span>
          </Form.Label>
          <select
            name="country"
            onChange={(e) => {
              handleChange(e);
              getCountryIsoCode(e.target.value);
            }}
          >
            <option value="">--select--</option>
            {country.map((val, index) => {
              return (
                <option value={val.name} key={index}>
                  {val.name}
                </option>
              );
            })}
          </select>
          {errors.country && touched.country ? (
            <Form.Text className="text-danger">{errors.country}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Choose State<span className="text-danger">*</span>
          </Form.Label>
          <select
            name="state"
            onChange={(e) => {
              handleChange(e);
              getStateCode(e.target.value);
            }}
          >
            <option value="">--select--</option>
            {state.map((val, index) => {
              return (
                <option value={val.name} key={index}>
                  {val.name}
                </option>
              );
            })}
          </select>
          {errors.state && touched.state ? (
            <Form.Text className="text-danger">{errors.state}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Choose City</Form.Label>
          <select
            name="city"
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value="">--select--</option>
            {city.map((val, index) => {
              return (
                <option value={val.name} key={index}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Enter zipcode<span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            name="zipcode"
            type="zipcode"
            placeholder="Enter zipcode"
            value={values.zipcode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.zipcode && touched.zipcode ? (
            <Form.Text className="text-danger">{errors.zipcode}</Form.Text>
          ) : null}
        </Form.Group>

        <div className="footer-btn">
          <Button
            className="btn-danger"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              params.id ? saveUser() : addUser();
            }}
          >
            {params.id ? "Save" : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddEdit;
