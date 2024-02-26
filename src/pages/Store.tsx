import { Col, Row } from "react-bootstrap"

//The component store import
import { StoreItem } from "../components/StoreItem" 

//JSON data import
import StoreItems from "../data/items.json"


export function Store() {
    return (
        <>
        <h1>store</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
            {StoreItems.map(item => (
                <Col key={item.id}>
                    <StoreItem {...item} /> 
                </Col>
            ))}
        </Row>
        </>
    )
}