export default function PageHeader({ title, children }) {
    return (
        <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {children}
        </header>
    );
}