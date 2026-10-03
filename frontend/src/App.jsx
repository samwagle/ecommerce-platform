import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load products");
      });
  }, []);

  return (
    <div>
      <h1>E-Commerce Platform</h1>

      {error && <p>{error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
