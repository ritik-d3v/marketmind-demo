import TimePeriod from './TimePeriod';

const topStocksResearched = [
  'RBLX (216)',
  'EA (197)',
  'GME (186)',
  'MYPS (87)',
  'DDI (56)',
  'CRSR (45)',
  'HUYA (27)',
  'SOHU (18)',
  'INSE (8)',
  'AGAE (2)'
];

const topStocksDiscussed = [
  'NCTY (9,245)',
  'SLE (8,756)',
  'NVIDIA (8,159)',
  'GME (6,002)',
  'MSFT (4,945)',
  'EA (2,812)',
  'GRVY (943)',
  'AGAE (647)',
  'EBET (202)',
  'SLE (47)'
];

const topInboundLinks = [
  'Yahoo Finance (23,040)',
  'MarketMind.live (18,233)',
  'EnthusiastGaming.com (4,534)',
  'Reddit (4,209)',
  'Twitter (3,834)',
  'TikTok (3,465)',
  'MarketWatch (2,456)',
  'Equities.com (1,770)',
  'Investors Hub (567)',
  'StockTwits (446)'
];

export default function TrendingSources() {
  return (
    <div>
      <div className="flex flex-col grow text-white max-md:mt-10 mt-8 px-12">
        <div className="text-2xl font-semibold leading-8">Trending Sources - Social Media & Web</div>

        <TimePeriod />
        <div className="mt-10 text-xs">
          <div className="bg-[#0A2537] font-semibold flex ">
            <span className="py-2 text-left px-3 w-1/3">Your viewers also chatted with</span>

            <span className="py-2 text-left px-3 w-1/3">Your influencers also discussed</span>
            <span className="py-2 text-left px-3 w-1/3">Inbound Links</span>
          </div>
          <div className="flex">
            <div className="text-left  w-1/3 flex flex-col">
              {topStocksResearched.map((ele, index) => (
                <p key={ele} className="py-2 px-3">{`${index + 1}. ${ele}`}</p>
              ))}
            </div>
            <div className="text-left w-1/3 flex flex-col">
              {topStocksDiscussed.map((ele, index) => (
                <p key={ele} className="py-2 px-3">{`${index + 1}. ${ele}`}</p>
              ))}
            </div>
            <div className="text-left w-1/3 flex flex-col">
              {topInboundLinks.map((ele, index) => (
                <p key={ele} className="py-2 px-3">{`${index + 1}. ${ele}`}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full bg-cyan-900 border border-cyan-900 border-solid min-h-[1px] max-md:max-w-full" />
    </div>
  );
}
