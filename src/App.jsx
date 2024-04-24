import { useState } from "react";
import List from "./List";

const list = [
  {
    id: 1,
    title: "Learn HTML",
    // active | complete
    status: "complete",
  },
  {
    id: 2,
    title: "Learn JS",
    status: "active",
  },
  {
    id: 3,
    title: "Learn Tailwind",
    status: "active",
  },
];

function App() {
  const [todos, setTodos] = useState(list);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleClearList = () => {
    setTodos([]);
  };
  const removeItem = (id) => {
    // [1, 2, 3, 4]
    const newTodos = todos.filter(function (todo) {
      return todo.id != id;
    });
    setTodos(newTodos);
    console.log("removeItem " + id);
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please write todo");
    } else if (name && isEditing) {
      // todo: add edit functionality
    } else {
      const newTodo = {
        id: new Date().getTime().toString(),
        title: name,
        status: "active",
      };
      setTodos([...todos, newTodo]);
      setName("");
    }
  };

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
                  submit
                </button>
              </div>
            </form>

            {todos.length >= 1 ? (
              <div className="todo-container">
                <List items={todos} removeItem={removeItem} />
                <div className="todo-container-footer">
                  <p>{todos.length} items left</p>

                  <div className="btn-container">
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
