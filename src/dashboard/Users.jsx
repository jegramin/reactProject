import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Users extends Component {
  constructor() {
    super();
  this.state = {
    users: [ {
      id: 1,
      name: "",
      email: ""
    }]
  }
  }
 


  deleteUser = (id) => {
    axios.delete('http://localhost:3000/users/' + this.state.users[0].id)
      .then(res => {
        this.setState({
          users: this.state.users.filter(x => x.id !== id)
        })
      })
  }


  addUser = ()=>{
    axios.post('http://localhost:3000/users', {
        id: this.state.users.id,
        name: this.state.users.name,
        email: this.state.users.email,
      
    }).then(function() {
      console.log("done");
    });
  }

  updateUser = e => {
    e.preventDefault();
    if (this.state.users.id) {
      axios.put('http://localhost:3000/users/' + this.state.users[0].id,
         this.state.users)
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
    } else {
      // axios.post(...)
    }
  }


  componentDidMount() {
    // Ofc, you should use the local not this link
    axios.get('http://localhost:3000/users')
      .then(res => {
        this.setState({
          users: res.data
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
            <form onSubmit={this.addUser}>
            <input value={this.state.users.id} 
                onChange={this.bindInputToState}
                type="text" name="id" className="form-control" placeholder="id" />
            <input value={this.state.users.name} 
                onChange={this.bindInputToState}
                type="text" name="userid" className="form-control" placeholder="name" />
              <input value={this.state.users.email} 
                onChange={this.bindInputToState}
                type="text" name="title" className="form-control" placeholder="email" />
              
              
              <button type="submit" className="btn btn-success">Save</button>
            </form>
          </div>
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>name</th>
                  <th>email</th>
                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.loading
                  ? 'LOADING'
                  : this.state.users.map((x, i) => (
                    <tr key={i}>
                      <td>{x.id}</td>
                      <td>{x.name}</td>
                      <td>{x.email}</td>
                      
                      <td>
                        <button onClick={() => this.setState({user: x})} className="btn btn-warning">
                          Edit
                        </button>
                        <button onClick={() => this.deleteUser(x.id)} className="btn btn-danger">
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

// ReactDOM.render(
//   <Users />,
//   document.getElementById('root')
// );

export default Users;
