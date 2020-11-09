import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
            setName(user.name)
            setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <>
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-3'>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md">
                    <form onSubmit={submitHandler} className="px-6 pb-8 mb-4 bg-white rounded shadow-sm">
                        <h2 className="flex justify-center py-2 mb-4 text-2xl text-gray-800 border-b-2">
                            User Profile
                        </h2>
                        {message && <Message>{message}</Message>}
                        {success && <Message>Profile updated</Message>}
                        {error && <Message>{error}</Message>}
                        {loading && <Loader></Loader>}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-normal text-gray-700" htmlFor="email">Name</label>
                            <input
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                name="name"
                                type="text"
                                required
                                autoFocus
                                placeholder="Name"
                                value={name} onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-normal text-gray-700" htmlFor="email">Email</label>
                            <input
                                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                name="email"
                                type="email"
                                required
                                autoFocus
                                placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-normal text-gray-700" htmlFor="password">Password</label>
                            <input
                                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Password"
                                name="password"
                                autoComplete="current-password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-normal text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                autoComplete="current-password"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                        <button className="inline-block px-4 py-2 text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600 focus:bg-blue-700" type="submit">
                            Update
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            <div className='col-span-9'>
                <h2 className='flex justify-center py-2 mb-4 text-2xl text-gray-800 border-b-2'>My Orders</h2>
                    {loadingOrders ? (
                    <Loader />
                    ) : errorOrders ? (
                    <Message>{errorOrders}</Message>
                    ) : (
                    <table className='table-auto'>
                        <thead>
                        <tr>
                            <th className='px-4 py-2'>ID</th>
                            <th className='px-4 py-2'>DATE</th>
                            <th className='px-4 py-2'> TOTAL</th>
                            <th className='px-4 py-2'>PAID</th>
                            <th className='px-4 py-2'>DELIVERED</th>
                            <th className='px-4 py-2'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                            <td className='px-4 py-2'>{order._id}</td>
                            <td className='px-4 py-2'>{order.createdAt.substring(0, 10)}</td>
                            <td className='px-4 py-2'>{order.totalPrice}</td>
                            <td className='px-4 py-2'>
                                {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                                ) : (
                                <i className='mx-auto fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td className='px-4 py-2'>
                                {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                                ) : (
                                <i className='mx-auto fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td className='px-4 py-2'>
                                <Link to={`/order/${order._id}`}>
                                <button className='btn' variant='light'>
                                    Details
                                </button>
                                </Link>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            )}
            </div>
        </div>
        </>
    )
}

export default ProfileScreen
