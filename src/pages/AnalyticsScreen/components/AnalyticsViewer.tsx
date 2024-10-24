import Sentiment from './Sentiment';
import TrendingSources from './TrendingSources';
import TrendingTopicChatbot from './TrendingTopicChatbot';
import TrendingTopicSocial from './TrendingTopics';
import UserAnalytics from './UserAnalytics';
import UserLocation from './UserLocation';
import UserSurveillance from './UserSurvillence';

export default function UserAnalyticsViewer() {
  return (
    <div className="flex flex-col border-l border-[#1E4863]">
      <UserAnalytics />
      <Sentiment />
      <TrendingTopicChatbot />
      <TrendingTopicSocial />
      <UserSurveillance />
      <TrendingSources />
      <UserLocation />
    </div>
  );
}
