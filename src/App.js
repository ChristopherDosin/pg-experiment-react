import React, { Component } from "react";
import Navigation from "./components/navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "antd/dist/antd.css";

import Home from "./components/home";
import Listing from "./components/listing";
import Product from "./components/product";

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <Navigation />
          <Layout>
            <Header style={{ background: "#fff", padding: "0 15px" }}>
              <h2>Shopware Playground React</h2>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/listing/:categoryId" component={Listing} />
                <Route path="/product/:productId" component={Product} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
