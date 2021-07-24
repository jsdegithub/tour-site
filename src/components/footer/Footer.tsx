import React from "react";
import { Layout, Typography } from "antd";

export const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      <Typography.Title level={3}>版权所有 @ React 旅游网</Typography.Title>
    </Layout.Footer>
  );
};
