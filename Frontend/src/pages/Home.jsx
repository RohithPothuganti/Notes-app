import { useEffect, useState } from "react";
import api from "../Utils/api.js";
import toast from "react-hot-toast";
import NoteCard from "../Components/NoteCard";
import NoNotes from "../Components/NoNotes.jsx";
import { LoaderIcon } from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/notes");
        setNotes(response.data);
      } catch (err) {
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <LoaderIcon className="animate-spin size-10" />
        </div>
      )}
      {notes.length === 0 && !loading && <NoNotes />}
      {notes.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  );
}