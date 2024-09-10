import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const fetchData = async () => {
    try {
      let response = await axios.get(url);
      setData(response.data);
    } catch (e) {
      return e.json();
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return [data, error];
};

export default useFetch;
