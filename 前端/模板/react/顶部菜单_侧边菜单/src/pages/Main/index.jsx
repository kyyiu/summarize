import { useNavigate, Outlet } from "react-router-dom";
import {menu} from "../../router";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import {Layout, Menu, Breadcrumb} from "antd";
const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;

function genMenu(menuConfig) {
  return menuConfig.map(menuItem => {
    if (menuItem.children) {
      return <SubMenu
        key={menuItem.id}
        icon={<NotificationOutlined/>}
        title={menuItem.name}
      >
        {genMenu(menuItem.children)}
      </SubMenu>
    } else {
      return <Menu.Item key={menuItem.id} path={menuItem.path}>{menuItem.name}</Menu.Item>
    }
  })
}

function Main() {
  const navigate = useNavigate()
  const handleSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
    let {path} = item.props
    navigate(path)
  };

  return         <Layout>
  <Sider width={200} className="site-layout-background">
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      onSelect={handleSelect}
      style={{height: "100%", borderRight: 0}}
    >
      {genMenu(menu[0].children)}
    </Menu>
  </Sider>
  <Layout style={{padding: "0 24px 24px"}}>
    <Breadcrumb style={{margin: "16px 0"}}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <Outlet/>
    </Content>
  </Layout>
</Layout>
}

export default Main
