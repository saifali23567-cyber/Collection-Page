
import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2500,
    category: "Electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 4500,
    category: "Electronics",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 3500,
    category: "Fashion",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 4,
    name: "Classic T-Shirt",
    price: 1200,
    category: "Fashion",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: 5500,
    category: "Home",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
  },
  {
    id: 6,
    name: "Backpack",
    price: 2200,
    category: "Fashion",
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 3000,
    category: "Electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 1800,
    category: "Home",
    rating: 3.2,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
  },
  {
    id: 9,
    name: "Gaming Headset",
    price: 4000,
    category: "Electronics",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500"
  },
  {
    id: 10,
    name: "Casual Shoes",
    price: 2800,
    category: "Fashion",
    rating: 2.8,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
  },
  {
    id: 11,
    name: "Table Clock",
    price: 1500,
    category: "Home",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=500"
  },
  {
    id: 12,
    name: "Digital Camera",
    price: 12000,
    category: "Electronics",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
  }
];

const categories = ["Electronics", "Fashion", "Home"];

function App() {

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(6);

  const handleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setVisibleProducts(6);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setRating(0);
    setSortBy("default");
    setSearch("");
    setVisibleProducts(6);
  };

  // Filter products
  let filteredProducts = products.filter(product => {

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const minMatch =
      minPrice === "" || product.price >= Number(minPrice);

    const maxMatch =
      maxPrice === "" || product.price <= Number(maxPrice);

    const ratingMatch = product.rating >= rating;

    const searchMatch =
      product.name.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && minMatch && maxMatch &&
           ratingMatch && searchMatch;
  });

  // Sort products
  if (sortBy === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  else if (sortBy === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  else if (sortBy === "rating-low") {
    filteredProducts.sort((a, b) => a.rating - b.rating);
  }
  else if (sortBy === "rating-high") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }
  else if (sortBy === "az") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  else if (sortBy === "za") {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Visible products for Load More
  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  return (
    <div className="container">

      {/* Header */}
      <header>
        <h1>ShopEase</h1>
        <div className="cart">
          Cart ({cart})
        </div>
      </header>

      <h2>Our Collection</h2>
      <p className="subtitle">Discover products you'll love.</p>

      {/* Search and Sorting */}
      <div className="top-controls">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleProducts(6);
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default Sorting</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="rating-low">Rating: Low to High</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="az">Name: A to Z</option>
          <option value="za">Name: Z to A</option>
        </select>

      </div>

      <div className="main-content">

        {/* Sidebar Filters */}
        <aside className="filters">

          <div className="filter-heading">
            <h3>Filters</h3>
            <button onClick={clearFilters}>Clear All</button>
          </div>

          {/* Category */}
          <div className="filter-section">
            <h3>Category</h3>

            {categories.map(category => (
              <label key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategory(category)}
                />
                {category}
              </label>
            ))}

          </div>

          {/* Price */}
          <div className="filter-section">
            <h3>Price Range</h3>

            <input
              type="number"
              placeholder="Minimum Price"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setVisibleProducts(6);
              }}
            />

            <input
              type="number"
              placeholder="Maximum Price"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setVisibleProducts(6);
              }}
            />

            <p>
              Selected: Rs. {minPrice || 0} - Rs. {maxPrice || "Any"}
            </p>
          </div>

          {/* Rating */}
          <div className="filter-section">
            <h3>Rating</h3>

            <select
              value={rating}
              onChange={(e) => {
                setRating(Number(e.target.value));
                setVisibleProducts(6);
              }}
            >
              <option value="0">All Ratings</option>
              <option value="4">4 Stars & Above</option>
              <option value="3">3 Stars & Above</option>
              <option value="2">2 Stars & Above</option>
              <option value="1">1 Star & Above</option>
            </select>

          </div>

        </aside>

        {/* Products */}
        <main className="products-area">

          <div className="product-count">
            <p>{filteredProducts.length} Products Found</p>
          </div>

          <div className="product-grid">

            {displayedProducts.map(product => (

              <div className="product-card" key={product.id}>

                <img src={product.image} alt={product.name} />

                <div className="product-info">

                  <p className="category">{product.category}</p>

                  <h3>{product.name}</h3>

                  <div className="rating">
                    <span>★</span> {product.rating}
                  </div>

                  <h3>Rs. {product.price.toLocaleString()}</h3>

                  <button
                    className="cart-btn"
                    onClick={() => setCart(cart + 1)}
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* No Products */}
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <h3>No Products Found!</h3>
              <p>Try changing your filters.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}

          {/* Load More */}
          {visibleProducts < filteredProducts.length && (
            <button
              className="load-more"
              onClick={() => setVisibleProducts(visibleProducts + 6)}
            >
              Load More
            </button>
          )}

        </main>

      </div>
    </div>
  );
}

export default App;
