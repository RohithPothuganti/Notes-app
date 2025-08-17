import React from "react";
import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../Utils/api";

export default function NoteCard({ note, setNotes }) {

  const handleDelete = async (e) => {
    e.preventDefault(); 
      try {
        const response = await api.delete(`/notes/${note._id}`);
        setNotes((cnotes) => cnotes.filter((cnote) => cnote._id !== note._id))
        toast.success("Note Deleted Successfully");
      } catch (e) {
        toast.error("Failed to Delete Note")
      } 
  }
  
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-200 hover:shadow-lg hover:shadow-base/100 transition-all duration-300 border-t-4 border-solid border-secondary"
    >
      <div className="card-body ">
        <h2 className="card-title text-base-content">{note.title}</h2>
        <p className="text-base-content/80 line-clamp-3">{note.content}</p>
        <div className="card-actions items-center justify-between mt-4">
          <span className="text-sm text-base-content/50">
            {" "}
            {new Date(note.createdAt).toLocaleString("en-us", {
              month: 'short', day: "numeric" , year: "numeric",
            })}
          </span>
          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-xs text-white" >
              <PenSquareIcon className="size-4" />
            </button>
            <button  onClick={(e) => handleDelete(e)} className="btn btn-ghost btn-xs text-error" >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
