import { useState } from 'react';
import UserModal from './UserModal';

interface TableDataProps {
  name: string;
  email: string;
  shareholder: string;
  score: number;
  pro: string;
}
const data: TableDataProps[] = [
  {
    name: 'Jeff Maser',
    email: 'Jeff@gmail.com',
    shareholder: 'self_identified',
    score: 95,
    pro: 'FINRA database'
  },
  {
    name: 'Robert Daniels',
    email: 'Robert@gmail.com',
    shareholder: 'private_placement',
    score: 76,
    pro: ''
  },
  {
    name: 'Jesse Mule',
    email: 'Robert@gmail.com',
    shareholder: 'private_placement',
    score: 82,
    pro: ''
  },
  {
    name: '',
    email: 'Edgar@gmail.com',
    shareholder: 'self_identified',
    score: 99,
    pro: ''
  },
  {
    name: 'Rasheda Ali',
    email: 'Rasheda@gmail.com',
    shareholder: 'nobo_list',
    score: 90,
    pro: ''
  },
  {
    name: 'Mike Price',
    email: 'Rmike.price@raymondjames.com',
    shareholder: 'self_identified',
    score: 100,
    pro: 'E-Mail domain'
  },
  {
    name: 'Levi Davis',
    email: 'LD@gmail.com',
    shareholder: 'NA',
    score: 71,
    pro: ''
  },
  {
    name: 'Jenny Mun',
    email: 'JM@gmail.com',
    shareholder: 'nobo_list',
    score: 80,
    pro: ''
  },
  {
    name: 'Tracy Pang',
    email: 'tracy@email.com',
    shareholder: 'nobo_list',
    score: 86,
    pro: ''
  },
  {
    name: 'Jesse Mule',
    email: 'JM@gmail.com',
    shareholder: 'self_identified',
    score: 72,
    pro: ''
  },
  {
    name: 'Ben White',
    email: 'Ben@gmail.com',
    shareholder: 'self_identified',
    score: 90,
    pro: ''
  },
  {
    name: 'Ross Sum',
    email: 'Ross@gmail.com',
    shareholder: 'NA',
    score: 71,
    pro: ''
  },
  {
    name: 'Jesse Nelson',
    email: 'Ross@gmail.com',
    shareholder: 'NA',
    score: 83,
    pro: ''
  }
];

const dropDownList = ['NOBO lists', 'Control Documents', 'DTS Reports', 'Continuity Schedules'];

const arrowDown = '/assets/icons/arrowdown.svg';
const arrowDownFilled = '/assets/icons/arrow_down_filled.svg';
const share = '/assets/icons/share.svg';
const tickGreen = '/assets/icons/tick_green.svg';
const tickBlue = '/assets/icons/tick_blue.svg';
const tick2 = '/assets/icons/tick_2.svg';
const cross = '/assets/icons/cross.svg';

function UserRow({ name, email, shareholder, score, pro }: TableDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = (val: boolean) => {
    setIsModalOpen(val);
  };

  function getColorCode(value: number) {
    let colorCode = '';
    if (value < 80) {
      colorCode = '#FF6969'; // red
    } else if (value >= 90) {
      colorCode = '#5AB75B'; // green
    } else {
      colorCode = '#C2D4DF'; // gray
    }

    return colorCode;
  }

  function getShareHolder(type: string) {
    const generateElement = (src: string, text: string) => (
      <div className="flex items-center gap-2">
        <img src={src} alt="" className="w-5 h-5" />
        <span>{text}</span>
      </div>
    );

    switch (type) {
      case 'self_identified':
        return generateElement(tickGreen, 'Self-Identified');
      case 'private_placement':
        return generateElement(tickBlue, 'Private Placement list');
      case 'nobo_list':
        return generateElement(tick2, 'Nobo List');
      case 'NA':
        return generateElement(cross, 'N/A');
      default:
        return null;
    }
  }

  if (isModalOpen) {
    return <UserModal name={name} email={email} investorScore={score} handleClose={handleModalClose} />;
  }
  return (
    <tr className="hover:bg-[#234D69]">
      <td className="flex gap-2 px-3 py-2">
        <div className="flex flex-col justify-center my-auto text-xs font-semibold text-center whitespace-nowrap">
          <div className="flex justify-center items-center px-2 w-6 h-6 rounded-full bg-slate-600 text-[6px]">PD</div>
        </div>
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="text-[#89A4B5]">{email}</span>
        </div>
      </td>
      <td className="py-2 px-3">{getShareHolder(shareholder)}</td>
      <td className="py-2 px-3">{score}</td>
      <td className="py-2 px-3 w-32">
        <div className="h-3 bg-blue-200" style={{ width: `${score}%`, backgroundColor: getColorCode(score) }} />
      </td>
      <td className="py-2 px-3">
        {pro ? (
          <div className="flex items-center gap-2">
            <img src={tickGreen} alt="" className="h-5 w-5" />
            <span>{pro}</span>
          </div>
        ) : (
          '-'
        )}
      </td>
      <td className=" px-3 py-2 mr-5 xl:mr-3">
        <button type="button" className="flex gap-1 items-center" onClick={() => setIsModalOpen(true)}>
          <img src={share} alt="share" />
          <span>More</span>
        </button>
      </td>
    </tr>
  );
}

