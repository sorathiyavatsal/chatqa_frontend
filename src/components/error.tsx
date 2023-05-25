export default function Error(message: any) {
    return (
        <label htmlFor="error" className="text-red-500 text-sm">{message.message}</label>
    )
}