import axios from "axios";
// import accessToken from "./jwt-token-access/accessToken";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Moment from "moment";

//apply base url for axios
const API_URL = process.env.REACT_APP_API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

// axiosApi.interceptors.response.use(
//   (response) => response,
//   function (error) {
//     const originalRequest = error.config;

//     if (
//       error?.response?.status === 401 &&
//       originalRequest.url === `user/refresh-token`
//     ) {
//       localStorage.clear();
//       window.location.href = "/login/";
//       return Promise.reject(error);
//     }

//     if (error?.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const token =
//         "bearer " + JSON.parse(localStorage.getItem("localUser"))?.token;
//       axiosApi.defaults.headers.common["Authorization"] = token;
//       return axiosApi.get("user/refresh-token").then((res) => {
//         if (res.status === 200) {
//           localStorage.setItem("localUser", JSON.stringify(res.data.data));
//           localStorage.setItem(
//             "localToken",
//             JSON.stringify(res.data.data.token)
//           );
//           localStorage.setItem(
//             "localTokenType",
//             JSON.stringify(res.data.data.tokenType)
//           );
//           localStorage.setItem(
//             "localTokenExpires",
//             JSON.stringify(Moment().unix() + res.data.data.expiresIn)
//           );
//           axiosApi.defaults.headers.common["Authorization"] =
//             "Bearer " + res.data.data.token;
//           return axiosApi(originalRequest);
//         }
//       });
//     }
//     return Promise.reject(error);
//   }
// );

export async function get(url, config = {}) {
  // const token =
  //   "bearer " + JSON.parse(localStorage.getItem("localUser"))?.token;
  // axiosApi.defaults.headers.common["Authorization"] = token;
  // const company_shortname =
  //   JSON.parse(localStorage.getItem("localUser"))?.user?.company_shortname ||
  //   null;

  // if (
  //   !url.includes(company_shortname) &&
  //   !url.includes("companies/me") &&
  //   !url.includes("countries")
  // ) {
  //   if (company_shortname !== null) {
  //     url = company_shortname + url;
  //   }
  // }

  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function getOnly(url, config = {}) {
  const token =
    "bearer " + JSON.parse(localStorage.getItem("localUser"))?.token;
  axiosApi.defaults.headers.common["Authorization"] = token;

  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  const token =
    "bearer " + JSON.parse(localStorage.getItem("localUser"))?.token;
  axiosApi.defaults.headers.common["Authorization"] = token;
  const company_shortname =
    JSON.parse(localStorage.getItem("localUser"))?.user?.company_shortname ||
    null;

  if (
    !url.includes(company_shortname) &&
    !url.includes("companies/me") &&
    !url.includes("countries")
  ) {
    url = company_shortname + url;
  }

  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((err) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
        icon: "error",
        cancelButtonColor: "red",
        confirmButtonColor: "#60C39F",
        timer: 5000,
        text: err?.response?.data?.message || "Something went wrong",
      });
    });
}

export async function put(url, data, config = {}) {
  const token =
    "bearer " + JSON.parse(localStorage.getItem("localUser"))?.token;
  axiosApi.defaults.headers.common["Authorization"] = token;
  const company_shortname =
    JSON.parse(localStorage.getItem("localUser"))?.user?.company_shortname ||
    null;

  if (
    !url.includes(company_shortname) &&
    !url.includes("companies/me") &&
    !url.includes("countries")
  ) {
    url = company_shortname + url;
  }

  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data)
    .catch((err) => {
      const MySwal = withReactContent(Swal);

      MySwal.fire({
        icon: "error",
        cancelButtonColor: "red",
        confirmButtonColor: "#60C39F",
        timer: 5000,
        text: err?.response?.data?.message || "Something went wrong",
      });
    });
}

export async function del(url, config = {}) {
  const token =
    "bearer " + JSON.parse(localStorage.getItem("localUser"))?.token;
  axiosApi.defaults.headers.common["Authorization"] = token;
  const company_shortname =
    JSON.parse(localStorage.getItem("localUser"))?.user?.company_shortname ||
    null;

  if (
    !url.includes(company_shortname) &&
    !url.includes("companies/me") &&
    !url.includes("countries")
  ) {
    url = company_shortname + url;
  }

  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
