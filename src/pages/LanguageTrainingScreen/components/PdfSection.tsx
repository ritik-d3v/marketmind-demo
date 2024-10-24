import { SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import { useState } from 'react';
import ToggleSwitch from 'src/components/ToggleSwitch';
import Tag from 'src/components/Tag';
import { Popover } from 'react-tiny-popover';
import DateTimePicker from 'src/components/DateTimePicker';

const upload = '/assets/icons/upload.svg?react';
const auto = '/assets/icons/auto.svg?react';
const down = '/assets/icons/arrowdown.svg?react';
const dropdown = '../assets/icons/dropdown2.svg';

interface PdfProps {
  filename: string;
}

function PdfSection({ filename }: Readonly<PdfProps>) {
  const [isChecked, setIsChecked] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopoverOpen2, setIsPopoverOpen2] = useState(false);
  const Dateoptions = { month: 'short', day: 'numeric', year: 'numeric' };

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDate, setSelectedDateTime] = useState<Date | null>(null);

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleApply = (dateTime: Date) => {
    setSelectedDateTime(dateTime);
    togglePicker(); // Close the picker after applying
  };

  return (
    <div className="flex flex-col m-10 max-md:p-5">
      <section className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full items-center">
          <div>
            <h1 className="text-2xl font-semibold leading-8 text-white max-md:max-w-full">Current Document</h1>
            <h2 className="mt-2 text-base font-semibold text-slate-300 max-md:max-w-full">Current Filename: {filename}</h2>
          </div>
          <div>
            <div className="flex items-end my-auto text-xs mt-2 gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xs font-semibold text-white max-md:max-w-full">Display Name</h2>
                <input
                  type="text"
                  id="customQuestion"
                  placeholder="Type your question"
                  aria-label="Type your question"
                  value="The Effects of Dual Listing on Share Prices and Liquidity"
                  className="justify-center h-[37px] px-4 outline-none py-3 w-96 rounded-lg border border-solid border-slate-400 leading-[167%] bg-transparent text-[#B7CFDE]"
                />
              </div>
              <div className="flex flex-col gap-2 justify-end relative">
                <h2 className="text-xs font-semibold text-white max-md:max-w-full">Document Name</h2>
                <button
                  type="button"
                  onClick={togglePicker}
                  className="justify-center gap-1 flex items-center h-[37px] px-4 outline-none py-3 rounded-lg border border-solid border-slate-400 leading-[167%] bg-transparent text-[#B7CFDE]">
                  <img src={dropdown} alt="" />
                  {selectedDate ? selectedDate.toLocaleString('en-US', Dateoptions as Intl.DateTimeFormatOptions) : 'Document Date'}
                </button>
                <div className="absolute top-[68px] right-[360px] z-20">
                  {isPickerOpen && <DateTimePicker onApply={handleApply} onCancel={togglePicker} />}
                </div>
              </div>
              <button
                type="submit"
                className="justify-center px-5 py-3 font-semibold text-center whitespace-nowrap bg-slate-200 rounded-[100px] text-cyan-950">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="h-[700px] w-full mt-6 rounded-lg">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl="/assets/PR-4Nov2022-NASDAQ.pdf" defaultScale={SpecialZoomLevel.PageWidth} />
          </Worker>
        </div>
        <div className="flex justify-between w-full items-center mt-10 max-xl:flex-wrap">
          <div className="flex gap-3 items-center">
            <Popover
              isOpen={isPopoverOpen}
              positions="top"
              content={
                <div className="bg-[#234D69] rounded-lg text-white text-xs font-semibold w-[200px] mb-2">
                  <div className="px-5 py-4">New Document</div>
                  <div className="w-full bg-white border-solid h-[1px] max-md:max-w-full" />
                  <div className="px-5 py-4">Update Current Document</div>
                </div>
              }>
              <button type="button" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                <Tag className="bg-btn-green flex items-center gap-3">
                  <img src={down} alt="" />
                  <p>Upload Document</p>
                </Tag>
              </button>
            </Popover>
            <Popover
              isOpen={isPopoverOpen2}
              positions="top"
              content={
                <div className="bg-[#234D69] rounded-lg text-white text-xs font-semibold w-[200px] mb-2">
                  <div className="px-5 py-4">Import regulatory filings</div>
                  <div className="w-full bg-white h-[1px] max-md:max-w-full" />
                  <div className="px-5 py-4">Scrape web content</div>
                  <div className="w-full bg-white h-[1px] max-md:max-w-full" />
                  <div className="px-5 py-4">Scrape social media</div>
                </div>
              }>
              <button type="button" onClick={() => setIsPopoverOpen2(!isPopoverOpen2)}>
                <Tag className="bg-btn-green flex items-center gap-3">
                  <img src={down} alt="" />
                  <p>Import Other Content</p>
                </Tag>
              </button>
            </Popover>
            <Tag className="bg-transparent border-[#89A4B5] border-2 text-white flex items-center gap-3">
              <img src={auto} alt="" />
              <p>Auto Draft</p>
            </Tag>
            <Tag className="bg-transparent border-[#89A4B5] border-2 text-white flex items-center gap-3">
              <img src={upload} alt="" />
              <p>Upload Updated Version</p>
            </Tag>
          </div>
          <div className="flex gap-2 ml-5 mt-4 xl:mt-0">
            <div className="text-[10px] font-semibold text-white">
              <p>Document</p>
              <p>Requires Approval</p>
            </div>
            <ToggleSwitch id="pdf" checked={isChecked} onChange={(checked) => setIsChecked(checked)} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PdfSection;
