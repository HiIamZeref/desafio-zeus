import { MouseEvent } from "react";

function ListGroup() {
  const items = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  //   items = [];

  // Event handler
  const handleClick = (event: MouseEvent) => console.log(event.target);

  return (
    <>
      <h1>ListGroup</h1>
      {items.length === 0 && <p>No items to display</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item" onClick={handleClick}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
