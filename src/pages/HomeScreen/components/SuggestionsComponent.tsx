import { useState } from 'react';
import { useAuth } from 'src/context/AuthContext';

interface SuggestionsComponentProps {
  handleSuggestionPrompt: (val: string) => void;
  handleCorporatePresentation: (val: boolean) => void;
  isCorporatePresOn: boolean;
  shouldCorpPresDisable: boolean;
  handleSuggestionSlideTitle: (val: string) => void;
  handleSinceLastUpdate: () => void;
  handleDisableCorpPresBtn: (val: boolean) => void;
}

function Suggestion(
  text: string,
  handleSuggestionPrompt: (val: string) => void,
  icon: string,
  shouldDisable: boolean,
  activeSuggestion: string,
  setActiveSuggestion: (val: string) => void,
  additionalCss?: string,
  onClickedSuggestion?: (val: string) => void,
  handleAnimations?: () => void
) {
  const handleClick = () => {
    setActiveSuggestion(text); // Set clicked suggestion as active
    if (!shouldDisable) {
      handleSuggestionPrompt(text);
    }
    if (onClickedSuggestion) onClickedSuggestion(text);
    if (handleAnimations) handleAnimations();
  };

  const { user } = useAuth();

  if (user) {
    return (
      <button
        type="button"
        disabled={activeSuggestion !== text && shouldDisable}
        className={`flex gap-2 px-6 py-3 rounded-[100px] max-md:px-5 cursor-pointer disabled:opacity-50 ${additionalCss} ${activeSuggestion === text ? 'bg-btn-green drop-shadow-2xl' : 'bg-[#EAF0EF] drop-shadow-none'} hover:bg-btn-green hover:drop-shadow-2xl`}
        onClick={handleClick}>
        {icon && <img loading="lazy" src={`/assets/icons/${icon}.svg`} alt={icon} className="shrink-0 my-auto aspect-square" />}
        <div className="leading-5">{text}</div>
      </button>
    );
  }
  return (
    <button
      type="button"
      disabled
      className={`flex gap-2 px-6 py-3 rounded-[100px] max-md:px-5 cursor-pointer disabled:opacity-50 ${additionalCss} ${activeSuggestion === text ? 'bg-btn-green drop-shadow-2xl' : 'bg-[#EAF0EF] drop-shadow-none'} hover:bg-btn-green hover:drop-shadow-2xl`}
      onClick={handleClick}>
      {icon && <img loading="lazy" src={`/assets/icons/${icon}.svg`} alt={icon} className="shrink-0 my-auto aspect-square" />}
      <div className="leading-5">{text}</div>
    </button>
  );
}

let animationTimeout: ReturnType<typeof setTimeout>;

