import React, { Component } from "react";
import API from "../services/api";

class Product extends Component {
  constructor(props) {
    super(props);
    this.shop = new API();
    this.state = {
      product: []
    };
  }
  render() {
    return (
      <div>
        <h1>{this.state.product.name}</h1>
      </div>
    );
  }

  async componentDidMount() {
    this.getProduct();
  }

  async getProduct() {
    const { data: product } = await this.shop.getProduct(
      this.props.match.params.productId
    );
    this.setState({
      product
    });
  }
}

export default Product;
