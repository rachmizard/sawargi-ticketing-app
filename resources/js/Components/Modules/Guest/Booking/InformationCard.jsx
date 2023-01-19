export default function BookingInformationCard({ icon, title, subtitle }) {
    return (
        <div className="flex items-start gap-1">
            <div className="flex-shrink-0">{icon}</div>
            <div className="max-w-xs">
                {title && (
                    <h2 className="text-md text-gray-500 ml-2">{title}</h2>
                )}
                {subtitle && (
                    <p className="text-sm truncate text-justify text-gray-400">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
