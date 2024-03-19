"use client";
import { useEffect, useState } from "react";
import { getPosts } from "@/apis/getPosts";
import { List } from "@/components/List";
import { getUsers } from "@/apis/getUsers";

export default function Home() {
  //posts data
  const [postData, setPostData] = useState([]);

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

  return (
    <main>
      <h1>News</h1>
      <List postData={postData} />
    </main>
  );
}
