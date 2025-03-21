import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GoogleCallBack } from "./components/GoogleCallBack";
import ProductForm from "./forms/product/ProductForm";
import LayoutAdmin from "./layouts/LayoutAdmin";
import LayoutClient from "./layouts/LayoutClient";
import Checkout from "./pages/client/Checkout";
import CustomerList from "./pages/admin/CustomerList";
import Dashboard from "./pages/admin/Dashboard";
import OrdersList from "./pages/admin/OrdersList";
import ProductsList from "./pages/admin/ProductsList";
import Support from "./pages/admin/Support";
import Cart from "./pages/client/Cart";
import CollectionPage from "./pages/client/Collection";
import Contact from "./pages/client/Contact";
import Home from "./pages/client/Home";
import ProductPage from "./pages/client/Product";
import DashBoardProduct from "./wrapper/DashboardProduct";
import OrderConfirmation from "./pages/client/OrderConfirmation";
import OrderHistory from "./pages/client/OrderHistory";
import OrderDetails from "./pages/client/OrderDetails";
import Profile from "./forms/profile/ProfileForm";
import Wishlist from "./pages/client/Wishlist";
import Collections from "./pages/client/Collections";

function App() {
  return (
    <div>
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
          <Route
            path="profile"
            element={
              <LayoutClient>
                <Profile />
              </LayoutClient>
            }
          />
          <Route
            path="/order/confirmation/:orderId"
            element={
              <LayoutClient>
                <OrderConfirmation />
              </LayoutClient>
            }
          />
          <Route
            path="order/history"
            element={
              <LayoutClient>
                <OrderHistory />
              </LayoutClient>
            }
          />
          <Route
            path="order/history/:orderId"
            element={
              <LayoutClient>
                <OrderDetails />
              </LayoutClient>
            }
          />
          <Route
            path="profile/wishlist"
            element={
              <LayoutClient>
                {" "}
                <Wishlist />
              </LayoutClient>
            }
          />
          <Route path="/login/success" element={<GoogleCallBack />} />
          <Route
            path="/checkout"
            element={
              <LayoutClient>
                <Checkout />
              </LayoutClient>
            }
          />
          <Route
            path="/collections"
            element={
              <LayoutClient>
                <Collections />
              </LayoutClient>
            }
          />
          <Route
            path="/:collectionName/:id"
            element={
              <LayoutClient>
                {/* <Product /> */}
                <CollectionPage />
              </LayoutClient>
            }
          />
          <Route
            path="/:collectionName/:id/:productName/:productId"
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
            path="/contact"
            element={
              <LayoutClient>
                <Contact />
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
            path="/dashboard/orders"
            element={
              <LayoutAdmin>
                <DashBoardProduct>
                  <OrdersList />
                </DashBoardProduct>
              </LayoutAdmin>
            }
          />
          <Route
            path="/dashboard/customers"
            element={
              <LayoutAdmin>
                <DashBoardProduct>
                  <CustomerList />
                </DashBoardProduct>
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
          <Route
            path="/dashboard/support/"
            element={
              <LayoutAdmin>
                <Support />
              </LayoutAdmin>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
