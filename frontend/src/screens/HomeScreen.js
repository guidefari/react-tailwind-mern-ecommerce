import Product from '../components/Product'
import {useState, useEffect} from 'react'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get('/api/products')
            setProducts(data)
        }
        fetchProducts()
    }, []) 

    return (
        <>
            <h1 className='mb-5 text-2xl font-bold'>Latest products</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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
