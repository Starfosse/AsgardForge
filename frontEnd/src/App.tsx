import Menu from "./components/Menu";
import Cart from "./pages/Cart";
import Collections from "./pages/Collection";
import Home from "./pages/Home";
import Product from "./pages/Product";

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
