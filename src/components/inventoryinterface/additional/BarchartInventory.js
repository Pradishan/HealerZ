import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class BarchartInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Category Count',
          data: [],
        },
      ],
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
            return val.toFixed(2) + '%';
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
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
            formatter: (val, opts) => {
              if (opts && typeof opts.dataPointIndex !== 'undefined') {
                const { categories } = this.state.options.xaxis;
                if (categories[opts.dataPointIndex] === 'Tablet') {
                  return val.toFixed(2) + '% HighStock: 800, LowStock: 100';
                } else if (categories[opts.dataPointIndex] === 'Drops') {
                  return val.toFixed(2) + '% HighStock: 300, LowStock: 50';
                } else if (categories[opts.dataPointIndex] === 'Liquid ') {
                  return val.toFixed(2) + '% HighStock: 600, LowStock: 70';
                } else if (categories[opts.dataPointIndex] === 'Capsules') {
                  return val.toFixed(2) + '% HighStock: 700, LowStock: 100';
                } else if (categories[opts.dataPointIndex] === 'Topical') {
                  return val.toFixed(2) + '% HighStock: 200, LowStock: 50';
                } else if (categories[opts.dataPointIndex] === 'Suppositories') {
                  return val.toFixed(2) + '% HighStock: 200, LowStock: 50';
                } else if (categories[opts.dataPointIndex] === 'Injections') {
                  return val.toFixed(2) + '% HighStock: 300, LowStock: 30';
                } else if (categories[opts.dataPointIndex] === 'Implants') {
                  return val.toFixed(2) + '% HighStock: 150, LowStock: 20';
                }
              }
              return val.toFixed(2) + '%';
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
        colors: [], 
      },
    };

    this.updateColorsInterval = null;
  }

  componentDidMount() {
    this.fetchData(); 
    this.updateColorsInterval = setInterval(this.updateColors, 5000); 
  }

  componentWillUnmount() {
    clearInterval(this.updateColorsInterval); 
  }

  fetchData() {
    axios
      .get('http://localhost/Healerz/PHP/Inventory/dashboard/categoriescountget.php')
      .then((response) => {
        const data = response.data;
        const categories = data.map((item) => item.Category);
        const percentages = data.map((item) => item.percentage);
        
        const randomColors = Array.from({ length: percentages.length }, () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`);
        
        this.setState({
          series: [
            {
              name: 'Category Percentage',
              data: percentages,
            },
          ],
          options: {
            xaxis: {
              categories: categories,
            },
            colors: randomColors,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateColors = () => {
    const { data } = this.state.series[0];
    const percentages = data.slice(); 
  
    const randomColors = Array.from({ length: percentages.length }, () => `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`);
  
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        colors: randomColors,
      },
    }));
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
