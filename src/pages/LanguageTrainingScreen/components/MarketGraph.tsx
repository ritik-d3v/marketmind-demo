import { useState } from 'react';
import './language.css';
import { Chrome } from '@uiw/react-color';
import Swatch from '@uiw/react-color-swatch';
import { hsvaToHex, getContrastingColor } from '@uiw/color-convert';
import Checkbox from 'src/components/Checkbox';
import Select from 'src/components/Select';

interface SymbolData {
  name: string;
  value: number;
  barColor: string;
  textColor: string;
  textBgColor: string;
}

const symbolsData = [
  { name: 'RBLX', value: 23.16 },
  { name: 'EA', value: 33.97 },
  { name: 'GME', value: 3.08 },
  { name: 'MYPS', value: 0.343 },
  { name: 'DDI', value: 0.485 },
  {
    name: 'EGLX',
    value: 0.025
  }
];

const stockData = [
  {
    name: 'EA - Electronic Arts',
    id: '1',
    disabled: false
  },
  {
    name: 'GME - GameStop Corp.',
    id: '2',
    disabled: false
  },
  {
    name: 'ATVI - Activision Blizzard',
    id: '3',
    disabled: false
  },
  {
    name: 'UPI - Ubisoft',
    id: '4',
    disabled: false
  },
  {
    name: 'MSFT - Microsoft Corporation',
    id: '5',
    disabled: false
  }
];

const deleteIcon = '/assets/icons/delete.svg?react';
const dropdown = '/assets/icons/dropdown2.svg?react';
const close = '/assets/icons/close.svg?react';

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 px-5 pt-3 bg-cyan-900">
      <div className="self-center">{children}</div>
      <div className="shrink-0 mt-3 h-0.5 bg-btn-green" />
    </div>
  );
}

function SymbolBar({ name, value, barColor, textBgColor, textColor }: SymbolData) {
  const valuePercent = (value / 40) * 100;
  const barHeight = ((valuePercent / 100) * 320).toFixed(2);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      style={{ backgroundColor: isHovered ? '#0F344C' : '#0A2537' }}
      className="flex-col relative h-full px-5 place-content-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered && (
        <button
          type="button"
          className="flex absolute p-2 text-xs w-full justify-center font-normal text-white top-[-36px] left-0 whitespace-nowrap bg-cyan-900">
          <div className="flex items-center gap-2">
            <img loading="lazy" src={deleteIcon} alt="" className="shrink-0 aspect-square" />
            <span>Delete</span>
          </div>
        </button>
      )}
      <div className="flex flex-col items-center">
        <div className="text-xs leading-5 text-slate-400 mb-1">{value}</div>
        <div style={{ height: `${barHeight}px`, backgroundColor: barColor }} className="shrink-0 w-[42px] mb-0.5 z-20" />
        <div
          style={{ color: textColor, backgroundColor: textBgColor }}
          className="justify-center self-center px-2.5 py-1.5 mt-3 text-base w-[80px] leading-4 rounded">
          {name}
        </div>
      </div>
    </button>
  );
}

function Point({ color, checked }: Readonly<{ color?: string; checked?: boolean }>) {
  if (!checked) return null;
  return (
    <div
      style={{
        height: 5,
        width: 5,
        borderRadius: '50%',
        backgroundColor: getContrastingColor(color!)
      }}
    />
  );
}

Point.defaultProps = {
  color: '',
  checked: false
};

function ColorSwatch({
  color,
  setColor,
  open,
  setOpen,
  id
}: Readonly<{ color: string; setColor: (val: string) => void; id: string; open: string; setOpen: (val: string) => void }>) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(id)}
        className="shrink-0 border border-solid border-slate-400 relative h-[26px] w-[26px]"
        style={{ backgroundColor: color }}
        type="button" // Adding role="button" for accessibility
      />
      {open === id && (
        <div className="absolute right-7 bottom-0 z-40 bg-white">
          <div className="flex justify-between w-full p-3 z-10 items-center">
            <p className="font-semibold">Color</p>
            <button type="button" onClick={() => setOpen('')}>
              <img src={close} alt="" />
            </button>
          </div>
          <div className="px-3 pb-2">
            <p className="text-left">MarketMind Colors</p>
            <Swatch
              className="py-2"
              colors={['#86A0FF', '#0A2537', '#FFFFFF', '#234D69']}
              color={color}
              onChange={(clr) => {
                setColor(hsvaToHex(clr));
              }}
              rectProps={{
                children: <Point />,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid black'
                }
              }}
            />
          </div>
          <Chrome
            color={color}
            onChange={(clr) => {
              setColor(clr.hex.toString());
            }}
          />
        </div>
      )}
    </div>
  );
}

