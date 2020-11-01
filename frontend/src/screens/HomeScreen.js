import Product from '../components/Product'
import products from '../products'

const HomeScreen = () => {
    return (
        <>
            <h1 className='text-2xl'>Latest products</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {products.map(product => 
                    <div>
                        <Product product={product}/>
                    </div>
                    )}
            </div>
        </>
    )
}

export default HomeScreen
