const LoadingBox = ({ message } : { message : string }) => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center bg-gray-100 gap-6">
            <div className="flex justify-center items-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-transparent border-gray-300"/>
            </div>
            <p>{message}</p>
        </div>
    )
}

export default LoadingBox