function MarketGraph() {
  const [isAutoColors, setIsAutoColors] = useState(false);
  const [barColor, setBarColor] = useState('#86A0FF');
  const [bgColor, setBgColor] = useState('#0A2537');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textBgColor, setTextBgColor] = useState('#234D69');
  const [, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState('');

  const options = stockData.map((stock) => ({
    value: stock.id,
    label: stock.name,
    disabled: stock.disabled
  }));

  const handleChange = (value: string) => {
    setSelected(value);
    // console.log('Selected:', value);
  };

  return (
    <div className="flex flex-col px-8 my-10">
      <nav className="flex z-10 gap-0 max-w-full text-base font-semibold text-white whitespace-nowrap w-[220px]">
        <NavItem>Graph</NavItem>
        <div className="flex flex-col flex-1 self-start px-5 mt-3">
          <div className="self-center">Table</div>
          <div className="shrink-0 mt-3.5 h-0.5 bg-cyan-900" />
        </div>
      </nav>
      <main style={{ backgroundColor: bgColor }} className="flex flex-col relative justify-center w-full max-md:max-w-full">
        <section className="flex flex-col pt-6 w-full max-md:max-w-full">
          <div className="flex flex-col px-8 border-b border-[#1E4863] mt-0 w-full font-semibold max-md:px-5 max-md:max-w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <h2 className="text-base text-white">Market Capitalization</h2>
                <time className="mt-1.5 text-xs leading-5 underline text-slate-400">April 15, 2024</time>
              </div>
              <section className="wrapper2 w-72">
                <Select options={options} onChange={handleChange} placeholder="Add Symbol" />
                {/* <select
                  id="underline_select"
                  className="block py-2 px-10 min-w-80 bg-transparent border text-white font-normal text-sm border-[#89A4B5] rounded-md focus:outline-none focus:ring-0 peer">
                  {stockData.map(({ id, name, disabled }) => (
                    <StockItem key={id} name={name} disabled={disabled} />
                  ))}
                </select> */}
              </section>
            </div>

            <div className="flex mt-10 overflow-x-auto graph">
              <div className="flex flex-col w-10 text-xs leading-5 whitespace-nowrap text-slate-400 max-md:mt-0">
                <div className="my-8 flex items-center">
                  40 <span className="absolute mt-8">Billions</span> <span className="absolute mt-16">USD</span>
                  <div className="absolute h-[1px] bg-[#1E4863] opacity-30 w-[92%] ml-8 z-10" />
                </div>
                <div className="my-8 flex items-center">
                  30
                  <div className="absolute h-[1px] bg-[#1E4863] opacity-30 w-[92%] ml-8 z-10" />
                </div>
                <div className="my-8 flex items-center">
                  20
                  <div className="absolute h-[1px] bg-[#1E4863] opacity-30 w-[92%] ml-8 z-10" />
                </div>
                <div className="my-8 flex items-center">
                  10
                  <div className="absolute h-[1px] bg-[#1E4863] opacity-30 w-[92%] ml-8 z-10" />
                </div>
                <div className="my-8 flex items-center">
                  0
                  <div className="absolute h-[1px] bg-[#1E4863] opacity-30 w-[92%] ml-8 z-10" />
                </div>
              </div>
              <div className="flex gap-5 ml-10 justify-between items-end self-end text-center whitespace-nowrap">
                {symbolsData.map((symbol) => (
                  <SymbolBar barColor={barColor} textColor={textColor} textBgColor={textBgColor} key={symbol.name} {...symbol} />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-center w-full border-solid max-md:max-w-full">
          <div className="flex flex-col px-9 py-6 w-full max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-3.5 my-auto text-sm font-semibold leading-5 text-white">
                <img loading="lazy" src={dropdown} alt="" className="shrink-0 my-auto" />
                <span>Current Corporate Presentation Colors</span>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex gap-2.5">
                  <span className="text-xs leading-5 text-slate-400" />

                  <Checkbox
                    id="match-colors"
                    checked={isAutoColors}
                    onChange={() => setIsAutoColors((prev) => !prev)}
                    label="Auto match presentation colors"
                    labelAdditionalClass="font-normal text-xs leading-5 text-slate-400"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 self-start mt-3.5 ml-7 max-md:ml-2.5">
              <ColorSwatch color={barColor} setColor={setBarColor} id="barColor" open={isOpen} setOpen={setIsOpen} />
              <ColorSwatch color={bgColor} setColor={setBgColor} id="bgColor" open={isOpen} setOpen={setIsOpen} />
              <ColorSwatch color={textColor} setColor={setTextColor} id="textColor" open={isOpen} setOpen={setIsOpen} />
              <ColorSwatch color={textBgColor} setColor={setTextBgColor} id="textBgColor" open={isOpen} setOpen={setIsOpen} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MarketGraph;
