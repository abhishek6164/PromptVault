import { useState, useRef } from "react";
import { Pencil, Image, Mic } from "lucide-react";

function InputBar({ addNote }) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default black
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);
  const colorPickerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Start/Stop Voice Recording
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

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setText((prevText) => prevText + " " + transcript);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current.start();
        } else {
          setIsRecording(false);
        }
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
    if (
      file &&
      ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)
    ) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addNote(text);
      setText("");
    }
  };

  return (
    <div className="ml-96 mr-3 rounded-xl flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl shadow-lg p-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
        >
          {/* Left icons */}
          <div className="flex gap-3">
            {/* Color Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => colorPickerRef.current.click()}
              >
                <Pencil size={20} color={selectedColor} />
              </button>
              <input
                type="color"
                ref={colorPickerRef}
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="absolute left-0 top-8 w-8 h-8 cursor-pointer opacity-0"
              />
            </div>

            {/* Image Upload */}
            <div className="relative">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
              >
                <Image size={20} />
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

          {/* Input field */}
          <div className="flex-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message or record..."
              className="w-full bg-transparent outline-none placeholder-gray-400"
              disabled={isRecording}
            />
          </div>

          {/* Recording button */}
          <button
            type="button"
            onClick={handleRecordingToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              isRecording
                ? "bg-red-50 text-red-600"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Mic
              size={20}
              className={
                isRecording ? "animate-pulse text-red-500" : "text-gray-600"
              }
            />
            <span className="text-sm font-medium">
              {isRecording ? "Stop" : "Record"}
            </span>
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            Add
          </button>
        </form>

        {/* Display uploaded image */}
        {image && (
          <div className="mt-3">
            <img
              src={image}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InputBar;
