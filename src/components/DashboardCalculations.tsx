import { Container, Row, Col } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

export function ProfitCalculationPage() {
    const { cartItems } = useShoppingCart();

    // Calculate total profit
    const totalProfit = cartItems.reduce((total, cartItem) => {
        const item = storeItems.find(i => i.id === cartItem.id);
        return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

    return (
        <Container>
            <h1>Profit Calculation</h1>
            <Row>
                <Col>
                    <h2>Total Profit</h2>
                    <p>{formatCurrency(totalProfit)}</p>
                </Col>
            </Row>
        </Container>
    );
}
