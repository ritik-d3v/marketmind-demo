import { useAuth } from 'src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Tag from 'src/components/Tag';
import Comparables from './components/Comparables';
import PdfSection from './components/PdfSection';
import PublishComponent from './components/Publish';
import SupplementaryCommentary from './components/SupplementaryCommentary';
import Login from '../Login';
import MarketGraph from './components/MarketGraph';
// import StockChart from './components/StockChart';

export default function LanguageTrainingScreen() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Login />;
  }
  return (
    <div className="botviewer">
      <div className="h-[60px] flex justify-between px-4 items-center">
        <div className="flex items-center gap-4">
          {user.photoURL ? (
            <img loading="lazy" alt="bot profile" src={user.photoURL} className="shrink-0 self-start w-10 h-10 aspect-square" />
          ) : (
            <div className="flex justify-center items-center w-10 h-10 text-white bg-red-400 rounded-full">TU</div>
          )}
          <p>{user.email}</p>
        </div>
        <div>
          <button
            type="submit"
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="justify-center self-start px-5 text-sm py-2 font-semibold text-center whitespace-nowrap bg-slate-200 rounded-[100px] text-cyan-950">
            Logout
          </button>
        </div>
      </div>
      <div className="flex bg-[#123247]">
        <div className="w-[40%] border-r border-cyan-900">
          <SupplementaryCommentary />
          <div className="w-full bg-cyan-900 my-9 h-[1px] max-md:max-w-full" />
          <PublishComponent />
        </div>
        <div className="w-[60%]">
          <PdfSection filename="NASDAQ Notice v2.doc" />
          <div className="w-full bg-cyan-900 my-9 h-[1px] max-md:max-w-full" />
          <Comparables />
          <MarketGraph />
          <div className="flex gap-5 px-8 items-center self-start mt-10 max-md:flex-wrap">
            <Tag className="bg-btn-green">Export to Corporate Presentation</Tag>
            <Tag className="bg-[#D4E2EB]">Download Presentation</Tag>
            <p className="text-xs text-[#B7CFDE]">This material won’t be released to the public until scheduled release</p>
          </div>
          <div className="px-8 mt-5 mb-20">
            <Tag className="bg-btn-green">Generate Commentary for this Graph</Tag>
          </div>
          {/* <div>
            <StockChart />
          </div> */}
        </div>
      </div>
    </div>
  );
}
