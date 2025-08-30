export function FormField({ label, error, children, required = false }) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-light text-stone-700 mb-3">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            {children}
            {error && (
                <p className="mt-2 text-sm text-red-600 bg-red-50 px-4 py-2 border border-red-200">
                    {error}
                </p>
            )}
        </div>
    );
}

export function TextInput({ className = '', error = false, ...props }) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-3 border text-stone-900 bg-stone-50 focus:outline-none focus:border-amber-600 transition-all duration-300 font-light ${
                error ? 'border-red-300' : 'border-stone-300'
            } ${className}`}
        />
    );
}

export function TextArea({ className = '', error = false, rows = 4, ...props }) {
    return (
        <textarea
            {...props}
            rows={rows}
            className={`w-full px-4 py-3 border text-stone-900 bg-stone-50 focus:outline-none focus:border-amber-600 transition-all duration-300 font-light resize-none ${
                error ? 'border-red-300' : 'border-stone-300'
            } ${className}`}
        />
    );
}

export function SelectInput({ children, className = '', error = false, ...props }) {
    return (
        <select
            {...props}
            className={`w-full px-4 py-3 border text-stone-900 bg-white focus:outline-none focus:border-amber-600 transition-all duration-300 font-light ${
                error ? 'border-red-300' : 'border-stone-300'
            } ${className}`}
        >
            {children}
        </select>
    );
}

export function Checkbox({ label, className = '', ...props }) {
    return (
        <label className={`flex items-center cursor-pointer ${className}`}>
            <input
                type="checkbox"
                {...props}
                className="border border-stone-300 text-amber-600 focus:outline-none focus:border-amber-600 mr-3"
            />
            <span className="text-sm font-light text-stone-700">{label}</span>
        </label>
    );
}

export function RadioGroup({ options, name, value, onChange, className = '' }) {
    return (
        <div className={`space-y-3 ${className}`}>
            {options.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                        className="border border-stone-300 text-amber-600 focus:outline-none mr-3"
                    />
                    <span className="font-light text-stone-700">{option.label}</span>
                </label>
            ))}
        </div>
    );
}
