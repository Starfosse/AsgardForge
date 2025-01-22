import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GoogleCallBack } from "./components/GoogleCallBack";
import ProductForm from "./forms/product/ProductForm";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";
import Dashboard from "./pages/admin/Dashboard";
import ProductsList from "./pages/admin/ProductsList";
import Cart from "./pages/client/Cart";
import {
  default as Collection,
  default as Collections,
} from "./pages/client/Collection";
import Home from "./pages/client/Home";
import ProductPage from "./pages/client/Product";
import DashBoardProduct from "./wrapper/DashboardProduct";

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
            <LayoutClient>
              <Home />
            </LayoutClient>
          }
        />
        <Route path="/login/success" element={<GoogleCallBack />} />
        <Route
          path="/collections"
          element={
            <LayoutClient>
              <Collections />
            </LayoutClient>
          }
        />
        <Route
          path="/collections/:id"
          element={
            <LayoutClient>
              {/* <Product /> */}
              <Collection />
            </LayoutClient>
          }
        />
        <Route
          path="/collections/:id/:productId"
          element={
            <LayoutClient>
              <ProductPage />
            </LayoutClient>
          }
        />
        <Route
          path="/cart"
          element={
            <LayoutClient>
              <Cart />
            </LayoutClient>
          }
        />
        <Route
          path="/dashboard"
          element={
            <LayoutAdmin>
              <Dashboard />
            </LayoutAdmin>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <LayoutAdmin>
              <DashBoardProduct>
                <ProductsList />
              </DashBoardProduct>
            </LayoutAdmin>
          }
        />
        <Route
          path="/dashboard/products/:id"
          element={
            <LayoutAdmin>
              <DashBoardProduct>
                <ProductForm />
              </DashBoardProduct>
            </LayoutAdmin>
          }
        />
        <Route
          path="/dashboard/products/new"
          element={
            <LayoutAdmin>
              <DashBoardProduct>
                <ProductForm />
              </DashBoardProduct>
            </LayoutAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
