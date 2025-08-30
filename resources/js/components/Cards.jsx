export function Card({ children, className = '' }) {
    return (
        <div className={`bg-white border border-stone-200 shadow-sm ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }) {
    return (
        <div className={`bg-stone-800 p-6 ${className}`}>
            {children}
        </div>
    );
}

export function CardBody({ children, className = '' }) {
    return (
        <div className={`p-8 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '' }) {
    return (
        <h3 className={`text-lg font-light text-stone-100 ${className}`}>
            {children}
        </h3>
    );
}

export function ItemCard({ item, formatPrice, onViewDetails }) {
    return (
        <Card className="hover:shadow-md transition-shadow duration-300">
            <div className="h-48 bg-stone-100 border-b border-stone-200 flex items-center justify-center">
                <span className="text-4xl text-stone-400">📦</span>
            </div>
            
            <CardBody className="p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-light text-stone-800 mb-2 line-clamp-2">
                        {item.name}
                    </h3>
                    <span className="bg-amber-100 text-amber-800 text-xs font-light px-3 py-1 border border-amber-200">
                        {item.category?.name || 'General'}
                    </span>
                </div>

                <p className="text-stone-600 text-sm mb-4 leading-relaxed font-light line-clamp-2">
                    {item.description}
                </p>

                <div className="mb-4">
                    <div className="text-xl font-light text-amber-800 mb-1">
                        {formatPrice(item.price)}
                    </div>
                    <div className="text-xs text-stone-500 font-light">
                        {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-stone-600 mb-4 border-t border-stone-200 pt-4">
                    <span className="font-light">{item.user?.name || 'Anonymous'}</span>
                    <span className="bg-stone-100 px-2 py-1 font-light text-xs">
                        {item.condition?.charAt(0).toUpperCase() + item.condition?.slice(1)}
                    </span>
                </div>

                <button
                    onClick={() => onViewDetails(item.id)}
                    className="w-full bg-stone-800 text-stone-100 py-2 hover:bg-stone-900 font-light transition-all duration-300 text-center text-sm"
                >
                    View Details
                </button>
            </CardBody>
        </Card>
    );
}
