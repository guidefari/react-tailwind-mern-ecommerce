import  { useState ,useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = ({ match }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
    
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])
    
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    } 


    return loading ? (
        <Loader/>
    ) : error ? (
        <Message>{error}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <div className='grid grid-cols-12'>
                <div className='container col-span-8'>
                    <h2>Shipping</h2>
                    <div className='my-5'>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>{' '} <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode},{' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message >
                                Delivered on {order.deliveredAt}
                            </Message>
                        ) : (
                            <Message >Not Delivered</Message>
                        )}
                    </div>
                    <div className='my-5'>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong> {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message >Paid on {order.paidAt}</Message>
                        ) : (
                            <Message >Not Paid</Message>
                        )}
                    </div>
                    <div className='my-5'>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <div>
                                {order.orderItems.map((item, index) => (
                                <div className='flex flex-row justify-start' key={index}>
                                    <img className='inline-block h-20 rounded-md' src={item.image} alt={item.name}/>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='container col-span-4 text-right'>
                    <h2>Order Summary</h2>
                    <div>
                        <h2>Items</h2>
                        <p>${order.itemsPrice}</p>
                    </div>
                    <div>
                        <h2>Shipping</h2>
                        <p>${order.shippingPrice}</p>
                    </div>
                    <div>
                        <h2>Tax</h2>
                        <p>${order.taxPrice}</p>
                    </div>
                    <div>
                        <h2>Total</h2>
                        <p>${order.totalPrice}</p>
                    </div>
                    {!order.isPaid && (
                        <div>
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                            <Loader />
                        ) : (
                            <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                            />
                        )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


export default OrderScreen