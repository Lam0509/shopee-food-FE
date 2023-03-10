import React, {useEffect} from "react";
import Helmet from "../../components/user/shares/Helmet";
import CommonSection from "../../components/user/UI/CommonSection";
import {Col, Container, Row} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import styles from '../../styles/user/cart-page.module.css'
import {cartActions} from "../../features/shopping-cart/cartSlice";
import Link from 'next/link';
import Button from "@mui/material/Button";
import Table from 'react-bootstrap/Table';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    return (<Helmet title="Cart">
            <CommonSection title="Your Cart"/>
            <section>
                <Container>
                    <Row>
                        <Col style={{marginTop: '40px'}} lg="12">
                            {!cartItems ? (<h5 className="text-center">Your cart is
                                    empty</h5>) : (
                                <Table striped>
                                    <thead>
                                    <tr>
                                        <th className="text-center">Image</th>
                                        <th className="text-center">Product Title</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">Quantity</th>
                                        <th className="text-center">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems.map((item) => (
                                         <Tr item={item} key={item.id} />
                                        ))}
                                    </tbody>
                                </Table>)}
                            <div className="mt-4">
                                <h6>Subtotal: <span className={styles.cart__subtotal}>${totalAmount}</span></h6>
                                <p>Taxes and shipping will caculator at checkout</p>
                                <div className={styles.cart__page__btn}>
                                    <Button variant="contained" color="error">
                                        <Link style={{color: 'white', textDecoration: 'none'}} href='/foods'>Continue Shopping</Link>
                                    </Button>
                                    <Button style={{margin: '20px'}} variant="contained" color="error">
                                        <Link style={{color: 'white', textDecoration: 'none'}} href='/checkout'>Proceed to checkout</Link>
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>);
};
const Tr = (props) => {
    const {id, image01, name, price, quantity} = props.item;
    console.log(props.item)
    const dispatch = useDispatch()
    const deleteItem = () => {
        dispatch(cartActions.deleteItem(id))
    }
    return (<tr>
            <td className={`text-center ${styles.cart__img__box}`}>
                <img src={image01} alt=""/>
            </td>
            <td className="text-center">{name}</td>
            <td className="text-center">{price}</td>
            <td className="text-center">{quantity}px</td>
            <td className={`text-center ${styles.cart__item__del}`} onClick={deleteItem}>
                <i className="ri-delete-bin-line"></i>
            </td>
        </tr>);
};
export default Cart;