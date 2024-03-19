import React from "react";

export const Search = ({ handleSearch }) => {

  return (
    <>
      <form>
        <label htmlFor="search_field">Search</label>
        <input
          id="search_field"
          name="search_field"
          type="text"
          placeholder="search"
          onChange={handleSearch}
        ></input>
      </form>
    </>
  );
};
