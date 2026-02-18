export default function Checkbox({ label, className = '', ...props }) {
    const id = props.id || props.name;
    
    return (
        <div className={`flex items-center ${className}`}>
            <input
                id={props.id}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                {...props}
            />
            {label && (
                <label htmlFor={props.id} className="ml-2 text-sm text-gray-700">
                    {label}
                </label>
            )}
        </div>
    );
}