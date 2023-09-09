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
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Dashboard(props) {
  const [percentage, setPercentage] = useState(0);
  const [lowCount, setlowCount] = useState(0);
  const [outofCount, setoutofCount] = useState(0);
  const [highCount, sethighCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost/Healerz/PHP/Inventory/totalCount.php")
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
          "http://localhost/Healerz/PHP/Inventory/lowStockCount.php"
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
          "http://localhost/Healerz/PHP/Inventory/outofStock.php"
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
          "http://localhost/Healerz/PHP/Inventory/highStock.php"
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
      <Container className="StockIndicator">
        <Row>
          <Col>
            <Card className="card1">
              <Card.Body>
                <Card.Title className="CardTitle">
                  Out Of Stocks Products
                </Card.Title>
                <div
                  className="card2"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <IconButton
                    className="indicatorimage"
                    size="large"
                    aria-label="add"
                    style={{ color: "rgb(219, 4, 4)" }}
                  >
                    <ProductionQuantityLimitsIcon sx={{ fontSize: "60px" }} />
                  </IconButton>
                  <h4 style={{ color: "rgb(219, 4, 4)" }}>{outofCount}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card1">
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
    </Layout>
  );
}

export default Dashboard;
