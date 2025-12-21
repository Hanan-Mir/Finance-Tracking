function ConfirmDelete({ veiwConfirm, id, deleteAndRevalidate }) {
  console.log(id);
  return (
    <div className="h-full w-screen">
      <div className="absolute md:z-30 md:top-80 md:rounded-2xl md:left-60 border bg-[#FAFAFA] md:px-3 md:py-6">
        <div>
          <h1 className="text-[1.5rem]">
            All the Transactions related to the product will be deleted ?
          </h1>
          <div className="w-full mt-3 flex md:justify-end md:gap-3">
            <button
              onClick={() => {
                deleteAndRevalidate(id);
                veiwConfirm((view) => !view);
              }}
              className="border px-2 py-2 rounded-[7px] hover:cursor-pointer hover:bg-gray-200"
            >
              Delete
            </button>
            <button
              onClick={() => veiwConfirm((view) => !view)}
              className="border px-2 py-2 rounded-[7px] hover:cursor-pointer hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => veiwConfirm((view) => !view)}
        className="overflow-hidden absolute md:-left-70 inset-0 bg-black/30 backdrop-blur-[6px] z-20 h-screen w-[150%]"
      ></div>
    </div>
  );
}

export default ConfirmDelete;
