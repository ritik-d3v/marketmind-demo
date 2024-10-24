import { useState } from 'react';

export default function TimePeriod() {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('24H');
  return (
    <div className="flex gap-0 mt-6 text-xs font-semibold leading-5 text-slate-400">
      <button
        type="button"
        className={`justify-center px-4 py-1.5 text-center  rounded-[100px_0px_0px_100px] border border-cyan-900 border-solid ${selectedTimePeriod === '24H' ? 'text-white bg-cyan-900' : ''}`}
        onClick={() => setSelectedTimePeriod('24H')}>
        24 Hours
      </button>
      <button
        type="button"
        className={`justify-center px-4 py-1.5 border-t border-r border-b border-cyan-900 border-solid ${selectedTimePeriod === '30D' ? 'text-white bg-cyan-900' : ''}`}
        onClick={() => setSelectedTimePeriod('30D')}>
        30 Days
      </button>
      <button
        type="button"
        className={`justify-center px-4 py-1.5 border-t border-b border-cyan-900 border-solid ${selectedTimePeriod === '3M' ? 'text-white bg-cyan-900' : ''}`}
        onClick={() => setSelectedTimePeriod('3M')}>
        3 Months
      </button>
      <button
        type="button"
        className={`justify-center px-4 py-1.5 rounded-[0px_100px_100px_0px] border border-cyan-900 border-solid ${selectedTimePeriod === '12M' ? 'text-white bg-cyan-900' : ''}`}
        onClick={() => setSelectedTimePeriod('12M')}>
        12 Months
      </button>
    </div>
  );
}
