class UserService {
  url = "http://192.168.178.91:3000";


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
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(token => {
      tokenAction(token.accessToken);
    });
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
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(token => {
      tokenAction(token.accessToken);
    });
  }
}


const userService = new UserService()
export default userService;