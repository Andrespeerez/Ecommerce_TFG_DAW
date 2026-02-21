export default function Modal({ children, closeModal, type = '', modalStyle = '' }) {
    const types = {
        login: 'flex items-center justify-center mt-20', // mt-20 is the height of Header
        menu: 'flex items-start justify-start mt-20',
        cart: 'flex items-start justify-end mt-20'
    }

    return (
        <div 
            className={`fixed z-50 inset-0 bg-black/50 ${types[type]}`}
            onClick={closeModal}
        >
            <div
                className={`relative ${modalStyle}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className='absolute right-4 top-4 text-black'
                    onClick={closeModal}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
}