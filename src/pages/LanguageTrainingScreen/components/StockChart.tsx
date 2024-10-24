import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface CandleData {
  x: number; // timestamp for the x-axis
  y: [number, number, number, number]; // [open, high, low, close] prices
  volume: number; // volume of trades
}

function StockChart() {
  const options: ApexOptions = {
    chart: {
      height: 500,
      toolbar: {
        show: false
      }
    },
    title: {
      text: 'Stock Performance',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MMM'
      }
    },
    yaxis: [
      {
        seriesName: 'Price',
        opposite: true,
        tooltip: {
          enabled: true
        }
      },
      {
        seriesName: 'Volume',
        opposite: false,
        show: false // Hide this y-axis as volume will use a separate axis settings
      }
    ],
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // creates an alternating pattern for grid rows
        opacity: 0.5
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter(y: number) {
          if (typeof y !== 'undefined') {
            return y.toFixed(2);
          }
          return y;
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        distributed: true
      }
    }
  };

  const [data, setData] = useState<CandleData[]>([]);

  function generateRandomData(totalPoints: number): CandleData[] {
    const generatedData: CandleData[] = [];
    let basePrice = 50; // Starting base price for simulation

    for (let i = 0; i < totalPoints; i += 1) {
      const open = basePrice + Math.random() * 10 - 5;
      const close = open + Math.random() * 10 - 5;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;
      const volume = Math.floor(Math.random() * 1000000 + 100000); // Random volume
      const date = new Date(2023, 0, i + 1).getTime(); // Daily data starting from Jan 1, 2023

      generatedData.push({
        x: date,
        y: [open, high, low, close],
        volume
      });

      basePrice = close; // Update basePrice to the last close for continuity
    }

    return generatedData;
  }

  useEffect(() => {
    setData(generateRandomData(120));
  }, []);

  const series = [
    {
      name: 'Price',
      type: 'candlestick',
      data: data.map((item) => ({ x: item.x, y: item.y }))
    },
    {
      name: 'Volume',
      type: 'column', // Use column type for volume data
      data: data.map((item) => ({ x: item.x, y: item.volume }))
    }
  ];

  return (
    <div className="p-4">
      <ReactApexChart options={options} series={series} type="candlestick" height={500} />
    </div>
  );
}

export default StockChart;
