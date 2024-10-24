interface UserModalProps {
  name: string;
  email: string;
  investorScore: number;
  handleClose: (val: boolean) => void;
}

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
}

const close = '/assets/icons/cross_blue.svg';
const star = '/assets/icons/star.svg';
const share = '/assets/icons/share.svg';
const plus = '/assets/icons/plus_blue.svg';

const investorTableData = [
  {
    date: '19:32 April 9 2024',
    interaction: 'Chatbot',
    messages: '7 questions'
  },
  {
    date: '16:58 April 15 2024',
    interaction: 'Chatbot',
    messages: '16 questions'
  },
  {
    date: '10:09 April 21 2024',
    interaction: 'Manual Entry',
    messages: 'CEO spoke with Jesse; discussed concerns about NASDAQ delisting'
  },
  {
    date: '19:32 April 9 2024',
    interaction: 'Chatbot',
    messages: '7 questions'
  },
  {
    date: '16:58 April 15 2024',
    interaction: 'Chatbot',
    messages: '16 questions'
  },
  {
    date: '10:09 April 21 2024',
    interaction: 'Manual Entry',
    messages: 'CEO spoke with Jesse; discussed concerns about NASDAQ delisting'
  },
  {
    date: '19:32 April 9 2024',
    interaction: 'Chatbot',
    messages: '7 questions'
  },
  {
    date: '16:58 April 15 2024',
    interaction: 'Chatbot',
    messages: '16 questions'
  },
  {
    date: '10:09 April 21 2024',
    interaction: 'Manual Entry',
    messages: 'CEO spoke with Jesse; discussed concerns about NASDAQ delisting'
  }
];

const shareHolderTableData = [
  {
    source: 'NOBO',
    date: '2023',
    description: 'Jesse Mule - 1046 Bridle Way Murray Hill NJ 07974 2,100,000 shares'
  },
  {
    source: 'NOBO',
    date: '2022',
    description: 'Jesse Mule - 1046 Bridle Way Murray Hill NJ 07974 2,100,000 shares'
  },
  {
    source: 'Private Placement',
    date: 'July 17, 2021',
    description: '$1.07 Jesse Mule, Canaccord, Advisor Nolan McGregor 1046 Bridle Way Murray Hill NJ 07974 Purchased 500,000 units'
  },
  {
    source: 'Continuity Schedule',
    date: 'January 31, 2021',
    description: 'Exercised 200,000 $1.50 options on January 15, 2022 delivered to Cannacord, Advisor Nolan McGregor'
  },
  {
    source: 'Self-Identified',
    date: 'February 14, 2023',
    description: 'Confirmed this account is him on MarketMind survey'
  },
  {
    source: 'NOBO',
    date: '2023',
    description: 'Jesse Mule - 1046 Bridle Way Murray Hill NJ 07974 2,100,000 shares'
  },
  {
    source: 'NOBO',
    date: '2022',
    description: 'Jesse Mule - 1046 Bridle Way Murray Hill NJ 07974 2,100,000 shares'
  },
  {
    source: 'Private Placement',
    date: 'July 17, 2021',
    description: '$1.07 Jesse Mule, Canaccord, Advisor Nolan McGregor 1046 Bridle Way Murray Hill NJ 07974 Purchased 500,000 units'
  },
  {
    source: 'Continuity Schedule',
    date: 'January 31, 2021',
    description: 'Exercised 200,000 $1.50 options on January 15, 2022 delivered to Cannacord, Advisor Nolan McGregor'
  },
  {
    source: 'Self-Identified',
    date: 'February 14, 2023',
    description: 'Confirmed this account is him on MarketMind survey'
  }
];

const socialData = [
  {
    source: 'linkedIn',
    connections: '743 followers'
  },
  {
    source: 'facebook',
    connections: '238 friends'
  },
  {
    source: 'twitter',
    connections: '839 followers'
  }
];

function InfoBoxes({ title, children }: InfoBoxProps) {
  return (
    <div className="bg-[#E3EDF0] py-3.5 px-5 rounded-lg w-48 min-h-16 mb-2">
      <p className="text-[10px] text-[#123247] leading-4">{title}</p>
      {children}
    </div>
  );
}

