import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const initialBarData = [
  { name: 'Jan', value: 49.9 },
  { name: 'Feb', value: 71.5 },
  { name: 'Mar', value: 106.4 },
  { name: 'Apr', value: 129.2 },
  { name: 'May', value: 144.0 },
  { name: 'Jun', value: 176.0 },
  { name: 'Jul', value: 135.6 },
  { name: 'Aug', value: 148.5 },
  { name: 'Sep', value: 216.4 },
  { name: 'Oct', value: 194.1 },
  { name: 'Nov', value: 95.6 },
  { name: 'Dec', value: 54.4 },
];

const initialLineData = [
  { name: 'Senin', value: 10 },
  { name: 'Selasa', value: 15 },
  { name: 'Rabu', value: 12 },
  { name: 'Kamis', value: 20 },
  { name: 'Jumat', value: 8 },
  { name: 'Sabtu', value: 21 },
  { name: 'Minggu', value: 83 },
];

const BarChart = () => {
  const [barData, setBarData] = useState(initialBarData);

  const updateBarData = () => {
    const newBarValue = Math.floor(Math.random() * 30) + 1;
    const updatedBarData = barData.map((item, index) => ({
      name: item.name,
      value: index === 0 ? newBarValue : barData[index - 1].value,
    }));
    setBarData(updatedBarData);
  };

  useEffect(() => {
    const interval = setInterval(updateBarData, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const barOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: '.',
    },
    xAxis: {
      categories: barData.map((item) => item.name),
    },
    yAxis: {
      title: {
        text: 'Bar Value',
      },
    },
    plotOptions: {
      series: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Bar Value',
        data: barData.map((item) => item.value),
      },
    ],
  };

  return (
    <div className="max-md:px-8 md:pl-8 md:w-[50%]">
      <h2 className="md:text-xl font-semibold mb-4">Mountly Data</h2>
      <HighchartsReact highcharts={Highcharts} options={barOptions} />
    </div>
  );
};

const LineChart = () => {
  const [lineData, setLineData] = useState(initialLineData);

  const updateLineData = () => {
    const newLineValue = Math.floor(Math.random() * 30) + 1;
    const updatedLineData = lineData.map((item, index) => ({
      name: item.name,
      value: index === 0 ? newLineValue : lineData[index - 1].value,
    }));
    setLineData(updatedLineData);
  };

  useEffect(() => {
    const interval = setInterval(updateLineData, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const lineOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: '.',
    },
    xAxis: {
      categories: lineData.map((item) => item.name),
    },
    yAxis: {
      title: {
        text: 'Line Value',
      },
    },
    series: [
      {
        name: 'Value',
        data: lineData.map((item) => item.value),
      },
    ],
  };

  return (
    <div className="max-md:px-8 md:pr-8 md:w-[50%]">
      <h2 className="md:text-xl font-semibold mb-4">Daily Data</h2>
      <HighchartsReact highcharts={Highcharts} options={lineOptions} />
    </div>
  );
};

const MixedChart = () => {
  return (
    <div className="flex w-full gap-3 max-md:flex-col">
      <BarChart />
      <LineChart />
    </div>
  );
};

export default MixedChart;
