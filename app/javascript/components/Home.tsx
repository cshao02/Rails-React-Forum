import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameLogin, setNameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const onChange = (event: any, setFunction: any) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const url = "/api/v1/users/create";

    const b = {
      name,
      password
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
      .then((response) => navigate(`/`))
      //.catch((error) => console.log(error.message));
      .catch((error) => alert("Username has been taken"));
  };

  const onSubmit2 = (event: any) => {
    event.preventDefault();
    const url = "/api/v1/users/login";

    const b = {
      nameLogin,
      passwordLogin
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
      .then((response) => navigate(`/posts/${nameLogin}`))
      //.catch((error) => console.log(error.message));
      .catch((error) => alert("Wrong username/Account does not exist, please sign up"));
  };

  return (<div>
    <nav className="justify-content-between fixed">
      <a href="/" className="forum">123Forum</a>
      <a href="/signup" className="forum ">SIGN UP</a>
      <a href="/login" className="forum alignLeft">LOGIN</a>
      {/* <form className="form-inline my-2 my-lg-0 search rightAlign">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
      </form> */}
    </nav>

  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center color">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4 font-weight-bold">123Forum</h1>
        <p className="lead">
          A forum dedicated to anything and everything you want to talk about.
        </p>
        <hr className="my-4" />
        <Link
          to="/login"
          className="btn btn-lg custom-button"
          role="button"
        >
          LOG IN
        </Link>
      </div>
      {/* <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                required
                onChange={(event) => onChange(event, setName)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password (optional)</label>
              <input
                type="text"
                name="password"
                id="password"
                className="form-control"
                onChange={(event) => onChange(event, setPassword)}
              />

            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create User
            </button>     
          </form>
      </div>

      <div>
        <form onSubmit={onSubmit2}>
            <div className="form-group">
              <label htmlFor="nameLogin">Name</label>
              <input
                type="text"
                name="nameLogin"
                id="nameLogin"
                className="form-control"
                required
                onChange={(event) => onChange(event, setNameLogin)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordLogin">Password</label>
              <input
                type="text"
                name="passwordLogin"
                id="passwordLogin"
                className="form-control"
                onChange={(event) => onChange(event, setPasswordLogin)}
              />

            </div>
            <button type="submit" className="btn custom-button mt-3">
              Login
            </button>     
          </form>
      </div> */}
    </div>
  </div>
</div>);
};

export default Home;