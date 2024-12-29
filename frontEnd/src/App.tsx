import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Menu from "./components/Menu";
import Cart from "./pages/Cart";
import Collections from "./pages/Collection";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Layout from "./layouts/Layout";

function App() {
  return (
    // <div className="flex flex-col min-h-screen ">
    //   <Menu />
    //   <main className="flex-grow">
    //     <Home />
    //     <Collections />
    //     <Product />
    //     <Cart />
    //   </main>
    // </div>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/collections"
          element={
            <Layout>
              <Collections />
            </Layout>
          }
        />
        <Route
          path="/collections/:id"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
