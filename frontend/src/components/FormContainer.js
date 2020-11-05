import React from 'react'

const FormContainer = ({children}) => {
    return (
        <div className='container flex flex-col items-center justify-center h-full my-auto'>
            {children}
        </div>
    )
}

export default FormContainer
