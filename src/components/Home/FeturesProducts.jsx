import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/ProductThunks";


const FeaturesProducts = () => {
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products, status, error } = useSelector((state) => state.products);

  console.log(products);
  

  // Handle add to cart action
  const handleAddToCart = (product) => {
    dispatch(fetchProducts({ ...product, quantity: 1 })); // Dispatch addToCart with product and quantity
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-screen-2xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-6">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={product.product_name}
                  src={`../../assets/images/${product.product_image}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-10"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="mt-4 text-sm text-gray-700 font-bold">{product.product_name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.product_price}</p>
                <button
                  className="rounded bg-gradient-to-r from-violet-500 to-fuchsia-500 text-2xl font-bold p-3"
                  onClick={() => handleAddToCart(product)} 
                >
                  Add to Cart
                </button>
                <button className="rounded text-xl font-bold p-3">View Details</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesProducts;
