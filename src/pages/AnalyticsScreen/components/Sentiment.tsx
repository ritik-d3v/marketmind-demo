import GaugeCharts from './GaugeChart';

export default function Sentiment() {
  return (
    <div>
      <div className="flex flex-col grow text-white max-md:mt-10 mt-8 ">
        <div className="text-2xl font-semibold leading-8 px-12">Sentiment</div>
        <div className="flex mt-4 justify-around flex-wrap">
          <GaugeCharts percent={36} id="gauge-1" title="Verified Shareholders" />
          <GaugeCharts percent={85} id="gauge-2" title="Registered Users" />
          <GaugeCharts percent={90} id="gauge-3" title="All Users" />
        </div>
      </div>
      <div className="mt-8 w-full bg-cyan-900 border border-cyan-900 border-solid min-h-[1px] max-md:max-w-full" />
    </div>
  );
}
