import {Link} from 'react-router-dom'
import Rating from '../components/Rating'

const Product = ({product}) => {
    return (
        
    <div class="flex flex-col justify-center items-center max-w-sm mx-auto mb-5">
        <Link to={`/product/${product._id}`}>
            <img src={product.image} class="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center" alt={product.name}/>
        </Link>

        <Link to={`/product/${product._id}`}>
            <div class="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                <h3 class="py-2 px-3 text-center font-bold uppercase tracking-wide text-gray-800">{product.name}</h3>
                
                <div class="flex items-center justify-between py-2 px-3 bg-gray-200">
                    <span class="text-gray-800 font-bold ">${product.price}</span>
                    <Rating  value={product.rating} color='#2d3748' />
                </div>
            </div>
        </Link>
    </div>
    )
}

export default Product