import React, { useEffect, useState } from "react";
import Layout from "../../layouts/layout";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import "./inventory.css";
import DoughnutChart from "./additional/DoughnutChart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ChangingProgressProvider from "./additional/ChangingProgressProvider";

import { IconButton } from "@mui/material";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LowStockModal from "./dashboard/LowStockModal";
import OutofStockModal from "./dashboard/OutofStockModal";
import SufficentModal from "./dashboard/SufficentModal"

function Dashboard(props) {
  const [percentage, setPercentage] = useState(0);
  const [lowCount, setlowCount] = useState(0);
  const [outofCount, setoutofCount] = useState(0);
  const [highCount, sethighCount] = useState(0);

  const [lowshowModal, setlowShowModal] = useState(false);
  const [outofshowModal, setoutofShowModal] = useState(false);
  const [sufficentshowModal, setsufficentShowModal] = useState(false);
  const lowStockmodal = () => {
    setlowShowModal(!lowshowModal);
  };

  const outofStockmodal = () => {
    setoutofShowModal(!outofshowModal);
  };

  const sufficentStockmodal = () => {
    setsufficentShowModal(!sufficentshowModal);
  };

  useEffect(() => {
    fetch("http://localhost/Healerz/PHP/Inventory/dashboard/totalCount.php")
      .then((response) => response.json())
      .then((data) => {
        setPercentage(data.percentage);
      })
      .catch((error) => {
        console.error("Error fetching percentage:", error);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost/Healerz/PHP/Inventory/dashboard/lowStockCount.php"
        );
        const data = await response.json();
        setlowCount(data.LowStockCount);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost/Healerz/PHP/Inventory/dashboard/outofStock.php"
        );
        const data = await response.json();
        setoutofCount(data.OutOfStockCount);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost/Healerz/PHP/Inventory/dashboard/highStock.php"
        );
        const data = await response.json();
        sethighCount(data.HighStockCount);
      } catch (error) {
        console.error("Error fetching data from the server:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Layout>
      <Container className="Dashboardcardss">
      <Container className="StockIndicator">
        <Row>
          <Col>
            <Card className="card1">
              <Card.Body>
                <Card.Title className="CardTitle">
                Products on Out of Stock
                </Card.Title>
                <div
                  className="card2"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <IconButton
                   onClick={outofStockmodal}
                    className="indicatorimage"
                    size="large"
                    aria-label="add"
                    style={{ color: "rgb(219, 4, 4)" }}
                  >
                    <PrivacyTipIcon sx={{ fontSize: "60px" }} />
                  </IconButton>
                  <h4 style={{ color: "rgb(219, 4, 4)" }}>{outofCount}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card1" >
              <Card.Body>
                <Card.Title className="CardTitle">
                  {" "}
                  Products on low Stock
                </Card.Title>
                <div
                  className="card2"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <IconButton
                    onClick={lowStockmodal}
                    className="indicatorimage"
                    size="large"
                    aria-label="add"
                    style={{ color: "rgb(247, 210, 0)" }}
                    
                  >
                    <RunningWithErrorsIcon sx={{ fontSize: "60px" }} />
                  </IconButton>
                  <h4 style={{ color: "rgb(247, 210, 0)" }}>{lowCount}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card1">
              <Card.Body>
                <Card.Title className="CardTitle">Sufficient Stock</Card.Title>
                <div
                  className="card2"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <IconButton
                   onClick={sufficentStockmodal}
                    className="indicatorimage"
                    size="large"
                    aria-label="add"
                    style={{ color: "rgb(3, 163, 6)" }}
                  >
                    <CloudDoneIcon sx={{ fontSize: "60px" }} />
                  </IconButton>
                  <h4 style={{ color: "rgb(3, 163, 6)" }}>{highCount}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="percentageIndicator">
        <Row>
          <Col>
            <Card className="card3">
              <Card.Body>
                <Card.Title className="CardTitle">Weighted score</Card.Title>
                <div className="percentagebarr">
                  <DoughnutChart />
                </div>
                <div className="doughnutindicator">
                  <div className="doughnutindicator1">
                    <IconButton
                      className="dotticoon"
                      aria-label="add"
                      style={{ color: "rgb(219, 4, 4)" }}
                    >
                      <FiberManualRecordIcon />
                    </IconButton>
                    <p>Out Of Stocks Products </p>
                  </div>
                  <div className={"doughnutindicator1"}>
                    <IconButton
                      className="dotticoon"
                      aria-label="add"
                      style={{ color: "rgb(247, 210, 0)" }}
                    >
                      <FiberManualRecordIcon />
                    </IconButton>
                    <p>Products on low stock</p>
                  </div>
                  <div className={"doughnutindicator1"}>
                    <IconButton
                      className="dotticoon"
                      aria-label="add"
                      style={{ color: "rgb(3, 163, 6)" }}
                    >
                      <FiberManualRecordIcon />
                    </IconButton>
                    <p>Sufficient Stock </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card3">
              <Card.Body>
                <Card.Title className="CardTitle">Stock Percentage</Card.Title>
                <div className="percentagebarrtt">
                  <ChangingProgressProvider values={[0, percentage]}>
                    {(percentage) => (
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage.toFixed(2)}%`}
                        styles={buildStyles({
                          pathTransition:
                            percentage === 0
                              ? "none"
                              : "stroke-dashoffset 0.5s ease 0s",
                          pathColor: "#007055",
                          textColor: "#026f1f",
                        })}
                      />
                    )}
                  </ChangingProgressProvider>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </Container>
      <LowStockModal show={lowshowModal} onHide={lowStockmodal} />
      <OutofStockModal show={outofshowModal} onHide={outofStockmodal} />
      <SufficentModal show={sufficentshowModal} onHide={sufficentStockmodal} />
      
    </Layout>
  );
}

export default Dashboard;
