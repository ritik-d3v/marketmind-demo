import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useAuth } from 'src/context/AuthContext';
import ChatBot from './components/ChatBot';
import SuggestionsComponent from './components/SuggestionsComponent';

interface CompanyProps {
  name: string;
  logo: string;
  image: string;
}

interface CompaniesProps {
  [key: string]: CompanyProps;
}

const companies: CompaniesProps = {
  EGLX: {
    name: 'Enthusiast Gaming',
    image: '/assets/images/eglx/companyLogoMini.png',
    logo: '/assets/images/eglx/companyLogo.png'
  },
  GRYP: {
    name: 'Gryphon Digital Mining',
    image: '/assets/images/gryp/companyLogoMini.png',
    logo: '/assets/images/gryp/companyLogo.png'
  },
  ALTX: {
    name: 'Alpha Liquid Terminal',
    image: '/assets/images/altx/logo1.png',
    logo: '/assets/images/altx/logo1.png'
  }
};

export default function HomeScreen() {
  const { symbol } = useParams();
  const [suggestionPrompt, setSuggestionPrompt] = useState('');
  const [isCorporatePresOn, setIsCorporatePresOn] = useState(false);
  const [lastUpdateAsked, setLastUpdateAsked] = useState(false);
  const [shouldCorpPresDisable, setShouldCorpPresDisable] = useState(false); // when typing is On in chatbot, it should disable corporate pres btn
  const [suggestionSlideTitle, setSuggestionSlideTitle] = useState('');
  const [companySymbol, setCompanySymbol] = useState('');

  // const companySymbol = symbol || 'EGLX';

  const [title, setTitle] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [companyImg, setCompanyImg] = useState('');
  // const { user } = useAuth();

  useEffect(() => {
    if (symbol) {
      setTitle(companies[symbol].name);
      setCompanyLogo(companies[symbol].logo);
      setCompanyImg(companies[symbol].image);
      setCompanySymbol(symbol);
    } else {
      const defaultSymbol = 'EGLX';
      setTitle(companies[defaultSymbol].name);
      setCompanyLogo(companies[defaultSymbol].logo);
      setCompanyImg(companies[defaultSymbol].image);
      setCompanySymbol(defaultSymbol);
    }
  }, [symbol]);

  const handleSuggestionPrompt = useCallback((suggestion: string) => {
    setSuggestionPrompt(suggestion);
  }, []);

  const handleSinceLastUpdate = () => {
    setLastUpdateAsked(!lastUpdateAsked);
  };

  const handleCorporatePresentation = useCallback((val: boolean) => {
    setIsCorporatePresOn(val);
  }, []);

  const handleDisableCorpPresBtn = useCallback((val: boolean) => {
    setShouldCorpPresDisable(val);
  }, []);

  const handleSuggestionSlideTitle = useCallback((val: string) => {
    setSuggestionSlideTitle(val);
  }, []);

  return (
    <div className="botviewer overflow-y-hidden flex h-screen flex-col">
      <div className="flex w-full h-3/4">
        <ChatBot
          title={`${title} Chat`}
          companyName={title}
          companySymbol={companySymbol}
          companyLogo={companyLogo}
          companyImgUrl={companyImg}
          userInitials="JG"
          suggestionPrompt={suggestionPrompt}
          lastUpdateAsked={lastUpdateAsked}
          handleSuggestionPrompt={handleSuggestionPrompt}
          themeColor="#E3EDF0"
          isCorporatePresOn={isCorporatePresOn}
          handleCorporatePresentation={handleCorporatePresentation}
          handleDisableCorpPresBtn={handleDisableCorpPresBtn}
          suggestionSlideTitle={suggestionSlideTitle}
          handleSuggestionSlideTitle={handleSuggestionSlideTitle}
          handleSinceLastUpdate={handleSinceLastUpdate}
        />
      </div>
      <div className="h-1/4">
        <SuggestionsComponent
          handleSuggestionPrompt={handleSuggestionPrompt}
          isCorporatePresOn={isCorporatePresOn}
          handleSinceLastUpdate={handleSinceLastUpdate}
          handleDisableCorpPresBtn={handleDisableCorpPresBtn}
          handleCorporatePresentation={handleCorporatePresentation}
          shouldCorpPresDisable={shouldCorpPresDisable}
          handleSuggestionSlideTitle={handleSuggestionSlideTitle}
        />
      </div>
    </div>
  );
}
