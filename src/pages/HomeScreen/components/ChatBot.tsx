/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiRequestData } from 'src/types';
import { useAuth } from 'src/context/AuthContext';
import { useChatHistory } from 'src/context/ChatHistoryContext';
// import { fetchChatResponse } from 'src/api/fetchChatResponse';
import useResizeHook from 'src/hooks/Resizable';
import './components.css';
import { ChatMessageProps } from './commonTypes';
import PDFViewer from './PDFViewer';
import DisplayChatMessage from './DisplayChat';

interface ChatBotProps {
  title: string;
  companyName: string;
  companySymbol: string;
  companyLogo: string;
  companyImgUrl?: string;
  companyInitials?: string;
  userImgUrl?: string;
  userInitials?: string;
  suggestionPrompt: string;
  handleSuggestionPrompt: (val: string) => void;
  themeColor: string;
  isCorporatePresOn: boolean;
  handleCorporatePresentation: (val: boolean) => void;
  handleDisableCorpPresBtn: (val: boolean) => void;
  suggestionSlideTitle: string;
  handleSuggestionSlideTitle: (val: string) => void;
  lastUpdateAsked: boolean;
  handleSinceLastUpdate: () => void;
}

interface PdfListProps {
  id: string;
  name: string | undefined;
  source: string;
  page_content: string;
  page: number;
}

const microphone = '/assets/icons/mic.svg?react';
const send = '/assets/icons/send.svg?react';
const speaker = '/assets/icons/speaker.svg?react';
const resize = '/assets/icons/move.svg?react';
const resizeGrey = '/assets/icons/grey-move.svg?react';

const updateAnswer = `Since your last visit in September, we’ve announced the following:
 
<strong>Coinbase Partnership: </strong>On Sept 8, 2022 we announced a partnership with Coinbase Global (NASDAQ:COIN), one of the world’s largest cryptocurrency platforms which introduces Coinbase as the preferred infrastructure provider to power Enthusiast Gaming’s portfolio of Web3-enabled games. Coinbase will provide developer tools, educational content, and community-building support to power Enthusiast Gaming’s portfolio of Web3-enabled games. This includes crypto wallets, blockchain nodes, and fiat-to-crypto payment rails that enable EGLX’s gamers to easily send, receive, and manage the cryptocurrency they earn from EV.IO.
 
<strong>Addicting Games Earn-Out</strong>: On June 3, 2022, we settled certain deferred and earn-out payments in connection with our acquisitions of Addicting Games, Inc. We had acquired this Addicting Games in 2020 and the purchase price involved an earn out based on revenue. This would have resulted in an obligation of $40 million over the next 3 years. We are pleased that Addicting Games has agreed to take this amount in common shares of EGLX. This effectively eliminates our cash obligations and reflects the confidence that Addicting Games shareholders have in our common shares.
 
<strong>Netflix Partnership: </strong>On December 1, 2022, we announced a partnership with Netflix to launch the Geeked:Toonin live stream weekly on Netflix's Twitch account and the Geeked TikTok account. Under the partnership, Enthusiast Gaming is developing TikTok and Twitch content together with the show’s writers and will add this content to their social feeds every Thursday for the next 12 months. Young audiences and animation fans can interact with each other and hear news of full episodes of Netflix programs. The show also features games, live Q&A sessions and exclusive sneak peeks at upcoming series. This reflects the rapid growth of our branded entertainment service whereby we charge fees for creative development and ongoing hosting.
 
These developments since your last visit significantly improve our revenue through two major client wins, as well as eliminate large cash obligations. Management is continuing to execute upon this strategic turnaround and growth plan and continues to expect the company to be cash flow positive by the end of 2023.`;

const stockAnswer = `According to the most recent insider transaction report, Adrian Montgomery purchased 10,000 shares at an average price of $5.07 on September 13, 2021. This brought his total holdings to 3,218,700. Since this acquisition, Adrian was granted 292,271 options with an exercise price of $2.75 that expire on April 20, 2027.
       
No other insider have acquired or disposed of shares since this time, however some have been issued options and rights issuances.`;

const disappointedResponse = 'Ok thanks. We will contact management and get back to you.';
const loginResponse = 'You are not logged in. Click here to Sign in.';

