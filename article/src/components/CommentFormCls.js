import React, { Component } from "react";

export class CommentFormCls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {id:"", comment: "", commenter: "" },
    };

  }
  componentDidUpdate(prevProps  ) {
    // console.log(this.props.commentObj,prevProps.commentObj, 'gunnnuuuuu' )
    if (this.props.commentObj !== prevProps.commentObj) {
      this.setState({comment: {id:this.props.commentObj.id, comment: this.props.commentObj.comment, commenter: this.props.commentObj.commenter}});
    }
  }
  changeComment(e) {
    const {comment} = this.state
    this.setState({comment: { ...comment, [e.target.name]: e.target.value }});
  }

  handleSubmit(e) {
    // e.preventDefault();
    const {comment} = this.state
    console.log(comment,"submitttttttttttttttttttttt")
    this.props.handleSubmit(comment);
    // this.setState({comment: { comment: "", commenter: "" }});
  }



  render() {
    const {comment} = this.state
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
              onChange={this.changeComment.bind(this)}
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
              onChange={this.changeComment.bind(this)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={this.handleSubmit.bind(this)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CommentFormCls;
