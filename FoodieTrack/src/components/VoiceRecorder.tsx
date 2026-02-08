import { useRef, useState, useEffect } from "react";
import { ElevenLabsClient } from "elevenlabs";
import { useNavigate } from "react-router-dom";

export default function VoiceRecorder() {
  const navigate = useNavigate();

  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  const elevenlabs = new ElevenLabsClient({
    apiKey: "sk_286b4a20715a1271d27b2cf6ab10eac6ef020af6d5085fea",
  });

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));

      try {
        const file = new File([blob], "recording.webm", { type: blob.type });

        const result = await elevenlabs.speechToText.convert({
          file,
          model_id: "scribe_v2",
        });

        setTranscript(result.text || "No transcript returned.");

        await fetch("/api/store-transcript", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript: result.text }),
        });
      } catch {
        setTranscript("Error transcribing audio.");
      }
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    setRecording(false);
  };

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcript]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Record Button */}
      <div className="mb-10">
        {!recording ? (
          <button
            onClick={startRecording}
            className="px-10 py-4 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
          >
            Start recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-10 py-4 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
          >
            Stop recording
          </button>
        )}
      </div>

      {/* Playback */}
      {audioURL && (
        <div className="mb-8">
          <audio controls src={audioURL} />
        </div>
      )}

      {/* Transcript */}
      {transcript && (
        <div
          ref={transcriptRef}
          className="w-full max-w-2xl bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-12"
        >
          <p className="text-sm font-medium text-slate-800 mb-2">
            Transcript
          </p>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {transcript}
          </p>
        </div>
      )}

      {/* Confirm Button (BOTTOM) */}
      {transcript && (
        <button
          onClick={() => navigate("/output")}
          className="px-8 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
        >
          Confirm and continue
        </button>
      )}
    </div>
  );
}
