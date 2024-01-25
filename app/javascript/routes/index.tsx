import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Posts from "../components/Posts";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import EditPost from "../components/edit";
import NewComment from "../components/NewComment";
import Login from "../components/login";
import Signup from "../components/signup";
import PostsQuery from "../components/PostsQuery";
import EditComment from "../components/editComment";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:name" element={<Posts />} />
      <Route path="/post/:name/:id" element={<Post />} />
      <Route path="/post/:name" element={<NewPost />} />
      <Route path="/update/:name/:id" element={<EditPost />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} />  
      <Route path="/comment/:name/:id" element={<NewComment />} />
      <Route path="/posts/:name/:query" element={<PostsQuery />} />
      <Route path="/editComment/:name/:id/:commId" element={<EditComment />} />
    </Routes>
  </Router>
);