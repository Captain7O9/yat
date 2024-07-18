function Options({ onPlus2, onDNF, onDelete, isRunning }) {
  return (
    <>
      <div
        className={`mb-5 flex-initial text-center ${isRunning ? 'scale-0' : ''}`}
      >
        <button
          className="mx-3 px-4 py-2 text-xl text-neutral-500"
          onClick={onPlus2}
        >
          +2
        </button>
        <button
          className="mx-3 px-4 py-2 text-xl text-neutral-500"
          onClick={onDNF}
        >
          DNF
        </button>
        <button
          className="mx-3 px-4 py-2 text-xl text-neutral-500"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default Options;
