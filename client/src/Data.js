const data = {
  apiBaseUrl: "http://localhost:5000/api",

  // simple function to avoid repeating code when fetching data on various components
  fetchData: function (path) {
    const url = `${this.apiBaseUrl}${path}`;
    return fetch(url)
      .then((res) => {
        if (res.ok) return Promise.resolve(res.json());
        else return Promise.reject(new Error(res.statusText));
      })
      .then((data) => data)
      .catch((err) => console.log("Something went wrong:\n", err));
  },

  // api() is function to set up request configuration and then make request
  api: function (path, method = "GET", body = null, credentials = null) {
    const url = `${this.apiBaseUrl}${path}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    if (body !== null) options.body = JSON.stringify(body);
    if (credentials) {
      // btoa() is a method to encode the username and password
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers.Authorization = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  },

  /* getUser() is an async operation that returns a promise. The resolved value of the promise is either an 
  object holding the authenticated user's info (sent from the API if the response is 200), 
  or null (if the response is a 401 Unauthorized HTTP status code). */
  getUser: async function (username, password) {
    const res = await this.api(`/users`, "GET", null, {
      username,
      password,
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  },

  /* createUser() is an async operation that returns a promise.The resolved value of the promise is either 
  an empty array (if the response is 201), or an array of errors (sent from the API if the response is 400).*/
  createUser: async function (user) {
    const res = await this.api("/users", "POST", user);
    if (res.status === 201) {
      return [];
    } else if (res.status === 400) {
      const data = await res.json();
      return data.errors;
    } else {
      throw new Error();
    }
  },
};

export default data;
