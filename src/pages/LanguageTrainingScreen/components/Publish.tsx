import { useState } from 'react';
import ToggleSwitch from 'src/components/ToggleSwitch';
import Tag from 'src/components/Tag';
import DateTimePicker from 'src/components/DateTimePicker';

function PublishComponent() {
  const [isChecked2, setIsChecked2] = useState(true);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleApply = (dateTime: Date) => {
    setSelectedDateTime(dateTime);
    togglePicker(); // Close the picker after applying
  };

  return (
    <div className="flex flex-col m-10 max-md:p-5">
      <section className="flex flex-col items-start w-full max-md:px-5 max-md:max-w-full">
        <h2 className="text-base font-semibold text-white max-md:max-w-full">Publish</h2>
        <div className="flex gap-4 mt-7 max-md:flex-wrap">
          <Tag className="bg-slate-200">Test LLM Responses</Tag>
          <div className="flex flex-auto gap-3 my-auto">
            <ToggleSwitch id="publish" checked={isChecked2} onChange={(checked2) => setIsChecked2(checked2)} />
            <div className="my-auto text-xs text-slate-400">Only produce responses identical to source material</div>
          </div>
        </div>
        <Tag onClick={togglePicker} className="mt-4 bg-btn-green">
          Schedule Public Release
        </Tag>
        <div className="relative bottom-[482px] left-0">
          {isPickerOpen && <DateTimePicker onApply={handleApply} onCancel={togglePicker} />}
        </div>
        {selectedDateTime && <p className="mt-4 text-white">Selected Date/Time: {selectedDateTime.toLocaleString()}</p>}
      </section>
    </div>
  );
}

export default PublishComponent;
