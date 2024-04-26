import { ToastContainer } from "react-toastify";
import RouterApp from "./routes/RouterApp";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

function App() {
  const store = createStore({
    authName: "_auth",
    authType: "localstorage",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "http:",
  });
  return (
    <>
      <AuthProvider store={store}>
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
      </AuthProvider>
    </>
  );
}

export default App;
