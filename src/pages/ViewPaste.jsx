import api from "../api/axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [remainingViews, setRemainingViews] = useState(null);
  const [canView, setCanView] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    setLoading(true);

    api
      .get(`/api/pastes/check/${id}`)
      .then((res) => {
        setCanView(res.data.canView);
        setRemainingViews(res.data.remainingViews);

        if (res.data.canView) {
          return api.get(`/api/pastes/${id}`);
        } else {
          setContent("🚫 Paste has expired or reached max views");
        }
      })
      .then((res) => {
        if (res?.data?.content) {
          setContent(res.data.content);
        }
      })
      .catch(() => setContent("❌ Paste not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("Copied to clipboard ✅");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading paste...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl border border-gray-200 p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-700">Your Paste</h1>

          {canView && remainingViews !== null && (
            <span className="text-sm text-gray-500">
              Views left: <b>{remainingViews}</b>
            </span>
          )}
        </div>

        {/* Content */}
        {canView ? (
          <>
            <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-words mb-4">
              {content}
            </pre>

            <div className="flex justify-end">
              <button
                onClick={handleCopy}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded shadow"
              >
                Copy
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-center font-medium">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}
