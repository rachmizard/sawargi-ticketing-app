export default function Progressbar({ progress, max }) {
    return (
        <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
                className="h-full text-center text-white rounded-full"
                style={{
                    width: `${(progress / max) * 100}%`,
                    backgroundColor: "#3490dc",
                }}
            >
                {progress}/{max}
            </div>
        </div>
    );
}
