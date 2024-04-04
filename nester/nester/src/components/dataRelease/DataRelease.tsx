import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export default function DataRelease() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    axios
      .get("${process.env.REACT_APP_API_URL}/execute-script")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div></div>;
}
