import React,{useState,useEffect} from "react";

const CommentForm = (props) => {
 
    const [comment, setComment] = useState({comment:"", commenter:""});
    const changeComment =(e)=>{
      setComment({...comment, [e.target.name]: e.target.value})
    }
    const handleSubmit =()=>{
        // e.preventDefault()
        props.handleSubmit(comment)
        setComment({comment:"", commenter:""})
    }

    useEffect(() => {
      if (props.commentObj) {
        setComment(props.commentObj)
      }
    }, [props.commentObj])
     
  
  return (
    <div className="container">
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="cooment" className="form-label">
            Comment
          </label>
          <input
            type="text"
            className="form-control"
            id="comment"
            value={comment.comment}
            name="comment"
            onChange={changeComment}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="commenter" className="form-label">
            Body
          </label>
          <input
            type="text"
            className="form-control"
            name="commenter"
            id="commenter"
            value={comment.commenter}
            onChange={changeComment}
          />
        </div>
        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
       
    </div>
  );
};

export default CommentForm;
