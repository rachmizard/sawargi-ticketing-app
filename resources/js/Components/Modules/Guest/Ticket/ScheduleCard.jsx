export default function ScheduleCard() {
    return (
        <div className="bg-white shadow-sm rounded-md">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full" />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                08:00 AM
                            </span>
                            <span className="text-xs font-medium text-gray-400">
                                Tebet - Pasteur
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
