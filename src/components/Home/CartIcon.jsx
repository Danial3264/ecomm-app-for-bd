import React, { useState } from 'react';
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from 'react-redux'; // Import useSelector to access cart state
import Cart from './Cart';  // Assuming Cart is in the same directory

const CartIcon = () => {
    const [isCartOpen, setCartOpen] = useState(false);

    // Access the cart items from Redux state and ensure it's always an array
    const cartItems = useSelector((state) => state.cart.items || []);

    // Calculate the number of unique items in the cart
    const uniqueItemsInCart = cartItems.length;  // Count the number of distinct products

    // Toggle cart visibility
    const toggleCart = () => {
        setCartOpen(!isCartOpen);
    };

    // Only render the icon if there are items in the cart
    if (uniqueItemsInCart === 0) {
        return null;  // If no items in cart, return null to hide the icon
    }

    return (
        <>
            <div className='relative z-20'>
                {/* Cart icon that appears when the cart is not open */}
                {!isCartOpen && (
                    <div 
                        onClick={toggleCart} 
                        className='fixed right-6 top-1/2 -translate-y-1/2 flex justify-end cursor-pointer p-4 sm:right-10 z-50 text-green-500'
                    >
                        {/* Shopping bag icon */}
                        <FaShoppingBag size={35} />

                        {/* Badge to display the number of unique items in the cart */}
                        {uniqueItemsInCart > 0 && (
                            <span 
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
                            >
                                {uniqueItemsInCart}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Cart component that opens when icon is clicked */}
            {isCartOpen && (
                <Cart onClose={toggleCart} isOpen={isCartOpen} />
            )}
        </>
    );
};

export default CartIcon;
