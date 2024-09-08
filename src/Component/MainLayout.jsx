import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import About from './About';
import Router from './Router/Router';
import Donate from './Pages/Donete/Donate';
import Req from './Pages/Client/Req/BloodDonnars';
import Message from './Pages/Client/Message/Message';
import BloodDonners from './Pages/Client/Req/BloodDonnars';



const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const client = true
let items;
if(client){
   items = [
    getItem('Tset', '/', <PieChartOutlined />),
    getItem('Login', '/about', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Donar Request', '/req'),
      getItem('Bill', '/user/bill'),
      getItem('Alex', '/user/alex'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
      getItem('Team 1', '/team1'),
      getItem('Team 2', '/team2'),
    ]),
    getItem('Files', '/files', <FileOutlined />),
  ];
} else {
   items = [
    getItem('Option 1', '/donate', <PieChartOutlined />),
    getItem('Option 2', '/option2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '/user/tom'),
      getItem('Bill', '/user/bill'),
      getItem('Alex', '/user/alex'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
      getItem('Team 1', '/team1'),
      getItem('Team 2', '/team2'),
    ]),
    getItem('Files', '/files', <FileOutlined />),
  ];
}




const routes = {
  '/': () => <div>This is Home</div>,
  '/about': About ,
  '/req': BloodDonners,
  '/req/message': Message,
  '/user/tom': () => <div>Tom's Content</div>,
  '/user/bill': () => <div>Bill's Content</div>,
  '/user/alex': () => <div>Alex's Content</div>,
  '/team1': () => <div>Team 1's Content</div>,
  '/team2': () => <div>Team 2's Content</div>,
  '/files': () => <div>Files Content</div>,
  '/404': () => <div>Page Not Found</div>,
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('/');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    window.history.pushState({}, '', e.key);
    window.dispatchEvent(new Event('popstate')); // Trigger popstate event
  };
  const path = window.location.pathname
  console.log(path)
  return (
<div className={`${path =='' }`}>
<Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
       
        <Content style={{ margin: '0 16px' }}>
   
          <div
            style={{
              padding: 24,
              minHeight: 560,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Router routes={routes} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
</div>
  );
};

export default MainLayout;
