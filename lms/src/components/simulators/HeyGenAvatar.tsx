"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, PhoneOff, Play, Loader2, Video } from "lucide-react";
import { LiveAvatarSession, SessionEvent } from "@heygen/liveavatar-web-sdk";

export function HeyGenAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionObj, setSessionObj] = useState<LiveAvatarSession | null>(null);
  const [textInput, setTextInput] = useState("");
  
  // Video ref for rendering LiveAvatar WebRTC
  const mediaStreamRef = useRef<HTMLVideoElement>(null);

  async function startSession() {
    setIsLoading(true);
    try {
      // 1. Build Token Session
      const response = await fetch("/api/heygen-token", { method: "POST" });
      const data = await response.json();
      
      const token = data.data?.token || data.token;
      
      if (!token) {
        throw new Error("Impossible de générer le Token API. Avez-vous créé un avatar_id ?");
      }

      // 2. Initialize Real LiveAvatar
      const session = new LiveAvatarSession(token, { voiceChat: false });

      // 3. Attach standard streaming events
      session.on(SessionEvent.SESSION_STREAM_READY, () => {
         console.log("Flux vidéo reçu depuis LiveAvatar !");
         if (mediaStreamRef.current) {
            session.attach(mediaStreamRef.current);
            mediaStreamRef.current.play().catch(console.error);
         }
      });
      
      session.on(SessionEvent.SESSION_DISCONNECTED, () => {
         console.log("Flux coupé ou terminé.");
         setSessionActive(false);
         setSessionObj(null);
      });

      // 4. Start Live session
      await session.start();
      setSessionObj(session);
      setSessionActive(true);
      
    } catch (error) {
      console.error("Erreur lancement HeyGen LiveAvatar :", error);
      alert("Impossible de démarrer l'avatar : " + error);
    } finally {
      setIsLoading(false);
    }
  }

  async function endSession() {
    if (sessionObj) {
        await sessionObj.stop().catch(console.error);
        setSessionObj(null);
    }
    setSessionActive(false);
  }

  async function speakText() {
    if (!textInput.trim() || !sessionObj) return;
    
    // We utilize the "repeat" method which simulates the avatar speaking the literal text
    // The previous v1 SDK was "speak", now it's "repeat" to echo the user text 
    try {
      sessionObj.repeat(textInput);
    } catch (e) {
      console.error("L'avatar n'a pas pu parler :", e);
    }
    setTextInput("");
  }

  useEffect(() => {
    return () => {
      if (sessionObj) sessionObj.stop().catch(() => {});
    };
  }, [sessionObj]);

  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl relative overflow-hidden">
      {!sessionActive && (
        <div className="absolute inset-0 bg-[#1a3a5c]/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 text-center rounded-3xl">
          <Video className="w-16 h-16 text-white mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">LiveAvatar Streaming API</h2>
          <p className="text-[#c9a227] font-medium max-w-sm">Prêt à utiliser Sarah Benali via HeyGen. <br/>Vos clés LIVE sont connectées.</p>
          <button
            onClick={startSession}
            disabled={isLoading}
            className="mt-8 flex items-center justify-center gap-3 rounded-full bg-[#c9a227] px-8 py-4 font-bold text-[#1a3a5c] hover:scale-105 shadow-xl transition-all text-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? <Loader2 className="animate-spin text-[#1a3a5c]" /> : <Play className="text-[#1a3a5c]" />}
            Se Connecter au Studio Live
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 max-w-3xl mx-auto rounded-2xl overflow-hidden bg-black aspect-video relative flex items-center justify-center shadow-inner">
          <video
            ref={mediaStreamRef}
            autoPlay
            playsInline
            muted={false} // Important: Audio WebRTC
            className="w-full h-full object-cover"
          />
          {sessionActive && !mediaStreamRef.current?.srcObject && (
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-white">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="font-semibold tracking-wider text-sm">Chargement du flux WebRTC LiveAvatar...</p>
            </div>
          )}
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20">
            <button
              onClick={endSession}
              disabled={!sessionActive}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 hover:bg-red-500 shadow-xl text-white transition-transform hover:scale-110 active:scale-95"
            >
              <PhoneOff size={20} />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 flex-1 relative flex flex-col justify-between overflow-hidden">
            <div>
              <h3 className="font-bold text-[#1a3a5c] flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${sessionActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                Contrôle Avatar
              </h3>
              <p className="text-[13px] text-zinc-600 mb-4">Faites répéter un texte à l'Avatar par WebRTC :</p>
              <div className="space-y-3">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Tapez le script exact ici..."
                  className="w-full p-4 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a227] min-h-[120px] resize-none"
                />
              </div>
            </div>
            
            <button
              onClick={speakText}
              disabled={!sessionActive || !textInput.trim()}
              className="flex items-center justify-center mt-4 gap-2 w-full px-6 py-4 bg-[#1a3a5c] text-white tracking-wide font-bold rounded-xl shadow-md hover:bg-[#c9a227] hover:text-[#1a3a5c] transition-all disabled:opacity-50"
            >
              Lui faire dire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
