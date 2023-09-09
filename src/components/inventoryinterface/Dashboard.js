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
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import ReportIcon from '@mui/icons-material/Report';

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
                  <div className={"doughnutindicator1"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <circle cx="10" cy="10.5" r="10" fill="#CE0000" />
                    </svg>
                    <p>Out Of Stocks Products </p>
                  </div>
                  <div className={"doughnutindicator1"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10C0.5 4.75329 4.75329 0.5 10 0.5C15.2467 0.5 19.5 4.75329 19.5 10Z"
                        fill="#FCC400"
                        stroke="black"
                      />
                    </svg>
                    <p>Products on low stock</p>
                  </div>
                  <div className={"doughnutindicator1"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <circle cx="10" cy="10.5" r="10" fill="#0300A0" />
                    </svg>
                    <p>Expired Products </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="card3">
              <Card.Body>
                <Card.Title className="CardTitle">Stock Percentage</Card.Title>
                <div className="percentagebarr">
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
