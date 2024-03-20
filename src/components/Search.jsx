import React from "react";
import styles from "../styles/Search.module.css"

export const Search = ({ handleSearch }) => {

  return (
    <>
    <div className={styles.container}>
      <form>
        <input
          id="search_field"
          name="search_field"
          type="text"
          className={styles.search}
          placeholder="Search"
          onChange={handleSearch}
        ></input>
      </form>
    </div>
    </>
  );
};
