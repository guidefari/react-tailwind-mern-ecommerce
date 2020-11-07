import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


const PaymentScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <form onSubmit={submitHandler} className="px-12 pt-6 pb-8 mb-4 bg-white rounded shadow-lg">
                <h1 className='flex justify-center py-2 mb-4 text-2xl text-gray-800 border-b-2'>Payment Method</h1>

            <div className="my-4">
            <span className="text-gray-700">Select Method</span>
            <div className="mt-2">
                <label className="inline-flex items-center">
                    <input type="radio" className="form-radio" name="paymentMethod" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <span className="ml-2">PayPal or Credit Card</span>
                </label>
                <label className="inline-flex items-center ml-6">
                    <input type="radio" className="form-radio" name="paymentMethod" value="Ecocash" onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <span className="ml-2">Ecocash</span>
                </label>
            </div>
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

export default PaymentScreen
