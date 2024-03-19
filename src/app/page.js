"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/apis/getPosts";
import { List } from "@/components/List";
import { getUsers } from "@/apis/getUsers";
import { Search } from "@/components/Search";

export default function Home() {

  //posts data
  const [postData, setPostData] = useState([]);
  //search
  const [search, setSearch] = useState("");


  useEffect(() => {
    const storedData = localStorage.getItem("postData");
    if (storedData) {
      // get data from localStorage if exist
      setPostData(JSON.parse(storedData));
    } else {
      // if notexist, get dataand store it in localStorage
      handleGetPosts();
    }

    const interval = setInterval(() => {
      console.log("get data (each 1hr)");
      handleGetPosts();
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  const handleGetPosts = () => {
    getPosts().then((data) => {
      // localStorage.setItem('postData', JSON.stringify(data));
      // setPostData(data);
      getUsers().then((users) => {
        //get posts and users
        const postDataWithUsers = data.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          return { ...post, user };
        });
        //save data into localStorage & change postData
        localStorage.setItem("postData", JSON.stringify(postDataWithUsers));
        setPostData(postDataWithUsers);
      });
    });
  };

  //search function]
  const handleSearch = (e) => {
    const phrase = e.target.value;
    setSearch(phrase); //set input value
    const coincidences = postData.filter((word) => {
      //filter options:
    const filterTitle = word.title.toLowerCase().includes(phrase.toLowerCase());
    const filterAuthorName = word.user.name.toLowerCase().includes(phrase.toLowerCase());
      return filterTitle || filterAuthorName;
    });

    setPostData(coincidences);
    if (!phrase.length) { //if search input is empty, get all data form localestorage
      const storedData = localStorage.getItem("postData");
        setPostData(JSON.parse(storedData));
      
    }
  }

  return (
    <main>
      <h1>News</h1>
      <div className="main_container">
      <div className="search_field">
          <Search handleSearch={handleSearch}/>
        </div>
        <div className="all_posts">
          <List postData={postData} />
        </div>
      </div>
      
    </main>
  );
}
