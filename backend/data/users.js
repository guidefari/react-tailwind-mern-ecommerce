import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@goosebumps.co.zw',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Jon Bro',
        email: 'jon@@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Bon Jro',
        email: 'bon@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users