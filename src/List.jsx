const List = (props) => {
  const { items, removeItem } = props;
  return (
    <>
      {items.map(function (item) {
        const { id, title, status } = item;
        return (
          <article className="todo-item" key={id}>
            <p>{title}</p>
            <div className="btn-container">
              <button className="edit-btn">edit</button>
              <button
                className="delete-btn"
                onClick={() => {
                  removeItem(id);
                }}
              >
                delete
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
};
export default List;