export default function ChatBot({
  title,
  companyName,
  companySymbol,
  companyLogo,
  suggestionPrompt,
  themeColor,
  companyImgUrl = '',
  userImgUrl = '',
  companyInitials = 'AI',
  userInitials = 'US',
  isCorporatePresOn,
  handleCorporatePresentation,
  handleDisableCorpPresBtn,
  suggestionSlideTitle,
  handleSuggestionSlideTitle,
  handleSuggestionPrompt,
  lastUpdateAsked,
  handleSinceLastUpdate
}: Readonly<ChatBotProps>) {
  const [userPrompt, setUserPrompt] = useState('');
  const { chatHistory, setChatHistory } = useChatHistory();
  const [isTypingOn, setIsTypingOn] = useState(false);
  const [pdfList, setPdfList] = useState<PdfListProps[]>([]);
  const [shouldScroll, setShouldScroll] = useState(true); // State to control auto-scroll
  const [loading, setLoading] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const { boxStyle, resizeFrame, stopResize, startResize, handleMouseLeave, isHovered, handleMouseEnter, boxStyle2 } = useResizeHook();

  const welcomeResponse = `Welcome to ${companyName} chat. Please ask me anything about the company in the chat box below.`;

  const [scrollBottom, setScrollBottom] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const chatBotRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    handleDisableCorpPresBtn(isTypingOn);
  }, [handleDisableCorpPresBtn, isTypingOn]);

  // const scrollToBottom = () => {
  //   const scrollContainer = chatBotRef.current;
  //   if (scrollContainer) {
  //     scrollContainer.scrollTop = scrollContainer.scrollHeight;
  //   }
  // };

  // const isElementAtTop = useCallback((container: HTMLDivElement | null, element: Element | null) => {
  //   // Get the bounding rectangle of the container and the target element
  //   if (container && element) {
  //     const containerRect = container.getBoundingClientRect();
  //     const elementRect = element.getBoundingClientRect();

  //     // Calculate the element's top position relative to the container's top
  //     const elementTopRelativeToContainer = elementRect.top - containerRect.top;

  //     // Check if the element's top position is within the viewable area of the container
  //     return elementTopRelativeToContainer <= 104;
  //   }

  //   return false;
  // }, []);

  const isElementAtTop = useCallback((container: HTMLDivElement | null, element: Element | null, percentage: number = 24) => {
    if (container && element) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const elementTopRelativeToContainer = elementRect.top - containerRect.top;

      // Calculate the dynamic threshold as a percentage of the container's height
      const dynamicThreshold = (containerRect.height * percentage) / 100;

      // Optionally, set minimum and maximum values for the threshold
      const minThreshold = 105; // Minimum threshold in pixels
      const maxThreshold = 150; // Maximum threshold in pixels

      const finalThreshold = Math.max(minThreshold, Math.min(dynamicThreshold, maxThreshold));

      return elementTopRelativeToContainer <= finalThreshold;
    }

    return false;
  }, []);

  // Function to handle automatic scrolling
  const scrollToBottom = useCallback(() => {
    const targetElement = document.querySelector('.final_chat_message_container');

    if (shouldScroll) {
      const scrollContainer = chatBotRef.current;
      const elementAtTop = isElementAtTop(scrollContainer, targetElement);

      if (scrollContainer && !elementAtTop) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [isElementAtTop, shouldScroll]);

  // Effect to handle automatic scrolling
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom, userPrompt, isCorporatePresOn]); // Scroll when chat history updates

  // Detect when user is scrolling
  const handleUserScroll = () => {
    const scrollContainer = chatBotRef.current;
    if (scrollContainer) {
      // Check if the user is close to the bottom (within 100px)
      const isNearBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.clientHeight < 50;
      console.log('Should Scroll: ', isNearBottom);
      setShouldScroll(isNearBottom);
    }
  };

  // const handleTypeComplete = (chatId: string, response: string | ReactNode, showSuggestion: boolean) => {
  //   setIsTypingOn(false);
  //   setChatHistory((prevChatHistory) =>
  //     prevChatHistory.map((chat) => (chat.id === chatId ? { ...chat, response, showSuggestions: showSuggestion } : chat))
  //   );
  // };

  // const handleDataChunk = (chatId: string, chunk: string) => {
  //   try {
  //     const data: ApiResponse = JSON.parse(chunk);

  //     // Update only the response part in the state
  //     setLoading(false);

  //     setChatHistory((prevChatHistory) =>
  //       prevChatHistory.map((chat) =>
  //         chat.id === chatId
  //           ? {
  //               ...chat,
  //               response: (chat.response as string) + data.response // Append new response text to existing response
  //             }
  //           : chat
  //       )
  //     );

  //     // Check if this is a new chat session and if there are source documents to be added
  //     if (data.source_documents.length > 0) {
  //       const extractedPDFs = data.source_documents
  //         .map((doc) => {
  //           const docName = doc.metadata.metadata.source.split('/').pop();
  //           return {
  //             id: doc.metadata.id,
  //             name: docName || 'Document',
  //             source: doc.metadata.pdf_file_name,
  //             page_content: doc.page_content,
  //             page: doc.metadata.metadata?.page
  //           };
  //         })
  //         .filter((doc) => !doc.name.includes('(Anticipated Questions)'));
  //       // place nasdaq files at the first index

  //       const nasdaqRegex = /nasdaq/i;
  //       const nasdaqIndex = extractedPDFs.findIndex((doc) => nasdaqRegex.test(doc.name));
  //       if (nasdaqIndex !== -1) {
  //         const nasdaqDoc = extractedPDFs.splice(nasdaqIndex, 1)[0];
  //         extractedPDFs.unshift(nasdaqDoc);
  //       }
  //       // Set PDF list only if it is a new chat or the current chat demands it
  //       setPdfList((prevPdfList) => {
  //         // If the chatId has changed (implying a new chat session), reset the pdfList
  //         if (!prevPdfList.length || prevPdfList[0].id !== extractedPDFs[0].id) {
  //           return extractedPDFs;
  //         }
  //         // Otherwise, return the previous PDF list to avoid unnecessary re-renders
  //         return prevPdfList;
  //       });
  //     }
  //   } catch (e) {
  //     // console.error('Failed to parse chunk:', e); // Error handling for JSON parsing
  //   }
  // };

  const simulateStreaming = (chatId: string, answer: string) => {
    setIsTypingOn(true); // Set typing indicator on before streaming starts

    const words = answer.split(' ');

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        const nextWords = words.slice(currentIndex, currentIndex + 2).join(' ');
        setChatHistory((prevChatHistory) =>
          prevChatHistory.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  response: `${chat.response as string} ${nextWords}` // Append new response text to existing response
                }
              : chat
          )
        );
        currentIndex += 2;
      } else {
        setLoading(false);
        clearInterval(interval);
        setIsTypingOn(false); // Set typing indicator off after streaming completes
      }
    }, 100); // Delay between adding each pair of words
  };

  const handleClick = useCallback(
    async (prompt?: string) => {
      if (!userPrompt.trim() && !prompt?.trim()) return; // Avoid sending empty messages
      console.log('Handle Click');

      // if (bottomRef.current) {
      //   bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
      // }
      // bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      // window.scrollTo({
      // top: document.documentElement.scrollHeight,
      // behavior: 'auto'
      /* you can also use 'auto' behaviour 
               in place of 'smooth' */
      // });
      // window.scrollTo(0, document.body.scrollHeight);

      setLoading(true);
      scrollToBottom();
      const currentPrompt = prompt || userPrompt;
      let chatId = Date.now().toString();
      // if (userPrompt)
      setUserPrompt(''); // Clear the input field immediately if the user has typed in the question, else clear it after one second
      // else {
      //   setTimeout(() => {
      //     setUserPrompt('');
      //   }, 1500);
      // }
      handleCorporatePresentation(false);
      if (chatHistory.at(-1)?.id.includes('_Dissapointed')) {
        chatId = `${Date.now().toString()}_Feedback`;
      }
      const newMessage: ChatMessageProps = { id: chatId, prompt: currentPrompt, response: '', showSuggestions: true, isCommentary: false };
      setChatHistory((prev) => [...prev, newMessage]);

      const collection_name = companySymbol;

      if (user) {
        const requestData: ApiRequestData = {
          model: 'anthropic',
          variation: 'claude-3-5-sonnet@20240620',
          messages: [{ role: 'user', content: currentPrompt }],
          temperature: 0,
          collection_name: collection_name,
          company_name: companyName,
          get_signed_urls: true,
          template: 'investor_relations'
        };
        setScrollBottom(false);
        setIsTypingOn(true);

        if (chatHistory.at(-1)?.id.includes('_Dissapointed')) {
          handleCorporatePresentation(chatHistory[chatHistory.length - 2].isCommentary);
          simulateStreaming(chatId, disappointedResponse);

          // handleTypeComplete(
          //   chatId,
          //   <ReactTyped
          //     strings={[disappointedResponse]}
          //     typeSpeed={9}
          //     startWhenVisible={false}
          //     onComplete={() => handleTypeComplete(chatId, disappointedResponse, false)}
          //     onBegin={() => {
          //       setLoading(false);
          //       setIsTypingOn(true);
          //     }}
          //   />,
          //   false
          // );
        } else {
          try {
            if (isCorporatePresOn) {
              handleCorporatePresentation(false);
            }

            if (currentPrompt === 'Has management bought any stock recently?' && companySymbol === 'EGLX') {
              setLoading(false);
              simulateStreaming(chatId, stockAnswer);
              setPdfList([
                {
                  id: 'qwtxeyhfjnbv234567i5432cx_stock_pdf',
                  name: 'SEDI-EGLX Insider Filings.pdf',
                  source: '/assets/SEDI-EGLX Insider Filings.pdf',
                  page_content: '',
                  page: 45
                }
              ]);
            } else {
              const scrollContainer = chatBotRef.current;
              if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
              handleUserScroll();

              // const res = await fetch(`http://127.0.0.1:8000/get_response_redis`, {
              const res = await fetch(`${import.meta.env.VITE_RAPID_RAG_URL}/get_response_redis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
              });

              const data = await res.json();

              setLoading(false);

              if (data) {
                if (data.source_docs.length > 0) {
                  const updatedPdfList = data.source_docs
                    .map((doc:any, index:number) => ({
                      id: doc,
                      name: decodeURIComponent(doc.split('/').pop()?.split('?')[0]),
                      page_content: '',
                      source: doc,
                      page: data.page_numbers[index]
                    }))
                    .filter((pdf:any) => !pdf.name?.includes('commentary') && !pdf.name?.includes('(Anticipated Questions)'));

                  setPdfList(updatedPdfList);
                }
                //   const extractedPDFs = data.source_docs
                //     .map((doc) => {
                //       const docName = doc.metadata.metadata.source.split('/').pop();
                //       return {
                //         id: doc.metadata.id,
                //         name: docName || 'Document',
                //         source: doc.metadata.pdf_file_name,
                //         page_content: doc.page_content,
                //         page: doc.metadata.metadata?.page
                //       };
                //     })
                //     .filter((doc) => !doc.name.includes('(Anticipated Questions)'));
                //   // place nasdaq files at the first index

                //   const nasdaqRegex = /nasdaq/i;
                //   const nasdaqIndex = extractedPDFs.findIndex((doc) => nasdaqRegex.test(doc.name));
                //   if (nasdaqIndex !== -1) {
                //     const nasdaqDoc = extractedPDFs.splice(nasdaqIndex, 1)[0];
                //     extractedPDFs.unshift(nasdaqDoc);
                //   }
                //   // Set PDF list only if it is a new chat or the current chat demands it
                //   setPdfList((prevPdfList) => {
                //     // If the chatId has changed (implying a new chat session), reset the pdfList
                //     if (!prevPdfList.length || prevPdfList[0].id !== extractedPDFs[0].id) {
                //       return extractedPDFs;
                //     }
                //     // Otherwise, return the previous PDF list to avoid unnecessary re-renders
                //     return prevPdfList;
                //   });
                // }
                //   setPdfList(data.output.source_docs.map((sd: { pdf_path: string | null }) => sd.pdf_path));
                //                 if (currentPrompt == 'How are you valued?') {
                //                   const currRes = `<p>EGLX values itself against comparable stocks in the e-gaming industry. Investors who have a bullish view on this sector can get exposure via these stocks. EGLX believes that it offers good value relative to its peers because it is currently less expensive than the industry average, which suggests better value and upside as EGLX’s performance is recognized by the market.</p>
                // <p>Comparable e-gaming stocks are trading at an average of 6.2x their revenue from the last 12 months while EGLX is trading at just 1.7x revenue. If EGLX were to increase to the industry average, the stock would be 264% higher than its current price.</p>
                // <p>EGLX believes that its stock has declined below the industry average because of its recent CEO departure and our new CEO’s focus on shedding less profitable legacy business lines to improve our overall operational efficiency. Now that this strategy is showing strong results, we believe that our stock merits a return to the industry average.</p>
                // `;
                //                   simulateStreaming(chatId, currRes);
                //                 } else if (currentPrompt == 'How do you make money?') {
                //                   const currRes = `<p>We make money three ways:</p>
                // <ol>
                //     <li>
                //         <strong>Gaming Communities:</strong> We operate a network of websites where e-gaming enthusiasts can discuss the latest developments in online gaming and their favorite gaming celebrities. We generate revenue through advertising.
                //     </li>
                //     <li>
                //         <strong>Talent & eSports:</strong> We act as talent agents for many successful high-profile gaming celebrities (“gamers”) who have achieved high rankings in Rocket League, Call of Duty, and other popular games. We generate revenue by signing exclusive rights to these gamers and selling merchandise and brand sponsorships.
                //     </li>
                //     <li>
                //         <strong>Gaming Entertainment:</strong> We own several of the industry’s most prominent gaming events, including ev.io and Addicting Games. These events are held around the world and are attended by tens of thousands of visitors. We generate revenue through ticket sales, booth rentals, and sponsorships. Additionally, we are increasingly taking these experiences online with brand partnerships such as our NFL Tuesday Night Gaming experience. We generate revenue through these experiences by charging for creative development and traffic generation through our massive e-gaming community network.
                //     </li>
                // </ol>
                // `;
                //                   simulateStreaming(chatId, currRes);
                //                 } else if (currentPrompt == 'What happens if you get delisted from NASDAQ?') {
                //                   const currRes = `<p>If we get delisted from NASDAQ, we will continue trading in the USA by being moved to the top-tier OTCQX listing on the OTC market. Our Canadian listing on the TSX will not be affected, and we will maintain the same high standard of financial disclosure as before, in line with the TSX requirements. Our operations will be unaffected.</p>
                // <p>While delistings from NASDAQ can impact our credibility with US investors, we believe that the rebound in our stock several months after the delisting concern arose could suggest that the negative effect of the potential delisting has already been priced into the stock.</p>
                // <p>Our current stock price values us at 1.7x revenue, while other e-gaming stocks are trading at 6.2x revenue. This is approximately 264% higher than our valuation. We are aware of many new US institutional investors who have been buying recently.</p>
                // `;
                //                   simulateStreaming(chatId, currRes);
                //                 } else if (currentPrompt == 'What is the OTCQX tier?') {
                //                   const currRes = `<p>The OTCQX is the highest quality tier of companies listed on the OTC markets. The lower tiers are the OTCQB (formerly the OTCBB) and the Pink Sheets. Unlike many companies in the lower tiers, companies in the OTCQX tier are subject to SEC regulation and cannot be shells, penny stocks, or in a state of financial distress.</p>
                // <p>EGLX has net assets of over $10 million and revenue in excess of $200 million, which far exceed the minimum requirements of the OTCQX tier.</p>
                // `;
                //                   simulateStreaming(chatId, currRes);
                //                 }
                // else {
                simulateStreaming(chatId, data.response);
                // }
              }

              // await fetchChatResponse(requestData, (chunk) => handleDataChunk(chatId, chunk));
            }
          } catch (error) {
            // console.error('Failed to fetch chat response:', error);
            setLoading(false);
            // handleTypeComplete(chatId, 'Failed to fetch response. Please try again.', false);
            simulateStreaming(chatId, 'Failed to fetch response. Please try again.');
          }
        }
      } else {
        simulateStreaming(chatId, loginResponse);
        // handleTypeComplete(
        //   chatId,
        //   <ReactTyped
        //     strings={[loginResponse]}
        //     typeSpeed={9}
        //     startWhenVisible={false}
        //     onComplete={() => handleTypeComplete(chatId, loginResponse, false)}
        //     onBegin={() => {
        //       setLoading(false);
        //       setIsTypingOn(true);
        //     }}
        //   />,
        //   false
        // );
      }
    },
    [chatHistory, handleCorporatePresentation, isCorporatePresOn, scrollToBottom, user, userPrompt]
  );

  const handleSlideCommentary = useCallback((val: ChatMessageProps) => {
    if (val.prompt && val.response) {
      const chatId = val.id + Date.now().toString();
      const { response } = val;
      // setIsTypingOn(true);
      setShouldScroll(true);
      setChatHistory((prev) => [...prev, { ...val, response: '', id: chatId }]);

      setUserPrompt(val.prompt);
      simulateStreaming(chatId, response.toString());
      setTimeout(() => {
        setUserPrompt('');
      }, 1000);

      // scrollToBottom();

      // handleTypeComplete(
      //   chatId,
      //   <ReactTyped
      //     strings={[response.toString()]}
      //     typeSpeed={9}
      //     startWhenVisible={false}
      //     onComplete={() => {
      //       handleTypeComplete(chatId, response, true);
      //     }}
      //     onBegin={() => setIsTypingOn(true)}
      //   />,
      //   false
      // );
    }
  }, []);

  useEffect(() => {
    if (suggestionPrompt) {
      setUserPrompt(suggestionPrompt);
      setIsTypingOn(true);
      setTimeout(() => {
        handleClick(suggestionPrompt);
        // setUserPrompt('');
      }, 1000);
      handleSuggestionPrompt('');
    }
  }, [handleSuggestionPrompt, suggestionPrompt, handleClick]);

  const onClickedDisspointed = () => {
    const chatId = `${Date.now().toString()}_Dissapointed`;
    const res = 'How did our answer not meet your expectations?';
    const newMessage: ChatMessageProps = {
      id: chatId,
      prompt: '',
      response: '',
      showSuggestions: false,
      isCommentary: false
    };

    setChatHistory((prev) => [...prev, newMessage]);

    simulateStreaming(chatId, res);

    // handleTypeComplete(
    //   chatId,
    //   <ReactTyped
    //     strings={[res]}
    //     typeSpeed={9}
    //     startWhenVisible={false}
    //     onComplete={() => handleTypeComplete(chatId, res, false)}
    //     onBegin={() => setIsTypingOn(true)}
    //   />,
    //   false
    // );
  };

  useEffect(() => {
    if (user) {
      const chatId = `${Date.now().toString()}_Welcome`;
      const newMessage: ChatMessageProps = {
        id: chatId,
        prompt: '',
        response: '',
        showSuggestions: false,
        isCommentary: false
      };

      setChatHistory((prev) => [...prev, newMessage]);

      simulateStreaming(chatId, welcomeResponse);

      // handleTypeComplete(
      //   chatId,
      //   <ReactTyped
      //     strings={[welcomeResponse]}
      //     typeSpeed={9}
      //     startWhenVisible={false}
      //     onComplete={() => handleTypeComplete(chatId, welcomeResponse, false)}
      //     onBegin={() => setIsTypingOn(true)}
      //   />,
      //   false
      // );
    }
  }, [user]);

  useEffect(() => {
    if (user && lastUpdateAsked) {
      (async () => {
        // setLoading(true);
        setIsTypingOn(true);
        setUserPrompt('What’s happened since my last visit?');
        const chatId = `${Date.now().toString()}_Update`;
        const newMessage: ChatMessageProps = {
          id: chatId,
          prompt: 'What’s happened since my last visit?',
          response: '',
          showSuggestions: true,
          isCommentary: false
        };

        // const requestData: ApiRequestData = {
        //   model: 'openai',
        //   variation: 'gpt-4',
        //   messages: [{ user: 'user', content: 'summarize all the 3 most recent press releases' }],
        //   temperature: 0,
        //   RAG_bucket_name: 'eglx-documents'
        // };

        // handleCorporatePresentation(false);
        // await fetchChatResponse(requestData, (chunk) => handleDataChunk(chatId, chunk));

        setTimeout(() => {
          scrollToBottom();
          setChatHistory((prev) => [...prev, newMessage]);

          simulateStreaming(chatId, updateAnswer);

          // handleTypeComplete(
          //   chatId,
          //   <ReactTyped
          //     strings={[updateAnswer]}
          //     typeSpeed={5}
          //     startWhenVisible={false}
          //     onComplete={() => handleTypeComplete(chatId, updateAnswer, true)}
          //     onBegin={() => setIsTypingOn(true)}
          //   />,
          //   true
          // );
          setUserPrompt('');
        }, 1000);
        handleSinceLastUpdate();
      })();
    }
  }, [user, lastUpdateAsked, handleSinceLastUpdate, scrollToBottom]);

  const goToNextSlide = () => {
    setIsContinue(true);
  };

  const resetIsContinue = () => {
    setIsContinue(false);
  };

  return (
    <button type="button" className="flex w-full cursor-default text-left select-text">
      <div style={boxStyle}>
        <div className={`flex flex-col h-full my-3 ml-3 rounded-xl bg-[${themeColor}]`}>
          <div className="chatbot_scroll flex flex-col flex-1 overflow-y-auto" ref={chatBotRef} onScroll={handleUserScroll}>
            <div className="flex flex-col mx-6 max-w-full">
              <div className={`text-2xl font-semibold leading-8 text-cyan-950 max-md:max-w-full sticky top-0 py-6 bg-[${themeColor}]`}>
                {title}
              </div>
              {chatHistory.map(({ id, prompt, response, showSuggestions, isCommentary }, index) => {
                // Check if the next chat message ID includes "_disspointing"
                const nextChatId = index < chatHistory.length - 1 ? chatHistory[index + 1].id : null;
                const isNextFeedback = nextChatId ? nextChatId.includes('_Dissapointed') : false;
                // const updateRes =
                //   id.includes('_Update') && !loading
                //     ? `Since you last visit in ${dateFormat()}, we have announced the following: \n${response}`
                //     : response;
                return (
                  <div key={id}>
                    <DisplayChatMessage
                      id={id}
                      prompt={prompt}
                      response={response}
                      userImgUrl={userImgUrl}
                      companyImgUrl={companyImgUrl}
                      companyInitials={companyInitials}
                      userInitials={userInitials}
                      onClickedDisspointed={onClickedDisspointed}
                      showSuggestions={showSuggestions}
                      isTypingOn={isTypingOn}
                      loading={loading && index === chatHistory.length - 1}
                      isLastMsg={index === chatHistory.length - 1}
                      isNextFeedback={isNextFeedback}
                      isCommentary={isCommentary}
                      goToNextSlide={goToNextSlide}
                      scrollBottom={scrollBottom}
                      bottomRef={bottomRef}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-6 w-full border border-solid min-h-[1px] max-md:max-w-full" style={{ borderColor: themeColor }} />
          </div>
          <div className="flex gap-5 my-5 mx-6 max-md:flex-wrap">
            <div className="flex flex-col mb-3 grow shrink-0 justify-center px-6 bg-white border border-solid basis-0 border-slate-200 rounded-[32px] w-fit max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between max-md:flex-wrap">
                <input
                  type="text"
                  placeholder="Enter a question or comment here"
                  className="my-auto text-sm text-cyan-950 w-full focus-within:outline-none py-4"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isTypingOn) {
                      handleClick('');
                      e.preventDefault();
                    }
                  }}
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsTypingOn(!isTypingOn)} disabled={isTypingOn}>
                    <img alt="microphone" src={microphone} className="h-full" />
                  </button>
                  <button type="button" onClick={() => setIsTypingOn(!isTypingOn)} disabled={isTypingOn}>
                    <img alt="speaker" src={speaker} className="h-full" />
                  </button>
                </div>
              </div>
            </div>
            <button
              className="disabled:cursor-not-allowed"
              type="button"
              onClick={() => handleClick('')}
              disabled={isTypingOn || !userPrompt.trim()}>
              <img alt="send" src={send} className="shrink-0 my-auto w-5 aspect-[0.74] fill-cyan-950" />
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`h-full w-1 ml-2 mt-1 ${isHovered ? 'bg-btn-green' : 'bg-gray-400'}`}
        onDrag={startResize}
        onDragOver={resizeFrame}
        onDragEnd={stopResize}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <img src={isHovered ? resize : resizeGrey} alt="resize" className="absolute w-[40px] -ml-4" />
      </button>
      <div className="bg-[#E3EDF0] mr-3 my-3 ml-2 rounded-xl" style={boxStyle2}>
        <PDFViewer
          pdfList={pdfList}
          companyLogo={companyLogo}
          companySymbol={companySymbol}
          themeColor={themeColor}
          isCorporatePresOn={isCorporatePresOn}
          handleSlideCommentary={handleSlideCommentary}
          suggestionSlideTitle={suggestionSlideTitle}
          handleSuggestionSlideTitle={handleSuggestionSlideTitle}
          isTypingOn={isTypingOn}
          boxWidth={boxStyle2.width}
          isContinue={isContinue}
          goToNextSlide={goToNextSlide}
          resetIsContinue={resetIsContinue}
          // handleCorporatePresentation={handleCorporatePresentation}
        />
      </div>
    </button>
  );
}
