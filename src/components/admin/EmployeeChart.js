import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class EmployeeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'],
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: '#333',
              fontSize: '12px',
            },
          },
        },
        title: {
          text: 'Employees Count',
          floating: true,
          offsetY: 0,
          align: 'center',
          style: {
            color: '#444',
          },
        },
      },
    };
  }

  componentDidMount() {
    axios.get('http://localhost/Healerz/PHP/admin/Employeecount.php')
      .then(response => {
        const roleCounts = response.data;
        const allCategories = ['Doctor', 'Pharmacist', 'admin', 'Clubadmin'];
        const data = allCategories.map(category => roleCounts[category] || 0);
        
        this.setState({
          series: [
            {
              data: data,
            },
          ],
          options: {
            ...this.state.options,
            xaxis: {
              categories: allCategories,
              labels: {
                style: {
                  colors: '#333',
                  fontSize: '12px',
                },
              },
            },
          },
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
      </div>
    );
  }
}

export default EmployeeChart;
