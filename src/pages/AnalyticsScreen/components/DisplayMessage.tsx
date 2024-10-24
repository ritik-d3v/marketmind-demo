import { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import ReactHtmlParser from 'react-html-parser';

interface DisplayMessageProps {
  prompt: string;
  response: string | React.ReactNode;
}

const edit = '/assets/icons/edit.svg';

export default function DisplayMessage({ prompt, response }: DisplayMessageProps) {
  const promptRef = useRef<HTMLDivElement | null>(null);
  const responseRef = useRef<HTMLDivElement | null>(null);
  const [isPromptVerticallyCentered, setIsPromptVerticallyCentered] = useState(false);
  const [isResponseVerticallyCentered, setIsResponseVerticallyCentered] = useState(false);
  const [res, setRes] = useState<string>('');

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

  return (
    <div className="">
      {prompt && (
        <>
          <div
            className={`flex gap-5 px-5 mt-6 text-white max-md:flex-wrap ${isPromptVerticallyCentered ? 'items-center' : 'items-start'}`}>
            <div className="flex flex-col justify-center my-auto text-xs font-semibold text-center whitespace-nowrap">
              <div className="flex justify-center items-center px-3.5 w-10 h-10 rounded-full bg-slate-600">PD</div>
            </div>
            <div className="text-sm leading-6 max-md:max-w-full" ref={promptRef}>
              {prompt}
            </div>
          </div>
          <div
            className={`flex gap-5 px-5 mt-8 text-sm leading-6 text-white max-md:flex-wrap ${isResponseVerticallyCentered ? 'items-center' : 'items-start'}`}>
            <img
              loading="lazy"
              src="/assets/images/companyLogoMini.png"
              className="shrink-0 self-start w-10 aspect-square rounded-full object-cover"
              alt="company Logo"
            />
            <div className="max-md:max-w-full" ref={responseRef}>
              {ReactHtmlParser(res)}
            </div>
          </div>
          <div className="flex justify-end self-end items-end mt-1 text-center text-[10px] 2xl:py-4">
            <div className="flex gap-2 px-5 border-r-2 border-[#1F4A67]">
              <div className="my-auto text-xs text-slate-400">Last viewed by</div>
              <div className="flex flex-col justify-center text-xs font-semibold text-white whitespace-nowrap">
                <div className="flex justify-center items-center px-1 w-4 h-4 bg-pink-400 rounded-full text-[6px]">RD</div>
              </div>
            </div>
            <div className="flex gap-1.5 px-5 text-xs rounded-2xl text-slate-400 cursor-pointer">
              <img loading="lazy" src={edit} className="shrink-0 w-4 aspect-square" alt="edit" />
              <div className="my-auto">Improve Anwser </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
