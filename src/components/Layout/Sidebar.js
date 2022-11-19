import React from "react";
import { Menu, Layout } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  HomeOutlined,
} from "@ant-design/icons/lib/icons";
import Home from '../../pages/Home';

const { Content } = Layout;

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <Menu
      style={{width : 200, paddingTop:  50}}
      onClick={({ key }) => {
        if (key === "signout") {
          //TODO, sign out feature here
        } else {
          navigate(key);
        }
      }}
      defaultSelectedKeys={[window.location.pathname]}
      items={[
        { label: "Home", key: "/", icon: <HomeOutlined /> },
        {
          label: "Dashboard",
          key: "/dashboard",
          icon: <DashboardOutlined />,
        }
      ]}
    ></Menu>
  );
}

export function Children() {
  return (
    <Layout className="site-layout">
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={
              <div>
                <p>
                  By Romie Agung Nugraha.
                </p>
                <p>
                  untuk requirment testnya sudah saya sesuaikan denga task yang diberikan, 
                </p>
                <p>
                  Terimakasih sudah memberikan saya kesempatan untuk mengerjakan test ini, semoga hasilnya sesuai dengan ekspetasi dari penguji. 
                </p>
              </div>}>
            </Route>
        </Routes>
      </Content>
    </Layout>
  );
}