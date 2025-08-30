export function PrimaryButton({ children, className = '', disabled = false, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`bg-stone-800 text-stone-100 px-6 py-3 hover:bg-stone-900 font-light transition-all duration-300 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
        >
            {children}
        </button>
    );
}

export function SecondaryButton({ children, className = '', disabled = false, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`border border-stone-400 text-stone-700 px-6 py-3 hover:bg-stone-100 font-light transition-all duration-300 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
        >
            {children}
        </button>
    );
}

export function AmberButton({ children, className = '', disabled = false, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`bg-amber-700 text-stone-100 px-6 py-3 hover:bg-amber-800 font-light transition-all duration-300 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
        >
            {children}
        </button>
    );
}

export function DangerButton({ children, className = '', disabled = false, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`bg-red-600 text-white px-6 py-3 hover:bg-red-700 font-light transition-all duration-300 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ${className}`}
        >
            {children}
        </button>
    );
}
