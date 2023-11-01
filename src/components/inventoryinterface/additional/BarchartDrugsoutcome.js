import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class BarchartDrugsoutcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Monthly Records',
          data: [],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'area', 
        },
        plotOptions: {
          area: {
            fillTo: 'origin',
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -10,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },
        xaxis: {
          categories: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
          ],
          position: 'bottom',
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
          },
        },
        title: {
          text: 'Monthly Patient Income, 2023',
          floating: true,
          offsetY: 0,
          align: 'center',
          style: {
            color: '#444',
          },
        },
        colors: ['#00cc00'], 
      },
    };

    this.monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
  }

  componentDidMount() {
    axios
      .get('http://localhost/Healerz/PHP/Inventory/dashboard/patientincome.php')
      .then((response) => {
        const data = response.data;
        const months = this.monthNames;
        const recordCounts = new Array(12).fill(0);

        data.forEach((item) => {
          const monthIndex = item.Month - 1;
          recordCounts[monthIndex] = item.RecordCount;
        });

        this.setState({
          series: [
            {
              name: 'Monthly Records',
              data: recordCounts,
            },
          ],
          options: {
            xaxis: {
              categories: months,
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
        <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={250} />
      </div>
    );
  }
}

export default BarchartDrugsoutcome;
