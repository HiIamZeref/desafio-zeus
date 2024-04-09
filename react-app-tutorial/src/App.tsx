//import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  // const items = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  // const heading = "Cities";
  const onClickBtn = (type: string) => console.log("Tipo do botão: ", type);

  return (
    // <div>
    //   <ListGroup heading={heading} items={items} />
    // </div>
    <>
      <Alert>
        <h1>Hello World</h1>
      </Alert>

      <Button label="Clica ai" type="primary" />
    </>
  );
}

export default App;
