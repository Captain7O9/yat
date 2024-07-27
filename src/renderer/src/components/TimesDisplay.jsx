import { useState } from 'react';

function TimesDisplay({ isRunning }) {
  return (
    <div className="group/times-display fixed inset-y-0 right-0 top-0 w-96">
      <div
        className={`fixed inset-y-0 right-0 top-0 flex h-screen w-80 translate-x-32 flex-col bg-neutral-700 transition-all duration-100 ${isRunning ? 'translate-x-80' : 'group-hover/times-display:translate-x-0'}`}
      >
        <TimeCard />
        <TimeCard />
        <TimeCard />
        <TimeCard />
      </div>
    </div>
  );
}

function TimeCard() {
  const [isPlus2, setIsPlus2] = useState(false);
  const [isDNF, setIsDNF] = useState(false);

  const log = () => {
    console.log('clicked');
  };
  return (
    <div className="group/time-card mx-2 mt-2 flex h-10 items-center rounded-md bg-neutral-800 align-baseline text-white shadow-sm">
      <div className="my-2 ml-3">
        12.345 <span className="text-[10px] text-neutral-500">22:48</span>
      </div>
      <button
        className={`my-2 ml-auto scale-0 rounded-sm px-0.5 text-base group-hover/time-card:scale-100 ${isPlus2 ? 'scale-100 bg-neutral-700' : ''}`}
        onClick={() => {
          log();
          setIsPlus2(!isPlus2);
        }}
      >
        +2
      </button>
      <button
        className={`my-2 ml-2 scale-0 rounded-sm px-0.5 text-base group-hover/time-card:scale-100 ${isDNF ? 'scale-100 bg-neutral-700' : ''}`}
        onClick={() => {
          log();
          setIsDNF(!isDNF);
        }}
      >
        DNF
      </button>
      <button
        className="m-2 my-2 flex scale-0 items-center group-hover/time-card:scale-100"
        onClick={log}
      >
        <svg
          className="size-6 text-neutral-500 hover:text-white"
          width="1em"
          height="1em"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <line
            x1="200"
            y1="56"
            x2="56"
            y2="200"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          ></line>
          <line
            x1="200"
            y1="200"
            x2="56"
            y2="56"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          ></line>
        </svg>
      </button>
    </div>
  );
}

export default TimesDisplay;
