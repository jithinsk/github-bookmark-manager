import React from "react";
import "./index.css";

const Navigation = ({ goto, showAddPage }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className={`breadcrumb-item${showAddPage ? "" : " active"}`}>
          <div onClick={() => goto("home")}>Github Bookmark Manager</div>
        </li>
        <li className={`breadcrumb-item${!showAddPage ? "" : " active"}`}>
          <div onClick={() => goto("add-new")}>Add New</div>
        </li>
      </ol>
    </nav>
  );
};

export default Navigation;
