import { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import  Message  from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { CornerDownRight, Trash } from "react-feather";

const CartScreen = ({match, location, history}) => {
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

    const removeFromCartHandler = (id) => {
        console.log('remove')
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    
    return (
        <>
            <h1 className='mb-5 text-2xl font-bold'>Shopping cart</h1>
            {
            cartItems.length === 0 ? (
                <Message>
                    Your Cart is empty. <Link to ='/'>Go back</Link>
                </Message>
                ) : (
                <div>
                    {cartItems.map(item => (
                        <div className='flex flex-row items-center space-x-8' key={item.product}>
                            <img className='inline-block w-20 rounded-md' src={item.image} alt={item.name}/>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                            <div className=''>${item.price}</div>
                            <div className=''>
                                Qty:
                                <select name="quantity" id="quantity" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {[...Array(item.countInStock).keys()].map(x => (
                                        <option key={x+1} value ={x+1}>{x+1}</option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={() => removeFromCartHandler(item.product)}><Trash className='feather-icon'/></button>
                        </div>
                    ))}
                    <div>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        ${cartItems.reduce((acc, item) => acc = item.qty*item.price, 0).toFixed(2)}
                        <button
                                onClick={checkoutHandler}
                                className={cartItems === 0 ? 'flex items-center justify-center w-full cursor-not-allowed btn' : 'flex items-center justify-center w-full btn'}
                                >
                                    <CornerDownRight className='w-5 h-5 mr-3'/>
                                    Proceed to checkout
                                </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartScreen

