import {useEffect } from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers} from '../actions/userActions'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect (() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    }, [dispatch, history])
    
    const deleteHandler = (id) => {
        console.log('delete')
    }
    
    return (
        <>
            <h1>Users</h1>
            { loading ? <Loader/> : error ? <Message>{error}</Message> : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i>) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/user/${user._id}/edit`}>
                                        <button className='btn'><i className='fas fa-edit'></i></button>
                                    </Link>
                                    <button className='text-red-600 bg-red-300' onClick={()=> deleteHandler(user._id)}><i className='fas fa-trash'></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default UserListScreen
