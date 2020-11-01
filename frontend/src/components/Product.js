const Product = ({product}) => {
    return (
        <div className='p-2'>
            <a href={`/product/${product._id}`}>
                <img className='rounded shadow-xs hover:shadow-md' src={product.image} alt="" />
            </a>

            <div className='px-4 lg:px-6 '>
                <div>
                    <a href={`/product/${product._id}`}>
                        <h2 className='my-2 font-bold' src={product.image} alt="" >{product.name}</h2>
                    </a>
                </div>

                <div>
                    <div className='my-3'>
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </div>

                <h3 className='text-xl'>${ product.price}</h3>
            </div>


        </div>
    )
}

export default Product
