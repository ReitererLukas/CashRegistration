
class APIConnection {
  url = "http://192.168.178.91:3000"

  _getHeaders(auth = false) {
    let headers = { "Accept": "application/json" }
    if (auth) {
      headers["Authorization"] = "BEARER "+localStorage.getItem("token")
    }
    return headers;
  }

  _postHeaders(auth = false) {
    let headers = this._getHeaders(auth);
    headers["Content-Type"] = "application/json";
    return headers
  }

  async _getRequest(path, auth = false) {

    return await fetch(this.url + path, {
      method: "get",
      headers: this._getHeaders(auth)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status == 401) {
        // logout
      }
    });
  }

  async _postRequest(path, body, auth = false) {
    return await fetch(this.url + path, {
      method: "post",
      headers: this._postHeaders(auth, auth),
      body: JSON.stringify(body)
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      if (res.status == 401) {
        // logout
      }
    });
  }

  async getAllEntries() {
    return await this._getRequest("/entries");
  }

  async getCurrencies() {
    return await this._getRequest("/entries/currencies")
  }

  async addEntry(entry) {
    return await this._postRequest("/entries/addEntry", entry, true)
  }

  async getUsers() {
    return await this._getRequest("/getUsers", true)
  }

  async getCategories() {
    return await this._getRequest("/entries/categories")
  }

  async addCategory(category) {
    return await this._postRequest('/admin/addCategory', category, true);
  }

  async addCurrency(currency) {
    console.log(JSON.stringify(currency))
    return await this._postRequest('/admin/addCurrency', currency, true);
  }
}

const api = new APIConnection();
export default api;