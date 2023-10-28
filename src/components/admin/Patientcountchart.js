import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class Patientcountchart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      series: [],
      options: {
        chart: {
          width: 500,
          type: 'donut',
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
          type: 'gradient',
        },
        legend: {
          formatter: function (val, opts) {
            const percentage = opts.w.globals.series[opts.seriesIndex];
            return this.state.data[opts.seriesIndex].Gender + ' - ' + percentage.toFixed(2) + '%';
          }.bind(this),
          offsetX: 10,
        },
        title: {
          text: 'Gender Distribution',
          align: 'center',
          offsetX: -60,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  }

  componentDidMount() {
    axios.get('http://localhost/Healerz/PHP/admin/patientcount.php')
      .then(response => {
        const data = response.data;
        this.setState({
          data: data,
          series: data.map(item => item.percentage),
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width={500}
        />
      </div>
    );
  }
}

export default Patientcountchart;
