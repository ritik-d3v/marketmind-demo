import TimePeriod from './TimePeriod';

const data = [
  {
    topicName: 'Concern about reverse stock split to maintain NASDAQ listing',
    positive: 65,
    negative: 35,
    keySources: ['twitter', 'tiktok', 'reddit', 'threads']
  },
  {
    topicName: 'Concern about going private after NASDAQ delisting',
    positive: 35,
    negative: 65,
    keySources: ['twitter', 'tiktok', 'facebook']
  },
  {
    topicName: 'Concern about running out of cash after NASDAQ delisting',
    positive: 70,
    negative: 30,
    keySources: ['twitter', 'reddit']
  },
  {
    topicName: 'Effect on trading volume after delisting',
    positive: 60,
    negative: 40,
    keySources: ['twitter', 'facebook']
  },
  {
    topicName: 'Impact on valuation after delisting',
    positive: 50,
    negative: 50,
    keySources: ['twitter', 'reddit']
  }
];

const twitter = '/assets/icons/twitter.svg';
const tiktok = '/assets/icons/tiktok.svg';
const facebook = '/assets/icons/facebook.svg';
const reddit = '/assets/icons/reddit.svg';
const threads = '/assets/icons/threads.svg';
const createAnswer = '/assets/icons/create_answer.svg';

export default function TrendingTopicSocial() {
  function getIcon(source: string) {
    const generateElement = (srcPath: string) => <img src={srcPath} alt={source} />;
    switch (source) {
      case 'twitter':
        return generateElement(twitter);
      case 'tiktok':
        return generateElement(tiktok);
      case 'reddit':
        return generateElement(reddit);
      case 'facebook':
        return generateElement(facebook);
      case 'threads':
        return generateElement(threads);
      default:
        return null;
    }
  }
  return (
    <div>
      <div className="flex flex-col grow text-white max-md:mt-10 mt-8 px-12">
        <div className="text-2xl font-semibold leading-8">Trending Topic - Social Media & Web</div>

        <TimePeriod />
        <div className="overflow-auto">
          <table className="mt-10 text-xs w-full">
            <thead>
              <tr className="bg-[#0A2537] font-semibold">
                <th scope="col" className="py-2 text-left px-3">
                  Topic
                </th>

                <th scope="col" className="py-2 text-left px-3">
                  Sentiment
                </th>
                <th scope="col" className="py-2 text-left px-3">
                  Key Sources
                </th>
                <th scope="col" className="py-2 text-left px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ topicName, negative, positive, keySources }) => (
                <tr key={topicName}>
                  <td className="py-2 px-3">{topicName}</td>
                  <td className="py-2 px-3 w-32">
                    <div className="flex items-center ">
                      <div className="h-3" style={{ width: `${positive}%`, backgroundColor: '#5AB75B' }} />
                      <div className="h-3 " style={{ width: `${negative}%`, backgroundColor: '#FF6969' }} />
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="bg-white rounded-xl flex items-center gap-2 h-5 p-2 w-fit ">
                      {keySources.map((source) => (
                        <span key={source}>{getIcon(source)}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <button type="button" className="flex gap-2 items-center ">
                      <img src={createAnswer} alt="icon" />
                      <span>Create Commentary</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 w-full bg-cyan-900 border border-cyan-900 border-solid min-h-[1px] max-md:max-w-full" />
    </div>
  );
}
