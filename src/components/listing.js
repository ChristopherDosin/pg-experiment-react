import React, { Component } from "react";
import API from "../services/api";
import { Card, Row, Col, Spin } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

class Listing extends Component {
  constructor(props) {
    super(props);
    this.shop = new API();
    this.state = {
      key: this.props.match.params.categoryId,
      products: [],
      isLoading: false
    };
  }
  render() {
    const isLoading = this.state.isLoading;
    let spinner;

    if (isLoading) {
      spinner = (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 999,
            background: "rgba(255, 255, 255, .5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div style={{ position: "relative" }}>
        {spinner}
        <main key={this.props.match.params.categoryId}>
          <Row gutter={16}>
            {this.state.products.map(product => (
              <Link to={`/product/${product.id}`}>
                <Col style={{ padding: "5px" }} span={4} key={product.id}>
                  <Card
                    hoverable
                    cover={
                      <img alt={product.name} src={product.cover.media.url} />
                    }
                  >
                    <Meta
                      title={product.name}
                      description={product.price.net}
                    />
                  </Card>
                </Col>
              </Link>
            ))}
          </Row>
        </main>
      </div>
    );
  }

  async componentDidMount() {
    this.getProducts();
  }

  async componentWillReceiveProps(prevProps) {
    if (prevProps.match.params.categoryId !== this.state.key) {
      this.getProducts();
    }
  }

  async getProducts() {
    const { data: products } = await this.shop.getProducts(
      "?filter[product.categoryTree]=" + this.props.match.params.categoryId
    );
    this.setState({
      products,
      key: this.props.match.params.categoryId
    });
  }
}

export default Listing;
