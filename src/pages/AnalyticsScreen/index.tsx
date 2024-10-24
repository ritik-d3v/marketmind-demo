import UserAnalyticsViewer from './components/AnalyticsViewer';
import LiveTranscriptViewer from './components/LiveTranscriptViewer';
import './components/component1.css';

const settings = '/assets/icons/settings.svg';
const hamburger = '/assets/icons/hamburger.svg';

function Header() {
  return (
    <div className="flex gap-2.5 justify-between px-5 py-4 bg-white max-md:flex-wrap">
      <img loading="lazy" src="/assets/images/companyLogo2.png" className="shrink-0 w-40 max-w-full" alt="logo" />
      <div className="flex gap-5 justify-between my-auto">
        <img loading="lazy" src={settings} className="shrink-0 w-6 " alt="settings" />
        <img loading="lazy" src={hamburger} className="shrink-0 w-6 " alt="settings" />
      </div>
    </div>
  );
}

export default function AnalyticsWithLiveChat() {
  return (
    <div className="analytics">
      <Header />
      <div className="flex bg-[#123247] py-8">
        <div className="w-[40%]">
          <LiveTranscriptViewer />
        </div>
        <div className="w-[60%]">
          <UserAnalyticsViewer />
        </div>
      </div>
    </div>
  );
}
