import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from '../Utils/api.js';
import { Link, useNavigate } from "react-router-dom";

export default function CreateNote() { 
  const [title, settitle] = useState("");
  const [content, setContent] = useState("");
  const [loading ,setloading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()) {
      toast.error("Please fill both the Fields")
      return;
    }
    setloading(true);
    try {
      await api.post('/notes', { title, content });
      toast.success("Added Note Successfully");
      navigate("/");
    } catch (e) {
      toast.error("Failed to Add Note");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to={'/'} className="btn btn-ghost mb-6 rounded-3xl">
          <ArrowLeftIcon/> Back to Notes
        </Link>
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label-text">Title</label>
                <input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Enter the title of the note" className="input input-bordered" />
              </div>
              <div className="form-control mb-4">
                <label className="label-text">Content</label>
                <textarea type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter the content of the note" className="textarea textarea-bordered h-32" />
              </div>
              <div className="card-actions justify-end">
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? "Creating..." : "Add Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}