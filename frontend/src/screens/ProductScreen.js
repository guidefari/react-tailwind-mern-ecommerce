import React from 'react'
import {Link} from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'
import {ShoppingBag } from 'react-feather'



const ProductScreen = ({match}) => {
    const product = products.find(p=> p._id === match.params.id)

    return (
        <>
            <div className='mb-5'>
                <Link to='/' className='btn'> Go back</Link>
            </div>

            <div className='flex flex-col md:flex-row'>

                <div className=' md:w-3/5'>
                    <img className='' src={product.image} alt={product.name}/>
                </div>
                <div className='md:w-1/5'>
                    <h3 className='text-4xl leading-none'>{product.name}</h3>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    <h3 className='text-lg'>Price: <span className='font-bold'>${product.price}</span></h3>
                    <p>Description: {product.description}</p>
                </div>
                <div className='md:w-1/5'>
                    <h3 className='text-lg'>Price: <span className='font-bold'>${product.price}</span></h3>
                    <h3>Status: {product.countInStock > 0 ? 'In stock' : 'Out of stock'}</h3>
                    <div>
                        <button 
                          
                          className={product.countInStock === 0 ? 'flex items-center justify-center w-full cursor-not-allowed btn' : 'flex items-center justify-center w-full btn'}
                        >
                            <ShoppingBag className='w-5 h-5'/>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductScreen
