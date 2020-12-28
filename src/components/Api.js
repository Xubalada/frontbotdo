const axios = require("axios");

export async function getResources() {
  return axios
    .get("http://127.0.0.1:5000/bot_api/resources")
    .then((response) => {
      // handle success
      const resources_list = response.data.map((item) => {
        return {
          value: String(item[1]),
          label: String(item[1]),
        };
      });
      return resources_list;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

export async function getMonsters() {
  return axios
    .get("http://127.0.0.1:5000/bot_api/monsters")
    .then((response) => {
      // handle success
      const monsters_list = response.data.map((item) => {
        return {
          value: String(item[1]),
          label: String(item[1]),
        };
      });
      return monsters_list;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

export async function postData(accounts, selects) {
  return axios.post("http://127.0.0.1:5000/bot_api/selected_data", {
    accounts: accounts,
    selects: selects,
  });
}
