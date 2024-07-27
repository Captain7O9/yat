import { useEffect, useState } from 'react';

function Profile() {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await window.api.fetchTimes();
        setTimes(data);
      } catch (error) {
        console.error('Error fetching times :', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen flex-grow flex-col items-center bg-neutral-800 pt-20 text-white">
      {times.map((time, index) => (
        <div key={index}>
          <p>Time: {time.time}</p>
          <p>Date: {`${new Date(parseInt(time.date))}`}</p>
          <p>Type: {time.type}</p>
          <p>Scramble: {time.scramble}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;
