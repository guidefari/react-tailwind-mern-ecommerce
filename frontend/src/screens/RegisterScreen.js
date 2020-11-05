import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'

const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const {loading, error, userInfo} = userRegister
    
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
            <form onSubmit={submitHandler} className="px-12 pt-6 pb-8 mb-4 bg-white rounded shadow-lg">
                <h1 className="flex justify-center py-2 mb-4 text-2xl text-gray-800 border-b-2">
                    Sign Up
                </h1>
                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}
                {loading && <Loader></Loader>}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-normal text-gray-700" for="email">Name</label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="name"
                        type="text"
                        required
                        autofocus
                        placeholder="Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-normal text-gray-700" for="email">Email</label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        name="email"
                        type="email"
                        required
                        autofocus
                        placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-normal text-gray-700" for="password">Password</label>
                    <input
                        className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        autocomplete="current-password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-normal text-gray-700" for="confirmPassword">Confirm Password</label>
                    <input
                        className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        autocomplete="current-password"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                <button className="inline-block px-4 py-2 text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600 focus:bg-blue-700" type="submit">
                    Register
                </button>
                <Link
                    className="inline-block text-sm font-normal text-blue-500 align-baseline hover:text-blue-800"
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
                >
                    Have an account? Login
                </Link>
                </div>
            </form>
            </div>
        </div>
        </FormContainer>
    )
}

export default RegisterScreen

            // <h1>Sign in</h1>
            // <form classNameName='block' >
            //     <label htmlFor="email">Email address</label>
            //     <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            //     <label htmlFor="password">password</label>
            //     <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            //     <button>sign in</button>
            // </form>
            // <div>
            //     <p>New Customer?{' '}<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></p>
            // </div>