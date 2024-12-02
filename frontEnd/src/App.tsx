import "./App.css";
import Menu from "./components/Menu";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import HomePage from "./pages/Home";
import Product from "./pages/Product";
import Collections from "./pages/Products";
import ProductsPage from "./pages/Products";

function App() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Menu />
      <main className="flex-grow">
        <Home />
        <Collections />
        <Product />
        <Cart />
      </main>
    </div>
  );
}

export default App;
