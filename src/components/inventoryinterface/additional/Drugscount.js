import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

class Drugscountchart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      series: [],
      options: {
        chart: {
          width: 500,
          type: "donut",
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "gradient",
        },
        legend: {
          formatter: function (val, opts) {
            const percentage = opts.w.globals.series[opts.seriesIndex];
            return (
              this.state.data[opts.seriesIndex].Category +
              " - " +
              percentage
            );
          }.bind(this),
          offsetX: -30,
          offsetY: -20,
        },
        tooltip: {
            y: {
              formatter: function (val) {
                return val;
              },
            },
            x: {
              formatter: function (val, opts) {
                const percentage = opts.w.globals.series[opts.seriesIndex];
                return (
                  this.state.data[opts.seriesIndex].Category +
                  " - " +
                  percentage
                 
                );
              }.bind(this),
            },
          },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost/Healerz/PHP/Inventory/dashboard/categoriescountget.php"
      )
      .then((response) => {
        const data = response.data;
        this.setState({
          data: data,
          series: data.map((item) => item.count),
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width={400}
        />
      </div>
    );
  }
}

export default Drugscountchart;
