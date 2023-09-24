import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/Button";
import Modal from "@material-ui/core/Button";

export const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [input, changeInput] = useState("");
  const [show, setShow] = useState("none");
  const [editInput, setEditInput] = useState({
    text: "",
    id: null,
  });

  const getTodos = () => {
    axios.get("/todos").then((res) => {
      setTodos(res.data);
    });
  };

  const deleteTodo = (id) => () => {
    axios.delete(`/todos/${id}`).then((res) => {
      console.log("Deleted successfully");
      getTodos();
    });
  };

  const addTodo = () => {
    axios.post("/todos", { description: input }).then((res) => {
      console.log(res.data);
      changeInput("");
      getTodos();
    });
  };

  const updateTodo = () => {
    console.log("entered update query");
    console.log(editInput);
    axios
      .post(`/todos/${editInput.id}`, { description: editInput.text })
      .then((res) => {
        setEditInput({
          text: "",
          id: null,
        });
        setShow(show == "none" ? "block" : "none");
        getTodos();
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const changeDisplay = (e) => {
    setShow(show == "none" ? "block" : "none");
    console.log(e.target);
    setEditInput({
      ...editInput,
      id: e.target.id,
    });
  };

  return (
    <>
      <List component="nav" aria-label="mailbox folders">
        {todos.map((todo) => (
          <>
            <ListItem key={todo.todo_id}>
              <ListItemText primary={todo.description} />
              <button
                onClick={changeDisplay}
                variant="contained"
                color="primary"
                id={todo.todo_id}
              >
                Edit
              </button>
              <Button
                onClick={deleteTodo(todo.todo_id)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      <input
        onChange={(e) => changeInput(e.target.value)}
        placeholder="Insert todo here"
        id="filled-basic"
        label="Filled"
        variant="filled"
      />
      <Button onClick={addTodo} variant="contained" color="primary">
        Submit
      </Button>
      <input
        onChange={(e) => setEditInput({ ...editInput, text: e.target.value })}
        value={editInput.text}
        style={{ display: show }}
      />
      <Button
        style={{ display: show }}
        onClick={updateTodo}
        variant="contained"
        color="primary"
      >
        Submit Edit
      </Button>
    </>
  );
};
