import TimePeriod from './TimePeriod';

const data = [
  'What exchanges will you trade on if delisted?',
  'How will this affect your level of disclosure?',
  'How will this affect your operations?',
  'How will this affect your trading volume?',
  'How will this affect your valuation after delisting?',
  'What exchanges will you trade on if delisted?',
  'How will this affect your level of disclosure?',
  'How will this affect your operations?',
  'How will this affect your trading volume?',
  'How will this affect your valuation after delisting?'
];

interface SentimentBarChartProps {
  positive: number;
  neutral: number;
  negative: number;
}
function SentimentBarChart({ positive, negative, neutral }: SentimentBarChartProps) {
  return (
    <div className="flex py-2 px-3 ">
      <div className="h-3" style={{ width: `${positive}%`, backgroundColor: '#5AB75B' }} />
      <div className="h-3" style={{ width: `${neutral}%`, backgroundColor: '#C2D4DF' }} />
      <div className="h-3 " style={{ width: `${negative}%`, backgroundColor: '#FF6969' }} />
    </div>
  );
}
export default function TrendingTopicChatbot() {
  return (
    <div>
      <div className="flex flex-col grow text-white max-md:mt-10 mt-8 px-12">
        <div className="text-2xl font-semibold leading-8 ">Trending Topics - Chatbot</div>
        <TimePeriod />
        <div className="flex w-full mt-10 text-sm gap-4">
          <div className="w-1/2">
            <p className="font-semibold my-4">Topics</p>
            <div className="h-[200px]  overflow-y-scroll">
              {data.map((ele, index) => (
                <p key={`${ele}-${index + 1}`} className="py-3">
                  {ele}
                </p>
              ))}
            </div>
          </div>
          <div className="w-1/2">
            <p className="font-semibold my-4">Sentiment</p>
            <div className="h-[200px] flex flex-col justify-between">
              <SentimentBarChart positive={55} neutral={15} negative={30} />
              <SentimentBarChart positive={25} neutral={50} negative={25} />
              <SentimentBarChart positive={50} neutral={20} negative={30} />
              <SentimentBarChart positive={35} neutral={35} negative={30} />
              <SentimentBarChart positive={50} neutral={25} negative={25} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full bg-cyan-900 border border-cyan-900 border-solid min-h-[1px] max-md:max-w-full" />
    </div>
  );
}
