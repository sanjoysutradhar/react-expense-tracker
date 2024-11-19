import { useEffect, useState } from "react";
import ExpenseTracker from "./ExpenseTracker";
import Summery from "./Summery";
import TrackerList from "./TrackerList";

const expenseCategories = [
  "Education",
  "Food",
  "Health",
  "Bill",
  "Insurance",
  "Tax",
  "Transport",
  "Telephone",
];
const incomeCategories = ["Salary", "Outsourcing", "Bond", "Dividend"];

export default function TrackerBoard() {
  const defaultIncomeList = [
    {
      id: crypto.randomUUID(),
      category: "Salary",
      amount: 5000,
      date: "2024-11-22",
    },
  ];
  const defaultExpenseList = [
    {
      id: crypto.randomUUID(),
      category: "Food",
      amount: 5000,
      date: "2024-11-22",
    },
  ];
  const [trackerType, setTrackerType] = useState("expense");
  const [categories, setCategories] = useState(expenseCategories);
  const [incomeList, setIncomeList] = useState(defaultIncomeList);
  const [expenseList, setExpenseList] = useState(defaultExpenseList);
  const [updateTrackerItem, setUpdateTrackerItem] = useState(null);
  const [balance, setBalance] = useState(0);
  const [incomeBalance, setIncomeBalance] = useState(0);
  const [expenseBalance, setExpenseBalance] = useState(0);
  const [isAdd, setIsAdd] = useState(true);

  function handleBalanceCalculation() {
    let newExpenseBalance = expenseList.reduce(
      (total, list) => total + parseInt(list.amount),
      0
    );

    let newIncomeBalance = incomeList.reduce(
      (total, list) => total + parseInt(list.amount),
      0
    );

    setIncomeBalance(newIncomeBalance);
    setExpenseBalance(newExpenseBalance);
    setBalance(parseInt(newIncomeBalance) - parseInt(newExpenseBalance)); // Net balance
  }

  function handleTrackerType(type) {
    let categories;
    if (type === "expense") {
      categories = expenseCategories;
    } else {
      categories = incomeCategories;
    }
    setTrackerType(type);
    setIsAdd(true);
    setUpdateTrackerItem(null);
    setCategories(categories);
  }
  function handleSave(type, newList, isAdd) {
    if (isAdd) {
      if (type === "expense") {
        setExpenseList([...expenseList, newList]);
      } else {
        setIncomeList([...incomeList, newList]);
      }
    } else {
      if (type === "expense") {
        setExpenseList(
          expenseList.map((list) => {
            if (list.id === newList.id) {
              return newList;
            }
            return list;
          })
        );
      } else {
        setIncomeList(
          incomeList.map((list) => {
            if (list.id === newList.id) {
              return newList;
            }
            return list;
          })
        );
      }
    }
    setIsAdd(true);
    setUpdateTrackerItem(null);
  }
  function handleDelete(type, itemId) {
    if (type === "expense") {
      let newExpenseList = expenseList.filter((item) => item.id !== itemId);
      setExpenseList(newExpenseList);
    } else {
      let newIncomeList = incomeList.filter((item) => item.id !== itemId);
      setIncomeList(newIncomeList);
    }
  }
  function handleEditTracker(type, itemId) {
    let findItem;
    let categories;
    if (type === "expense") {
      findItem = expenseList.find((item) => item.id === itemId);
      categories = expenseCategories;
    } else {
      findItem = incomeList.find((item) => item.id === itemId);
      categories = incomeCategories;
    }
    setIsAdd(false);
    setTrackerType(type);
    setCategories(categories);
    setUpdateTrackerItem(findItem);
  }
  useEffect(() => {
    handleBalanceCalculation();
  }, [incomeList, expenseList]);
  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ExpenseTracker
          trackerType={trackerType}
          onTrackerType={handleTrackerType}
          categories={categories}
          onSave={handleSave}
          updateTrackerItem={updateTrackerItem}
          isAdd={isAdd}
        />

        <div className="lg:col-span-2">
          <Summery
            balance={balance}
            incomeBalance={incomeBalance}
            expenseBalance={expenseBalance}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <TrackerList
              type="income"
              list={incomeList}
              categories={incomeCategories}
              onDelete={handleDelete}
              onEdit={handleEditTracker}
            />

            <TrackerList
              type="expense"
              list={expenseList}
              categories={expenseCategories}
              onDelete={handleDelete}
              onEdit={handleEditTracker}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
