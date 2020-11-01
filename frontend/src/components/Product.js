import {Link} from 'react-router-dom'
import Rating from '../components/Rating'

const Product = ({product}) => {
    return (
        <div className='p-2'>
            <Link to={`/product/${product._id}`}>
                <img className='rounded shadow-xs hover:shadow-md' src={product.image} alt="" />
            </Link>

            <div className='px-4 lg:px-6 '>
                <div>
                    <Link to={`/product/${product._id}`}>
                        <h2 className='my-2 font-bold' src={product.image} alt="" >{product.name}</h2>
                    </Link>
                </div>

                <div>
                    <Rating  value={product.rating} text={`${product.numReviews} reviews`} />
                </div>

                <h3 className='text-xl'>${ product.price}</h3>
            </div>


        </div>
    )
}

export default Product
