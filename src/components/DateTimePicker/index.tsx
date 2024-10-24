import * as React from 'react';
import DatePicker from 'react-datepicker';
import './datetime.css';
import 'react-datepicker/dist/react-datepicker.css';

const cross = '/assets/icons/cross_gray.svg';

// interface ArrowIconProps {
//   // eslint-disable-next-line react/require-default-props
//   className?: string;
//   onClick: () => void;
// }

// function ArrowIcon({ className, onClick }: ArrowIconProps) {
//   return (
//     <button type="button" onClick={onClick}>
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f747a6410b84d0299407d51e3fbddfb3c1f4c2718680780bbc4c993fea9a358?apiKey=0dc35e9a66804e248f37c04943652f7c&"
//         alt="Arrow icon"
//         className={`shrink-0 self-stretch my-auto w-1.5 aspect-[0.55] fill-cyan-950 ${className}`}
//         aria-label="Change Date"
//       />
//     </button>
//   );
// }

interface DateTimePickerProps {
  onApply: (dateTime: Date) => void;
  onCancel: () => void;
}

function DateTimePicker({ onApply, onCancel }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<Date>(new Date());

  const minDate = new Date(); // Set today as the minimum date
  minDate.setHours(0, 0, 0, 0); // Remove time component

  // Function to get minimum time based on the selected date
  const getMinTime = () => {
    const today = new Date();
    today.setSeconds(0, 0);
    return selectedDate && selectedDate.toDateString() === today.toDateString() ? today : new Date(0, 0, 0, 0, 0);
  };

  const getMaxTime = () => {
    return new Date(0, 0, 0, 23, 59, 0); // Sets max time to 23:59 for all days
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: Date) => {
    setSelectedTime(time);
  };

  const handleApply = () => {
    if (selectedDate && selectedTime) {
      const appliedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      onApply(appliedDateTime);
    }
  };

  const handleCancel = () => {
    setSelectedDate(null); // Optionally reset the state or perform other cleanup
    setSelectedTime(new Date()); // Reset to current time
    onCancel();
  };

  return (
    <div className="absolute w-[360px] flex flex-col py-4 text-xs bg-white rounded-xl shadow-lg max-w-[360px] text-cyan-950">
      <header className="flex gap-3 justify-between items-center w-full text-base font-semibold px-8">
        <h1>Schedule Public Release</h1>
        <button type="button" onClick={onCancel} className="">
          <img loading="lazy" src={cross} className="shrink-0 w-6 " alt="settings" />
        </button>
      </header>
      <section className="mt-4 bg-[#EFF3F6] py-2">
        <div className="flex justify-start items-center ml-8">
          <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            showTimeSelect
            showIcon
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className=" bg-[#EFF3F6]"
            minDate={minDate}
            minTime={getMinTime()}
            maxTime={getMaxTime()}
          />
        </div>
      </section>

      {/* <section className="flex gap-5 justify-center items-center self-center px-5 mt-4 w-full">
        <ArrowIcon
          className="rotate-180 cursor-pointer"
          onClick={() => handleDateChange(selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1) : null)}
        />
        <div className="self-stretch">
          {selectedDate
            ? selectedDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric'
              })
            : 'Select a date'}
        </div>
        <ArrowIcon
          className="cursor-pointer"
          onClick={() => handleDateChange(selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1) : null)}
        />
      </section> */}
      <section className="flex gap-0 self-center mt-4 whitespace-nowrap">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          dayClassName={(date) => (date.getDay() === 0 ? 'text-red-500' : 'text-gray-700')}
          minDate={minDate}
          minTime={getMinTime()}
        />
      </section>
      <div className="flex px-8 gap-2.5 self-end mt-4 font-semibold text-center whitespace-nowrap">
        <button type="button" className="justify-center px-5 py-3 bg-slate-200 rounded-[100px]" onClick={handleCancel}>
          Cancel
        </button>
        <button
          type="button"
          className="justify-center px-5 py-3 bg-green-400 rounded-[100px]"
          onClick={handleApply}
          disabled={!selectedDate}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default DateTimePicker;
