function ProductList({ products }) {
  return (
    <div className="products">
      <h2>Available Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>

            <p>
              <strong>Brand:</strong> {product.brand}
            </p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Price:</strong> ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;