import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/shoppingCartContext"

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id)
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={imgUrl} height="200px" style={ {objectFit: "cover"} } />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="">{name}</span>
                    <span className="ms-2 text-muted">{ formatCurrency(price) }</span>
                </Card.Title>

                <div className="mt-auto d-flex justify-content-end">
                    {quantity === 0 ? (
                        <Button onClick={() => increaseCartQuantity(id)}>Tilføj til kurven</Button>
                    ) : <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem"}}>
                                <Button size="sm" onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="">{quantity} </span>
                                    i kurven
                                </div>
                                <Button size="sm" onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Fjern</Button>
                        </div>} 
                </div>
            </Card.Body>
        </Card>
    )
}