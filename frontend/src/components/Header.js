import {ShoppingCart, User } from 'react-feather'

const Header = () => {
    return (

        <header className="text-gray-500 bg-gray-900 body-font ">
            <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
                <a className="flex items-center mb-4 font-medium text-white title-font md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 p-2 text-white bg-orange-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl uppercase">ProShop</span>
                </a>
                <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
                    <a className="inline-block w-full mr-5 hover:text-white"><ShoppingCart className='inline-block w-5 h-5 mr-2'/>Cart</a>
                </nav>
                <button className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-800 border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-0">
                    <User className='w-5 h-5 mr-2'/>
                    Sign In
                </button>
            </div>
        </header>


    )
}

export default Header
