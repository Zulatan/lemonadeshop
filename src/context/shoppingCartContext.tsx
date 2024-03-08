import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart"; // Importing ShoppingCart component
import { useLocalStorage } from "../hooks/useLocalStorage"; // Importing custom hook for local storage

// Defining type for props of ShoppingCartProvider component
type ShoppingCartProviderProps = {
    children: ReactNode // ReactNode allows any valid React children to be passed as props
}

// Defining type for each item in the shopping cart
type CartItem = {
    id: number // Unique identifier for each item
    quantity: number // Quantity of the item
}

// Defining type for the context that provides shopping cart functionality
type ShoppingCartContext = {
    openCart: () => void // Function to open the shopping cart
    closeCart: () => void // Function to close the shopping cart
    getItemQuantity: (id: number) => number // Function to get the quantity of a specific item in the cart
    increaseCartQuantity: (id: number) => void // Function to increase the quantity of a specific item in the cart
    decreaseCartQuantity: (id: number) => void // Function to decrease the quantity of a specific item in the cart
    removeFromCart: (id: number) => void // Function to remove a specific item from the cart
    cartQuantity: number // Total quantity of items in the cart
    cartItems: CartItem[] // Array containing all items in the cart
}

// Creating a context for shopping cart functionality
const ShoppingCartContext = createContext({} as ShoppingCartContext)

// Custom hook to access shopping cart context
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
} 

// Component to provide shopping cart functionality to its children
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false) // State to manage whether the shopping cart is open or closed
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []) // State to manage cart items stored in local storage

    // Calculating total quantity of items in the cart
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    // Function to open the shopping cart
    const openCart = () => setIsOpen(true)
    
    // Function to close the shopping cart
    const closeCart = () => setIsOpen(false)

    // Function to get the quantity of a specific item in the cart
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    // Function to increase the quantity of a specific item in the cart
    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id ) {
                        return  { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // Function to decrease the quantity of a specific item in the cart
    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1 ) {
                return currItems.filter(item => item.id !== id )
            } else {
                return currItems.map(item => {
                    if (item.id === id ) {
                        return  { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    // Function to remove a specific item from the cart
    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id )
        })
    }

    // Providing shopping cart context to its children
    return (
    <ShoppingCartContext.Provider value={{ 
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart,
        openCart, 
        closeCart,
        cartItems,
        cartQuantity 
        }}
    >
        {children} {/* Rendering children components */}
        <ShoppingCart isOpen={isOpen}/> {/* Rendering ShoppingCart component with isOpen prop */}
    </ShoppingCartContext.Provider>
    ) 
} 
