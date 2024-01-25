import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({id: "",
                                    title: "",
                                    category: "",
                                    body: ""
                                    });

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setPost(response))
      .catch(() => navigate("/posts"));
  }, [params.id]);

  useEffect(() => {
    setTitle(post.title);
    setCategory(post.category);
    setBody(post.body);
  }, [post]);

  const stripHtmlEntities = (str: string) => {
    return String(str)
      .replace(/\n/g, "<br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const addHtmlEntities = (str: string) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<br>/g, "\n");
  };

  const onChange = (event: any, setFunction: any) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const url = `/api/v1/update/${params.id}`;
 
    const b = {
      title,
      category,
      body: stripHtmlEntities(body),
      bool: true
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
      .then((response) => navigate(`/post/${params.name}/${post.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Edit your post for our awesome forum.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="postTitle">Post title</label>
              <input
                type="text"
                name="title"
                id="postTitle"
                className="form-control"
                required
                defaultValue={post.title}
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
                defaultValue={post.category}
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
              defaultValue={addHtmlEntities(post.body)}
              onChange={(event) => onChange(event, setBody)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Edit Post
            </button>
            <Link to={`/post/${params.name}/${params.id}`} className="btn btn-link mt-3">
              Back to post
            </Link>
          </form>
        </div>
      </div>
    </div>

    
  );
};

export default EditPost;