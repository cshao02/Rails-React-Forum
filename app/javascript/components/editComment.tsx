import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditComment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState({id: "",
                                    commenter: "",
                                    body: ""
                                    });
  const [commenter, setCommenter] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const url = `/api/v1/showComment/${params.commId}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setComment(response))
      .catch(() => navigate("/posts"));
  }, [params.commId]);

  useEffect(() => {
    setCommenter(comment.commenter);
    setBody(comment.body);
  }, [comment]);

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
    const url = `/api/v1/updateComment/${params.commId}`;
 
    const b = {
      commenter,
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
      .then((response) => navigate(`/post/${params.name}/${params.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Edit your comment for our awesome forum.
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="commenter">Commenter</label>
              <input
                type="text"
                name="commenter"
                id="commenter"
                className="form-control"
                defaultValue={comment.commenter}
                required
                onChange={(event) => onChange(event, setCommenter)}
              />
            </div>
            <label htmlFor="body">Body</label>
            <textarea
              className="form-control"
              id="body"
              name="body"
              rows={5}
              required
              defaultValue={addHtmlEntities(comment.body)}
              onChange={(event) => onChange(event, setBody)}
            />
            <button type="submit" className="btn custom-button mt-3">
              Edit Comment
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

export default EditComment;