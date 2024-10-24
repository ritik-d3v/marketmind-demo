import GaugeChart from 'react-gauge-chart';

interface GaugeProps {
  percent: number;
  id: string;
  title: string;
}
export default function GaugeCharts({ percent, id, title }: GaugeProps) {
  function getBackgroundColor() {
    const colors = [
      { threshold: 83.33, color: '#5AB75B' },
      { threshold: 66.67, color: '#7FDA80' },
      { threshold: 50, color: '#CDDE8A' },
      { threshold: 33.33, color: '#F3EBB0' },
      { threshold: 16.67, color: '#F49999' },
      { threshold: 0, color: '#FF6969' }
    ];

    // Find the first color whose threshold is higher than percent
    const selectedColor = colors.find(({ threshold }) => percent > threshold);

    // If no color found, default to '#5AB75B'
    return selectedColor ? selectedColor.color : '#FF6969';
  }
  return (
    <div className="flex flex-col items-center">
      <div
        className="h-6 w-12 text-black flex justify-center items-center my-4 rounded-full font-semibold text-sm"
        style={{ backgroundColor: getBackgroundColor() }}>
        {percent}
      </div>
      <div className="w-[300px]">
        <GaugeChart
          id={id}
          nrOfLevels={100}
          arcsLength={[0.16, 0.16, 0.16, 0.16, 0.16, 0.16]}
          colors={['#FF6969', '#F49999', '#F3EBB0', '#CDDE8A', '#7FDA80', '#5AB75B']}
          percent={percent / 100}
          arcPadding={0}
          cornerRadius={0}
          arcWidth={0.15}
          needleColor="#ffffff"
          needleBaseColor="#ffffff"
          hideText
        />
      </div>
      <div className="text-white font-semibold text-sm">{title}</div>
    </div>
  );
}
