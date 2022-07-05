import { store } from '@/store'

class APIConnection {
  url = "http://localhost:3000";

  handleError() {
    store.dispatch("alertstore/openAlert", {message: "Error"})
  }

  async handleResponse(res, hasResponse) {
    if (res.ok && hasResponse) {
      return res.json()
    } else if (res.status == 401) {
      this.handleError();
    } else if (!res.ok) {
      this.handleError();
    }
    return new Promise();
  }

  _getHeaders(auth = false) {
    let headers = { "Accept": "application/json" }
    if (auth) {
      headers["Authorization"] = "BEARER " + localStorage.getItem("token");
    }
    return headers;
  }

  _postHeaders(auth = false) {
    let headers = this._getHeaders(auth);
    headers["Content-Type"] = "application/json";
    return headers;
  }

  async _getRequest(path, auth = false) {

    return await fetch(this.url + path, {
      method: "get",
      headers: this._getHeaders(auth)
    }).then(res => this.handleResponse(res, true));
  }

  async _postRequest(path, body, auth = false, response = true) {
    return await fetch(this.url + path, {
      method: "post",
      headers: this._postHeaders(auth, auth),
      body: JSON.stringify(body)
    }).then(res => this.handleResponse(res, response));
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
    return await this._postRequest('/admin/addCategory', category, true, false);
  }

  async addCurrency(currency) {
    return await this._postRequest('/admin/addCurrency', currency, true, false);
  }

  async addExchange(exchange) {
    return await this._postRequest('/exchange/add', { exchange: exchange }, true);
  }

  async getAllExchanges() {
    return await this._getRequest("/exchange/getAll", true);
  }
}

const api = new APIConnection();
export default api;