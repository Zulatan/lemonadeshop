// Import necessary modules from react-bootstrap and custom utilities
import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/shoppingCartContext"

// Define the type for props passed to StoreItem component
type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

// Define the StoreItem component
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    // Retrieve necessary functions from the shopping cart context
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    
    // Get the quantity of this item in the shopping cart
    const quantity = getItemQuantity(id)
    
    // Render the component
    return (
        <Card className="h-100">
            {/* Display the item image */}
            <Card.Img variant="top" src={imgUrl} height="200px" style={ {objectFit: "cover"} } />
            <Card.Body className="d-flex flex-column">
                {/* Display item name and price */}
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="">{name}</span>
                    <span className="ms-2 text-muted">{ formatCurrency(price) }</span>
                </Card.Title>

                <div className="mt-auto d-flex justify-content-end">
                    {/* Conditional rendering based on item quantity in the cart */}
                    {quantity === 0 ? (
                        // Render add to cart button if quantity is zero
                        <Button onClick={() => increaseCartQuantity(id)}>Tilføj til kurven</Button>
                    ) : (
                        // Render controls for managing item quantity in the cart
                        <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem"}}>
                                {/* Button to decrease quantity */}
                                <Button size="sm" onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    {/* Display quantity in the cart */}
                                    <span className="">{quantity} </span>
                                    i kurven
                                </div>
                                {/* Button to increase quantity */}
                                <Button size="sm" onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            {/* Button to remove item from cart */}
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Fjern</Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}
