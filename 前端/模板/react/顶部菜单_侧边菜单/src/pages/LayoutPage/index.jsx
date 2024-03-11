import {Link, Outlet, useNavigate} from "react-router-dom";
import {Layout, Menu, Breadcrumb} from "antd";


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import React, {useState} from "react";




function LayoutPage() {

  const handleNavClick = (info) => {
    console.log("HH", info)
  }

  return (
    <>
      <Layout style={{minHeight: "100vh"}}>
        <Header className="header">
          <div className="logo"/>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} onClick={handleNavClick}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Outlet></Outlet>
      </Layout>
    </>
  );
}

export default LayoutPage;
