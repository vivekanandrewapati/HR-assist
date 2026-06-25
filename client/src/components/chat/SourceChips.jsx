export default function SourceChips({ sources = [] }) {
    if (!sources.length) return null;

    return (
        <div className="mt-3">
            <p className="mb-2 text-sm font-medium text-gray-600">
                Sources
            </p>

            <div className="flex flex-wrap gap-2">
                {sources.map((source, index) => (
                    <span
                        key={index}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                        {source}
                    </span>
                ))}
            </div>
        </div>
    );
}