import { marked } from 'marked';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import ReactHtmlParser from 'react-html-parser';
import './components.css';

interface DisplayMessageProps {
  id: string;
  prompt: string;
  response: string | ReactNode;
  userImgUrl?: string;
  companyImgUrl?: string;
  userInitials: string;
  companyInitials: string;
  onClickedDisspointed?: () => void;
  showSuggestions: boolean;
  isTypingOn: boolean;
  loading: boolean;
  isLastMsg: boolean;
  isNextFeedback: boolean;
  isCommentary: boolean;
  goToNextSlide: () => void;
  scrollBottom: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
}

const like = '/assets/icons/like.svg?react';
const dislike = '/assets/icons/unlike.svg?react';

const likeFilled = '/assets/icons/like-filled.svg?react';
const dislikeFilled = '/assets/icons/dislike-filled.svg?react';
const didntAnswer = '/assets/icons/didnt_answer.svg?react';
const didntAnswerFilled = '/assets/icons/didnt_answer_filled.svg?react';
const continueBtn = '/assets/icons/continue.svg?react';

export default function DisplayChatMessage({
  id,
  prompt,
  response,
  userImgUrl,
  companyImgUrl,
  companyInitials,
  userInitials,
  onClickedDisspointed,
  showSuggestions,
  isTypingOn,
  loading,
  isLastMsg,
  isNextFeedback,
  isCommentary,
  goToNextSlide,
  scrollBottom,
  bottomRef
}: Readonly<DisplayMessageProps>) {
  const { user } = useAuth();
  const [res, setRes] = useState<string>('');
  const promptRef = useRef<HTMLDivElement | null>(null);
  const responseRef = useRef<HTMLDivElement | null>(null);
  const [isPromptVerticallyCentered, setIsPromptVerticallyCentered] = useState(false);
  const [isResponseVerticallyCentered, setIsResponseVerticallyCentered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    if (promptRef.current) {
      const elementHeight = promptRef.current.clientHeight;
      setIsPromptVerticallyCentered(elementHeight < 40);
    }
  }, []);

  useEffect(() => {
    if (responseRef.current) {
      const elementHeight = responseRef.current.clientHeight;
      setIsResponseVerticallyCentered(elementHeight < 40);
    }
  }, [response]);

  useEffect(() => {
    const fetchData = async () => {
      // Check if the response is a string and needs markdown processing
      if (typeof response === 'string') {
        const r = await marked.parse(response);
        setRes(r);
      }
    };

    fetchData();
  }, [response]);

  useEffect(() => {
    if (isLastMsg && showSuggestions && (!isTypingOn || !isLastMsg)) {
      // Scroll to the bottom after the component has updated
      console.log('Scroll to bottom line 94');
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [isLastMsg, showSuggestions, isTypingOn]);

  // useEffect(()=> {
  //   console.log(response)
  // },[response])

  useEffect(() => {
    if (scrollBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bottomRef, scrollBottom]);

  return (
    <>
      {prompt && (
        <div
          className={`flex gap-5 mt-5 max-md:flex-wrap ${isPromptVerticallyCentered ? 'items-center' : 'items-start'} ${isLastMsg ? 'final_chat_message_container' : ''}`}
          ref={bottomRef}>
          <div className="flex flex-col justify-center text-xs font-semibold text-center text-white whitespace-nowrap">
            {userImgUrl ? (
              <img loading="lazy" alt="bot profile" src={userImgUrl} className="shrink-0 self-start w-10 h-10 aspect-square rounded-full" />
            ) : (
              <div className="flex justify-center items-center w-10 h-10 bg-red-400 rounded-full">{userInitials}</div>
            )}
          </div>
          <div className="prompt my-auto text-sm leading-5 text-cyan-950 max-md:max-w-full" ref={promptRef}>
            {prompt}
          </div>
        </div>
      )}
      {loading && isLastMsg && (
        <div
          className={`flex gap-5 mt-6 text-sm leading-6 text-cyan-950 max-md:flex-wrap ${isResponseVerticallyCentered ? 'items-center' : 'items-start'}`}>
          {companyImgUrl ? (
            <img
              loading="lazy"
              alt="company profile"
              src={companyImgUrl}
              className="shrink-0 self-start w-10 h-10 aspect-square rounded-full object-cover"
            />
          ) : (
            <div className="flex justify-center items-center w-10 h-10 bg-red-400 rounded-full">{companyInitials}</div>
          )}
          <div className="response overflow-x-hidden whitespace-break-spaces" ref={responseRef}>
            <div className="loading">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      )}
      {response && (
        <>
          <div
            className={`flex gap-5 mt-6 text-sm leading-6 text-cyan-950 max-md:flex-wrap ${isResponseVerticallyCentered ? 'items-center' : 'items-start'}`}>
            {companyImgUrl ? (
              <img
                loading="lazy"
                alt="company profile"
                src={isCommentary ? '/assets/images/corpPresLogo.png' : companyImgUrl}
                className="shrink-0 self-start w-10 h-10 aspect-square rounded-full object-cover"
              />
            ) : (
              <div className="flex justify-center items-center w-10 h-10 bg-red-400 rounded-full">{companyInitials}</div>
            )}
            <div className="response overflow-x-hidden" ref={responseRef}>
              {/* {console.log(response)} */}
              {user ? (
                <article className="prose prose-sm">{ReactHtmlParser(res)}</article>
              ) : (
                <Link to="/login" className="text-blue-600">
                  {response}
                </Link>
              )}
            </div>
          </div>
          {id && showSuggestions && (!isTypingOn || !isLastMsg) && !id.includes('_Feedback') && (
            <div className="flex gap-5 flex-wrap justify-center self-center mt-4 text-xs font-medium leading-3 text-cyan-950">
              <button type="button" onClick={() => setLiked(!liked)} className="flex gap-1.5 items-center" disabled={isTypingOn}>
                <img alt="like" src={liked ? likeFilled : like} className="shrink-0 w-4 aspect-square" />
                <div>Encouraging</div>
              </button>
              <button type="button" onClick={() => setDisliked(!disliked)} className="flex gap-1.5 items-center" disabled={isTypingOn}>
                <img loading="lazy" alt="unlike" src={disliked ? dislikeFilled : dislike} className="shrink-0 w-4 aspect-square" />
                <div>Disappointing</div>
              </button>
              <button
                onClick={onClickedDisspointed}
                type="button"
                className="flex gap-1.5 items-center"
                disabled={isNextFeedback || isTypingOn}>
                <img
                  loading="lazy"
                  alt="Didnt answer"
                  src={isNextFeedback ? didntAnswerFilled : didntAnswer}
                  className="shrink-0 w-4 aspect-square"
                />
                <div>Didn&apos;t Answer Question</div>
              </button>
              {isCommentary && isLastMsg ? (
                <button
                  // onClick={onClickedDisspointed}
                  type="button"
                  className="flex gap-1.5 items-center font-bold"
                  disabled={isNextFeedback || isTypingOn}
                  onClick={goToNextSlide}>
                  <img loading="lazy" alt="Continue" src={continueBtn} className="shrink-0 w-4 aspect-square" />
                  <div>Continue</div>
                </button>
              ) : (
                <div />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

DisplayChatMessage.defaultProps = {
  userImgUrl: '',
  companyImgUrl: ''
};
