import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BookApi {
  static token;
  /* return all users info */
  static async getAllUsers() {
    let { data } = await axios.get(`${BASE_URL}/users`);
    return data.users;
  }
  /*return the specific user info*/
  static async getTheUser(username) {
    let { data } = await axios.get(`${BASE_URL}/users/${username}`);
    return data.users;
  }

  /*sign up the user*/
  static async signup(data) {
    try {
      let resp = await axios.post(`${BASE_URL}/auth/register`, data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  /*log in the user*/
  static async login(data) {
    try {
      let resp = await axios.post(`${BASE_URL}/auth/token`, data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  /* add read book to user*/
  static async addRead(username, bookId) {
    try {
      let resp = await axios.post(
        `${BASE_URL}/users/${username}/read/${bookId}`,
        {
          _token: this.token,
        }
      );
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  /*add wish for user*/
  static async addWish(username, bookId) {
    try {
      let resp = await axios.post(
        `${BASE_URL}/users/${username}/wish/${bookId}`,
        { _token: this.token }
      );
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  /*remove read for user*/

  static async removeRead(username, bookId) {
    try {
      let resp = await axios.delete(
        `${BASE_URL}/users/${username}/unread/${bookId}`,
        { data: { _token: this.token } }
      );
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  /*remove wish for user*/
  static async removeWish(username, bookId) {
    try {
      let resp = await axios.delete(
        `${BASE_URL}/users/${username}/unwish/${bookId}`,
        { data: { _token: this.token } }
      );
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }

  /*update user info*/
  static async saveProfile(username, data) {
    try {
      data["_token"] = this.token;
      let resp = await axios.patch(`${BASE_URL}/users/${username}`, data);
      return resp.data;
    } catch (e) {
      console.log(e);
    }
  }
}

//BookApi.token =
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpcmQiLCJpYXQiOjE2MjAyNDkyNDJ9.rUu4uCrZL_JBpk4ArPerKk_yRB8tclTJ0OGAs-BzmJE";

export default BookApi;
