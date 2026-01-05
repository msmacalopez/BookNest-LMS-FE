import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar.jsx";
// import { Col, Row } from "react-bootstrap";

export default function DashboardLayout() {
  return (
    <>
      {/* <Row style={{ minHeight: "80vh" }}>
        <Col xs={12} md={3} xl={2}>
          <SideBar />
        </Col>
        <Col xs={12} md={9} xl={10}>
          <Outlet />
        </Col>
      </Row> */}
    </>
  );
}