export default function UserSurveillance() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [tableData, setTableData] = useState(data);

  // const [selectedSortValue, setSelectedSortValue] = useState('Sentiment');

  const sortData = (sortBasedOn: 'email' | 'shareholder' | 'score' | 'pro', order: 'ascending' | 'descending') => {
    // Clone the original array to avoid mutating the original data
    const sortedData = [...tableData];

    // Define a comparison function based on the sortBasedOn field
    const compareFunction = (a: TableDataProps, b: TableDataProps) => {
      if (order === 'ascending') {
        return a[sortBasedOn] > b[sortBasedOn] ? 1 : -1;
      }
      return a[sortBasedOn] < b[sortBasedOn] ? 1 : -1;
    };

    // Sort the data based on the comparison function
    sortedData.sort(compareFunction);
    setTableData(sortedData);
  };

  return (
    <div>
      <div className="flex gap-5 justify-between max-md:flex-wrap mt-11 px-12">
        <div className="flex flex-col">
          <div className="text-2xl font-semibold leading-8 text-white">User Surveillance</div>
          <div className="mt-1 text-base text-slate-400">User Accounts</div>
        </div>
      </div>
      <div className="px-12 border border-t-0 border-[#1E4863] pb-10 survillence_table flex flex-col">
        <div className="h-[500px] flex-grow overflow-y-auto my-8">
          <table className="w-full text-xs text-white ">
            <thead className="sticky top-0 w-full">
              <tr className="bg-[#0A2537] font-semibold">
                <th scope="col" className="py-2 text-left px-3 items-center gap-1 min-w-32">
                  <div className="flex gap-2 items-center">
                    Name
                    <span className="flex flex-col gap-0.5">
                      <button type="button" onClick={() => sortData('email', 'ascending')}>
                        <img src={arrowDownFilled} alt="up_arrow" className="rotate-180 h-1.5 w-2" />
                      </button>
                      <button type="button" onClick={() => sortData('email', 'descending')}>
                        <img src={arrowDownFilled} alt="down_arrow" className="h-1.5 w-2" />
                      </button>
                    </span>
                  </div>
                </th>
                <th scope="col" className="py-2 text-left px-3  items-center gap-1 min-w-32">
                  <div className="flex gap-2 items-center">
                    Shareholder
                    <span className="flex flex-col gap-0.5">
                      <button type="button" onClick={() => sortData('shareholder', 'ascending')}>
                        <img src={arrowDownFilled} alt="up_arrow" className="rotate-180 h-1.5 w-2" />
                      </button>
                      <button type="button" onClick={() => sortData('shareholder', 'descending')}>
                        <img src={arrowDownFilled} alt="down_arrow" className="h-1.5 w-2" />
                      </button>
                    </span>
                  </div>
                </th>
                <th scope="col" className="py-2 text-left px-3  items-center gap-1 min-w-20">
                  <div className="flex gap-2 items-center">
                    Score
                    <span className="flex flex-col gap-0.5">
                      <button type="button" onClick={() => sortData('score', 'ascending')}>
                        <img src={arrowDownFilled} alt="up_arrow" className="rotate-180 h-1.5 w-2" />
                      </button>
                      <button type="button" onClick={() => sortData('score', 'descending')}>
                        <img src={arrowDownFilled} alt="down_arrow" className="h-1.5 w-2" />
                      </button>
                    </span>
                  </div>
                </th>
                <th scope="col" className="py-2 text-left px-3  items-center gap-1 min-w-36">
                  <div className="flex gap-2 items-center">Sentiment</div>
                </th>
                <th scope="col" className="py-2 text-left px-3  items-center gap-1 min-w-32">
                  <div className="flex gap-2 items-center">
                    Pro
                    <span className="flex flex-col gap-0.5">
                      <button type="button" onClick={() => sortData('pro', 'ascending')}>
                        <img src={arrowDownFilled} alt="up_arrow" className="rotate-180 h-1.5 w-2" />
                      </button>
                      <button type="button" onClick={() => sortData('pro', 'descending')}>
                        <img src={arrowDownFilled} alt="down_arrow" className="h-1.5 w-2" />
                      </button>
                    </span>
                  </div>
                </th>
                <th scope="col" className="py-2 text-left pl-3 pr-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ name, email, shareholder, score, pro }, index) => (
                <UserRow key={`${name}-${index + 1}`} name={name} email={email} shareholder={shareholder} score={score} pro={pro} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative">
          {isDropDownOpen && (
            <div className="absolute bottom-16 w-[200px] text-white rounded-xl bg-[#234D69]">
              {dropDownList.map((ele) => (
                <button
                  type="button"
                  key={ele}
                  onClick={() => {
                    // setSelectedSortValue(ele);
                    setIsDropDownOpen((prev) => !prev);
                  }}
                  className="p-4 text-left w-full border-b border-[#4F7187] last:border-none">
                  {ele}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsDropDownOpen((prev) => !prev)}
            className="bg-btn-green text-[#123247] px-4 py-3 rounded-full font-semibold text-xs flex justify-center items-center gap-2">
            <img loading="lazy" src={arrowDown} className="shrink-0 self-start" alt="arrow" />
            Upload Shareholder Lists
          </button>
        </div>
      </div>
    </div>
  );
}
