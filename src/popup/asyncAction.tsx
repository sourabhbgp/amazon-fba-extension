import { BASE_URL } from "./constant";
import axios from "axios";
import qs from "qs";

/*global chrome*/

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const login = (data: any, CB: any) => {
  axios
    .post(`${BASE_URL}/api/panel/auth/login`, qs.stringify(data), config)
    .then((data) => {
      chrome.storage.sync.set({ token: data.data.token }, () => {
        CB(true);
      });
    })
    .catch((err) => CB(false));
};

const logout = (CB: any) => {
  chrome.storage.sync.remove("token", () => CB(true));
};

export { login, logout };
