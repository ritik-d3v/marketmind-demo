import { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import Switch from 'src/components/ToggleSwitch';

const editIcon = '/assets/icons/edit.svg?react';
const add2 = '/assets/icons/add2.svg?react';
const mastermindLogo = '/assets/icons/mastermind_logo.svg?react';

interface QuestionProps {
  questionNumber: string;
  questionText: string;
  answer?: string;
  editorComment?: string;
  requiresApproval?: boolean;
  fyiOnly?: boolean;
  userImgUrl?: string;
  userInitials?: string;
  isEdit?: string;
  editablefunc: (e: string) => void;
}

const questions = [
  {
    questionNumber: '01.',
    questionText: 'If you get delisted, which exchange(s) will you continue to trade on? Include the listing tier on each exchange.',
    answer:
      "If EGLX gets delisted from NASDAQ, it would continue to trade on the OTC Markets in the USA under the OTCQX tier. The OTCQX tier is reserved for the highest-quality companies. The Company's listing on the TSX in Canada would remain unaffected.",
    editorComment: "Editor's comments",
    requiresApproval: true
  },
  {
    questionNumber: '02.',
    questionText: 'Do you believe that any of your significant shareholders will not be able to hold stock on any of those exchanges?',
    answer:
      "If EGLX gets delisted from NASDAQ, it would continue to trade on the OTC Markets in the USA under the OTCQX tier. The OTCQX tier is reserved for the highest-quality companies. The Company's listing on the TSX in Canada would remain unaffected.",
    editorComment: "Editor's comments",
    requiresApproval: true
  },
  {
    questionNumber: '03.',
    questionText: 'If you get delisted, how will it affect your operations?',
    answer:
      "If EGLX gets delisted from NASDAQ, it would continue to trade on the OTC Markets in the USA under the OTCQX tier. The OTCQX tier is reserved for the highest-quality companies. The Company's listing on the TSX in Canada would remain unaffected.",
    editorComment: "Editor's comments",
    requiresApproval: true
  },
  {
    questionNumber: '04.',
    questionText: "Can I get a summary of today's press release?",
    answer:
      "If EGLX gets delisted from NASDAQ, it would continue to trade on the OTC Markets in the USA under the OTCQX tier. The OTCQX tier is reserved for the highest-quality companies. The Company's listing on the TSX in Canada would remain unaffected.",
    editorComment: "Editor's comments",
    requiresApproval: true
  },
  {
    questionNumber: '05.',
    questionText: 'If you get delisted, how will it affect your public disclosures?',
    answer:
      "If EGLX gets delisted from NASDAQ, it would continue to trade on the OTC Markets in the USA under the OTCQX tier. The OTCQX tier is reserved for the highest-quality companies. The Company's listing on the TSX in Canada would remain unaffected.",
    editorComment: "Editor's comments",
    requiresApproval: true
  },
  {
    questionNumber: '06.',
    questionText: 'If you get delisted, how will it affect your access to any capital you might need over the next 24 months?',
    answer:
      "If EGLX gets delisted from NASDAQ, it would continue to trade on the OTC Markets in the USA under the OTCQX tier. The OTCQX tier is reserved for the highest-quality companies. The Company's listing on the TSX in Canada would remain unaffected.",
    editorComment: "Editor's comments",
    requiresApproval: true
  }
];

function Question({
  questionNumber,
  questionText,
  answer,
  editorComment,
  requiresApproval,
  userImgUrl,
  userInitials,
  isEdit = '',
  fyiOnly = false,
  editablefunc
}: Readonly<QuestionProps>) {
  const [isChecked, setIsChecked] = useState(true);
  const [isFyi, setIsFyi] = useState(fyiOnly);

  return (
    <div className="flex-col">
      <div className="flex mt-6 items-center justify-between">
        <div className="flex items-center gap-4 w-[90%]">
          <div className="flex flex-col justify-center text-base tracking-tight leading-5 text-center text-white whitespace-nowrap">
            <div className="justify-center items-center p-3 bg-cyan-900 rounded-full">{questionNumber}</div>
          </div>
          <div className="text-sm leading-6 text-slate-300">{questionText}</div>
          {/*
            <textarea
              id="editorcomment"
              placeholder="your question"
              value={questionText}
              aria-label="Type your question"
              className="justify-center px-4 text-xs py-3 w-full outline-none rounded-lg border border-solid border-slate-400 leading-[167%] max-md:max-w-full bg-transparent text-[#B7CFDE]"
            />
           */}
        </div>
        <button
          type="button"
          onClick={() => editablefunc(questionNumber)}
          className="flex gap-1.5 my-auto text-xs text-center rounded-2xl text-slate-400">
          <img loading="lazy" src={editIcon} alt="" className="shrink-0 w-4 aspect-square" />
          <div className="my-auto">Edit</div>
        </button>
      </div>

      {isEdit === questionNumber && (
        <div className="flex-col pl-16">
          {answer && (
            <div className="text-xs">
              <textarea
                id="answer"
                placeholder="Please type your answer here"
                aria-label="Please type your answer here"
                rows={3}
                value={answer}
                className="justify-center p-4 mt-3 w-full outline-none leading-5 rounded-lg border border-solid border-slate-400 max-md:max-w-full bg-transparent text-[#B7CFDE]"
              />
            </div>
          )}
          {editorComment && (
            <div className="flex gap-4 mt-4 max-md:flex-wrap w-full justify-between">
              <div className="flex flex-col justify-center text-xs font-semibold text-center text-white whitespace-nowrap">
                {userImgUrl ? (
                  <img loading="lazy" alt="bot profile" src={userImgUrl} className="shrink-0 self-start w-10 h-10 aspect-square" />
                ) : (
                  <div className="flex justify-center items-center w-10 h-10 bg-red-400 rounded-full">{userInitials}</div>
                )}
              </div>
              <div className="w-[80%] text-xs">
                <input
                  type="text"
                  id="editorcomment"
                  placeholder={editorComment}
                  aria-label="Type your question"
                  className="justify-center px-4 py-3 w-full outline-none rounded-lg border border-solid border-slate-400 leading-[167%] max-md:max-w-full bg-transparent text-[#B7CFDE]"
                />
              </div>
              <div className="flex gap-1.5 my-auto text-xs text-center whitespace-nowrap rounded-2xl text-slate-400">
                <img loading="lazy" src={editIcon} alt="" className="shrink-0 w-4 aspect-square" />
                <div className="my-auto">Edit</div>
              </div>
            </div>
          )}
          {requiresApproval && (
            <div className="flex gap-4 pr-20 mt-4 max-md:flex-wrap max-md:pr-5">
              <div className="flex gap-3">
                <div className="my-auto text-xs text-slate-400">Requires Approval</div>
                <Switch id="newsletter" checked={isChecked} onChange={(checked) => setIsChecked(checked)} />
              </div>
              <div className="flex gap-2.5 my-auto text-xs leading-5 text-slate-400">
                <Checkbox
                  id="fyi"
                  checked={isFyi}
                  additionalClass="after:bg-btn-green scale-150"
                  label="FYI Only"
                  onChange={() => setIsFyi((prev) => !prev)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CustomQuestionForm() {
  return (
    <div className="flex gap-4 mt-6 max-md:flex-wrap w-full">
      <div className="flex justify-center items-center self-start p-3.5 bg-slate-200 rounded-[100px]">
        <img loading="lazy" src={add2} alt="" className="w-4 aspect-square fill-cyan-950" />
      </div>
      <div className="flex flex-col text-xs text-slate-300 max-md:max-w-full w-full">
        <label htmlFor="customQuestion" className="sr-only">
          Type your question
        </label>
        <input
          type="text"
          id="customQuestion"
          placeholder="Type your question"
          aria-label="Type your question"
          className="justify-center px-4 py-3 outline-none rounded-lg border border-solid border-slate-400 leading-[167%] max-md:max-w-full bg-transparent text-[#B7CFDE]"
        />
        <label htmlFor="customAnswer" className="sr-only">
          Please type your answer here
        </label>
        <textarea
          id="customAnswer"
          placeholder="Please type your answer here"
          aria-label="Please type your answer here"
          rows={4}
          className="justify-center p-4 mt-3 outline-none leading-5 rounded-lg border border-solid border-slate-400 max-md:max-w-full bg-transparent text-[#B7CFDE]"
        />
        <button
          type="submit"
          className="justify-center self-start px-5 py-3 mt-3 font-semibold text-center whitespace-nowrap bg-slate-200 rounded-[100px] text-cyan-950">
          Submit
        </button>
      </div>
    </div>
  );
}

interface CommentaryProps {
  userImgUrl?: string;
  userInitials?: string;
}

function SupplementaryCommentary({ userImgUrl, userInitials = 'JM' }: Readonly<CommentaryProps>) {
  const [editable, setEditable] = useState('01.');

  const handleEdit = (e: string) => {
    if (editable === e) setEditable('');
    else setEditable(e);
  };

  return (
    <div className="flex flex-col m-10 max-md:p-5 max-md:max-w-full">
      <h1 className="text-2xl font-semibold leading-8 text-white max-md:max-w-full">Supplementary Commentary</h1>
      <h2 className="mt-2 text-base font-semibold text-slate-300 max-md:max-w-full">Recommended Questions</h2>
      <div className="flex gap-4">
        <img loading="lazy" src={mastermindLogo} alt="" width={24} height={24} className="shrink-0 aspect-square" />
        <h3 className="my-4 text-xs text-slate-300">Based on your draft press release, we recommend answering the following questions:</h3>
      </div>
      {questions.map((question) => (
        <Question
          key={question.questionNumber}
          userImgUrl={userImgUrl}
          isEdit={editable}
          editablefunc={handleEdit}
          userInitials={userInitials}
          {...question}
        />
      ))}
      <h2 className="mt-11 text-base font-semibold text-white max-md:mt-10 max-md:max-w-full">Custom Questions and Comments</h2>
      <CustomQuestionForm />
    </div>
  );
}
SupplementaryCommentary.defaulProps = {
  userImgUrl: '',
  userInitials: 'JM'
};
Question.defaulProps = {
  answer: '',
  editorComment: '',
  requiresApproval: false,
  userImgUrl: '',
  userInitials: 'JM',
  fyionly: false,
  isEdit: ''
};

export default SupplementaryCommentary;
