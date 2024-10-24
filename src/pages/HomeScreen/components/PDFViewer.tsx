// Import the main component
import { SpecialZoomLevel, Viewer, Worker, ScrollMode } from '@react-pdf-viewer/core';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { RenderZoomOutProps, RenderZoomInProps, RenderZoomProps } from '@react-pdf-viewer/zoom';
import { RenderGoToPageProps, pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import { RenderDownloadProps } from '@react-pdf-viewer/get-file';
import { highlightPlugin, Trigger } from '@react-pdf-viewer/highlight';
import { searchPlugin } from '@react-pdf-viewer/search';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import './components.css';
import { ChatMessageProps } from './commonTypes';

const plus = '/assets/icons/plus.svg?react';
const minus = '/assets/icons/minus.svg?react';
const previous = '/assets/icons/previous.svg?react';
const next = '/assets/icons/next.svg?react';
const rotate = '/assets/icons/rotate.svg?react';
const download = '/assets/icons/download.svg?react';

interface SlideCommentary {
  id: string;
  name: string;
  slide_number: number;
  commentary: string;
}

interface Company {
  name: string;
  slide_path: string;
  commentary: SlideCommentary[];
}

interface CompanySlideCommentary {
  [key: string]: Company;
}

const slideCommentary: CompanySlideCommentary = {
  EGLX: {
    name: 'Enthusiast Gaming',
    slide_path: '/assets/eglx/Investor-Presentation.pdf',
    commentary: [
      {
        id: 'currentSlide-1',
        name: 'What does your company do?',
        slide_number: 1,
        commentary: `Enthusiast Gaming operates e-gaming experiences that collectively have more user traffic than any gaming company in the world except Twitch and Roblox. E-gaming has become one of the most popular sources of entertainment for people under 35, having surpassed the NFL and other major sports networks. <p>Our 3 business lines generate diversified revenue as follows: </p><p>1.	<strong>Gaming Communities:</strong> We operate a network of web sites where e-gaming enthusiasts can discuss the latest developments in online gaming and their favorite gaming celebrities. We generate revenue through advertising.</p><p>2.	<strong>Talent & eSports:</strong> We act as talent agents for many successful high profile gaming celebrities (“gamers”) who have achieved high rankings in Rocket League, Call of Duty and other popular games. We generate revenue by signing exclusive rights to these gamers and selling merchandise and brand sponsorships.</p><p>3.	<strong>Gaming Entertainment:</strong> We own several of the industry's most prominent gaming events including ev.io and addicting games. These events are held around the world and are attending by tens of thousands of visitors. We generate revenue through ticket sales, booth rental and sponsorships. We are also increasingly taking these experiences online with brand partnerships such as our NFL Tuesday Night Gaming experience. We generate revenue through these experiences by charging for creative development and traffic generation through our massive e-gaming community network.</p>`
      },
      {
        id: 'currentSlide-2',
        name: 'User Traffic',
        slide_number: 2,
        commentary: `Enthusiast Gaming's 50+ online gaming sites, 8+ TikTok channels, 11 eSports teams 700+ YouTube channels have 45 million unique viewers each month, as measured by Comscore Media Metrix and YouTube. This user base is comparable to Roblox, which has 49 million unique visitors and ahead of notable brands including Zynga, Activision Blizzard and Electronic Arts.<p>Our most popular sites are Pocket Gamer and the SIMS Resource.</p>`
      },
      {
        id: 'currentSlide-3',
        name: 'NFL Tuesday Night Gaming',
        slide_number: 3,
        commentary: `The National Football League (NFL) and Enthusiast Gaming Holdings Inc. are teaming up again for the second season of NFL Tuesday Night Gaming (NFL TNG), starting September 12, 2023. The series features NFL players and gaming influencers competing in popular video games. The season kicks off with a special Play Day episode hosted by rapper Quavo on September 5, live from Mercedes-Benz Stadium in Atlanta. Teams of celebrities from entertainment, music, gaming, and the NFL will compete in outdoor games like NFL FLAG, egg tosses, and tug-of-war. Viewers on Twitch can interact with the event in real-time. Season 2 introduces a new team format with top streamers and creators captaining teams and competing in rotating two-game series. Special themed episodes will coincide with NFL community initiatives, and four students from Historically Black Colleges and Universities (HBCUs) will intern on the series. Fans can stream the 26-episode season live every Tuesday at 7 p.m. EST on NFL TNG's Twitch, YouTube, and X channels.<p>We generate revenue through this partnership through creative development, technical development and traffic generation services for the NFL.</p>`
      },
      {
        id: 'currentSlide-4',
        name: 'Financial Results',
        slide_number: 4,
        commentary: `We are now generating run rate revenue of over $200 million annually, having surpassed $50 million last quarter for the first time in the company's history. This represents strong annual growth and, notably our gross margins have increased to 32.7%. This reflects our sale of money-losing and low-margin gaming properties and our increased focus on high-margin brand partnerships like the NFL Tuesday Night Gaming.`
      },
      {
        id: 'currentSlide-5',
        name: 'Leadership Team',
        slide_number: 5,
        commentary: `Our leadership team members each have 20+ years of e-gaming, technology, startup and capital markets experience. Notably, our CEO Adrian Montgomery previously served as the CEO of Acquilni Sports and Entertainment, which owns a portfolio of sports properties including the Vancouver Canucks and Rogers Arena, Vancouver's premier professional sports venue.`
      }
    ]
  },
  GRYP: {
    name: 'Gryphon Digital Mining',
    slide_path: '/assets/gryp/Investor-Presentation.pdf',
    commentary: [
      {
        id: 'currentSlide-1',
        name: 'What does your company do?',
        slide_number: 1,
        commentary: `<p>Gryphon Digital Mining, Inc. is an innovative venture in the bitcoin space dedicated to helping bring digital assets onto the clean energy grid. With a talented leadership team coming from globally recognized brands, Gryphon is assembling thought leaders to improve digital asset network infrastructure. Its Bitcoin mining operation was recently independently certified as 100% carbon-neutral and the company is also pursuing a carbon-negative strategy.</p>`
      },
      {
        id: 'currentSlide-2',
        name: 'Industry Classifications',
        slide_number: 2,
        commentary: `<ul><li><strong>Sector:</strong> Finance</li><li><strong>Industry:</strong> Cryptocurrency Exchanges & Trading Platforms</li><li><strong>NAICS:</strong> Computer Processing and Data Preparation and Processing Services (7374)</li><li><strong>SIC:</strong> Data Processing, Hosting, and Related Services (518210)</li></ul>`
      },
      {
        id: 'currentSlide-3',
        name: 'Leadership Team',
        slide_number: 3,
        commentary: `<p>Gryphon's leadership team is composed of industry veterans with extensive experience in technology, finance, and digital assets. The team is committed to driving innovation and sustainability in the Bitcoin mining industry.</p><ul><li><strong>Rob Chang:</strong> CEO & Director, former CFO of Riot Blockchain and MD at Cantor Fitzgerald</li><li><strong>Sim Salzman:</strong> CFO, former CFO of Marathon Digital Holdings</li><li><strong>Chris Ensey:</strong> Chief Technical Advisor, former CEO & COO of Riot Blockchain</li><li><strong>Brittany Kaiser:</strong> Chairperson, globally-renowned expert in blockchain technology and digital assets</li></ul>`
      },
      {
        id: 'currentSlide-4',
        name: 'Mission Statement',
        slide_number: 4,
        commentary: `<p>To create a financially nimble, highly profitable, and environmentally responsible bitcoin miner.</p>`
      },
      {
        id: 'currentSlide-5',
        name: 'Investment Highlights',
        slide_number: 5,
        commentary: `<p>Creating an industry leader in bitcoin mining.</p><ul><li>Former CFO, Riot Blockchain</li><li>Former Managing Director, Head of Metals & Mining Research, Cantor Fitzgerald</li><li>Current Board Member: Fission Uranium and Ur-Energy</li><li>Member: Young Presidents Organization (YPO)</li></ul>`
      },
      {
        id: 'currentSlide-6',
        name: 'Management Team',
        slide_number: 6,
        commentary: `<ul><li>Former CEO and COO, Riot Blockchain</li><li>Former CTO, BlueVoyant</li><li>Former COO and Founder, Dunbar Cybersecurity</li><li>Former Principal Security Strategist & Associate Director, IBM</li></ul>`
      },
      {
        id: 'currentSlide-7',
        name: 'Board of Directors',
        slide_number: 7,
        commentary: `<ul><li>CEO, Falcon International, one of the largest private cannabis companies in California</li><li>Former COO & EVP, E*Trade Bank and other senior roles at E*Trade Financial</li><li>Former President of Harvest Health & Recreation Inc., which was acquired for $2.1 billion.</li><li>Member of the Board of Directors, Nu Energy & OARO</li><li>Former Founder, Chair of the Board, and CEO of Akerna</li><li>Inc. Top 100 Female Founder and Fortune’s Most Promising Woman Entrepreneur.</li><li>Member of the Board of Directors, NRG Energy</li><li>Former Chief Digital Health and Analytics Officer, Humana</li><li>Former Chief Technology and Digital Officer, USAA</li><li>Former CEO of Citi FinTech, Citigroup</li></ul>`
      },
      {
        id: 'currentSlide-8',
        name: 'Company Overview - History',
        slide_number: 8,
        commentary: `<ul><li>October 2020: Company Founded</li><li>April 2021: Purchased 7,200 S19j Pro miners from Bitmain</li><li>June 2021: Hosting agreement signed with CoinMint LLC for 23 MW of carbon-neutral energy</li><li>August 2021: Gryphon secures a 22.5% Net Operating Profit Royalty via management services fee with a third-party bitcoin miner on all of its blockchain operations</li><li>September 2021: First machines deployed and generating bitcoin</li><li>December 2022: Gryphon achieves self-mining hashrate of 0.72 EH/s</li><li>January 2023: Gryphon announces proposed merger with Akerna (Nasdaq: KERN)</li><li>June 2023: Gryphon expands self-mining hashrate to 0.86 EH/s with acquisition of upgraded S19j Pro+ machines and expansion to 28 MW at CoinMint</li><li>February 2024: Merger with Akerna Closed. Nasdaq: GRYP</li></ul>`
      },
      {
        id: 'currentSlide-9',
        name: 'Location – 28 MW Hydro-Powered Energy',
        slide_number: 9,
        commentary: `<ul><li>Hydro-powered host in an economic opportunity zone</li><li>Direct cost pass-through with profit-sharing model</li><li>$22,495/BTC cost</li><li>Gryphon has secured 28 MW of power for its ~9,000 machines</li><li>Hosting and share structure reduces capital investment and financial risk</li></ul>`
      },
      {
        id: 'currentSlide-10',
        name: 'All-In Cost-per-Coin',
        slide_number: 10,
        commentary: `<p>• Gryphon’s cost per bitcoin produced post-halving has historically ranked among the industry leaders</p><p>• Calculated based on Cantor Fitzgerald Research Methodology</p><p>• Gryphon’s forecast “All-in” Cost-per-Coin would be $44,989/BTC post-halving</p>`
      },
      {
        id: 'currentSlide-11',
        name: 'Leading Bitcoin Efficiency',
        slide_number: 11,
        commentary: `<p>• Gryphon is an industry leader in Bitcoin Efficiency, posting a market-leading 43 BTC/EH in April 2024</p><p>• Gryphon has consistently placed at or near the top of these publicly available bitcoin efficiency scores</p><p>• Top tier efficiency among all peers since inception and 1st in 17 out of 31 months since operations commenced</p><p>• At or tied for 1st in six of the last 12 months</p><p>• Superior performance driven by Gryphon’s experienced mining team in making key differentiated choices (location, hosting structure, etc.)</p>`
      },
      {
        id: 'currentSlide-12',
        name: '22.5% MSA with Sphere 3D',
        slide_number: 12,
        commentary: `<p>• Gryphon had an agreement to manage all of Sphere 3D’s blockchain operations for a five-year period</p><p>• Gryphon had the right to earn 22.5% of gross operating profit royalty from all of Sphere 3D’s current and future blockchain operations through August 2026</p><p>• Sphere 3D’s fully deployed 15,000 miners are expected to have over 1.5 Exahash and generate 940 BTC in 2024 based on current network hashrate</p><p>• Sphere has purported to terminate this arrangement and has taken back possession of its blockchain operations. Gryphon is pursuing litigation to recover damages for breach of the agreement in the amount of $30 million and while Gryphon is confident it will prevail, no assurance can be given as to the timing, the result or the ability to recover damages.</p>`
      },
      {
        id: 'currentSlide-13',
        name: 'Certified Renewable',
        slide_number: 13,
        commentary: `<p>• Certified 100% renewable energy operation heading into 2024</p><p>• Gryphon Digital Mining was among a select inaugural group of 5 miners to be awarded a “Green Proofs for Bitcoin” certification</p><p>• Certifications were issued to Bitcoin miners based on their clean energy use and contributions to grid stability via demand response</p><p>• Developed in partnership with over 35 miners, NGOs, grid operators, and other energy and crypto market participants, its approach to scoring is aligned with best practices for sustainability leadership and to approaches to corporate ESG reporting</p><p>• Full carbon emissions report for 2022 and 2023 published</p>`
      },
      {
        id: 'currentSlide-14',
        name: 'Gross Profit Sensitivity Analysis – Self Mining Only',
        slide_number: 14,
        commentary: `<p>Gross profit sensitivity analysis based on various Bitcoin prices and global hashrates, showing how Gryphon’s self-mining operations could perform under different market conditions.</p>`
      },
      {
        id: 'companySlide-15',
        name: 'Contact Information',
        slide_number: 15,
        commentary: `<p><strong>Investor Relations:</strong></p><p>Hayden IR<br>James Carbonara<br>T: 646-755-7412<br>Email: <a href="mailto:james@haydenir.com">james@haydenir.com</a></p><p><strong>Transfer Agent:</strong></p><p>Continental Stock Transfer & Trust Company<br>Shareholder Relations<br>1 State Street, 30th Floor<br>New York, NY 10004-1561<br>T: 800.509.5586<br>Email: <a href="mailto:cstmail@continentalstock.com">cstmail@continentalstock.com</a></p><p><strong>Company Contact:</strong></p><p>1180 N. Town Center Drive, Suite 100<br>Las Vegas, NV, 89144</p>`
      },
      {
        id: 'currentSlide-16',
        name: 'Appendix: Non-GAAP Reconciliations',
        slide_number: 16,
        commentary: `<p>Adjusted EBITDA: The Company defines adjusted EBITDA as (a) GAAP net income (loss) plus (b) adjustments to add back the impacts of (1) depreciation and amortization, (2) interest expense, (3) income tax expense (benefit) and (4) adjustments for non-cash and non-recurring items which currently include (i) stock compensation expense, (ii) change in fair value of notes payable and (iii) unrealized (gain) loss on marketable equity securities.</p><p>Three Months Ended March 31, 2024 2023 Reconciliation to Adjusted EBITDA: Net loss $ (11,744,000 ) $ (6,910,000 ) Exclude: Depreciation 3,247,000 3,981,000 Exclude: Interest expense 330,000 190,000 EBITDA (8,167,000 ) (2,739,000 ) Non-cash/non-recurring operating expenses: Exclude: Stock-based compensation expense 208,000 (1,152,000 ) Exclude: Change in fair value of notes payable 9,638,000 8,189,000 Exclude: Unrealized (gain) loss on marketable equity securities 216,000 (63,000 ) Adjusted EBITDA $ 1,895,000 $ 4,235,000</p>`
      },
      {
        id: 'currentSlide-17',
        name: 'Appendix: Non-GAAP Reconciliations (continued)',
        slide_number: 17,
        commentary: `<p>Breakeven Costs (i.e.. Cost to mine one bitcoin) The Company defines Breakeven Cost per Bitcoin as (a) Cost of Revenues (excluding depreciation) divided by (b) total bitcoin generated and received from the hashrate contributed to the mining pool operator. The Company mined approximately 142 and 212 Bitcoin, respectively for the quarter ended March 31, 2024 and 2023, respectively. The breakeven analysis is an operational metric that does not take capital expenditures or financing mechanics into consideration. The calculation only considers direct operational costs, such as electricity and hosting. The mining equipment was originally financed primarily through equity capital raises and cash flows resulting from the sale of bitcoin generating by mining operations. Value of one mined bitcoin The Company defines Value of one mined bitcoin as total Mining Revenues divided by total Bitcoin mined during each respective year. Q2/23 Q3/23 Q4/23 Q1/24 Trailing Twelve Months Mining Revenues $ 4,963,000 $ 4,940,000 $ 6,309,000 $ 7,490,000 $ 23,702,000 Bitcoin mined 187 176 164 142 669 Value of one mined bitcoin $ 26,540 $ 28,068 $ 38,470 $ 52,746 $ 35,429 Cost of Revenues (excluding depreciation) $ 2,823,000 $ 3,982,000 $ 3,920,000 $ 4,837,000 $ 15,562,000 Cost to mine one bitcoin $ 15,096 $ 22,625 $ 23,902 $ 34,063 $ 23,262 Total Bitcoin Equivalent Coins Generated (Total BTC Equiv) * 200 185 165 142 692 Breakeven of Total BTC Equiv $ 14,115 $ 21,501 $ 23,813 $ 34,063 $ 22,495</p>`
      }
    ]
  }
};

interface PdfListProps {
  id: string;
  name: string | undefined;
  source: string;
  page_content: string;
  page: number;
}
interface PDFViewerProps {
  pdfList: PdfListProps[];
  companyLogo: string;
  companySymbol: string;
  themeColor: string;
  isCorporatePresOn: boolean;
  handleSlideCommentary: (val: ChatMessageProps) => void;
  suggestionSlideTitle: string;
  handleSuggestionSlideTitle: (val: string) => void;
  isTypingOn: boolean;
  boxWidth: string;
  isContinue: boolean;
  goToNextSlide: () => void;
  resetIsContinue: () => void;
}

export default function PDFViewer({
  pdfList,
  companyLogo,
  companySymbol,
  themeColor,
  isCorporatePresOn,
  handleSlideCommentary,
  suggestionSlideTitle,
  handleSuggestionSlideTitle,
  isTypingOn,
  boxWidth,
  isContinue,
  goToNextSlide,
  resetIsContinue
}: PDFViewerProps) {
  const toolbarPluginInstance = toolbarPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const scrollModePluginInstance = scrollModePlugin();
  const { jumpToPage } = pageNavigationPluginInstance;
  const { Toolbar } = toolbarPluginInstance;
  const { switchScrollMode } = scrollModePluginInstance;
  const [selectedPdf, setSelectedPdf] = useState<string | undefined>();
  const [initialPage, setInitialPage] = useState<number>(0);
  const [currentSlideNum, setCurrentSlideNum] = useState(0); // to open the slide number from where it left for Corporate presentation. Updates only when corporate pres is ON
  // const [highlightedText, setHighlightedText] = useState<SingleKeyword[]>([]);

  const searchPluginInstance = searchPlugin({
    // onHighlightKeyword: (props: OnHighlightKeyword) => {
    //   // props.highlightEle.style.backgroundColor = 'rgba(247, 224, 202, 0.5)';
    // }
  });
  const { highlight } = searchPluginInstance;

  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.TextSelection // or Trigger.None if you don't want text selection to create new highlights
  });

  // useEffect(()=> {
  //   highlight("The programmatic media value chain consists of various")
  // },[selectedPdf])

  useEffect(() => {
    if (isContinue) {
      if (currentSlideNum === slideCommentary[companySymbol].commentary.length - 1) {
        jumpToPage(0);
      } else {
        jumpToPage(currentSlideNum + 1);
      }
      resetIsContinue();
    }
  }, [companySymbol, currentSlideNum, goToNextSlide, isContinue, jumpToPage, resetIsContinue]);

  useEffect(() => {
    if (pdfList.length > 0 && !isCorporatePresOn) {
      // console.log([
      //   ...pdfList[0]?.page_content.split(' ').map((item) => {
      //     if (item.length > 2) {
      //       return {
      //         keyword: item,
      //         matchCase: true,
      //         wholeWords: true
      //       };
      //     }
      //   }).filter(item => item !== undefined)
      // ]);
      // setHighlightedText([
      //   ...pdfList[0]?.page_content.split(' ').map((item) => ({
      //     keyword: item,
      //     matchCase: true,
      //     wholeWords: true
      //   }))
      // ]);
      setSelectedPdf(pdfList[0]?.source);
      setInitialPage(pdfList[0]?.page);
      // highlight([
      //   ...pdfList[0]?.page_content.split(' ').map((item) => ({
      //     keyword: item,
      //     matchCase: true,
      //     wholeWords: true
      //   }))
      // ]);
    }
  }, [isCorporatePresOn, pdfList]);

  useEffect(() => {
    if (isCorporatePresOn) {
      setSelectedPdf(slideCommentary[companySymbol].slide_path);
      setInitialPage(0);
    } else {
      setSelectedPdf('');
      setCurrentSlideNum(0);
      setInitialPage(0);
    }

    // setInitialPage(0);
  }, [companySymbol, isCorporatePresOn]);

  // useEffect(() => {
  //   let timeoutId: NodeJS.Timeout | null = null; // Initialize timeoutId

  //   if (isCorporatePresOn) {
  //     // Ensure the currentSlideNum index is within the bounds of the slideCommentary array
  //     if (currentSlideNum >= 0 && currentSlideNum < slideCommentary.length) {
  //       // Clear any existing timeout
  //       if (timeoutId) {
  //         clearTimeout(timeoutId);
  //       }

  //       // Set a new timeout to call handleSlideCommentary after 4 seconds
  //       timeoutId = setTimeout(() => {
  //         const currentSlideCommentary = slideCommentary[currentSlideNum];
  //         handleSlideCommentary({
  //           id: currentSlideCommentary.id,
  //           prompt: currentSlideCommentary.name, // Map 'name' to 'prompt'
  //           response: currentSlideCommentary.commentary, // Map 'commentary' to 'response'
  //           showSuggestions: true,
  //           isCommentary: true
  //         });
  //       }, 4000); // 4 seconds
  //     }
  //   }

  //   // Cleanup function
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [currentSlideNum, handleSlideCommentary, isCorporatePresOn]);

  useEffect(() => {
    if (isCorporatePresOn) {
      const currentSlideCommentary = slideCommentary[companySymbol].commentary[currentSlideNum];
      handleSlideCommentary({
        id: currentSlideCommentary.id,
        prompt: currentSlideCommentary.name, // Map 'name' to 'prompt'
        response: currentSlideCommentary.commentary, // Map 'commentary' to 'response'
        showSuggestions: true,
        isCommentary: true
      });
    }
  }, [companySymbol, currentSlideNum, handleSlideCommentary, isCorporatePresOn]);

  const findSlideWithTitle = useCallback(() => {
    const foundSlide = slideCommentary[companySymbol].commentary.find(
      ({ name }) => name === (suggestionSlideTitle === 'About us' ? 'What does your company do?' : suggestionSlideTitle)
    );

    if (foundSlide) {
      const slideNum = foundSlide.slide_number - 1;
      jumpToPage(slideNum);
    } else {
      jumpToPage(0);
    }
    handleSuggestionSlideTitle('');
  }, [companySymbol, handleSuggestionSlideTitle, suggestionSlideTitle, jumpToPage]);

  useEffect(() => {
    if (suggestionSlideTitle) {
      findSlideWithTitle();
    }
  }, [findSlideWithTitle, suggestionSlideTitle]);

  useEffect(() => {
    if (isCorporatePresOn) {
      // Find the input element by its data-testid attribute
      const inputElement = document.querySelector<HTMLInputElement>('[data-testid="page-navigation__current-page-input"]');

      if (inputElement) {
        // Disable the input element
        inputElement.disabled = isTypingOn;
      }
    }
  }, [isCorporatePresOn, isTypingOn]);

  useEffect(() => {
    if (isCorporatePresOn) {
      // if (isTypingOn) {
      switchScrollMode(ScrollMode.Page);
      // } else {
      // switchScrollMode(ScrollMode.Vertical);
      // }
    }
  }, [isCorporatePresOn, isTypingOn, switchScrollMode]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPdf(event.target.value);
    setInitialPage(pdfList.filter((item) => item.source === event.target.value)[0].page);
    // highlight([
    //   ...pdfList
    //     .filter((item) => item.source === event.target.value)[0]
    //     ?.page_content.split(' ')
    //     .map((item) => ({
    //       keyword: item,
    //       matchCase: true,
    //       wholeWords: true
    //     }))
    // ]);
    // setHighlightedText([
    //   ...pdfList
    //     .filter((item) => item.source === event.target.value)[0]
    //     ?.page_content.split(' ')
    //     .map((item) => ({
    //       keyword: item,
    //       matchCase: true,
    //       wholeWords: true
    //     }))
    // ]);
  };

  const handleDocumentLoad = () => {
    highlight(
      'For any publishing company, the key mission is to build a dedicated following of engaged visitors andbrands are looking for high levels of engagement within a target market to run successful advertising campaigns.Enthusiast Gaming has amassed a platform of engaged, lifestyle gamers that has become a leading advertisingplatform for brands targeting the gamer demographic. Enthusiast Gaming’s web platform generates over twobillion page views per quarter, and it’s video platform, operated by Omnia, generates over seven billion videoviews per quarter. Each of these views produces Inventory available for sale. The majority of Enthusiast Gaming’smedia and content revenue is driven by programmatic advertising across the platform. Enthusiast Gaming hasbuilt out a direct sales team to foster key relationships and drive revenue. The direct sales team is also responsiblefor developing long term clients looking for integrated advertising solutions across Enthusiast Gaming’s brands'
    );
    // if(highlightedText.length > 0) {
    //   console.log(highlightedText)
    //   // highlight(highlightedText);
    // }
  };

  return (
    <div className={`p-3 h-full bg-[${themeColor}] rounded-lg`}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div className="flex flex-col justify-evenly h-full" style={{ backgroundColor: themeColor }}>
          <div className="p-1 rounded-lg border-2 border-[#CDE1E7] flex items-center justify-center h-[84%]">
            {selectedPdf ? (
              <Viewer
                key={boxWidth}
                fileUrl={selectedPdf}
                defaultScale={isCorporatePresOn ? SpecialZoomLevel.PageFit : SpecialZoomLevel.PageWidth}
                plugins={[
                  toolbarPluginInstance,
                  highlightPluginInstance,
                  searchPluginInstance,
                  pageNavigationPluginInstance,
                  scrollModePluginInstance
                ]}
                onDocumentLoad={handleDocumentLoad}
                initialPage={initialPage}
                onPageChange={(page) => isCorporatePresOn && setCurrentSlideNum(page.currentPage)}
                scrollMode={isCorporatePresOn ? ScrollMode.Page : ScrollMode.Vertical}
              />
            ) : (
              // <div className="h-4/5">
              <img src={companyLogo} alt="" className="w-full h-full object-contain max-w-none" />
              // </div>
            )}
          </div>
          <div className="my-4 text-black flex justify-between items-center" style={{ backgroundColor: themeColor }}>
            <div>
              <form className="max-w-sm mx-auto">
                <label htmlFor="underline_select" className="block text-xs font-sm text-black">
                  Source Documents Used to Create this Answer:
                </label>
                <section className="wrapper">
                  <select
                    value={selectedPdf}
                    onChange={handleChange}
                    id="underline_select"
                    className=" block text-md font-semibold py-0.5 px-0 min-w-60 xl:min-w-80  bg-transparent border-0 border-b-2 appearance-none text-black border-gray-700 focus:outline-none focus:ring-0 peer">
                    {isCorporatePresOn ? (
                      <option value="investor-ppt">Investor Presentation</option>
                    ) : (
                      pdfList.map((pdf) => (
                        <option key={pdf.id} value={pdf.source}>
                          {pdf.name?.split('\\').pop()}
                        </option>
                      ))
                    )}
                  </select>
                </section>
              </form>
            </div>
            <Toolbar>
              {(props: ToolbarSlot) => {
                const { CurrentPageInput, Download, GoToNextPage, GoToPreviousPage, NumberOfPages, Zoom, ZoomIn, ZoomOut } = props;

                return (
                  <div className="flex items-center text-[#748FA1] justify-end">
                    <div className="px-2 flex self-center">
                      <button type="button" onClick={() => jumpToPage(0)} disabled={isCorporatePresOn && isTypingOn}>
                        <img src={rotate} alt="rotate" />
                      </button>
                    </div>
                    <div className="text-lg">|</div>
                    <div className="px-2 flex self-center">
                      <GoToPreviousPage>
                        {(previousProps: RenderGoToPageProps) => (
                          <button type="button" onClick={previousProps.onClick} disabled={isCorporatePresOn && isTypingOn}>
                            <img src={previous} alt="previous" />
                          </button>
                        )}
                      </GoToPreviousPage>
                    </div>
                    <div className="flex items-center px-0">
                      <span className="w-12 max-w-10">
                        <CurrentPageInput />
                      </span>
                      <span className="px-2">/</span>
                      <span className="w-12 max-w-5">
                        <NumberOfPages />
                      </span>
                    </div>
                    <div className="px-2 flex self-center">
                      <GoToNextPage>
                        {(nextProps: RenderGoToPageProps) => (
                          <button type="button" onClick={nextProps.onClick} disabled={isCorporatePresOn && isTypingOn}>
                            <img src={next} alt="next" />
                          </button>
                        )}
                      </GoToNextPage>
                    </div>
                    <div className="text-lg">|</div>
                    <div className="px-2 flex self-center">
                      <ZoomOut>
                        {(zoomOutProps: RenderZoomOutProps) => (
                          <button type="button" onClick={zoomOutProps.onClick}>
                            <img src={minus} alt="zoom-out" />
                          </button>
                        )}
                      </ZoomOut>
                    </div>
                    <div style={{ padding: '0px' }}>
                      <Zoom>
                        {(zoomProps: RenderZoomProps) => (
                          <button type="button" className="bg-[#22506F] text-white px-2 text-center rounded-2xl h-6 w-14 text-sm">
                            {Math.round(zoomProps.scale * 100)}%
                          </button>
                        )}
                      </Zoom>
                    </div>
                    <div className="px-2 flex self-center">
                      <ZoomIn>
                        {(zoomInProps: RenderZoomInProps) => (
                          <button type="button" onClick={zoomInProps.onClick}>
                            <img src={plus} alt="zoom-in" />
                          </button>
                        )}
                      </ZoomIn>
                    </div>
                    <div className="text-lg">|</div>
                    <div className="px-2 flex self-center">
                      <Download>
                        {(downloadProps: RenderDownloadProps) => (
                          <button type="button" onClick={downloadProps.onClick}>
                            <img src={download} alt="rotate" />
                          </button>
                        )}
                      </Download>
                    </div>
                  </div>
                );
              }}
            </Toolbar>
          </div>
        </div>
      </Worker>
    </div>
  );
}
