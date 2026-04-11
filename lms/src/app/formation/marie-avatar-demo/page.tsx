'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, BookOpen, Home, DollarSign, TrendingUp, MapPin, Award, Play, Pause, AlertCircle, Loader2 } from 'lucide-react';

const MODULES = [
  { id: 'welcome', name: 'Introduction', icon: Award, color: '#c9a227' },
  { id: 'juridique', name: 'Juridique', icon: BookOpen, color: '#3b82f6' },
  { id: 'transaction', name: 'Transaction', icon: Home, color: '#22c55e' },
  { id: 'financement', name: 'Financement', icon: DollarSign, color: '#8b5cf6' },
  { id: 'marketing', name: 'Marketing', icon: TrendingUp, color: '#f59e0b' },
  { id: 'terrain', name: 'Terrain', icon: MapPin, color: '#ef4444' },
];

// Scripts pour chaque module
const SCRIPTS: Record<string, string> = {
  welcome: "Bonjour et bienvenue dans votre formation immobilière de 42 heures. Je suis Marie, votre coach pédagogique. Ensemble, nous allons explorer tous les aspects essentiels du métier d'agent immobilier, du juridique à la transaction, en passant par le financement et le marketing. Cette formation est conforme à la réglementation ALUR et vous préparera efficacement à votre examen. Commençons dès maintenant !",
  
  juridique: "Bienvenue dans le module juridique. Ici, nous allons découvrir les fondamentaux légaux qui encadrent notre profession. Le mandat de vente, le compromis, les diagnostics obligatoires, la copropriété. Tous ces concepts seront désormais clairs pour vous. Je vous accompagne pas à pas.",
  
  transaction: "Dans ce module transaction, nous allons passer à la pratique. Comment estimer un bien ? Comment rédiger une annonce percutante ? Comment négocier avec un acheteur ? Comment mener une visite efficace ? Je vais vous révéler toutes les techniques des meilleurs agents immobiliers.",
  
  financement: "Le financement immobilier est souvent le point de blocage des transactions. Pas d'inquiétude ! Dans ce module, nous allons maîtriser les concepts de taux d'endettement, les différents types de prêts, les dispositifs fiscaux comme le Pinel ou le PTZ. Vous pourrez ainsi conseiller vos clients avec expertise.",
  
  marketing: "Le marketing immobilier, c'est l'art de faire venir les clients à vous. Sites d'annonces, réseaux sociaux, prospection, farming. Nous allons créer ensemble votre stratégie digitale pour dépasser la concurrence et développer votre portefeuille.",
  
  terrain: "Dernière ligne droite avec le module terrain ! Ici, nous mettons en pratique tout ce que vous avez appris. Visites, négociations, signatures, fidélisation. Vous êtes maintenant prêt à exercer avec professionnalisme et confiance. Allons-y !"
};

// Photos professionnelles réalistes
const AVATAR_IMAGES = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&h=600&fit=crop&crop=face',
];

