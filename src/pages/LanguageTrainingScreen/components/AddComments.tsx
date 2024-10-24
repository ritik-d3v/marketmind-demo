import { useState } from 'react';

export interface AddCompanyCommentsProps {
  id: string;
  name: string;
  companySymbol: string;
  suggestedQuestions: {
    id: string;
    question: string;
    comments: string[];
  }[];
}

interface ShowGeneratedQuestionsProps {
  question: string;
}

const addIcon = '/assets/icons/add.svg?react';
const sendIcon = '/assets/icons/send_white.svg?react';

function ShowGeneratedQuestions({ question }: Readonly<ShowGeneratedQuestionsProps>) {
  const [isAddCommentClicked, setIsAddCommentClicked] = useState(false);
  const [comment, setComment] = useState('');

  return (
    <div className="flex flex-col justify-center px-2 max-md:max-w-full grow">
      <div className="text-sm leading-5 text-[#B7CFDE] w-full ">{question}</div>
      {isAddCommentClicked && (
        <div className="flex gap-4 mt-4 max-md:flex-wrap w-full 2xl:w-[420px] 2xl:min-w-[420px] 4xl:w-[500px] 4xl:min-w-[500px]">
          <div className="flex gap-2.5 justify-center px-4 py-2.5 text-xs leading-5 rounded-lg border border-solid border-slate-400 max-md:flex-wrap w-full xl:w-4/5 xl:min-w-[80%] 2xl:w-[420px] 2xl:min-w-[420px] 4xl:w-[500px] 4xl:min-w-[500px] grow">
            <input
              className="w-full outline-none text-xs bg-[#0A2537] placeholder:text-[#B7CFDE]"
              type="text"
              placeholder="Your comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="button">
              <img loading="lazy" alt="add" src={sendIcon} className="shrink-0 w-5 aspect-square" />
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        className="flex gap-1.5 justify-between self-start p-0.5 mt-4 text-xs leading-4"
        onClick={() => setIsAddCommentClicked((prev) => !prev)}>
        <img loading="lazy" alt="" src={addIcon} className="shrink-0 w-4 aspect-square" />
        <div>Add Question/Comment</div>
      </button>
    </div>
  );
}

export default function AddComments({ id, suggestedQuestions, name, companySymbol }: Readonly<AddCompanyCommentsProps>) {
  const [hasGeneratedQuestions, setHasGeneratedQuestions] = useState(false);
  return (
    <div className="flex gap-3 py-4 text-white max-md:flex-wrap border-b border-[#1E4863] last:border-b-0" key={id}>
      <div className="flex items-center self-start text-base gap-4 w-[200px] min-w-[200px]">
        <div className="flex justify-center items-center px-4  py-1.5 bg-[#234D69] font-semibold rounded w-20 min-w-20">
          {companySymbol}
        </div>
        <div className="text-[10px] text-[#89A4B5] leading-4 pr-2">{name}</div>
      </div>

      {hasGeneratedQuestions ? (
        <div className="">
          {suggestedQuestions.map(({ id: questionID, question }, index) => (
            <div className="flex gap-4 border-l border-[#234D69] px-4 mb-8 last:mb-4" key={questionID + companySymbol}>
              <div className="flex flex-col justify-center self-start text-base tracking-tight leading-5 text-center whitespace-nowrap">
                <div className="flex justify-center items-center px-2 w-11 h-11 bg-[#1C4661] rounded-full">{`${index < 10 && '0'}${index + 1}.`}</div>
              </div>
              <ShowGeneratedQuestions question={question} />
            </div>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setHasGeneratedQuestions((prev) => !prev)}
          className="flex items-center gap-1 bg-[#234D69] text-white rounded px-2">
          <img src={addIcon} alt="add" />
          <span>Generate Suggested Questions</span>
        </button>
      )}
    </div>
  );
}
