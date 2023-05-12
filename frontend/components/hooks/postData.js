import { useState, useEffect } from "react";
import axios from "axios";

const usePostData = (url, postData) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postDataAsync = async () => {
      try {
        const response = await axios.post(url, postData, {
          responseType: "json",
          withCredentials: true,
        });
        setResponse(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    postDataAsync();
  }, [url, postData]);

  // console.log(response);

  return { response, error };
};

export default usePostData;
