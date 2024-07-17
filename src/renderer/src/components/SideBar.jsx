import { useState } from 'react';

import rubiksCube3x3Icon from '../assets/3x3.svg';

function SideBar({ onSelectItem }) {
  const items = [
    { icon: rubiksCube3x3Icon, alt: '3x3' },
    { icon: rubiksCube3x3Icon, alt: '4x4' },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="fixed left-0 top-0 flex h-screen w-16 flex-col items-center justify-center bg-neutral-700">
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
  );
}

const SideBarIcon = ({ icon, tooltip = 'tooltip 💡', onClick, selected }) => (
  <div
    className={`group relative mx-auto mb-2 mt-2 flex h-12 w-12 items-center justify-center shadow-lg hover:rounded hover:bg-cyan-500 hover:text-white ${selected ? 'rounded bg-cyan-500' : ''}`}
    onClick={onClick}
  >
    <img src={icon} />
    <span className="absolute left-14 top-0 m-2 w-auto min-w-max origin-left scale-0 rounded-md bg-neutral-700 p-2 text-xs font-bold text-white shadow-md transition-all duration-100 group-hover:scale-100">
      {tooltip}
    </span>
  </div>
);

export default SideBar;
