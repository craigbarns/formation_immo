'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Mic, AlertCircle } from 'lucide-react';

// Liste des audios existants dans public/audio/
const AUDIOS = [
  { file: '01-loi-alur-2026.mp3', title: 'Loi ALUR 2026', module: 'Juridique' },
  { file: '01-conduire-visite-pro.mp3', title: 'Conduire une visite pro', module: 'Terrain' },
  { file: '01-estimation-immobiliere.mp3', title: 'Estimation immobilière', module: 'Transaction' },
  { file: '01-photos-immobilieres-secrets-pros.mp3', title: 'Photos immobilières', module: 'Marketing' },
  { file: '02-compromis-vente.mp3', title: 'Compromis de vente', module: 'Juridique' },
  { file: '02-prospection-scripts.mp3', title: 'Prospection scripts', module: 'Marketing' },
  { file: '02-argumentaire-convertit.mp3', title: 'Argumentaire', module: 'Transaction' },
  { file: '02-rediger-annonces-qui-vendent.mp3', title: 'Rédiger annonces', module: 'Marketing' },
  { file: '03-diagnostics-immobiliers.mp3', title: 'Diagnostics immobiliers', module: 'Juridique' },
  { file: '03-negociation-mandat.mp3', title: 'Négociation mandat', module: 'Transaction' },
  { file: '03-techniques-closing-avancees.mp3', title: 'Closing avancé', module: 'Terrain' },
  { file: '03-maitriser-seloger-leboncoin.mp3', title: 'SeLoger & Leboncoin', module: 'Marketing' },
  { file: '04-mandats-strategie.mp3', title: 'Stratégie mandats', module: 'Transaction' },
  { file: '04-promesse-acte-authentique.mp3', title: 'Promesse & Acte', module: 'Juridique' },
  { file: '04-techniques-negociation-avancees.mp3', title: 'Négociation avancée', module: 'Terrain' },
  { file: '04-reseaux-sociaux-strategie-2026.mp3', title: 'Réseaux sociaux', module: 'Marketing' },
  { file: '05-copropriete-location.mp3', title: 'Copropriété', module: 'Juridique' },
  { file: '05-crm-fidelisation.mp3', title: 'CRM & Fidélisation', module: 'Marketing' },
  { file: '05-fidelisation-recommandation.mp3', title: 'Recommandation', module: 'Marketing' },
  { file: '05-seo-immobilier-google.mp3', title: 'SEO Google', module: 'Marketing' },
  { file: '06-parcours-interactif-transparence.mp3', title: 'Parcours interactif', module: 'Global' },
];

// Photo professionnelle
const AVATAR_URL = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=face';

export default function AvatarAudioPage() {
  const [selectedAudio, setSelectedAudio] = useState(AUDIOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioPath = `/audio/${selectedAudio.file}`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setError('Erreur de lecture audio');

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [selectedAudio]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          setError('Impossible de lire l\'audio');
        });
        setIsPlaying(true);
        setError(null);
      }
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎬 Avatar avec <span className="text-gold-400">Audios Existants</span>
          </h1>
          <p className="text-white/60">
            {AUDIOS.length} leçons audio prêtes à être synchronisées avec l&apos;avatar
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-200">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Liste des audios */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2 sticky top-0 bg-navy-900/80 backdrop-blur py-2">
              <Mic className="w-5 h-5 text-gold-400" />
              {AUDIOS.length} Leçons audio
            </h2>
            
            {AUDIOS.map((audio) => {
              const isActive = selectedAudio.file === audio.file;
              
              return (
                <button
                  key={audio.file}
                  onClick={() => {
                    setSelectedAudio(audio);
                    setIsPlaying(false);
                    setCurrentTime(0);
                    setError(null);
                  }}
                  className={`
                    w-full p-3 rounded-xl text-left transition-all text-sm
                    ${isActive 
                      ? 'bg-gold-400/20 border-2 border-gold-400' 
                      : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }
                  `}
                >
                  <div className="font-medium text-white">{audio.title}</div>
                  <div className="text-xs text-white/50 mt-1">{audio.module}</div>
                </button>
              );
            })}
          </div>

          {/* Zone principale - Avatar + Lecteur */}
          <div className="lg:col-span-2 space-y-6">
            {/* Avatar Card */}
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
              {/* Image Avatar */}
              <div className="relative aspect-video bg-gradient-to-br from-navy-700 to-navy-800">
                <img
                  src={AVATAR_URL}
                  alt="Marie"
                  className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />

                {/* Badge module */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold-400/20 text-gold-400 rounded-full text-sm font-medium border border-gold-400/30">
                    {selectedAudio.module}
                  </span>
                </div>

                {/* Indicateur parole */}
                {isPlaying && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur rounded-full px-3 py-2">
                    <div className="flex items-center gap-0.5">
                      <div className="w-1 h-3 bg-gold-400 rounded-full animate-pulse" />
                      <div className="w-1 h-5 bg-gold-400 rounded-full animate-pulse delay-75" />
                      <div className="w-1 h-4 bg-gold-400 rounded-full animate-pulse delay-150" />
                    </div>
                    <span className="text-white text-xs">Parle...</span>
                  </div>
                )}

                {/* Bouton play overlay */}
                <button
                  onClick={togglePlay}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gold-400 hover:bg-gold-500 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-navy-900" />
                  ) : (
                    <Play className="w-8 h-8 text-navy-900 ml-1" />
                  )}
                </button>
              </div>

              {/* Contrôles */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{selectedAudio.title}</h3>
                    <p className="text-white/50 text-sm">Formateur: Marie • Audio existant</p>
                  </div>
                  <Volume2 className="w-5 h-5 text-white/40" />
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-3">
                  <span className="text-white/50 text-sm font-mono w-12 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold-400 transition-all"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-white/50 text-sm font-mono w-12">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Audio caché */}
                <audio
                  ref={audioRef}
                  src={audioPath}
                  className="hidden"
                  preload="metadata"
                />
              </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold-400">{AUDIOS.length}</div>
                <div className="text-white/50 text-sm">Leçons</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold-400">~{Math.floor(duration / 60) || '?'}m</div>
                <div className="text-white/50 text-sm">Durée</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold-400">5</div>
                <div className="text-white/50 text-sm">Modules</div>
              </div>
            </div>

            {/* Next steps */}
            <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <h3 className="text-amber-400 font-medium mb-2">💡 Pour synchroniser avec D-ID</h3>
              <p className="text-amber-200/70 text-sm mb-3">
                Ces audios peuvent être synchronisés avec une photo pour créer un avatar parlant.
              </p>
              <code className="block bg-amber-950/50 px-3 py-2 rounded text-xs text-amber-300">
                node scripts/simple/did-generate.mjs --audio public/audio/{selectedAudio.file} --image marie.jpg
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
