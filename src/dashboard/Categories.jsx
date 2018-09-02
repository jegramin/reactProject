import React, { Component } from 'react';
import axios from 'axios';
class Categories extends Component {
  constructor() {
    super();
  this.state = {
    categories: [ {
      id: 1,
      name: "adfas"
    }]
  }
  }


  deleteCategory = (id) => {
    axios.delete('http://localhost:3000/categories/' + this.state.categories[0].id)
      .then(res => {
        this.setState({
          categories: this.state.categories.filter(x => x.id !== id)
        })
      })
  }


  addCategory = ()=>{
    axios.post('http://localhost:3000/categories', {
        id: this.state.categories.id,
        name: this.state.categories.name,
      
    }).then(function() {
      console.log("done");
    });
  }

  updateCategory = e => {
    e.preventDefault();
    if (this.state.categories.id) {
      axios.put('http://localhost:3000/categories/' + this.state.categories[0].id,
         this.state.categories)
         .then(res => {
           this.setState({
            categories: this.state.categories.map(x => {
               if (x.id === res.data.id) {
                 return res.data;
               }
               return x;
             }),
             categories: {id: '', name: ''}
           })
         })
    } else {
      // axios.post(...)
    }
  }



  componentDidMount() {
    // Ofc, you should use the local not this link
    axios.get('http://localhost:3000/categories')
      .then(res => {
        this.setState({
          categories: res.data
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
            <form onSubmit={this.addCategory}>
            <input value={this.state.categories.id} 
                onChange={this.bindInputToState}
                type="text" name="id" className="form-control" placeholder="id" />
            <input value={this.state.categories.name} 
                onChange={this.bindInputToState}
                type="text" name="name" className="form-control" placeholder="name" />
              
              
              
              <button type="submit" className="btn btn-success">Save</button>
            </form>
          </div>
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>name</th>
                  
                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.loading
                  ? 'LOADING'
                  : this.state.categories.map((x, i) => (
                    <tr key={i}>
                      <td>{x.id}</td>
                      <td>{x.name}</td>
                      
                      
                      <td>
                        <button onClick={() => this.setState({categories: x})} className="btn btn-warning">
                          Edit
                        </button>
                        <button onClick={() => this.deleteCategory(x.id)} className="btn btn-danger">
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

export default Categories;
