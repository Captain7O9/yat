import { useEffect, useRef, useState } from 'react';

function Timer() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

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
  }

  let secondPassed = 0;
  if (startTime != null && now != null) {
    secondPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <div className="ml-16 flex h-screen flex-grow flex-col justify-center bg-neutral-800 text-white">
        <div className="flex-initial text-center text-9xl" id="timer">
          {isRunning ? secondPassed.toFixed(1) : secondPassed.toFixed(3)}
        </div>
        <div className="mt-10 flex-initial text-center text-2xl [word-spacing:1rem]">
          R' L' U' D2 R' B' R D' L' B U2 B2 R2 D R' L' B2 F R' D B2 R F D' L'
        </div>
      </div>
    </>
  );
}

export default Timer;
