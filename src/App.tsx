import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductsOverview from "./pages/ProductsOverview";
import PreorderProducts from "./pages/PreorderProducts";
import ProductsByGameRoute from "./pages/ProductsByGameRoute";
import ProductDetail from "./pages/ProductDetail";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Restoration from "./pages/Restoration";
import ContactUs from "./pages/ContactUs";
import Info from "./pages/Info";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsOverview />} />
        <Route path="/products/preorders" element={<PreorderProducts />} />
        <Route path="/products/:gameSlug" element={<ProductsByGameRoute />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/restoration" element={<Restoration />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/info" element={<Info />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
