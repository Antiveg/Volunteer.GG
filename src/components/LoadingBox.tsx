const LoadingBox = ({ message } : { message : string }) => {
    return (
        <div className="h-full w-full flex justify-center items-center bg-gray-100">
            <p>{message}</p>
        </div>
    )
}

export default LoadingBox