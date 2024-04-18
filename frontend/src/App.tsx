import { ToastContainer } from "react-toastify";
import RouterApp from "./routes/RouterApp";

function App() {
  return (
    <>
      <RouterApp />;
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
