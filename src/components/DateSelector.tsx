import { useState } from "react";

type DateSelectorProps = {
    dateUpdated: (date: Date)=>void
}

const DateSelector = (props: DateSelectorProps) => {
  let [date, setDate] = useState(new Date());//TODO: use one state here and in category

  const changeDate = (dateChange: number) => {
    let updatedDate = new Date(date);
    updatedDate.setDate(updatedDate.getDate() + dateChange);
    setDate(updatedDate);
    props.dateUpdated(updatedDate);
  };

  return (
    <div className="flex justify-around items-center border-y">
      <button className="p-1 my-2 border-black border rounded"  onClick={() => changeDate(-1)}>Back</button>
      <p className="font-bold">{date.toDateString()}</p>
        <button className="p-1 my-2 border-black border rounded disabled:opacity-25" disabled={date.toDateString() === new Date().toDateString()} onClick={() => changeDate(1)}>Next</button>
    </div>
  );
};

export default DateSelector;