export default function SuggestionsComponent({
  handleSuggestionPrompt,
  handleCorporatePresentation,
  isCorporatePresOn,
  shouldCorpPresDisable,
  handleSinceLastUpdate,
  handleSuggestionSlideTitle,
  handleDisableCorpPresBtn
}: Readonly<SuggestionsComponentProps>) {
  const suggestions = [
    'What happens if you get delisted from NASDAQ?',
    // 'What will you do to stay listed?',
    'Has management bought any stock recently?',
    'What is the OTCQX tier?'
  ];
  const [activeSuggestion, setActiveSuggestion] = useState('');
  const [visibleSuggestions, setVisibleSuggestions] = useState(suggestions.slice(0, 2));
  const [isAnimating, setIsAnimating] = useState(false);
  const [changedSuggestions, setChangedSuggestions] = useState<string[]>([]);

  const handleAnimationClick = () => {
    // Clear any existing timeout to ensure no previous animation is in progress
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }

    setIsAnimating(true);
    // Set a new timeout for the animation duration
    animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 6000); // 6 seconds
  };

  const findMissingSuggestion = () => {
    const visibleSet = new Set(visibleSuggestions);
    return suggestions.find((suggestion) => !visibleSet.has(suggestion) && !changedSuggestions.includes(suggestion)) || null;
  };

  const handleClick = (suggestion: string) => {
    if (!changedSuggestions.includes(suggestion)) {
      const remainingSuggestions = findMissingSuggestion();
      const newSuggestions = visibleSuggestions.filter((vs) => vs !== suggestion);
      if (remainingSuggestions) {
        setVisibleSuggestions([...newSuggestions, remainingSuggestions]);
        setChangedSuggestions([...changedSuggestions, remainingSuggestions]);
      }
    }
  };

  return (
    <div className="flex h-[24vh] xl:h-[22vh] 3xl:h-[20vh] overflow-hidden gap-5 justify-between items-start px-3 pt-4 bg-white max-md:flex-wrap max-md:pr-5">
      <div className="flex flex-col text-sm 2xl:text-base font-semibold leading-4 text-cyan-950 h-full justify-between">
        <div>Suggested Topics</div>
        <img loading="lazy" src="/assets/images/MMWordmark.png" className="max-md:mt-10  w-[120px] h-5 mb-2" alt="logo" />
      </div>
      <div className="flex gap-5 h-full max-md:flex-wrap mx-auto">
        <div className="flex flex-col h-full justify-center align-middle items-center grow shrink-0 self-start text-sm 2xl:text-base font-semibold leading-normal 2xl:leading-7 basis-0 text-cyan-950 w-fit max-md:max-w-full">
          <div className="flex gap-5 justify-between max-md:flex-wrap">
            {Suggestion(
              'What does your company do?',
              () => {
                if (!shouldCorpPresDisable) handleCorporatePresentation(!isCorporatePresOn);
                if (!isCorporatePresOn) handleDisableCorpPresBtn(true); // to start corporate presentation when typing is off
              },
              '',
              shouldCorpPresDisable || isAnimating,
              activeSuggestion,
              setActiveSuggestion,
              `${isCorporatePresOn && !activeSuggestion ? 'bg-btn-green shadow-[0_10px_40px_0_#CCD7D5]' : 'bg-[#EAF0EF]'}`,
              undefined,
              handleAnimationClick
            )}
            {Suggestion(
              'What’s happened since my last visit?',
              handleSinceLastUpdate,
              '',
              shouldCorpPresDisable || isAnimating,
              activeSuggestion,
              setActiveSuggestion,
              `bg-[#EAF0EF] progress-button ${isAnimating && activeSuggestion === 'What’s happened since my last visit?' ? 'animate-progress-bar' : ''}`,
              undefined,
              handleAnimationClick
            )}
            {Suggestion(
              'How do you make money?',
              handleSuggestionPrompt,
              '',
              shouldCorpPresDisable || isAnimating,
              activeSuggestion,
              setActiveSuggestion,
              `bg-[#EAF0EF] progress-button ${isAnimating && activeSuggestion === 'How do you make money?' ? 'animate-progress-bar' : ''}`,
              undefined,
              handleAnimationClick
            )}
            {Suggestion(
              'How are you valued?',
              handleSuggestionPrompt,
              '',
              shouldCorpPresDisable || isAnimating,
              activeSuggestion,
              setActiveSuggestion,
              `bg-[#EAF0EF] progress-button ${isAnimating && activeSuggestion === 'How are you valued?' ? 'animate-progress-bar' : ''}`,
              undefined,
              handleAnimationClick
            )}
          </div>
          <div
            className={`flex gap-5 justify-between self-center mt-6 max-md:flex-wrap ${isCorporatePresOn ? 'animate-slide-down' : 'animate-slide-up'}`}>
            {isCorporatePresOn ? (
              <>
                {Suggestion(
                  'About Us',
                  handleSuggestionSlideTitle,
                  'display',
                  shouldCorpPresDisable || isAnimating,
                  activeSuggestion,
                  setActiveSuggestion,
                  `bg-[#EAF0EF] progress-button ${isAnimating && activeSuggestion === 'About Us' ? 'animate-progress-bar' : ''}`,
                  undefined,
                  handleAnimationClick
                )}
                {Suggestion(
                  'User Traffic',
                  handleSuggestionSlideTitle,
                  'display',
                  shouldCorpPresDisable || isAnimating,
                  activeSuggestion,
                  setActiveSuggestion,
                  `bg-[#EAF0EF] progress-button ${isAnimating && activeSuggestion === 'User Traffic' ? 'animate-progress-bar' : ''}`,
                  undefined,
                  handleAnimationClick
                )}
                {Suggestion(
                  'Leadership Team',
                  handleSuggestionSlideTitle,
                  'display',
                  shouldCorpPresDisable || isAnimating,
                  activeSuggestion,
                  setActiveSuggestion,
                  `bg-[#EAF0EF] progress-button ${isAnimating && activeSuggestion === 'Leadership Team' ? 'animate-progress-bar' : ''}`,
                  undefined,
                  handleAnimationClick
                )}
                {Suggestion(
                  'Financial Results',
                  handleSuggestionSlideTitle,
                  'display',
                  shouldCorpPresDisable || isAnimating,
                  activeSuggestion,
                  setActiveSuggestion,
                  `bg-[#EAF0EF] progress-button ${isAnimating && activeSuggestion === 'Financial Results' ? 'animate-progress-bar' : ''}`,
                  undefined,
                  handleAnimationClick
                )}
                {Suggestion(
                  'NFL Tuesday Night Gaming',
                  handleSuggestionSlideTitle,
                  'display',
                  shouldCorpPresDisable || isAnimating,
                  activeSuggestion,
                  setActiveSuggestion,
                  `bg-[#EAF0EF] progress-button ${isAnimating && activeSuggestion === 'NFL Tuesday Night Gaming' ? 'animate-progress-bar' : ''}`,
                  undefined,
                  handleAnimationClick
                )}
              </>
            ) : (
              <>
                {visibleSuggestions.map((s) => {
                  return Suggestion(
                    s,
                    handleSuggestionPrompt,
                    '',
                    shouldCorpPresDisable || isAnimating,
                    activeSuggestion,
                    setActiveSuggestion,
                    'bg-[#EAF0EF]',
                    handleClick
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between max-w-40 h-full 2xl:max-w-full">
        <div className="flex flex-col self-end">
          {/* <div className="flex justify-center items-center p-3 mt-2 bg-gray-200 rounded-full">
            <img loading="lazy" src="/assets/icons/hamburger.svg" alt="hamburger" className="aspect-square w-4/5 2xl:w-full" />
          </div> */}
          <div className="flex justify-center items-center p-3 mt-6 bg-gray-200 rounded-full">
            <img loading="lazy" src="/assets/icons/settings.svg" alt="settings" className="aspect-square w-4/5 2xl:w-full" />
          </div>
        </div>
        <div className="mt-10 2xl:mt-6 text-xs leading-3 text-right text-slate-400">
          Powered by <span className="font-semibold">MarketMind Technologies</span>
        </div>
      </div>
    </div>
  );
}
