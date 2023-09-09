// DoughnutChart.js
import React,{useState,useEffect} from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js';
Chart.register(ArcElement);

const DoughnutChart = () => {
    const [lowCount, setlowCount] = useState(0);
  const [outofCount, setoutofCount] = useState(0);
  const [highCount, sethighCount] = useState(0);



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
    const data = {
        labels: ["Red", "Yellow","Green"],
        datasets: [
            {
                data: [outofCount,lowCount,highCount],
                backgroundColor: ["rgb(219, 4, 4)", "rgb(247, 210, 0)", "rgb(3, 163, 6)"],
                hoverBackgroundColor: ["#ff0000", "#fffa00", "rgb(3, 255, 7)"],
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;

