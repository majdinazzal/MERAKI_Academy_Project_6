import React, { useContext, useState } from "react";

import axios from "axios";

import { useSelector} from "react-redux";
//=====================================================
const Register = () => {
    const state = useSelector((state) => {
      return { isLoggedIn: state.loginReducer.isLoggedIn };
    });
  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const role_id = "1";
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
  
    // =================================================================

    const addNewUser = async (e) => {
        e.preventDefault();
        try {
          const result = await axios.post("http://localhost:5000/users", {
            firstName,
            lastName,
            age,
            country,
            email,
            password,
            role_id,
          });
          if (result.data.success) {
            setStatus(true);
            setMessage("The user has been created successfully");
          } else throw Error;
        } catch (error) {
          setStatus(false);
          if (error.response && error.response.data) {
            return setMessage(error.response.data.message);
          }
          setMessage("Error happened while register, please try again");
        }
      };
    
      // =================================================================
  // =================================================================

  return (
    <>
      <div className="Form">
        {!state.isLoggedIn ? (
          <>
            <p className="Title">Register:</p>
            <form onSubmit={addNewUser}>
              <br />
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <input
                type="number"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
              <br />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button>Register</button>
              <br />
            </form>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </>
        ) : (
          <p>Logout First</p>
        )}
      </div>
    </>
  );
};

export default Register;
    