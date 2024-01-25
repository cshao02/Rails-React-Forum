import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const NewPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [postername, setPosterName] = useState("");

  const stripHtmlEntities = (str: string) => {
    return String(str)
      .replace(/\n/g, "<br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event: any, setFunction: any) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const url = "/api/v1/posts/create";

    if (title.length == 0 || category.length == 0 || body.length == 0)
      return;

    const b = {
      postername,
      title,
      category,
      body: stripHtmlEntities(body),
      name: params.name,
      bool: false
    };

    const element: HTMLElement | null = document.querySelector('meta[name="csrf-token"]');
    let token: any = null;

    if (element instanceof HTMLMetaElement) {
        token = element.content;
    }
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(b),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/post/${params.name}/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container color mt-5 adjust">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new post to our awesome forum.
          </h1>
          <form onSubmit={onSubmit}>
          <div className="form-group">
              <label htmlFor="postername">Name</label>
              <input
                type="text"
                name="postername"
                id="postername"
                className="form-control"
                required
                onChange={(event) => onChange(event, setPosterName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postTitle">Post title</label>
              <input
                type="text"
                name="title"
                id="postTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postCategory">Category</label>
              <input
                type="text"
                name="category"
                id="postCategory"
                className="form-control"
                required
                onChange={(event) => onChange(event, setCategory)}
              />
              
            </div>
            <label htmlFor="body">Body</label>
            <textarea
              className="form-control"
              id="body"
              name="body"
              rows={5}
              required
              onChange={(event) => onChange(event, setBody)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Create Post
            </button>
            <Link to={`/posts/${params.name}`} className="btn btn-link mt-3">
              Back to posts
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;