import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Rating from '../components/Rating'
import {ShoppingBag } from 'react-feather'
import {listProductDetails} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'



const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match]) 

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <div className='mb-5'>
                <Link to='/' className='btn'> Go back</Link>
            </div>
            {
                loading ? (
                    <Loader/>
                ) : error ? (
                    <Message>{error}</Message>
                ) : ( 
                    <div className='flex flex-col md:flex-row'>

                        <div className=' md:w-3/5'>
                            <img className='' src={product.image} alt={product.name}/>
                        </div>
                        <div className='md:w-1/5'>
                            <h3 className='text-4xl leading-none'>{product.name}</h3>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            <h3 className='text-lg'><span className='font-bold'>${product.price}</span></h3>
                            <p>{product.description}</p>
                        </div>
                        <div className='md:w-1/5'>
                            <h3 className='text-lg'>Price: <span className='font-bold'>${product.price}</span></h3>
                            <h3>Status: {product.countInStock > 0 ? 'In stock' : 'Out of stock'}</h3>
                            {product.countInStock > 0 && (
                                <div className='my-3'>
                                    Qty:
                                    <select name="quantity" id="quantity" value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <option key={x+1} value ={x+1}>{x+1}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div>
                                <button
                                onClick={addToCartHandler}
                                className={product.countInStock === 0 ? 'flex items-center justify-center w-full cursor-not-allowed btn' : 'flex items-center justify-center w-full btn'}
                                >
                                    <ShoppingBag className='w-5 h-5 mr-3'/>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                    
                )
            }

        </>
    )
}

export default ProductScreen
