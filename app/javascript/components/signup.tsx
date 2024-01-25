import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("!@#$");
  
    const onChange = (event: any, setFunction: any) => {
      setFunction(event.target.value);
    };
    
    const onSubmit = (event: any) => {
      event.preventDefault();
      const url = "/api/v1/users/create";
  
      let b = {
        name,
        password
      };

      if (password.length == 0) {
        b = {
          name,
          password: "!@#$"
        };
      }

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
        .then((response) => {alert("User created successfully"); navigate(`/`)})
        //.catch((error) => console.log(error.message));
        .catch((error) => alert("Username has been taken"));
    };
  
    return (<div>
      <nav className="justify-content-between fixed">
        <a href="/" className="forum">123Forum</a>
        <a href="/login" className="forum alignLeft">LOGIN</a>
      </nav>
  
    <div className="rowgap vw-100 vh-100 primary-color d-flex flex-column align-items-center justify-content-center color">
        <div className="up"><h1 className="head">SIGN UP</h1></div>
        <div>
          <form className="login" onSubmit={onSubmit}>
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
                  type="password"
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
      </div>
    </div>
  );
  };
// const Signup = () ={

//     return (
//         <div>
            
//         </div>);
    
// };

export default Signup;
