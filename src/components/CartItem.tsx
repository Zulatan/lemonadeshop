import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

// Define the type for props passed to the CartItem component
type CartItemProps = {
    id: number
    quantity: number
}

// Define the CartItem component
export function CartItem({ id, quantity }: CartItemProps) {
    // Access the removeFromCart function from the shopping cart context
    const { removeFromCart } = useShoppingCart()

    // Find the item with the specified id in the storeItems array
    const item = storeItems.find(i => i.id === id)

    // If the item is not found, return null
    if (item == null) return null

    // Render the CartItem component
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            {/* Display the item image */}
            <img src={item.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover"}}/>

            {/* Display the item name */}
            <div className="me-auto">
                <div style={{fontSize: ".9rem"}}>
                    {item.name} {quantity > 1 &&  <span className="text-muted" style={{fontSize: ".65rem"}}>x{quantity}</span> }
                </div>
                
                {/* Display the item price */}
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>

            {/* Display the total price for the item */}
            <div style={{fontSize: ".75rem"}}>{formatCurrency(item.price * quantity)}</div>

            {/* Display a button to remove the item from the cart */}
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )
}
