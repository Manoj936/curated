import axios, { AxiosError } from "axios";


/*GET axios call*/
export const getDataUsingAsyncAwaitGetCall = async (endpoint: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const defaultHeaders = {
        "Content-Type": "application/json; charset=UTF-8",
      };

      const response = await axios.get(endpoint, { headers: defaultHeaders });
      resolve(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Server Error Message:", error.response.data); // or error.response.data.error
        reject(error.response.data); // or reject(error.response.data.error) if you want to return just the message
      } else {
        console.log("Unexpected Error:", error);
        reject("Unexpected ERROR");
      }
    }
  });
};

/*POST axios call*/
export const postDataUsingServiceAndBodyData = (
  endpoint: string,
  reqBody: any
) => {
  return new Promise(async (resolve, reject) => {
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };

    axios
      .post(endpoint, JSON.stringify(reqBody), {
        headers: headers,
      })
      .then(function (response) {
        // handle success
        // consoleLog('RESPONSE ==>', response.data);
        resolve(response.data);
      })
      .catch(function (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log("Server Error Message:", error.response.data); // or error.response.data.error
          reject(error.response.data); // or reject(error.response.data.error) if you want to return just the message
        } else {
          console.log("Unexpected Error:", error);
          reject("Unexpected ERROR");
        }
      });
  });
};
