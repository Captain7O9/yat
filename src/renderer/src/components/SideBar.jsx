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
    className={`sidebar-icon group ${selected ? 'rounded bg-cyan-500' : ''}`}
    onClick={onClick}
  >
    <img src={icon} />
    <span className="sidebar-tooltip group-hover:scale-100">{tooltip}</span>
  </div>
);

export default SideBar;
