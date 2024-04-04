import { useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;
}

function ListGroup(ListGroupProps: ListGroupProps) {
  const { items } = ListGroupProps;
  const { heading } = ListGroupProps;

  const onSelectedItem = (index: number) => {
    console.log("Selected item: ", items[index]);
  };

  // Event handler
  // const handleClick = (event: MouseEvent) => console.log(event.target);

  //Hook
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 is the initial value, setSelectedIndex is the function to update the value

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items to display</p>}
      <ul className={"list-group"}>
        {items.map((item, index) => (
          <li
            key={index}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectedItem(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
