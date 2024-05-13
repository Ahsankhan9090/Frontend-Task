import React from "react";
import "./Header.css";

const Header = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  return (
    <>
      <div className="header">
        <h2>$0.0</h2>
        <h4>
          {currentMonth} {currentYear}
        </h4>
      </div>
    </>
  );
};

export default Header;
