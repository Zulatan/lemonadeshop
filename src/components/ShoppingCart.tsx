import { useState } from "react";
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json"

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()

    const [totalProfit, setTotalProfit] = useState(0);

    // Function to calculate total profit
    const calculateTotalProfit = () => {
        const profit = cartItems.reduce((total, cartItem) => {
            const item = storeItems.find(i => i.id === cartItem.id);
            return total + (item?.price || 0) * cartItem.quantity;
        }, 0);
        setTotalProfit(profit);
    };

    // Function to handle purchase confirmation
    const handlePurchase = () => {
        // Add your logic here to finalize the purchase and handle the total profit calculation
        console.log("Purchase confirmed!");
        calculateTotalProfit(); // Update total profit after purchase
    };

    
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Indholdet af din kurv</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-6">
                        I alt{" "} {formatCurrency(cartItems.reduce((total, cartItem) => {
                            const item = storeItems.find(i => i.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0)
                    )}  
                    </div>
                    <Button onClick={handlePurchase} className="ms-auto fw-bold fs-6">
                        Køb
                    </Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}