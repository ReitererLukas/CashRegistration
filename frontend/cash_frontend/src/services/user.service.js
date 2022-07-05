import { store } from '@/store'

class UserService {
  url = "http://localhost:3000";

  
  handleError(msg) {
    store.dispatch("alertstore/openAlert", {message: msg})
  }

  async handleResponse(res, tokenAction) {
    if (res.ok) {
      res.json().then(token => tokenAction({token: token.token, isAdmin: token.isAdmin}))
    } else {
      res.json().then(data => this.handleError(data.message));
    }
  }


  _getHeaders(auth = false) {
    let headers = { "Accept": "application/json" }
    if (auth) {
      headers["Authorization"] = "BEARER " + localStorage.getItem("token")
    }
    return headers;
  }

  _postHeaders(auth = false) {
    let headers = this._getHeaders(auth);
    headers["Content-Type"] = "application/json";
    return headers
  }


  async login(email, pwd, tokenAction) {
    await fetch(this.url + "/login", {
      method: "post",
      headers: this._postHeaders(false),
      body: JSON.stringify({
        email: email,
        pwd: pwd
      })
    }).then(res => this.handleResponse(res, tokenAction));
  }

  async signup(email, firstname, lastname, pwd, tokenAction) {
    await fetch(this.url + "/signup", {
      method: "post",
      headers: this._postHeaders(false),
      body: JSON.stringify({
        email: email,
        firstname: firstname,
        lastname: lastname,
        pwd: pwd
      })
    }).then(res => this.handleResponse(res, tokenAction));
  }
}


const userService = new UserService()
export default userService;