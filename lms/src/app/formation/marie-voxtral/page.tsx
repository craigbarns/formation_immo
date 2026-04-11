'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Play, Pause, AlertCircle, Loader2 } from 'lucide-react';

const SCRIPTS = {
  intro: "Bonjour, je suis Marie votre coach immobilier. Bienvenue dans cette formation de 42 heures conforme à la réglementation ALUR.",
  mandat: "Le mandat de vente est le document fondamental qui autorise l'agent immobilier à représenter le propriétaire.",
  estimation: "Pour estimer un bien immobilier, nous analysons les comparables récents, la localisation et les tendances du marché.",
  compromis: "Le compromis de vente engage définitivement les parties et respecte un délai de rétractation de dix jours.",
} as const;

type ScriptKey = keyof typeof SCRIPTS;

export default function MarieVoxtral() {
  const [selectedScript, setSelectedScript] = useState<ScriptKey>('intro');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const script = SCRIPTS[selectedScript];

  const generateVoice = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
      if (!apiKey) throw new Error('Clé API Mistral manquante');

      const response = await fetch('https://api.mistral.ai/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'voxtral',
          text: script,
        }),
      });

      if (!response.ok) throw new Error(`Erreur ${response.status}`);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      if (audioRef.current) {
        audioRef.current.src = url;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err: any) {
      setError(err.message);
      speakNative();
    } finally {
      setIsLoading(false);
    }
  };

  const speakNative = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(script);
    u.lang = 'fr-FR';
    u.onstart = () => setIsPlaying(true);
    u.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(u);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      audioUrl ? audioRef.current?.play() : generateVoice();
    }
  };

  useEffect(() => {
    setAudioUrl(null);
    setIsPlaying(false);
    setError(null);
  }, [selectedScript]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">🎙️ Marie avec Voxtral</h1>
        <p className="text-white/60 mb-8">Synthèse vocale Mistral AI</p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 inline mr-2" />
            <span className="text-red-200">{error}</span>
            <code className="block mt-2 bg-red-950/50 px-2 py-1 rounded text-xs text-red-200/70">
              NEXT_PUBLIC_MISTRAL_API_KEY=votre_clé
            </code>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          {(Object.keys(SCRIPTS) as ScriptKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedScript(key)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedScript === key
                  ? 'bg-gold-400/20 border-2 border-gold-400'
                  : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
              }`}
            >
              <span className="text-white font-medium capitalize">{key}</span>
            </button>
          ))}
        </div>

        <div className="bg-white/5 rounded-2xl p-8 text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-amber-500 flex items-center justify-center">
            <span className="text-4xl">👩‍🏫</span>
          </div>
          <h2 className="text-xl font-semibold text-white">Marie</h2>
        </div>

        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <p className="text-white/90 text-lg">{script}</p>
        </div>

        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-full py-4 bg-gold-400 hover:bg-gold-500 disabled:opacity-50 text-navy-900 font-semibold rounded-xl flex items-center justify-center gap-3"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 
           isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {isLoading ? 'Génération...' : isPlaying ? 'Pause' : audioUrl ? 'Reprendre' : 'Générer la voix'}
        </button>

        <audio ref={audioRef} className="hidden" onEnded={() => setIsPlaying(false)} />
      </div>
    </div>
  );
}
