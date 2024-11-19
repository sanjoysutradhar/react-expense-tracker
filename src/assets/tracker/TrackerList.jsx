import { useEffect, useState } from "react";

import { GrSort } from "react-icons/gr";
import { HiBarsArrowDown } from "react-icons/hi2";
import { TbNotebook, TbNotebookOff } from "react-icons/tb";
import Item from "./Item";
export default function TrackerList({
  type,
  list,
  categories,
  onDelete,
  onEdit,
}) {
  const [listItems, setListItems] = useState(list);
  const [isClickCategory, setIsCliskCategory] = useState(false);
  const [isClickSort, setIsCliskSort] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setListItems(list);
  }, [list]);
  function handleClickSort() {
    setIsCliskSort(!isClickSort);
    if (isClickCategory === true) {
      setIsCliskCategory(false);
    }
  }
  function handleClickCategory() {
    setIsCliskCategory(!isClickCategory);
    if (isClickSort === true) {
      setIsCliskSort(false);
    }
  }

  function handleSortByAmount(e, sort) {
    e.preventDefault();
    let sortListItems;
    if (sort === "asc") {
      sortListItems = [...listItems].sort((a, b) => a.amount - b.amount); // Ascending order
    } else if (sort === "desc") {
      sortListItems = [...listItems].sort((a, b) => b.amount - a.amount); // Descending order
    }
    setListItems(sortListItems);
  }

  function handleCategoryChange(e, category) {
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    }
  }

  // Use useEffect to filter when selectedCategories changes
  useEffect(() => {
    filterByCategory();
  }, [selectedCategories]);

  function filterByCategory() {
    const newListItems = list.filter((item) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(item.category)
        : true
    );
    setListItems(newListItems);
  }
  return (
    <div className="border rounded-md relative">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          {type === "income" ? (
            <TbNotebook className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base" />
          ) : (
            <TbNotebookOff className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base" />
          )}

          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800 text-capitalize">
              {type}
            </h3>
          </div>
        </div>
        <div>
          <div className="relative inline-block text-left">
            <div className="mr-2">
              <button
                type="button"
                className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-2 py-1 
                text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 ${
                  isClickSort
                    ? "bg-teal-600 text-white hover:bg-teal-500"
                    : "bg-white hover:bg-gray-50 text-gray-900"
                }`}
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={handleClickSort}
              >
                <HiBarsArrowDown className="h-5 w-5" />
              </button>
            </div>
            {isClickSort && (
              <div
                className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={(e) => handleSortByAmount(e, "asc")}
                  >
                    Low to High
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                    onClick={(e) => handleSortByAmount(e, "desc")}
                  >
                    High to Low
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className={`inline-flex w-full justify-center gap-x-1.5 rounded-md   px-2 py-1 
                    text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 ${
                      isClickCategory
                        ? "bg-teal-600 text-white hover:bg-teal-500"
                        : "bg-white hover:bg-gray-50 text-gray-900"
                    }`}
                id="filter-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={handleClickCategory}
              >
                <GrSort className="h-5 w-5" />
              </button>
            </div>
            {isClickCategory && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="filter-button"
                tabIndex="-1"
                id="filter-dropdown"
              >
                <div className="py-1" role="none">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                        id="filter-option-1"
                        onChange={(e) => handleCategoryChange(e, cat)}
                      />
                      <span className="ml-2">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 divide-y">
        {listItems.length > 0 ? (
          listItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              type={type}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <p className="text-gray-500">No items to display.</p>
        )}
      </div>
    </div>
  );
}
