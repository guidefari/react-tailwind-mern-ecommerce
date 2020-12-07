import {useEffect } from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers, deleteUser} from '../actions/userActions'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect (() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
        // note why successDelete is a dependency here. If a user is successfully deleted, it makes sense to want the useEffect to run again.
    }, [dispatch, history, successDelete, userInfo])
    
    const deleteHandler = (id) => {
        if(window.confirm('are you sure')){
            dispatch(deleteUser(id))
        }
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
