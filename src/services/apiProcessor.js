// create a axios api processor with base url from environment variable VITE_API_BASE_URL
import axios from "axios";
import { fetchNewAccessJWT } from "../features/auth/authAPI.js";

export const apiProcessor = async ({
  method,
  url,
  data,
  params,
  isPrivate,
  isRefreshToken,
  contentType = "application/json",
}) => {
  try {
    // public request (when isPrivate is false) -> null
    // private request -> accessJWT from session storage
    // refresh token request -> refreshJWT from local storage
    //... Authorization header is: =accessJWT, refreshJWT or null
    const headers = {
      Authorization: isPrivate
        ? isRefreshToken
          ? localStorage.getItem("refreshJWT")
          : sessionStorage.getItem("accessJWT")
        : null,
      "Content-Type": contentType,
    };

    //add base url from environment variable VITE_API_BASE_URL
    const apiUrl = import.meta.env.VITE_API_BASE_URL + url;
    const response = await axios({
      method,
      url: apiUrl,
      data,
      params,
      headers, //token + content type
    });

    return response.data; //what backend send as res.json !
  } catch (error) {
    console.log(error);

    const message = error.response
      ? error.response.data.message
      : error.message;

    if (message == "jwt expired") {
      console.log("Making api call to renew the token");
      const tokenRenewed = await fetchNewAccessJWT();
      if (tokenRenewed) {
        return apiProcessor({ method, url, data, params, isPrivate });
      }
    }
    return { status: "error", message };
  }
};
