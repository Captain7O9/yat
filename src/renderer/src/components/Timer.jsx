import { useEffect, useRef, useState } from 'react';
import { Scrambow } from 'scrambow';

import Options from './Options';

function Timer({ onRunningChange }) {
  const scramble3x3 = new Scrambow();

  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [scramble, setScramble] = useState(scramble3x3.get());
  const intervalRef = useRef(null);

  useEffect(() => {
    console.log('state changed');
    onRunningChange(isRunning);
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        if (!isRunning) {
          handleStart();
        } else {
          handleStop();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRunning]);

  function handleStart() {
    setIsRunning(true);
    // Start counting
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    setIsRunning(false);
    clearInterval(intervalRef.current);

    // Generate new scramble
    setScramble(scramble3x3.get());
  }

  const handlePlus2 = () => {
    console.log('handlePlus2');
  };

  const handleDNF = () => {
    console.log('handleDNF');
  };

  const handleDelete = () => {
    console.log('handleDelete');
  };

  let secondPassed = 0;
  if (startTime != null && now != null) {
    secondPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <div className="flex h-screen flex-grow flex-col justify-center bg-neutral-800 text-white">
        <Options
          onPlus2={handlePlus2}
          onDNF={handleDNF}
          onDelete={handleDelete}
          isRunning={isRunning}
        />
        <div className="flex-initial text-center text-9xl" id="timer">
          {isRunning ? secondPassed.toFixed(1) : secondPassed.toFixed(3)}
        </div>
        <div
          className={`mt-10 flex-initial text-center text-2xl [word-spacing:1rem] ${isRunning ? 'opacity-0' : 'opacity-100'}`}
        >
          {scramble[0].scramble_string}
        </div>
      </div>
    </>
  );
}

export default Timer;
