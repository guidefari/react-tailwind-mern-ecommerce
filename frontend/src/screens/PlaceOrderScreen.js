
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrder = ({history}) => {
    const dispatch = useDispatch()
    
    const cart = useSelector((state) => state.cart)

  //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        )
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='grid grid-cols-12'>
                <div className='col-span-8'>
                    <div>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode},{' '}
                            {cart.shippingAddress.country}
                        </p>
                    </div>
                    <div>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </div>
                    <div>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : ( 
                            <div>
                                {cart.cartItems.map((item, index) => (
                                    <div className='flex flex-row justify-start' key={index}>
                                        <img className='inline-block h-20 rounded-md' src={item.image} alt={item.name}/>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='col-span-4'>
                    <h2>Order Summary</h2>
                    <div>
                        <h2>Items</h2>
                        <p>${cart.itemsPrice}</p>
                    </div>
                    <div>
                        <h2>Shipping</h2>
                        <p>${cart.shippingPrice}</p>
                    </div>
                    <div>
                        <h2>Tax</h2>
                        <p>${cart.taxPrice}</p>
                    </div>
                    <div>
                        <h2>Total</h2>
                        <p>${cart.totalPrice}</p>
                    </div>
                    <div>
                        {error && <Message variant='danger'>{error}</Message>}
                    </div>
                    <div className="flex items-center justify-center">
                        <button 
                            className={cart.cartItems === 0 ? 'cursor-not-allowed inline-block px-4 py-2 text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600 focus:bg-blue-700' : 'btn inline-block px-4 py-2 text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600 focus:bg-blue-700'}
                            type="button" onClick={placeOrderHandler}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceOrder
