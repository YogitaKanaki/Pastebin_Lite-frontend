import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState(""); 
  const navigate = useNavigate(); 
  const submit = async () => {
  try {
    const res = await api.post("/api/pastes", {
      content,
      ttl_seconds: ttl ? Number(ttl) : null,
      max_views: views ? Number(views) : null
    });

    const pasteId = res.data.id;
    //navigate(`/p/${pasteId}`);
    setUrl(`${window.location.origin}/p/${pasteId}`);
    // navigate after 2 seconds
    setTimeout(() => {
      navigate(`/p/${pasteId}`);
    }, 2000); // 2000 ms = 2 seconds
  } catch (err) {
    console.error(err);
    alert(err?.response?.data?.error || "Failed to create paste");
    console.log("API BASE:", process.env.REACT_APP_API_BASE_URL);
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-[686px]">
        <h1 className="text-xl font-bold mb-4">Create Paste</h1>

        <textarea
          className="w-full border p-2 mb-2"
          rows="5"
          placeholder="Paste your content here..."
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2"
          placeholder="TTL (seconds)"
          onChange={(e) => setTtl(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2"
          placeholder="Max Views"
          onChange={(e) => setViews(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          onClick={submit}
        >
          Create
        </button>

        {url && (
          <p className="mt-3 text-sm break-all">
            Share:{" "}
            <a
              className="text-blue-500 underline"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {url}
            </a>
          </p>
          
        )}
      </div>
    </div>
  );
}
