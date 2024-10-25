export const Balance = ({value}) => {
    return <div className="flex items-center">
        <div className="font-bold pt-4 pl-6">
            Your Balance: 
        </div>
        <div className="font-semibold pl-2 pt-4">
            ₹ {value}
        </div>
    </div>
}
