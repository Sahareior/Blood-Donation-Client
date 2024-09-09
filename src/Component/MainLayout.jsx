import React, { useContext, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import About from './Registration';
import Router from './Router/Router';
import Donate from './Pages/Donete/Donate';
import Req from './Pages/Client/Req/BloodDonnars';
import Message from './Pages/Client/Message/Message';
import BloodDonners from './Pages/Client/Req/BloodDonnars';
import UserLogin from './Pages/Authentication/UserLogin';
import Home from './Pages/Home/Home';
import UserConversations from './Pages/UserConversations/UserConversations';
import AllDoners from './Pages/Client/Req/AllDoners';
import { MyContext } from '../Provider/Myprovider';
import { ToastContainer } from 'react-toastify';
import Profile from './Pages/Home/Components/EditProfile/Profile';
import SignUp from './Pages/Authentication/SignUp';



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
    getItem('Home', '/', <PieChartOutlined />),
    getItem('Login', '/reg', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Active Donars', '/req'),
      getItem('Conversations', '/req/conversations'),
      getItem('All Donars', '/alldonars'),
    ]),
    getItem('Profile', 'sub2', <TeamOutlined />, [
      getItem('Edit Profile', '/profile'),
    
    ]),

  ];
} else {
   items = [
    getItem('Option 1', '/donate', <PieChartOutlined />),
    getItem('Registration', '/reg', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '/user/tom'),
      getItem('Bill', '/user/bill'),
      getItem('All Donars', '/user/alex'),
    ]),
    getItem('Profile', 'sub2', <TeamOutlined />, [
      getItem('Team 1', '/team1'),
      getItem('Team 2', '/team2'),
    ]),
    getItem('Files', '/files', <FileOutlined />),
  ];
}




const routes = {
  '/': Home,
  '/reg': UserLogin ,
  '/req': BloodDonners,
  '/req/message': Message,
  '/req/conversations': UserConversations,
  '/req/conversations/message':Message ,
  '/profile': Profile,
  '/alldonars':  AllDoners,
  '/signup': SignUp,
  '/team2': () => <div>Team 2's Content</div>,
  '/files': () => <div>Files Content</div>,
  '/404': () => <div>Page Not Found</div>,
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('/');
  const {setMessageAlert} = useContext(MyContext)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    window.history.pushState({}, '', e.key);
    window.dispatchEvent(new Event('popstate')); // Trigger popstate event
  };
  const path = window.location.pathname
   
  setMessageAlert(path)

  return (
<div className="fixed w-full">
  <ToastContainer />
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
       
        <Content style={{ margin: '0 6px' }}>
   
          <div
            style={{
              padding: 10,
              minHeight: 460,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            
          >
            <Router routes={routes} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center',height: '20px' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
</div>
  );
};

export default MainLayout;
