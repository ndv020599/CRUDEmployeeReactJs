import axios from "axios";
import { toast } from "react-toastify";
import ConstantList from "../../appConfig";
// import { API_ENPOINT } from "../../appConfig";

export const getDistricts = () => {
  return axios
    .post(ConstantList.API_ENPOINT + "/districts/search", {})
    .then((res) => res.data.data);
};

export const getCommunes = () => {
  return axios
    .post(ConstantList.API_ENPOINT + "/communes/search", {})
    .then((res) => res.data.data);
};

export const getProvinces = () => {
  return axios
    .post(ConstantList.API_ENPOINT + "/provinces/search", {})
    .then((res) => res.data.data);
};

export const getEmployee = () => {
  return axios
    .post(ConstantList.API_ENPOINT + "/employees/search", {})
    .then((res) => res.data.data);
};

export const UpdateEmployeesService = (data) => {
  // console.log("aaaaaaaaaaa", data.status);
  var url = ConstantList.API_ENPOINT + `/employees/${data.id}`;
  return axios.put(url, data);
};

export const createNewUserService = (data) => {
  return axios.post(ConstantList.API_ENPOINT + "/employees", data);
};

export const deleteUserService = (id) => {
  return axios.delete(ConstantList.API_ENPOINT + `/employees/${id}`);
};
