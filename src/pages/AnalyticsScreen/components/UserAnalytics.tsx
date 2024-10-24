import AreaChart from './AreaChart';
import TimePeriod from './TimePeriod';

export default function UserAnalytics() {
  return (
    <div>
      <div className=" text-white text-xs px-12">
        <div className="text-2xl font-semibold leading-8">User Analytics</div>
        <div className="mt-1 text-base  text-[#89A4B5]">Daily Usage</div>
        <TimePeriod />
        <AreaChart />
      </div>
      <div className="mt-8 w-full bg-cyan-900 border border-cyan-900 border-solid min-h-[1px] max-md:max-w-full" />
    </div>
  );
}
