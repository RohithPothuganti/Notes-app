import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../Utils/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function NoteDetail() {
  const [title, settitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setsaving] = useState(false);
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const singleFetcher = async () => {
      try {
        setloading(true);
        const response = await api.get(`/api/notes/${id}`);
        const data = response.data;
        settitle(data.title);
        setContent(data.content);
      } catch (e) {
        toast.error("Failed to fetch note details.");
      } finally {
        setloading(false);
      }
    };
    singleFetcher();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill both the Fields");
      return;
    }
    setsaving(true);
    try {
      await api.put(`/api/notes/${id}`, { title, content });
      toast.success("Edited Note Successfully");
      navigate("/");
    } catch (e) {
      toast.error("Failed to Edit Note");
    } finally {
      setsaving(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/api/notes/${id}`);
      toast.success("Note Deleted Successfully");
      navigate('/');
    } catch (e) {
      toast.error("Failed to Delete Note");
    }
  };

  return loading ? (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10" />
    </div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-ghost mb-6 rounded-3xl">
          <ArrowLeftIcon /> Back to Notes
        </Link>
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex flex-row justify-between">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <button onClick={handleDelete} className="btn btn-error btn-outline">
                <Trash2Icon className="size-6" /> Delete Note
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label-text">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  placeholder="Enter the title of the note"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label-text">Content</label>
                <textarea
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter the content of the note"
                  className="textarea textarea-bordered h-32"
                />
              </div>
              <div className="card-actions justify-end">
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}