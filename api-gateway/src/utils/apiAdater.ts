import axios from "axios";

const apiAdapter = (baseURL: string) => {
  return axios.create({ baseURL });
};

export default apiAdapter;
