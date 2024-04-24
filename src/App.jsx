import { useState, useEffect } from "react";
import List from "./List";
import { ToastContainer, toast } from "react-toastify";

const getLocalStorage = () => {
  let todos = localStorage.getItem("todos");
  if (todos) {
    return (todos = JSON.parse(localStorage.getItem("todos")));
  } else {
    return [];
  }
};

function App() {
  const [todos, setTodos] = useState(getLocalStorage());
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleClearList = () => {
    setTodos([]);
    toast.error("All Todos Deleted!", { theme: "dark", draggable: true });
  };
  const removeItem = (id) => {
    const newTodos = todos.filter(function (todo) {
      return todo.id != id;
    });
    setTodos(newTodos);
    toast.error("Todo Deleted!", { theme: "dark", draggable: true });
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      toast.warning("Please Enter Todo", { theme: "dark", draggable: true });
    } else if (name && isEditing) {
      const newTodosList = todos.map(function (todo) {
        if (todo.id === editId) {
          return { ...todo, title: name };
        }
        return todo;
      });

      setTodos(newTodosList);

      setIsEditing(false);
      setEditId(null);
      setName("");
      toast.success("Todo Edited!", { theme: "dark", draggable: true });
    } else {
      const newTodo = {
        id: new Date().getTime().toString(),
        title: name,
        status: "active",
      };
      setTodos([...todos, newTodo]);
      setName("");
      toast.success("Todo Submitted!", { theme: "dark", draggable: true });
    }
  };
  const editItem = (id) => {
    const specificTodo = todos.find((todo) => todo.id === id);
    setIsEditing(true);
    setEditId(specificTodo.id);
    setName(specificTodo.title);
  };

  // todo complete filter
  const handleFilter = (e) => {
    let btnClicked = e.target.textContent;
    if (btnClicked === "all") {
    } else if (btnClicked === "active") {
    } else if (btnClicked === "completed") {
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <header className="primary-header">
        <div className="container">
          <h1>todo</h1>
          <button className="theme-toggler-btn">
            <img src="./icon-sun.svg" alt="theme-toggler-icon" />
          </button>
        </div>
      </header>

      <main>
        <ToastContainer />
        <section>
          <div className="container">
            <form className="todo-form" onSubmit={handleSubmit}>
              <div className="form-control">
                <input
                  type="text"
                  className="todo"
                  placeholder="e.i. complete homework"
                  value={name}
                  onChange={handleChange}
                />
                <button type="submit" className="submit-btn">
                  {isEditing ? "edit" : "submit"}
                </button>
              </div>
            </form>

            {todos.length >= 1 ? (
              <div className="todo-container">
                <List
                  items={todos}
                  removeItem={removeItem}
                  editItem={editItem}
                />
                <div className="todo-container-footer">
                  <p>{todos.length} items left</p>

                  <div className="btn-container" onClick={handleFilter}>
                    <button className="show-all-btn">all</button>
                    <button className="show-active-btn">active</button>
                    <button className="show-completed-btn">completed</button>
                  </div>

                  <button className="clear-btn" onClick={handleClearList}>
                    clear items
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
