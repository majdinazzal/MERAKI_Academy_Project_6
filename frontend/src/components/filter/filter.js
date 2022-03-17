import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Row, Col } from "react-bootstrap";
import "../all trips/alltrips.css";
// import { joinTripFunc } from "../../../../backend/controllers/join";

// -------------------------------------------------------------------------------
// const [tripsShower, settripsShower] = useState([]);
const Filter = () => {
  const [filterTrips, setfilterTrips] = useState([]);
  const [TRIPfrom, setTRIPfrom] = useState("");
  const [TRIPto, setTRIPto] = useState("");
  // const [tripId, setTripId] = useState(0);

  const filteredTrips = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:5000/filter", {
        TRIPfrom,
        TRIPto,
      });
      console.log(result.data);

      if (result.data.success) {
        setfilterTrips(result.data.result);
        // setTripId(result.data.result.id);
      } else throw Error;
    } catch (error) {
      console.log(error);
    }
  };
  const riderId = localStorage.getItem("User");
  // const tripId = localStorage.setItem("tripId", tripId);

  const sendJoinRequest = (tripId) => {
    axios
      .post(`http://localhost:5000/join/${tripId}`, {
        riderId,
      })
      .then((result) => {
        console.log(result);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      })
      .catch((err) => {
        console.log(err);
        console.log("nononononononononono");
      });
  };
  return (
    <>
      <form onSubmit={filteredTrips}>
        <br />
        <label for="inputEmail3" class="col-sm-2 col-form-label">
          Pick up location
        </label>
        <input
          type="text"
          placeholder="Please type it here"
          className="form-control"
          id="formGroupExampleInput"
          onChange={(e) => setTRIPfrom(e.target.value)}
        />
        <br />
        <label for="inputEmail3" class="col-sm-2 col-form-label">
          Destination to
        </label>
        <input
          type="text"
          placeholder="Please type it here"
          className="form-control"
          id="formGroupExampleInput"
          onChange={(e) => setTRIPto(e.target.value)}
        ></input>
        <br />
        <Button type="submit">Search</Button>
      </form>

      <div className="gridcontainer">
        {filterTrips.map((elem, index) => {
          return (
            <div>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>
                  <p> Going to: {elem.TRIPto}</p>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <p> Start Point: {elem.TRIPfrom}</p>
                  </Card.Title>
                  <Card.Text>
                    <p>Number of passengers: {elem.numbersite}</p>
                    <p>Charge per passenger: {elem.Price} JD</p>
                    <p>id: {elem.id}</p>
                  </Card.Text>
                </Card.Body>
                <button onClick={sendJoinRequest(elem.id)}>join trip</button>
              </Card>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Filter;
