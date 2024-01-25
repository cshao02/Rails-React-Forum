import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostsQuery = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
      const url = "/api/v1/posts/index";
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((res) => setPosts(res))
        .catch(() => navigate("/"));
    }, []);

  const addHtmlEntities = (str: string) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  const onChange = (event: any, setFunction: any) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const url = "/api/v1/search";

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate)
      .catch(() => navigate("/posts"));
  }

  const allPosts = posts.map((post: any, index) => (
      post.category == params.query?
      <div key={index} className="container">
        <div className="card addMargin">
          <div className="card-header">
            {post.category}
          </div>
          <div className= "card-body clamp">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text" dangerouslySetInnerHTML={{
                __html: `${addHtmlEntities(post.body)}`,
              }}></p>           
          </div>
          <div className="pad">
            <Link to={`/post/${params.name}/${post.id}`} className="btn custom-button">
              View Post
            </Link>
          </div>
        </div>
      </div>: <div></div>
      
    ));
    const noPost = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No posts yet. Why not <Link to={`/post/${params.name}`}>create one</Link>
        </h4>
      </div>
    );

    return (
      <>
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
        
        <section className="jumbotron jumbotron-fluid text-center color">
          <div className="container py-5">
            <h1 className="display-4">All posts on our awesome forum</h1>
            <p className="lead text-muted">
              This is a collection of all posts on our forum. I'm sure there will be a category that suits your needs.
            </p>
          </div>
        </section>
        <div className="py-5 color">
          <main className="container">
            <div className="text-end mb-3">
              <Link to={`/post/${params.name}`} className="btn custom-button">
                Create New Post
              </Link>
            </div>
            <div className="row">
              {posts.length > 0 ? allPosts : noPost}
            </div>
            <Link to="/" className="btn custom-button">
              Home
            </Link>          
          </main>
        </div>
      </>
    );
};

export default PostsQuery;