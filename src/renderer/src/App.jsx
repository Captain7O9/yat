import { useState } from 'react';

import SideBar from './components/SideBar';
import Timer from './components/Timer';
import TimesDisplay from './components/TimesDisplay';

function App() {
  const [isRunning, setIsRunning] = useState(false);

  const handleRunningChange = (value) => {
    setIsRunning(value);
  };

  const handleSelectItem = (selectedItem) => {
    console.log(selectedItem);
  };

  return (
    <>
      <div className="flex select-none">
        <SideBar onSelectItem={handleSelectItem} />
        <Timer onRunningChange={handleRunningChange} />
        <TimesDisplay isRunning={isRunning} />
      </div>
    </>
  );
}

export default App;
