"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COURSE } from "@/data/course";
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Search, 
  ArrowLeft, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  User,
  Zap
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface LearnerStats {
  id: string;
  full_name: string;
  xp: number;
  lessons_completed: number;
  last_activity: string;
  streak: number;
}

export default function AdminPage() {
  const [learners, setLearners] = useState<LearnerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const totalLessons = COURSE.reduce((a, m) => a + m.lessons.length, 0);
  const totalModules = COURSE.length;

  useEffect(() => {
    async function fetchLearners() {
      const supabase = createClient();
      
      // Fetch profiles joined with gamification_state
      // Note: This requires RLS policy to allow reading all profiles for 'admin' role
      // or being logged in with a service role (not possible on client).
      // For this prototype, we assume the trainer has access.
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          id,
          full_name,
          gamification_state (
            xp,
            streak,
            last_login_date
          ),
          lesson_progress (
            count
          )
        `);

      if (error) {
        console.error("Error fetching learners:", error);
        setLoading(false);
        return;
      }

      const formatted = (data || []).map((p: any) => ({
        id: p.id,
        full_name: p.full_name || "Apprenant anonyme",
        xp: p.gamification_state?.[0]?.xp || 0,
        streak: p.gamification_state?.[0]?.streak || 0,
        last_activity: p.gamification_state?.[0]?.last_login_date || "Jamais",
        lessons_completed: p.lesson_progress?.length || 0,
      }));

      setLearners(formatted);
      setLoading(false);
    }

    fetchLearners();
  }, []);

  const filteredLearners = learners.filter(l => 
    l.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/formation"
            className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-brand-gold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Retour au parcours
          </Link>
          <div className="mt-6 flex items-center gap-4">
             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 border border-brand-gold/20 shadow-lg shadow-brand-gold/5">
                <ShieldCheck className="h-7 w-7 text-brand-gold" />
             </div>
             <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">Vue Formateur</h1>
                <p className="text-sm text-white/40 font-medium">Administration & Suivi des apprenants</p>
             </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/20 group-focus-within:text-brand-gold transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un apprenant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 rounded-2xl bg-white/5 border border-white/10 pl-12 pr-6 py-4 text-sm font-bold text-white outline-none focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/10 transition-all backdrop-blur-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <StatCard icon={<Users className="h-6 w-6" />} label="Apprenants" value={String(learners.length)} sub="Inscrits sur la plateforme" />
        <StatCard icon={<BookOpen className="h-6 w-6" />} label="Contenu" value={String(totalLessons)} sub="Leçons à maîtriser" />
        <StatCard icon={<Award className="h-6 w-6" />} label="Expertise" value={String(totalModules)} sub="Modules certifiants" />
        <StatCard icon={<TrendingUp className="h-6 w-6" />} label="Total QCM" value="180" sub="Banque de questions" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Learners List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
            <User className="h-4 w-4" /> Liste des apprenants
          </h2>
          
          <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl overflow-hidden">
            {loading ? (
              <div className="p-10 space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filteredLearners.length > 0 ? (
              <div className="divide-y divide-white/5">
                {filteredLearners.map((learner) => (
                  <div key={learner.id} className="group p-6 transition-all hover:bg-white/[0.02]">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg font-black text-brand-gold shadow-xl group-hover:scale-110 transition-transform">
                          {learner.full_name[0]}
                        </div>
                        <div>
                          <p className="font-black text-white uppercase tracking-tight">{learner.full_name}</p>
                          <div className="mt-1 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/30">
                            <span className="flex items-center gap-1"><Zap size={10} className="text-brand-gold" /> {learner.xp} XP</span>
                            <span className="flex items-center gap-1"><Clock size={10} /> {learner.last_activity}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-10">
                        <div className="hidden md:block text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Progression</p>
                          <div className="flex items-center gap-3">
                             <div className="h-1.5 w-24 rounded-full bg-white/5 ring-1 ring-white/10 overflow-hidden">
                                <div 
                                    className="h-full bg-brand-gold" 
                                    style={{ width: `${Math.round((learner.lessons_completed / totalLessons) * 100)}%` }} 
                                />
                             </div>
                             <span className="text-xs font-black text-white/60 tabular-nums">
                                {Math.round((learner.lessons_completed / totalLessons) * 100)}%
                             </span>
                          </div>
                        </div>
                        <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 group-hover:text-brand-gold group-hover:border-brand-gold/30 transition-all">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-20 text-center">
                 <Users className="h-12 w-12 text-white/10 mx-auto mb-4" />
                 <p className="text-white/40 font-black uppercase tracking-widest">Aucun apprenant trouvé</p>
              </div>
            )}
          </div>
        </div>

        {/* Modules & Control Panel */}
        <div className="space-y-8">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
                <BookOpen className="h-4 w-4" /> Gestion du curriculum
            </h2>
            
            <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl">
                <div className="space-y-4">
                {COURSE.map((mod, i) => (
                    <div key={mod.slug} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-brand-gold/30">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="h-8 w-8 rounded-lg bg-brand-navy flex items-center justify-center text-xs font-black text-white border border-white/10 group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                                    {i + 1}
                                </span>
                                <div>
                                    <p className="text-xs font-black text-white/80 uppercase tracking-tight">{mod.title.replace(/^Module \d+ — /, "")}</p>
                                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-0.5">{mod.lessons.length} LEÇONS</p>
                                </div>
                            </div>
                            <Link
                                href={`/formation/${mod.slug}`}
                                className="text-[10px] font-black uppercase text-brand-gold hover:text-white transition-colors"
                            >
                                APERÇU
                            </Link>
                        </div>
                    </div>
                ))}
                </div>
            </div>

            <div className="rounded-[2.5rem] border border-brand-gold/20 bg-brand-gold/5 p-8 shadow-2xl">
                <h3 className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-4">Export de données</h3>
                <p className="text-xs text-white/40 leading-relaxed italic mb-6">
                    Générez un rapport Excel complet de l&apos;activité des apprenants pour votre conformité Qualiopi.
                </p>
                <button className="w-full rounded-xl bg-brand-gold px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-navy transition hover:bg-white shadow-xl shadow-brand-gold/10">
                    Exporter les scores (.xlsx)
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20">
      <div className="flex items-center justify-between mb-4">
          <div className="text-brand-gold">{icon}</div>
          <div className="h-1.5 w-1.5 rounded-full bg-brand-gold/40 animate-pulse" />
      </div>
      <p className="text-3xl font-black text-white tracking-tighter tabular-nums">{value}</p>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mt-1">{label}</p>
      <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-2">{sub}</p>
    </div>
  );
}
