import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function AreaChart() {
  const [series] = useState([
    {
      name: 'Registered Accounts',
      data: [40, 80, 20, 100]
    },
    {
      name: 'Unique Visitors',
      data: [100, 20, 100, 12]
    }
  ]);

  const [options] = useState({
    chart: {
      type: 'area', // Ensure type is one of the valid types, such as 'area', 'line', 'bar', etc.
      height: 350,
      stacked: true,
      events: {},
      toolbar: {
        show: false
      }
    },
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark'
    },
    colors: ['#62C55D', '#469255'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    fill: { type: 'solid', colors: ['#62C55D', '#469255'], opacity: 1 },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#FFFFFF',
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      markers: {
        width: 12,
        height: 12,
        strokeColor: '',
        radius: 0
      }
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#89A4B5',
          fontSize: '10px',
          fontFamily: 'Inter, sans-serif',
          align: 'left'
        }
      },
      categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z']
    },
    yaxis: {
      show: false
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    }
  });

  return (
    <div>
      <div id="chart" className="relative">
        <div className="absolute flex left-1/3 items-center gap-10 mx-auto top-10 z-10">
          <div className="text-center">
            <p className="font-semibold text-base">368</p>
            <p className="text-[10px]">Total Unique Visitors</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-base">476</p>
            <p className="text-[10px]">Average Questions per User</p>
          </div>
        </div>
        <ReactApexChart options={options as ApexCharts.ApexOptions} series={series} type="area" height={350} />
      </div>
      <div id="html-dist" />
    </div>
  );
}
