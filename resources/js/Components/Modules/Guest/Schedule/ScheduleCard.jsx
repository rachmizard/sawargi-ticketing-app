import Button from "@/Components/Button";
import { TicketIcon } from "@heroicons/react/24/outline";

export default function ScheduleCard() {
    return (
        <div className="bg-white shadow-md rounded-md">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                            <TicketIcon width={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                08:00 AM
                            </span>
                            <span className="text-xs font-medium text-gray-400">
                                Tebet - Pasteur
                            </span>

                            <span className="text-xs font-medium text-gray-400">
                                Tersedia 3 kursi
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-gray-600">
                            Rp. 50.000
                        </span>

                        <Button size="sm" variant="outline" colorScheme="blue">
                            Pesan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
