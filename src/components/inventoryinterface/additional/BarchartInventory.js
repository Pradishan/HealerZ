import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class BarchartInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          height: 200,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(2) + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"],
          },
        },
        xaxis: {
          categories: [],
          position: 'top',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
                return val.toFixed(2) + "%";
            },
          },
        },
        title: {
          text: 'Drugs Categories',
          floating: true,
          offsetY: 230,
          align: 'center',
          style: {
            color: '#444',
          },
        },
      },
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost/Healerz/PHP/Inventory/dashboard/categoriescountget.php') // Replace with the actual path to your PHP script
      .then((response) => {
        const data = response.data;
        const categories = data.map((item) => item.Category);
        const percentages = data.map((item) => item.percentage); 

        console.log(categories);
        console.log(percentages);
        
        this.setState({
          series: [
            {
              name: 'Category Count',
              data: percentages,
            },
          ],
          options: {
            xaxis: {
              categories: categories,
            },
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={250} />
      </div>
    );
  }
}

export default BarchartInventory;
