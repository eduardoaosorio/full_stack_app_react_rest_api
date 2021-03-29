const data = {
  apiBaseUrl: "http://localhost:5000/api",

  // simple function to avoid repeating code when fetching data on various components
  fetchData: function (path) {
    const url = `${this.apiBaseUrl}${path}`;
    return fetch(url)
      .then((res) => {
        if (res.ok) return Promise.resolve(res.json());
        else if (res.status === 404) return Promise.resolve(null);
        else return Promise.reject(new Error(res.statusText));
      })
      .then((data) => data);
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
      // btoa() is a method to encode the emailAddress and password
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers.Authorization = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  },

  /* getUser() is an async operation that returns a promise. The resolved value of the promise is either an 
  object holding the authenticated user's info (sent from the API if the response is 200), 
  or null (if the response is a 401 Unauthorized HTTP status code). */
  getUser: async function (emailAddress, password) {
    const res = await this.api(`/users`, "GET", null, {
      emailAddress,
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

  /* createCourse() is an async operation that returns a promise.The resolved value of the promise is either 
  an empty array (if the response is 201), an array with an error (sent from the API if the response is 401),
   or an array of errors (sent from the API if the response is 400).*/
  createCourse: async function (course, emailAddress, password) {
    const res = await this.api("/courses", "POST", course, {
      emailAddress,
      password,
    });
    if (res.status === 201) {
      return [];
    } else if (res.status === 401) {
      return ["Access Denied"];
    } else if (res.status === 400) {
      const data = await res.json();
      return data.errors;
    } else {
      throw new Error();
    }
  },

  /* updateCourse() is an async operation that returns a promise.The resolved value of the promise is either 
  an empty array (if the response is 204), an array with an error (sent from the API if the response is 401),
  an array with an error (sent from the API if the response is 403), or an array of errors 
  (sent from the API if the response is 400).*/
  updateCourse: async function (course, courseId, emailAddress, password) {
    const res = await this.api(`/courses/${courseId}`, "PUT", course, {
      emailAddress,
      password,
    });
    if (res.status === 204) {
      return [];
    } else if (res.status === 401) {
      return ["Access Denied"];
    } else if (res.status === 403) {
      return ["Forbidden"];
    } else if (res.status === 400) {
      const data = await res.json();
      return data.errors;
    } else {
      throw new Error();
    }
  },

  /* deleteCourse() is an async operation that returns a promise.The resolved value of the promise is either 
  an empty array (if the response is 204), an array with an error (sent from the API if the response is 401), 
  or an array with an error (sent from the API if the response is 403)*/
  deleteCourse: async function (courseId, emailAddress, password) {
    const res = await this.api(`/courses/${courseId}`, "DELETE", null, {
      emailAddress,
      password,
    });
    if (res.status === 204) {
      return [];
    } else if (res.status === 401) {
      return ["Access Denied"];
    } else if (res.status === 403) {
      return ["Forbidden"];
    } else {
      throw new Error();
    }
  },
};

export default data;
