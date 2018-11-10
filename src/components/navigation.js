import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.shop = new api();
  }

  state = {
    collapsed: true,
    categories: []
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        width="300"
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {this.state.categories.map(category => (
            <Menu.Item key={category.id}>
              <Link to={`/listing/${category.id}`}>
                <Icon type="pie-chart" />
                <span>{category.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
  async componentDidMount() {
    const { data: categories } = await this.shop.getCategories();
    this.setState({ categories });
  }
}

export default Navigation;
