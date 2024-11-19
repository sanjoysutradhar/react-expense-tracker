import { useEffect, useState } from "react";
export default function TrackerForm({
  trackerType,
  categories,
  updateTrackerItem,
  onSave,
  isAdd,
}) {
  const defaultItem = {
    id: crypto.randomUUID(),
    category: "",
    amount: 0,
    date: "",
  };

  const [trackerItem, setTrackerItem] = useState(
    updateTrackerItem || defaultItem
  );
  const [validationErrors, setValidationErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!trackerItem.category.trim()) errors.category = "Category is required.";
    if (!trackerItem.amount) errors.amount = "Amount is required.";
    if (!trackerItem.date) errors.date = "Date is required.";
    return errors;
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // Correct syntax for condition
      if (updateTrackerItem) {
        setTrackerItem(updateTrackerItem);
      } else {
        setTrackerItem(defaultItem);
      }
    }

    return () => {
      isMounted = false; // Cleanup on component unmount
    };
  }, [updateTrackerItem]);

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    setTrackerItem({
      ...trackerItem,
      [name]: value,
    });
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    onSave(trackerType, trackerItem, isAdd);
    setTrackerItem(defaultItem);
  }
  return (
    <form>
      <div className="mt-3">
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Category
        </label>
        <div className="mt-2">
          <select
            id="category"
            name="category"
            autoComplete="category-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={trackerItem.category} // Use defaultValue for the initial selection
            onChange={handleChange}
          >
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {validationErrors.category && (
            <p className="text-red-500 text-sm">{validationErrors.category}</p>
          )}
        </div>
      </div>
      <div className="mt-3">
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Amount
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="amount"
            id="amount"
            autoComplete="off"
            placeholder="12931"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={trackerItem.amount}
            onChange={handleChange}
          />
          {validationErrors.amount && (
            <p className="text-red-500 text-sm">{validationErrors.amount}</p>
          )}
        </div>
      </div>
      <div className="mt-3">
        <label
          htmlFor="date"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Date
        </label>
        <div className="mt-2">
          <input
            type="date"
            name="date"
            id="date"
            autoComplete="off"
            placeholder="12931"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={trackerItem.date}
            onChange={handleChange}
          />
          {validationErrors.date && (
            <p className="text-red-500 text-sm">{validationErrors.date}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        onClick={handleSubmit}
      >
        Save
      </button>
    </form>
  );
}
