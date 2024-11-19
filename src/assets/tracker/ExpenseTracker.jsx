import TrackerForm from "./TrackerForm";

export default function ExpenseTracker({
  trackerType,
  onTrackerType,
  categories,
  onSave,
  updateTrackerItem,
  isAdd,
}) {
  function handleTrackerType(e, type) {
    e.preventDefault();
    if (trackerType !== type) {
      onTrackerType(type);
    }
  }
  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>
      <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
        <div
          className={`cursor-pointer text-center flex-1 px-4 py-2 ${
            trackerType == "expense"
              ? "bg-teal-600 text-white hover:bg-teal-500"
              : " hover:bg-slate-50 hover:text-slate-900"
          } `}
          onClick={(e) => handleTrackerType(e, "expense")}
        >
          Expense
        </div>
        <div
          className={`cursor-pointer text-center flex-1 px-4 py-2  ${
            trackerType === "income"
              ? "bg-teal-600 text-white hover:bg-teal-500"
              : "hover:bg-slate-50 hover:text-slate-900"
          }`}
          onClick={(e) => handleTrackerType(e, "income")}
        >
          Income
        </div>
      </div>
      <TrackerForm
        trackerType={trackerType}
        categories={categories}
        onSave={onSave}
        updateTrackerItem={updateTrackerItem}
        isAdd={isAdd}
      />
    </div>
  );
}
