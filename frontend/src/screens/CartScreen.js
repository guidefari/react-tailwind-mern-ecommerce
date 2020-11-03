import { useEffect } from "react";
import {Link} from 'react-dom'
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../components/Message";
import { addToCart } from "../actions/cartActions";

function CartScreen({match, location, history}) {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    
    return (
        <div>
            cat
        </div>
    )
}

export default CartScreen
