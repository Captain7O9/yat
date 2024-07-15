import SideBar from './components/SideBar';
import Timer from './components/Timer';

function App() {
  const handleSelectItem = (selectedItem) => {
    console.log(selectedItem);
  };

  return (
    <>
      <div className="flex">
        <SideBar onSelectItem={handleSelectItem} />
        <Timer />
      </div>
    </>
  );
}

export default App;
