import { useState, useRef } from "react";
import { Pencil, Image, Mic } from "lucide-react";
import axios from "axios";

function InputBar({ addNote }) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const fileInputRef = useRef(null);
  const colorPickerRef = useRef(null);
  const recognitionRef = useRef(null);

  const handleRecordingToggle = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => setIsRecording(true);

      recognitionRef.current.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setText((prev) => prev + " " + transcript);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) recognitionRef.current.start();
        else setIsRecording(false);
      };

      recognitionRef.current.start();
    } else {
      alert("Your browser does not support voice recognition.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!text.trim() && !title.trim()) return;

  const noteData = {
    title: title || "Untitled Note",
    description: text,
    color: selectedColor,
    image,
  };

  addNote(noteData); // 👈 bas ye call kar, axios nahi
  setText("");
  setTitle("");
  setImage(null);
  setSelectedColor("#000000");
};


  return (
    <div className="sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-2">
      <div className="max-w-6xl rounded-2xl duration-300 hover:shadow-1xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border border-gray-200 rounded-xl px-2 py-1 bg-white/50"
        >
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Prompt title..."
            className="w-full bg-transparent outline-none placeholder-gray-400 px-3 py-2 text-lg font-medium border-b border-gray-200 focus:border-blue-300"
          />

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Left Icons */}
            <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => colorPickerRef.current.click()}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Pencil size={20} color={selectedColor} />
                </button>
                <input
                  type="color"
                  ref={colorPickerRef}
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="absolute left-0 top-full mt-2 w-8 h-8 cursor-pointer opacity-0"
                />
              </div>

              <div className="relative group">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <Image size={20} className="text-gray-600" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Text Input */}
            <div className="flex-1 w-full">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message or record..."
                className="w-full bg-transparent outline-none placeholder-gray-400 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-200"
                disabled={isRecording}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              <button
                type="button"
                onClick={handleRecordingToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isRecording
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Mic
                  size={20}
                  className={`transition-colors duration-300 ${
                    isRecording ? "animate-pulse text-red-500" : "text-gray-600"
                  }`}
                />
                <span className="text-sm font-medium hidden sm:inline">
                  {isRecording ? "Stop" : "Record"}
                </span>
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium text-sm"
              >
                Create  
              </button>
            </div>
          </div>
        </form>

        {/* Image Preview */}
        {image && (
          <div className="mt-4 relative group">
            <img
              src={image}
              alt="Uploaded"
              className="w-24 h-24 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputBar;
