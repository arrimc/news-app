"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/apis/getPosts";
import { List } from "@/components/List";
import { getUsers } from "@/apis/getUsers";
import { Search } from "@/components/Search";
import { Header } from "@/components/Header";

export default function Home() {

  //posts data State
  const [postData, setPostData] = useState([]);
  //search State
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
    <>
    <Header/>
    <main>
      <div className="container mx-auto">
        <h1>News</h1>
        <div className="main_container">
          
          <Search handleSearch={handleSearch}/>
         <section className="flex">
          <List postData={postData} />
          <div></div>
         </section>
        </div>
      </div>
    </main>
    </>
  );
}
