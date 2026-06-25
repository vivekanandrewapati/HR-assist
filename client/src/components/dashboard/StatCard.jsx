
export default function StatCard({
    title,
    value,
}) {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">
                {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {value}
            </h2>
        </div>
    );
}