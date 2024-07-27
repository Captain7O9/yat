import { useState } from 'react';

import SideBar from './components/SideBar';
import Timer from './components/Timer';
import TimesDisplay from './components/TimesDisplay';
import Profile from './components/Profile';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedItem, setSelectedItem] = useState('3x3');
  const handleRunningChange = (value) => {
    setIsRunning(value);
  };

  const handleSelectItem = (selectedItem) => {
    console.log(selectedItem);
    setSelectedItem(selectedItem);
  };

  switch (selectedItem) {
    case '3x3':
      return (
        <div className="flex select-none">
          <SideBar onSelectItem={handleSelectItem} isRunning={isRunning} />
          <Timer onRunningChange={handleRunningChange} />
          <TimesDisplay isRunning={isRunning} />
        </div>
      );
    case '4x4':
      return (
        <div className="flex select-none">
          <SideBar onSelectItem={handleSelectItem} isRunning={isRunning} />
          <p>4x4</p>
          <TimesDisplay isRunning={isRunning} />
        </div>
      );
    case 'Profile':
      return (
        <div className="flex select-none">
          <SideBar onSelectItem={handleSelectItem} isRunning={isRunning} />
          <Profile />
        </div>
      );
  }
}

export default App;
