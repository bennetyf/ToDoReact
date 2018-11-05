// import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
// import {Button} from 'mdbreact';
import {Checkbox, Button, Input} from 'antd';

import React from 'react';
import {connect} from "dva";

const namespace="todos";

const mapStateToProps = (state)=>{
  return state[namespace];
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (event) => {
      event.preventDefault();
      dispatch({
        type: `${namespace}/addToDo`,
      })
    },

    delete: (id) => {
      dispatch({
        type: `${namespace}/deleteToDo`,
        payload: id
      })
    },

    changecheck: (id) => {
      dispatch({
        type: `${namespace}/handleCheck`,
        payload: id
      })
    },

    showAll: () => {
      dispatch({
        type: `${namespace}/listAll`
        })
    },

    showCompleted: () => {
      dispatch({
        type: `${namespace}/listCompleted`
      })
    },

    showUncompleted: () => {
      dispatch({
        type: `${namespace}/listUncompleted`
      })
    },

    change: (event) => {
      dispatch({
        type: `${namespace}/handleChange`,
        payload: event.target.value
      })
    }
  }

};

@connect(mapStateToProps, mapDispatchToProps)
class TodoComponent extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <h1 className="h1-responsive font-italic text-info font-weight-bold">ToDos</h1>

        <form className="mb-3 w-50 d-flex align-items-center justify-content-between" onSubmit={this.props.add}>
          <Input type="text" placeholder={`Please Add ToDos...`} className="form-control mr-4" size="large" name="todos" value={this.props.temp} onChange={this.props.change}/>
          <Button type="primary" name="add" size="large" onClick={this.props.add}>Add</Button>
        </form>

        <div className='mt-4 bg-secondary w-50 d-flex flex-column justify-content-between' style={{margin:`none`, borderRadius:'1.5rem'}}>
          {this.props.data.map((todo,index) =>(
            <div key={index} style={{display: todo.display}}>
              <div className="d-flex flex-row align-items-center justify-content-between" style={{padding: `0.2rem 2rem`}}>
                <Checkbox value={todo.done} checked={todo.done} onChange={()=>this.props.changecheck(todo.id)}> <span style={todo.style}>{todo.content}</span> </Checkbox>
                <Button name="delete" type="primary" size="small" onClick={()=>this.props.delete(todo.id)}>Delete</Button>
              </div>
            </div>
          ))}
          </div>

        <div style={{marginTop: '2rem'}} className="w-50 d-flex flex-row align-items-center justify-content-between">
          <Button type="primary" size="large" onClick={this.props.showAll}>Show All</Button>
          <Button type="primary" size="large" onClick={this.props.showCompleted}>Completed</Button>
          <Button type="primary" size="large" onClick={this.props.showUncompleted}>Uncompleted</Button>
        </div>

      </div>
    );
  };
}

export default TodoComponent;
