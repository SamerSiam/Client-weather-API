import React, { useState } from "react";
import axios from "axios";
const SERVER_URL = "https://fierce-temple-72245.herokuapp.com/";
const Client = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const URL = `${SERVER_URL}/weather?address=${search}`;

  const [errorMsg, setErrorMsg] = useState("");
  const cancelTokenSource = axios.CancelToken.source();

  const getWeather = () => {
    const fetch = async () => {
      setErrorMsg("");

      try {
        const { data } = await axios.get(URL, {});
        if (data.error) {
          setErrorMsg(data.error);
        } else {
          setData(data);
        }

        console.log("data is", data);
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
    fetch();
    return () => {
      cancelTokenSource.cancel();
    };
  };

  return (
    <div>
      <h1>Weather API Client</h1>
      <input placeholder="Location" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => getWeather()}>Search </button>
      <br></br>
      <div>{errorMsg}</div>

      <div className="location"> Location Info:{!errorMsg && data.location} </div>
      <div className="forecast"> Forecast:{!errorMsg && data.forecast}</div>
    </div>
  );
};
export default Client;
