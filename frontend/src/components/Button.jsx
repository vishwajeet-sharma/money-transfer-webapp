export const Button = ({label, onClick}) => {
    return <div className="pt-4">
        <button onClick={onClick} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 w-full">
            {label}
        </button>
    </div>
    
}
