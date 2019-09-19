import React from "react";
import { Layout } from "antd";
import Navigation from "./Navigation";

const { Header, Content, Footer } = Layout;

const PageLayout = ({ children }) => (
  <Layout className="layout">
    <Navigation />
    <Content>
      <div
        style={{
          width: "100%",
          padding: 24,
          minHeight: 280,
          margin: "0 auto"
        }}
      >
        {children}
      </div>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      ©2019 Car Rental created by Emma Popoola
    </Footer>
  </Layout>
);

export default PageLayout;
