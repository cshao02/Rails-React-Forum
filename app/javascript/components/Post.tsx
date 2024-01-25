import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ id:"", postername: "", title: "", category: "", body: "", name: "", created_at: "", bool: false, updated_at: ""});
  const [comments, setComments] = useState([]);
  const [query, setQuery] = useState("");

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
    const url = `/api/v1/comments2/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setComments(response))
      .catch(() => navigate("/posts"));
  }, [params.id]);

  const addHtmlEntities = (str: string) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const onChange = (event: any, setFunction: any) => {
    setFunction(event.target.value);
  };

  const deletePost = () => {
    if (!confirm("Are you sure you want to delete the post?")) {
      return;
    } else {
      const url = `/api/v1/destroy/${params.id}`;

      const element: HTMLElement | null = document.querySelector('meta[name="csrf-token"]');
        let token: any = null;

        if (element instanceof HTMLMetaElement) {
            token = element.content;
        }

      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(() => navigate(`/posts/${params.name}`))
        .catch((error) => console.log(error.message));
      }
  };

  const deleteComment = (x: any) => {
    if (!confirm("Are you sure you want to delete the comment?")) {
      return;
    } else {
      const url = `/api/v1/destroycomment/${params.id}/${x}`;

      const element: HTMLElement | null = document.querySelector('meta[name="csrf-token"]');
        let token: any = null;

        if (element instanceof HTMLMetaElement) {
            token = element.content;
        }

      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => navigate(`/post/${params.name}/${response.id}`))
        .catch((error) => console.log(error.message));
      }

    window.location.reload();
  };

  const allComments = comments.map((comment: any, index) => (
    <div key={index} className="comm">
      <div className="card mb-4">
        
        <div className="comments">
          {comment.bool ? <h6>(Edited {(new Date(comment.updated_at)).toLocaleString()})</h6>: <></>}
          <p className="bold">{comment.commenter}</p>
          <p className="pullup">{(new Date(comment.created_at)).toDateString()}</p>
          <p className="card-text" dangerouslySetInnerHTML={{
                __html: `${addHtmlEntities(comment.body)}`,
              }}></p>
          {params.name == comment.username? <Link to={`/editComment/${params.name}/${post.id}/${comment.id}`}
            className="btn btn-info rightMargin">
            Edit
          </Link>: <div></div>
          }
          {params.name == comment.username? <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(comment.id)}
          >
            Delete Comment
          </button> : <div></div>}
        </div>
      </div>
    </div>
  ));

  const editButton = (
    <Link to={`/update/${params.name}/${post.id}`} className="btn btn-info">
      Edit
    </Link>
  )

  const deleteButton = (
    <button
      type="button"
      className="btn btn-danger"
      onClick={deletePost}
    >
      Delete Post
    </button>
  )
  
  const nothing = (
    <div></div>
  )

  const postBody = addHtmlEntities(post.body);

  return (
    <div className="color">
      <nav className="justify-content-between fixed">
        <a href="/" className="forum">123Forum</a>
        <a href={`/posts/${params.name}`} className="forum alignLeft">POSTS</a>
        <form className="form-inline my-2 my-lg-0 end search">
            <input 
              className="form-control mr-sm-2" 
              name="search" 
              type="text" 
              placeholder="Search by category" 
              aria-label="Search" 
              required
              onChange={(event) => onChange(event, setQuery)}></input>
            <Link to={`/posts/${params.name}/${query}`} className="btn btn-success my-2 my-sm-0">Search</Link>
          </form>
      </nav>
      <div className="spacer"></div>

      <div className="title">
        <div className="innerbox">
          {post.bool ? <h6>(Edited {(new Date(post.updated_at)).toLocaleString()})</h6>: <></>}
          <h1 className="">
            {post.title}
          </h1>
          <span>{(new Date(post.created_at)).toDateString()}</span>
          <h5>{"category: " + post.category}</h5>
          <h6>By: {post.postername}</h6>
              <div className="posttext"
                dangerouslySetInnerHTML={{
                  __html: `${postBody}`,
                }}
              />    
        </div>
        <div className="pad search">
          {/* <Link to={`/update/${post.id}`} className="btn btn-info">
            Edit
          </Link> */}
          {/* conditionally render edit and delete button for user who created the post */}
          {params.name == post.name? editButton: nothing}
          {params.name == post.name? deleteButton: nothing}
          <Link to={`/comment/${params.name}/${post.id}`} className="btn btn-info rightAlign">
            Add comment
          </Link>
        </div>
          
      </div>
      <div className="commentsHeader"><h5>{comments.length} Comment(s)</h5></div>
      <div className="py-5">
        <div>{allComments}</div>
      </div>
    </div>
  );
};

export default Post;