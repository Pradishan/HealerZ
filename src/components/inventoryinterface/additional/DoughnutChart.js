// DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js';
Chart.register(ArcElement);

const DoughnutChart = () => {
    const data = {
        labels: ["Red", "Yellow", "Blue"],
        datasets: [
            {
                data: [35, 20, 5],
                backgroundColor: ["#CE0000", "#FCC400", "#0300A0"],
                hoverBackgroundColor: ["#ff0000", "#fffa00", "#0022ff"],
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

