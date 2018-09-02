import React, { Component } from 'react';
import axios from 'axios';
class Comments extends Component {
  constructor() {
    super();
  this.state = {
    comments: [ {
      id: 1,
      postId:1,
      comment: "adfas"
    }]
  }
  }


  deleteComment = (id) => {
    axios.delete('http://localhost:3000/comments/' + this.state.comments[0].id)
      .then(res => {
        this.setState({
          comments: this.state.comments.filter(x => x.id !== id)
        })
      })
  }


  addComment = ()=>{
    axios.post('http://localhost:3000/comments', {
        id: this.state.comments.id,
        name: this.state.comments.comment,
      
    }).then(function() {
      console.log("done");
    });
  }


  updateComment = e => {
    e.preventDefault();
    if (this.state.comments.id) {
      axios.put('http://localhost:3000/comments/' + this.state.comments[0].id,
         this.state.comments)
         .then(res => {
           this.setState({
            categories: this.state.comments.map(x => {
               if (x.id === res.data.id) {
                 return res.data;
               }
               return x;
             }),
             comments: {id: '', comment: ''}
           })
         })
    } else {
      // axios.post(...)
    }
  }


  componentDidMount() {
    // Ofc, you should use the local not this link
    axios.get('http://localhost:3000/comments')
      .then(res => {
        this.setState({
          comments: res.data
        })

        // Now the state will be updated with the data received from response
      })
  }



  render() {
    return (
      <div className="row">
        <div className="container pt-3">
        <div className="row">
          
          
          <div className="col-md-12">
            <form onSubmit={this.addComment}>
            <input value={this.state.comments.postId} 
                onChange={this.bindInputToState}
                type="text" name="id" className="form-control" placeholder="postId" />
            <input value={this.state.comments.comment} 
                onChange={this.bindInputToState}
                type="text" name="name" className="form-control" placeholder="comment" />
              
              
              
              <button type="submit" className="btn btn-success">Save</button>
            </form>
          </div>
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>comment</th>
                  
                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.loading
                  ? 'LOADING'
                  : this.state.comments.map((x, i) => (
                    <tr key={i}>
                      <td>{x.id}</td>
                      <td>{x.comment}</td>
                      
                      
                      <td>
                        <button onClick={() => this.setState({comments: x})} className="btn btn-warning">
                          Edit
                        </button>
                        <button onClick={() => this.deleteComment(x.id)} className="btn btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Comments;
