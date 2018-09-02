import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Col, Row, Button} from 'reactstrap';
import axios from 'axios';
class MainPage extends Component {
  constructor() {
    super();
  this.state = {
    posts: [  {
      id: '',
      userId: '',
      title: "",
      body: "",
      categoryId: ''
    }]
  };
  }
  // state = {
  //   modalOpen: false
  // }

  toggle = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
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

  render() {
    return (
      <Row>
        {/* <Col md={12}> is same as <div className="col-md-12">  */}
        <div className="col-md-12">
        <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>body</th>
                  
                  <th>title</th>
                  
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
                     
                      <td>{x.title}</td>
                      
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

        <Col md={12}>
          <Button color="success" onClick={this.toggle}>Toggle Modal</Button>
        </Col>

        <Col md={12}>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            You may use form here :)
          </ModalBody>
          <ModalFooter>
            <div>
              Footer
            </div>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </Col>
      </Row>
    );
  }
}

export default MainPage;