export default function UserModal({ name, email, investorScore, handleClose }: UserModalProps) {
  return (
    <div className="user_modal bg-black/85 flex items-center justify-center fixed top-0 left-0 w-full h-full z-20">
      <div className="bg-white w-[1000px] h-[85vh]  3xl:h-[740px] relative overflow-auto">
        <button type="button" onClick={() => handleClose(false)} className="absolute top-1 right-0 h-6 w-6">
          <img src={close} alt="close" />
        </button>
        <div className="p-4 text-[#0A2537] flex justify-between border-b border-[#ECF2F3]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-[#4DC06D] text-xs text-white flex items-center justify-center rounded-full">JM</div>
              <div className="bg-[#14CE27] w-3.5 h-3.5 absolute bottom-0 right-0 border-2 border-white rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold leading-5">{name}</p>
              <p className="">{email}</p>
            </div>
          </div>
          <div className="text-right pr-4">
            <p className="text-xs py-1">Investor Score</p>
            <p className="leading-6 text-2xl font-semibold">{investorScore}</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-3/4 my-4 mx-6">
            <div className="border-b border-[#ECF2F3]">
              <p className="text-lg font-semibold text-[#123247] leading-6">Investor Interactions</p>

              <div className="h-[150px] flex-grow overflow-y-auto my-4  border-b border-[#ECF2F3]">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 w-full">
                    <tr className="bg-[#E3EDF0] font-semibold text-[#0A2537]">
                      <th scope="col" className="py-2 text-left px-3 w-1/5">
                        Date
                      </th>
                      <th scope="col" className="py-2 text-left px-3 w-1/5">
                        Interaction
                      </th>
                      <th scope="col" className="py-2 text-left px-3 w-3/5">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {investorTableData.map(({ date, interaction, messages }) => (
                      <tr className="text-[#0A2537]" key={date + interaction}>
                        <td className="px-3 py-2">{date}</td>
                        <td className="py-2 px-3">{interaction}</td>
                        <td className="py-2 px-3 flex justify-between items-start">
                          <span>{messages}</span>
                          <button type="button" className="min-h-5 min-w-5">
                            <img src={share} alt="share" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                className="bg-btn-green text-[#123247] px-4 py-2.5 rounded-full font-semibold text-xs flex justify-center items-center gap-2 mb-6">
                <img loading="lazy" src={plus} className="shrink-0 self-start h-5 w-5" alt="plus" />
                Add Management Call Notes
              </button>
            </div>
            <div className="my-4">
              <p className="text-lg font-semibold text-[#123247] leading-6">Shareholder Surveillance</p>

              <div className="h-[280px] flex-grow overflow-y-auto my-4  border-b border-[#ECF2F3]">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 w-full">
                    <tr className="bg-[#E3EDF0] font-semibold text-[#0A2537]">
                      <th scope="col" className="py-2 text-left px-3 w-1/5">
                        Source Document
                      </th>
                      <th scope="col" className="py-2 text-left px-3 w-1/5">
                        Date
                      </th>
                      <th scope="col" className="py-2 text-left px-3 w-3/5">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shareHolderTableData.map(({ date, source, description }) => (
                      <tr className="text-[#0A2537]" key={date + source}>
                        <td className="py-2 px-3">{source}</td>
                        <td className="px-3 py-2">{date}</td>
                        <td className="py-2 px-3 flex justify-between items-start">
                          <span>{description}</span>
                          <button type="button" className="min-h-5 min-w-5">
                            <img src={share} alt="share" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-1/4 border-l border-[#ECF2F3] px-6 py-4">
            <InfoBoxes title="Priority Follow Up">
              <p className="flex gap-1 pt-1">
                <img src={star} alt="star" />
                <img src={star} alt="star" />
              </p>
            </InfoBoxes>
            <InfoBoxes title="No of Visits Last 12 Months">
              <p className="font-medium text-[#0A2537] text-base">208</p>
            </InfoBoxes>
            <InfoBoxes title="Investment Experience">
              <p className="font-medium text-[#0A2537] text-base">Sophisticated</p>
            </InfoBoxes>
            <InfoBoxes title="Investment Style">
              <p className="font-medium text-[#0A2537] text-base">Active Trader</p>
            </InfoBoxes>
            <InfoBoxes title="Other stocks researched on chatbots and social media">
              <div className="flex flex-wrap mt-2 gap-1">
                {['RBLX', 'EA', 'GME', 'MYPS', 'DDI', 'EGLX'].map((ele) => (
                  <div
                    key={ele}
                    className="bg-[#234D69] text-white flex justify-center items-center h-6 w-[74px] text-sm font-semibold rounded-md">
                    {ele}
                  </div>
                ))}
              </div>
            </InfoBoxes>
            <InfoBoxes title="Social handles">
              {socialData.map(({ source, connections }) => (
                <div className="flex gap-2 justify-between items-center my-3" key={source}>
                  <div className="flex items-center gap-3">
                    <img src={`/assets/images/${source}.png`} alt="linkedin" className="h-5 w-5" />
                    <span className="font-medium text-[#0A2537] text-xs">{connections}</span>
                  </div>
                  <button type="button">
                    <img src={share} alt="share" />
                  </button>
                </div>
              ))}
            </InfoBoxes>
          </div>
        </div>
      </div>
    </div>
  );
}
