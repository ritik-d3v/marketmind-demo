import MapChart from './Maps';

const data = [
  'New York (216)',
  'Massachusetts (197)',
  'London, UK (186)',
  'Ontario (87)',
  'California (56)',
  'British Columbia (45)',
  'New York (216)',
  'Massachusetts (197)',
  'London, UK (186)',
  'Ontario (87)',
  'California (56)',
  'British Columbia (45)'
];

export default function UserLocation() {
  return (
    <div>
      <div className="mt-11 text-white text-xs px-12">
        <div className="text-2xl font-semibold leading-8">User Location</div>
        <div className="mt-1 text-base  text-slate-400">Based on NOBO list, control documents, IP addresses and user-defined profiles</div>
        <div className="flex mt-10 items-start gap-6">
          <div className="bg-[#0A2537] w-[200px] xl:w-1/4 h-[200px] overflow-auto p-2 mt-10">
            <p className="font-semibold py-2 px-3">State/Province/Country</p>
            {data.map((ele, index) => (
              <p key={`${ele}-${index + 1}`} className="py-2 px-3">{`${index + 1}. ${ele}`}</p>
            ))}
          </div>
          <div className="xl:w-3/4">
            <MapChart />
          </div>
        </div>
      </div>
    </div>
  );
}
