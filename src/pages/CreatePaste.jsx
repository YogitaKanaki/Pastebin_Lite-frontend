import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      if (!content.trim()) {
        alert("Content cannot be empty");
        return;
      }

      const res = await api.post("/api/pastes", {
        content,
        ttl_seconds: ttl ? Number(ttl) : null,
        max_views: views ? Number(views) : null
      });

      // Redirect to shareable URL (/p/:id)
      navigate(`/p/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Failed to create paste");
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2"
          placeholder="TTL (seconds)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-2"
          placeholder="Max Views"
          value={views}
          onChange={(e) => setViews(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          onClick={submit}
        >
          Create
        </button>
      </div>
    </div>
  );
}