export default function MarieAvatarDemo() {
  const [selectedModule, setSelectedModule] = useState(MODULES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const script = SCRIPTS[selectedModule.id];
  const words = script.split(/\s+/);
  const avatarUrl = AVATAR_IMAGES[0];

  // Générer la voix avec ElevenLabs
  const generateVoice = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Vérifier si on a une clé ElevenLabs
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
      
      if (!apiKey) {
        // Mode démo : utiliser l'API native du navigateur
        speakWithNativeVoice();
        setIsLoading(false);
        return;
      }

      // Appel API ElevenLabs
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: script,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur API ElevenLabs');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      // Jouer automatiquement
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error(err);
      setError('Clé ElevenLabs manquante. Utilisation de la voix système.');
      speakWithNativeVoice();
    } finally {
      setIsLoading(false);
    }
  };

  // Voix native du navigateur (fallback)
  const speakWithNativeVoice = () => {
    if (!window.speechSynthesis) {
      setError('Votre navigateur ne supporte pas la synthèse vocale');
      return;
    }

    // Annuler toute lecture en cours
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Essayer de trouver une bonne voix française
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find(v => v.lang.includes('FR') || v.lang.includes('fr'));
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentWord(0);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentWord(0);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const textUpToIndex = script.slice(0, charIndex);
        const wordIndex = textUpToIndex.split(/\s+/).length - 1;
        setCurrentWord(Math.max(0, Math.min(wordIndex, words.length - 1)));
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  // Arrêter la lecture
  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentWord(0);
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      generateVoice();
    }
  };

  // Charger les voix au démarrage
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  // Arrêter si on change de module
  useEffect(() => {
    stopSpeaking();
    setAudioUrl(null);
    setError(null);
  }, [selectedModule]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            👩‍🏫 Avatar <span className="text-gold-400">Marie</span>
          </h1>
          <p className="text-white/60">
            Assistante pédagogique avec voix réaliste
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-200 text-sm">{error}</p>
              <p className="text-amber-200/70 text-xs mt-1">
                💡 Pour une voix humaine réaliste, ajoutez votre clé ElevenLabs dans .env.local :
                <code className="block mt-1 bg-amber-950/50 px-2 py-1 rounded">NEXT_PUBLIC_ELEVENLABS_API_KEY=votre_clé</code>
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-3">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5 text-gold-400" />
              Modules de formation
            </h2>
            
            {MODULES.map((module) => {
              const Icon = module.icon;
              const isActive = selectedModule.id === module.id;
              
              return (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`
                    w-full p-4 rounded-xl flex items-center gap-3 transition-all
                    ${isActive 
                      ? 'bg-gold-400/20 border-2 border-gold-400' 
                      : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }
                  `}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${module.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: module.color }} />
                  </div>
                  <span className={`font-medium ${isActive ? 'text-gold-400' : 'text-white'}`}>
                    {module.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Zone principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Avatar Card */}
            <div className="bg-navy-800/50 rounded-2xl overflow-hidden border border-white/10">
              {/* Photo */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-navy-700 to-navy-800">
                <img
                  src={avatarUrl}
                  alt="Marie - Coach immobilier"
                  className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                  crossOrigin="anonymous"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />

                {/* Badge module */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${selectedModule.color}30`,
                      color: selectedModule.color,
                      border: `1px solid ${selectedModule.color}50`
                    }}
                  >
                    {selectedModule.name}
                  </span>
                </div>

                {/* Indicateur de parole */}
                {isPlaying && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur rounded-full px-3 py-2">
                    <div className="flex items-center gap-0.5">
                      <div className="w-1 h-3 bg-gold-400 rounded-full animate-pulse" />
                      <div className="w-1 h-5 bg-gold-400 rounded-full animate-pulse delay-75" />
                      <div className="w-1 h-4 bg-gold-400 rounded-full animate-pulse delay-150" />
                    </div>
                    <span className="text-white text-xs font-medium">Marie parle...</span>
                  </div>
                )}

                {/* Bouton play central */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gold-400 hover:bg-gold-500 rounded-full flex items-center justify-center shadow-2xl shadow-gold-400/30 transition-all hover:scale-110"
                  >
                    {isLoading ? (
                      <Loader2 className="w-8 h-8 text-navy-900 animate-spin" />
                    ) : (
                      <Play className="w-8 h-8 text-navy-900 ml-1" />
                    )}
                  </button>
                )}
              </div>

              {/* Contrôles */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">Marie Dupont</h3>
                    <p className="text-white/50 text-sm">Coach pédagogique ALUR</p>
                  </div>

                  <button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className={`
                      px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all
                      ${isPlaying 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gold-400 hover:bg-gold-500 text-navy-900'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Génération...
                      </>
                    ) : isPlaying ? (
                      <>
                        <Pause className="w-5 h-5" />
                        Arrêter
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Écouter
                      </>
                    )}
                  </button>
                </div>

                {/* Audio caché pour ElevenLabs */}
                <audio
                  ref={audioRef}
                  className="hidden"
                  onEnded={() => setIsPlaying(false)}
                  onError={() => {
                    setError('Erreur lecture audio');
                    setIsPlaying(false);
                  }}
                />
              </div>
            </div>

            {/* Transcription */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Mic className="w-5 h-5 text-gold-400" />
                Transcription
              </h3>
              <p className="text-lg leading-relaxed">
                {words.map((word, i) => (
                  <span 
                    key={i}
                    className={`transition-all duration-200 ${
                      i === currentWord 
                        ? 'text-gold-400 font-semibold bg-gold-400/20 px-1.5 py-0.5 rounded' 
                        : 'text-white/80'
                    }`}
                  >
                    {word}{' '}
                  </span>
                ))}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold-400">{words.length}</div>
                <div className="text-white/50 text-sm">Mots</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold-400">~{Math.ceil(words.length / 2)}s</div>
                <div className="text-white/50 text-sm">Durée</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold-400">FR</div>
                <div className="text-white/50 text-sm">Langue</div>
              </div>
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold-400">ALUR</div>
                <div className="text-white/50 text-sm">Certifié</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
