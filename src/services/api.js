import axios from "axios";

export default class Api {
  constructor() {
    this.host = process.env.REACT_APP_API_URL;
    this.apiKey = process.env.REACT_APP_API_KEY;
  }
  async handleRequest(selector) {
    return await axios
      .get(this.host + selector.url, {
        method: selector.method,
        headers: {
          "x-sw-access-key": this.apiKey,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
  getCategories() {
    return this.handleRequest({
      url: "category",
      method: "GET"
    });
  }
  getProducts(params) {
    return this.handleRequest({
      url: "product" + params,
      method: "GET"
    });
  }
  getProduct(params) {
    return this.handleRequest({
      url: "product/" + params,
      method: "GET"
    });
  }
}
