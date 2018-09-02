import React, { Component } from 'react';
import axios from 'axios';


class Posts extends Component {
  constructor() {
    super();
  this.state = {
    posts: [  {
      id: '',
      userId: '',
      title: '',
      body: "",
      categoryId: ''
    }]
  };
  }
  componentDidMount() {
    // Ofc, you should use the local not this link
    axios.get('http://localhost:3000/posts')
      .then(res => {
        this.setState({
          posts: res.data
        })

        // Now the state will be updated with the data received from response
      })
  }
  
  deletePost = (id) => {
    axios.delete('http://localhost:3000/posts/' + this.state.posts[0].id)
      .then(res => {
        this.setState({
          posts: this.state.posts.filter(x => x.id !== id)
        })
      })
  }

  // bindInputToState = e => {
  //   this.setState({
  //     posts: {
  //       ...this.state.posts,
  //       [e.target.name]: e.target.value
  //     }
  //   })
  // }


  

  addPost = ()=>{
    axios.post('http://localhost:3000/posts', {
      userId: this.state.posts.userId,
        title: this.state.posts.title,
        categoryId: this.state.posts.categoryId,
        body: this.state.posts.body
    
      
    })
  }


  updatePost = e => {
    e.preventDefault();
    if (this.state.posts.id) {
      axios.put('http://localhost:3000/posts/' + this.state.posts[0].id,
         this.state.posts)
         .then(res => {
           this.setState({
             posts: this.state.posts.map(x => {
               if (x.id === res.data.id) {
                 return res.data;
               }
               return x;
             }),
             post: {title: '', body: ''}
           })
         })
    } 
  }


  render() {
    return (
      <div className="row">
        

        

        <div className="container pt-3">
        <div className="row">
          
          
          <div className="col-md-12">
            <form onSubmit={this.addPost}>
            <input value={this.state.posts.id} 
                onChange={this.bindInputToState}
                type="text" name="id" className="form-control" placeholder="id" />
            <input value={this.state.posts.userId} 
                onChange={this.bindInputToState}
                type="text" name="userid" className="form-control" placeholder="userId" />
              <input value={this.state.posts.title} 
                onChange={this.bindInputToState}
                type="text" name="title" className="form-control" placeholder="Title" />
              <input value={this.state.posts.categoryId} 
                onChange={this.bindInputToState}
                type="text" name="category" className="form-control" placeholder="categoryId" />
              <textarea value={this.state.posts.body} 
                onChange={this.bindInputToState}
                name="body" className="form-control" cols="30" rows="10"></textarea>
              <button type="submit" className="btn btn-success">Save</button>
            </form>
          </div>
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>body</th>
                  <th>User Id</th>
                  <th>title</th>
                  <th>category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.loading
                  ? 'LOADING'
                  : this.state.posts.map((x, i) => (
                    <tr key={i}>
                      <td>{x.id}</td>
                      <td>{x.body}</td>
                      <td>{x.userId}</td>
                      <td>{x.title}</td>
                      <td>{x.categoryId}</td>
                      <td>
                        <button onClick={() => this.setState({post: x})} className="btn btn-warning">
                          Edit
                        </button>
                        <button onClick={() => this.deletePost(x.id)} className="btn btn-danger">
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

export default Posts;
