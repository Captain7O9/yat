import { useState } from 'react';

import rubiksCube3x3Icon from '../assets/3x3.svg';
import profileIcon from '../assets/profile.svg';

function SideBar({ onSelectItem, isRunning }) {
  const items = [
    { icon: profileIcon, alt: 'Profile' },
    { icon: rubiksCube3x3Icon, alt: '3x3' },
    { icon: rubiksCube3x3Icon, alt: '4x4' },
  ];

  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <div className="group/sidebar fixed left-0 top-0 h-screen w-32">
      <div
        className={`fixed left-0 top-0 flex h-screen w-16 -translate-x-16 flex-col items-center justify-center bg-neutral-700 transition-all duration-100 ${isRunning ? '-translate-x-16' : 'group-hover/sidebar:translate-x-0'}`}
      >
        {items.map((item, index) => (
          <SideBarIcon
            key={index}
            icon={item.icon}
            alt={item.alt}
            selected={selectedIndex === index}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item.alt);
            }}
          />
        ))}
      </div>
    </div>
  );
}

const SideBarIcon = ({ icon, tooltip = 'tooltip 💡', onClick, selected }) => (
  <div
    className={`group/icon relative mx-auto mb-2 mt-2 flex h-12 w-12 items-center justify-center shadow-lg hover:rounded hover:bg-cyan-500 ${selected ? 'rounded bg-cyan-500' : ''}`}
    onClick={onClick}
  >
    <img src={icon} />
    <span className="absolute left-14 top-0 m-2 w-auto min-w-max origin-left scale-0 rounded-md bg-neutral-700 p-2 text-xs font-bold text-white transition-all duration-100 group-hover/icon:scale-100">
      {tooltip}
    </span>
  </div>
);

export default SideBar;
