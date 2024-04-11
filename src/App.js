import { useEffect, useState } from "react";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [showBar, setShowBar] = useState(true);

  const getProducts = async () => {
    try {
      const res = await axios(process.env.REACT_APP_URL);
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <h1 className="text-center mt-4 text-danger">Checkout Page</h1>
      <div className="text-center m-4">
        <button
          className="mt-4 d-block mx-auto text-bg-dark rounded-2"
          onClick={() => setShowBar(!showBar)}
        >
          {showBar ? "Hide Product Bar" : "Show Product Bar"}
        </button>
      </div>
      <div className="d-flex justify-content-center gap-2">
        {showBar && <AddProduct getProducts={getProducts} />}
        <ProductList products={products} setProducts={setProducts} getProducts={getProducts}  />
      </div>
    </div>
  );
}

export default App;
