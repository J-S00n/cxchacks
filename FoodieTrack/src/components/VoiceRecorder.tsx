import { useRef, useState, useEffect } from "react";
import { ElevenLabsClient } from "elevenlabs";
import { useAuth0 } from "@auth0/auth0-react";
import { recommendationsService } from "../services/recommendations";

export default function VoiceRecorder() {
  const { user, logout } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
      if (!user) return;
  
      const key = `foodie_profile_${user.sub}`;
      const stored = localStorage.getItem(key);
  
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        setProfile(null);
      }
    }, [user]);

  // ⚠️ Frontend ElevenLabs client (intentionally kept as-is)
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

        // ✅ THIS LINE WAS MISSING — core cause of the error
        const result = await elevenlabs.speechToText.convert({
          file,
          model_id: "scribe_v2",
        });

        setTranscript(result.text || "No transcript returned.");

        // Optional backend persistence (kept from teammate)
        /*await fetch("http://localhost:8000/api/store-transcript", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcript: result.text }),
        });*/
      } catch (err) {
        console.error("Transcription error:", err);
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
  const { getAccessTokenSilently } = useAuth0();

  const analyzeData = async () => {
  try {
    if (!transcript) {
      alert("No transcript available yet.");
      return;
    }

    // Auth token
    const token = await getAccessTokenSilently();

    // Preferences from localStorage
    const stored = localStorage.getItem("geminiPreferences");

    console.log("user preferences: ", profile ? JSON.stringify(profile) : null)

    // Call backend → Gemini
    const response = await fetch("http://localhost:8000/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        transcript,
        preferences: profile ? JSON.stringify(profile) : null,
      }),
    });

    const data = await response.json();
    console.log("AI Recommendation Result:", data);

  } catch (err) {
    console.error("Failed to analyze voice data:", err);
    alert("Failed to analyze mood and recommend food.");
  }
};

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
      <h3>Voice Check-in 🎤</h3>

      {!recording ? (
        <button
          onClick={startRecording}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Stop Recording
        </button>
      )}

      {audioURL && (
        <div>
          <p>Playback:</p>
          <audio controls src={audioURL} />
        </div>
      )}

      {transcript && (
        <div style={{ marginTop: "1rem" }}>
          <p>Transcript:</p>
          <p>{transcript}</p>
        </div>
      )}
      <button onClick={(analyzeData)}>Calculate</button>
    </div>
  );
}
