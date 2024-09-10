import React, { useContext, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { FiLogIn, FiLogOut, FiWifi } from 'react-icons/fi';
import { GiWaterDrop } from "react-icons/gi";
import { FcHome } from 'react-icons/fc';
import { MyContext } from '../Provider/Myprovider';
import Router from './Router/Router';
import Home from './Pages/Home/Home';
import BloodDonners from './Pages/Client/Req/BloodDonnars';
import Message from './Pages/Client/Message/Message';
import UserConversations from './Pages/UserConversations/UserConversations';
import AllDoners from './Pages/Client/Req/AllDoners';
import Profile from './Pages/Home/Components/EditProfile/Profile';
import UserLogin from './Pages/Authentication/UserLogin';
import SignUp from './Pages/Authentication/SignUp';
import { ToastContainer } from 'react-toastify';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2'
import Ddd from './Pages/Client/ddd/Ddd';


const { Sider, Content, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const routes = {
  '/': Home,
  '/reg': UserLogin,
  '/req': BloodDonners,
  '/req/message': Message,
  '/req/conversations': UserConversations,
  '/req/conversations/message': Message,
  '/profile': Profile,
  '/alldonars': AllDoners,
  '/signup': SignUp,
  '/done': Ddd,
  '/404': () => <div>Page Not Found</div>,
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('/');
  const { user, auth } = useContext(MyContext);  // Get user from context

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      window.history.pushState({}, '', '/'); // Redirect to home
      window.dispatchEvent(new Event('popstate')); // Trigger popstate for route change
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleMenuClick = (e) => {
    if (e.key === '/logout') {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Please!"
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogout();
         
          Swal.fire({
            title: "Logged Out!",
            text: "Logged out successfully!",
            icon: "success"
          });
         
        }
      });
       // Call logout function if logout menu item is clicked
    } else {
      setSelectedKey(e.key);
      window.history.pushState({}, '', e.key);
      window.dispatchEvent(new Event('popstate')); // Trigger popstate event for navigation
    }
  };

  // Dynamically set the menu items
  const items = [
    getItem('Home', '/', <FcHome />),
    user
      ? getItem('Logout', '/logout', <FiLogOut />)  // Show "Logout" if user is logged in
      : getItem('Login', '/reg', <FiLogIn />),      // Show "Login" if user is not logged in
    getItem('Connectivity', 'sub1', <FiWifi />, [
      getItem('Active Donars', '/req'),
      getItem('Conversations', '/req/conversations'),
      getItem('All Donars', '/alldonars'),
    ]),
    getItem('Be a Doner', 'sub2', <GiWaterDrop />, [
      getItem('Edit Profile', '/profile'),
    ]),
  ];

  return (
    <div className="fixed z-40 w-full">
      <ToastContainer />
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
        className='z-40 '
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="sm" // Collapse when screen size is smaller than 'sm' (576px)
          collapsedWidth="0" // Hide sider completely on mobile
          width={250} // Set width for larger screens
        >
          <Menu
            theme="dark"
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
            onClick={handleMenuClick} // Handle menu click
            style={{ overflow: 'auto' }} // Prevent overflow issues
          />
        </Sider>
        <Layout>
          <Content style={{ margin: '0 3px' }}>
            <div
              style={{
                padding: 5,
                minHeight: 60,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Router routes={routes} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', height: '20px', fontSize: '12px' }}>
            LifeGuards ©{new Date().getFullYear()} Created by Sahareior Sijan
          </Footer>
        </Layout>
      </Layout>

    </div>
  );
};

export default MainLayout;
