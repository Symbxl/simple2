import React, { useState, useEffect } from "react";
import "./styles.css";
import { CAR_LIST, PRICE_LIST } from "./cars";

const PRICE_MAP = PRICE_LIST.reduce(
  (accumulator, item) => ({ ...accumulator, [item.car_id]: [item.price] }),
  {}
);

export default function App() {
  const [time, setTime] = useState(new Date().toJSON());
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(CAR_LIST);

  useEffect(() => {
    let timerTimeout = setTimeout(() => {
      setTime(new Date().toJSON());
    }, 1000);

    return () => {
      clearTimeout(timerTimeout);
    };
  }, [time]);

  function formatTwoDigit(n) {
    return n < 10 ? "0" + n : n;
  }

  const getTimeFormat = () => {
    const d = new Date(time);
    const hours = formatTwoDigit(d.getHours());
    const minutes = formatTwoDigit(d.getMinutes());
    const seconds = formatTwoDigit(d.getSeconds());
    return hours + ":" + minutes + ":" + seconds;
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const words = e.target.value.toLowerCase().split(" ");
    const filterResult = CAR_LIST.filter((item) => {
      const cache = `${item.make} ${item.model}`.toLowerCase();
      return words.some((w) => cache.includes(w));
    });
    setFilteredData(filterResult);
  };

  return (
    <div className="App">
      <div>Hello World!</div>
      {getTimeFormat()}
      <div>
        <input value={searchText} onChange={handleSearchChange} />
      </div>
      <ul>
        {filteredData.map((car) => (
          <li key={car.id}>
            {car.make} {car.model} ${PRICE_MAP[car.id]}
          </li>
        ))}
      </ul>
    </div>
  );
}
