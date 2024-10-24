import { useState } from 'react';
import { useChatHistory } from 'src/context/ChatHistoryContext';
import ToggleSwitch from 'src/components/ToggleSwitch';
import DisplayMessage from './DisplayMessage';

const arrowDown = '/assets/icons/arrowdown.svg';

export default function LiveTranscriptViewer() {
  // const [, setWs] = useState<WebSocket | null>(null);
  // const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const { chatHistory } = useChatHistory();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [dropDownList, setDropDownList] = useState([
    { id: 1, name: 'Scripted Responses', selected: false },
    { id: 2, name: 'Responses Approved by Colleagues', selected: false },
    { id: 3, name: 'Responses identical to source material', selected: false },
    { id: 4, name: 'Responses Similar to Approved by Colleagues', selected: true }
  ]);

  function handleSelectedItem(id: number) {
    setDropDownList((prev) => prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
  }

  return (
    <div className="flex flex-col text-[14px]">
      <div className="sticky top-0 bg-[#123247] pb-3 flex gap-5 px-5 w-full font-semibold max-md:flex-wrap max-md:max-w-full">
        <div className="flex-auto my-auto text-2xl leading-8 text-white">Live Transcript Viewer</div>
        <div className="flex gap-2.5 text-xs text-cyan-950">
          <button type="button" className="justify-center self-start px-5 py-3 text-center bg-slate-200 rounded-[100px]">
            Jump to Top
          </button>
          <div className="relative">
            <button
              type="button"
              className="flex gap-2.5 justify-between items-center px-4 py-2.5 whitespace-nowrap bg-btn-green rounded-[100px]"
              onClick={() => setIsDropDownOpen((prev) => !prev)}>
              <img loading="lazy" src={arrowDown} alt="arrow" />
              <div>Filter</div>
            </button>
            {isDropDownOpen && (
              <div className="filter_dropdown absolute  bg-[#234D69] rounded-xl w-[350px] ">
                {dropDownList.map(({ id, name, selected }) => (
                  <button
                    type="button"
                    key={id}
                    className="flex items-center gap-1 p-4 border-b border-white last:border-b-0 justify-start w-full"
                    onClick={() => handleSelectedItem(id)}>
                    <ToggleSwitch
                      id={`dropdown-item-${id}`}
                      checked={selected}
                      onChange={() => {
                        handleSelectedItem(id);
                      }}
                    />
                    <span className="text-white text-xs text-left">{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {chatHistory.map((chat) => (
        <DisplayMessage prompt={chat.prompt} response={chat.response} key={chat.id} />
      ))}
    </div>
  );
}
