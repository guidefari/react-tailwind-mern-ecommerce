import {Link} from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className='flex flex-row p-4 space-x-8'>
            {step1 ? (
                <div >
                    <Link className='' to='/login'>Sign In</Link>
                </div>
            ) : (
                <Link className='text-gray-600 cursor-not-allowed'>Sign In</Link>
            )}
            {step2 ? (
                <div>
                    <Link className='' to='/shipping'>Shipping</Link>
                </div>
            ) : (
                <Link className='text-gray-600 cursor-not-allowed'>Shipping</Link>
            )}
            {step3 ? (
                <div>
                    <Link className='' to='/payment'>Payment</Link>
                </div>
            ) : (
                <Link className='text-gray-600 cursor-not-allowed'>Payment</Link>
            )}
            {step4 ? (
                <div >
                    <Link className='' to='/placeorder'>Place Order</Link>
                </div>
            ) : (
                <Link className='text-gray-600 cursor-not-allowed'>Place Order</Link>
            )}
        </nav>
    )
}

export default CheckoutSteps
