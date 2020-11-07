import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
  
    const [address, setAddress] = useState(shippingAddress.address)
    const [suburb, setSuburb] = useState(shippingAddress.suburb)
    const [city, setCity] = useState(shippingAddress.city)
  
    const dispatch = useDispatch()
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(saveShippingAddress({ address, city, suburb }))
      history.push('/payment')
    }

    
    return (
        <FormContainer>
            <form onSubmit={submitHandler} className="px-12 pt-6 pb-8 mb-4 bg-white rounded shadow-lg">
                <h1 className="flex justify-center py-2 mb-4 text-2xl text-gray-800 border-b-2">
                    Shipping
                </h1>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-normal text-gray-700" htmlFor="address">Address</label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="address"
                        type="text"
                        required
                        autoFocus
                        placeholder="Enter Address"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-normal text-gray-700" htmlFor="suburb">Suburb</label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="suburb"
                        type="text"
                        required
                        autoFocus
                        placeholder="Suburb"
                        value={suburb} onChange={(e) => setSuburb(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-normal text-gray-700" htmlFor="city">City</label>
                    <input
                        className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="city"
                        name="city"
                        required
                        autoComplete="current-city"
                        value={city} onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button className="inline-block px-4 py-2 text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600 focus:bg-blue-700" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </FormContainer>
    )
}

export default ShippingScreen
