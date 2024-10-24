import { useState } from 'react';
import AddComments, { AddCompanyCommentsProps } from './AddComments';

interface CompanyData {
  symbol: string;
  name: string;
}

const companies: CompanyData[] = [
  { symbol: 'RBLX', name: 'Roblox Corp.' },
  { symbol: 'EA', name: 'Electronic Arts' },
  { symbol: 'GME', name: 'GameStop Corp.' },
  { symbol: 'MYPS', name: 'Playstudios Inc.' },
  { symbol: 'DDI', name: 'Doubledown Interactive Co. Inc.' }
];

const companyCommentaryData: AddCompanyCommentsProps[] = [
  {
    id: 'rblx',
    suggestedQuestions: [
      { id: 'q-1', question: 'What do these companies do and how does this differ from yours?', comments: [] },
      { id: 'q-2', question: `How does this company's market cap compare to yours?`, comments: [] },
      { id: 'q-3', question: `How does this company's EPS compare with yours?`, comments: [] },
      { id: 'q-4', question: `RBLX's revenue increased by 23% this quarter but EGLX's only increased by 5%. Why?`, comments: [] }
    ],
    companySymbol: 'RBLX',
    name: 'Roblox Corp.'
  },
  {
    id: 'gme',
    suggestedQuestions: [
      { id: 'q-1', question: 'What do these companies do and how does this differ from yours?', comments: [] },
      { id: 'q-2', question: `How does this company's market cap compare to yours?`, comments: [] }
    ],
    companySymbol: 'GME',
    name: 'GameStop Corp.'
  },
  {
    id: 'EA',
    suggestedQuestions: [
      { id: 'q-3', question: `How does this company's EPS compare with yours?`, comments: [] },
      { id: 'q-4', question: `RBLX's revenue increased by 23% this quarter but EGLX's only increased by 5%. Why?`, comments: [] }
    ],
    companySymbol: 'EA',
    name: 'Electronic Arts'
  },
  {
    id: 'myps',
    suggestedQuestions: [{ id: 'q-1', question: 'What do these companies do and how does this differ from yours?', comments: [] }],
    companySymbol: 'MYPS',
    name: 'Playstudios Inc.'
  },
  {
    id: 'ddi',
    suggestedQuestions: [
      { id: 'q-2', question: `How does this company's market cap compare to yours?`, comments: [] },
      { id: 'q-3', question: `How does this company's EPS compare with yours?`, comments: [] }
    ],
    companySymbol: 'DDI',
    name: 'Doubledown Interactive Co. Inc.'
  }
];

const slides = ['Custom Metrics', 'Stock Performance', 'Market Cap', 'EV/Revenue', 'EV/EBIDTA', 'EPS'];

const deleteIcon = '/assets/icons/delete.svg?react';
const addIcon = '/assets/icons/add.svg?react';

function DeleteButton() {
  return (
    <div className="flex gap-1.5 justify-between my-3 w-fit items-center">
      <img src={deleteIcon} alt="Delete icon" className="shrink-0 aspect-square" />
      <div>Delete</div>
    </div>
  );
}

function Comparables() {
  const [openGenerateComments, setOpenGenerateComments] = useState(false);

  return (
    <div className="flex flex-col px-8 mt-8 max-md:px-5 max-md:max-w-full">
      <h1 className="text-2xl font-semibold leading-8 text-white max-md:max-w-full">Comparables Slide Builder</h1>
      <h2 className="mt-9 text-base font-semibold text-white max-md:max-w-full">Companies to Compare</h2>
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right border-2 border-cyan-900">
          <thead className="text-xs bg-[#0A2537] text-white ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Symbol
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.symbol} className="bg-transparent text-white">
                <td className="whitespace-nowrap px-6 w-1/6">
                  <div key={company.symbol} className="justify-center w-[96px] my-1.5 text-center py-[7px] bg-[#234D69] font-semibold">
                    {company.symbol}
                  </div>
                </td>
                <td className="px-6 w-4/6">
                  <div key={company.symbol} className="my-[13px] font-semibold">
                    {company.name}
                  </div>
                </td>
                <td className="px-6 w-1/6">
                  <DeleteButton />
                </td>
              </tr>
            ))}
            <td colSpan={2}>
              <div className="flex gap-2 justify-between mx-6 px-3 my-3 py-[7px] text-white w-fit bg-[#234D69]">
                <img src={addIcon} alt="add-icon" className="shrink-0 my-auto w-4 aspect-square fill-green-400" />
                <div>Add new symbol</div>
              </div>
              <div className="flex gap-2 justify-between mx-6 px-3 my-3 py-[7px] text-white w-fit bg-[#234D69]">
                <img src={addIcon} alt="add-icon" className="shrink-0 my-auto w-4 aspect-square fill-green-400" />
                <div>Industry Averages</div>
              </div>
            </td>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="text-xs font-semibold	px-4 py-2 mt-8 rounded-full w-fit"
        style={{ backgroundColor: openGenerateComments ? '#0A2537' : '#62C55D', color: openGenerateComments ? '#ffffff' : '#123247' }}
        onClick={() => setOpenGenerateComments(true)}>
        Generate Commentary on these Companies
      </button>
      {openGenerateComments && (
        <div className="my-4">
          <div className="bg-[#0A2537] p-8 border border-solid border-[#1E4863]">
            <p className="text-white font-semibold mb-2">Based on Company Comparables</p>
            {companyCommentaryData.map(({ id, name, suggestedQuestions, companySymbol }) => (
              <AddComments id={id} name={name} suggestedQuestions={suggestedQuestions} companySymbol={companySymbol} key={id} />
            ))}
          </div>
        </div>
      )}
      <h2 className="mt-11 text-base font-semibold text-white max-md:mt-10 max-md:max-w-full">Slide Builder</h2>
      <div className="flex gap-4 mt-5 text-base text-center text-white max-xl:flex-wrap">
        {slides.map((slide) => (
          <div key={slide} className="flex gap-2 justify-between px-2 py-1 bg-[#234D69]">
            <img src={addIcon} alt={`${slide}-icon`} className="shrink-0 my-auto w-4 aspect-square fill-green-400" />
            <div>{slide}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comparables;
