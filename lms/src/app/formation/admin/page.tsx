"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { COURSE, lessonId } from "@/data/course";
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
  UserPlus,
  Zap,
  X,
  Target,
  Trophy,
  Activity,
  Calendar,
  BarChart3,
  Download,
  History,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgress } from "@/components/charts/CircularProgress";
import { exportAttendanceToCSV } from "@/lib/utils/export";
import { createFullAccessUser, listLearnerConnectionLogs, listLearners } from "@/app/actions/admin";
import type { ConnectionLogPayload, LearnerStatsPayload } from "@/app/actions/admin";

interface LearnerStats {
  id: string;
  full_name: string;
  xp: number;
  lessons_completed: number;
  last_activity: string;
  streak: number;
  quiz_correct: number;
  exams_taken: number;
  exam_scores: Record<string, { score: number, total: number, date: string }>;
  completed_keys: Set<string>;
}

export default function AdminPage() {
  const [learners, setLearners] = useState<LearnerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLearner, setSelectedLearner] = useState<LearnerStats | null>(null);
  const [attendanceLogs, setAttendanceLogs] = useState<ConnectionLogPayload[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);
  const [accessResult, setAccessResult] = useState<{ success?: string; error?: string } | null>(null);
  const accessFormRef = useRef<HTMLFormElement>(null);

  const totalLessons = COURSE.reduce((a, m) => a + m.lessons.length, 0);
  const totalModules = COURSE.length;

  const loadLearners = useCallback(async ({ showLoading = true } = {}) => {
    if (showLoading) setLoading(true);

    const result = await listLearners();

    if (result.error) {
      if (result.error === "Accès refusé" || result.error === "Non authentifié") {
        setIsAccessDenied(true);
      } else {
        console.error("Error fetching learners:", result.error);
      }
      setLearners([]);
      setLoading(false);
      return;
    }

    const formatted = ((result.learners || []) as LearnerStatsPayload[]).map((learner) => ({
      ...learner,
      completed_keys: new Set(learner.completed_keys),
    }));

    setIsAccessDenied(false);
    setLearners(formatted);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadLearners();
  }, [loadLearners]);

  // Fetch logs when a learner is selected
  useEffect(() => {
    async function fetchLogs() {
      if (selectedLearner) {
        setLoadingLogs(true);
        const result = await listLearnerConnectionLogs(selectedLearner.id);
        if (result.error) {
          console.error("Error fetching learner logs:", result.error);
          setAttendanceLogs([]);
        } else {
          setAttendanceLogs(result.logs || []);
        }
        setLoadingLogs(false);
      }
    }
    fetchLogs();
  }, [selectedLearner]);

  const filteredLearners = learners.filter(l => 
    l.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isAccessDenied) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShieldCheck className="h-16 w-16 text-red-400/60" />
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Accès refusé</h1>
        <p className="text-white/40 text-sm">Cette page est réservée aux formateurs.</p>
        <Link href="/formation" className="text-brand-gold hover:underline text-sm font-bold">
          Retour au parcours
        </Link>
      </div>
    );
  }

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

      {/* Create User Access */}
      <div className="rounded-[2rem] border border-brand-gold/20 bg-white/[0.03] p-6 shadow-xl">
        <h2 className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
          <UserPlus className="h-4 w-4 text-brand-gold" /> Créer un accès complet
        </h2>
        <form
          ref={accessFormRef}
          action={async (fd) => {
            setAccessLoading(true);
            setAccessResult(null);
            try {
              const result = await createFullAccessUser(fd);
              setAccessResult(result);
              if (result.success) {
                accessFormRef.current?.reset();
                setSearchTerm("");
                await loadLearners({ showLoading: false });
              }
            } finally {
              setAccessLoading(false);
            }
          }}
          className="grid gap-4 md:grid-cols-3 xl:grid-cols-[1fr_1fr_1.6fr_auto] xl:items-end"
        >
          <div>
            <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-white/40">Prénom</label>
            <input name="first_name" type="text" required placeholder="Jean" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-600 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all" />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-white/40">Nom</label>
            <input name="last_name" type="text" required placeholder="Dupont" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-600 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all" />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-white/40">Email</label>
            <input name="email" type="email" required placeholder="jean@exemple.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-600 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all" />
          </div>
          <button type="submit" disabled={accessLoading} className="shrink-0 rounded-xl bg-brand-gold px-6 py-3 text-sm font-black text-brand-navy-deep shadow-lg transition hover:bg-white disabled:opacity-50">
            {accessLoading ? "Création…" : "Créer accès"}
          </button>
        </form>
        {accessResult?.success && (
          <p className="mt-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 text-sm font-bold text-emerald-400">{accessResult.success}</p>
        )}
        {accessResult?.error && (
          <p className="mt-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm font-bold text-red-400">{accessResult.error}</p>
        )}
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
                  <div key={learner.id} className="group p-6 transition-all hover:bg-white/[0.02] cursor-pointer" onClick={() => setSelectedLearner(learner)}>
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
                <button 
                  onClick={() => alert("Sélectionnez un apprenant pour exporter son relevé détaillé.")}
                  className="w-full rounded-xl bg-brand-gold px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-navy transition hover:bg-white shadow-xl shadow-brand-gold/10"
                >
                    Exporter les scores (.xlsx)
                </button>
            </div>
        </div>
      </div>

      {/* Learner Detail Modal */}
      <AnimatePresence>
        {selectedLearner && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLearner(null)}
              className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-full sm:h-[90vh] overflow-hidden rounded-2xl sm:rounded-[3rem] border border-white/10 bg-[#070d18] shadow-[0_50px_150px_rgba(0,0,0,0.8)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="relative border-b border-white/5 bg-[#030712] p-8 sm:p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.05] to-transparent pointer-events-none" />
                <button 
                  onClick={() => setSelectedLearner(null)}
                  className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
                
                <div className="relative flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                  <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-brand-gold to-yellow-600 p-1 shadow-2xl">
                    <div className="h-full w-full rounded-[2.2rem] bg-[#030712] flex items-center justify-center text-4xl font-black text-brand-gold uppercase">
                      {selectedLearner.full_name[0]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-3 flex items-center justify-center md:justify-start gap-3">
                       <ShieldCheck size={14} /> DOSSIER APPRENANT
                    </p>
                    <h2 className="text-4xl font-black text-white uppercase tracking-tight">{selectedLearner.full_name}</h2>
                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                       <Badge icon={<Zap size={10} />} label={`${selectedLearner.xp} XP`} color="purple" />
                       <Badge icon={<Calendar size={10} />} label={`Actif le ${selectedLearner.last_activity}`} color="blue" />
                       <Badge icon={<Target size={10} />} label={`${selectedLearner.lessons_completed}/${totalLessons} Leçons`} color="gold" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => exportAttendanceToCSV(selectedLearner.full_name, attendanceLogs)}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-navy transition hover:bg-white shadow-xl shadow-brand-gold/10"
                    >
                      <Download size={14} /> Relevé Assiduité
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 lg:p-12 pb-20 sm:pb-32 scrollbar-hide">
                <div className="grid gap-12 lg:grid-cols-3">
                  {/* Left Column: Progress & Exams */}
                  <div className="lg:col-span-2 space-y-12">
                    {/* Module Progress Grid */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/30 flex items-center gap-3">
                            <BarChart3 size={14} /> État des modules
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {COURSE.map((mod) => {
                                const doneInMod = mod.lessons.filter(l => selectedLearner.completed_keys.has(lessonId(mod.slug, l.slug))).length;
                                const pct = Math.round((doneInMod / mod.lessons.length) * 100);
                                return (
                                    <div key={mod.slug} className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">{mod.title.replace(/^Module \d+ — /, "")}</p>
                                            <span className="text-xs font-black text-brand-gold">{pct}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden ring-1 ring-white/10">
                                            <div className="h-full bg-brand-gold" style={{ width: `${pct}%` }} />
                                        </div>
                                        <p className="mt-3 text-[9px] font-black uppercase text-white/20 tracking-widest">
                                            {doneInMod} sur {mod.lessons.length} leçons acquises
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Attendance Logs Table */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/30 flex items-center gap-3">
                            <History size={14} /> Journal d&apos;assiduité récent
                        </h3>
                        <div className="rounded-3xl border border-white/10 bg-[#030712] shadow-inner overflow-x-auto">
                            <table className="w-full min-w-[400px] text-left border-collapse">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                                        <th className="p-5">Date & Heure</th>
                                        <th className="p-5">Leçon / Module</th>
                                        <th className="p-5 text-right">Durée</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loadingLogs ? (
                                      <tr><td colSpan={3} className="p-10 text-center text-white/20 text-xs font-bold uppercase animate-pulse">Chargement des relevés...</td></tr>
                                    ) : attendanceLogs.length > 0 ? (
                                      attendanceLogs.slice(0, 10).map((log) => (
                                        <tr key={log.id} className="group hover:bg-white/[0.01] transition-colors">
                                            <td className="p-5">
                                                <p className="text-sm font-bold text-white/80">{new Date(log.started_at).toLocaleDateString('fr-FR')}</p>
                                                <p className="text-[10px] font-medium text-white/20">{new Date(log.started_at).toLocaleTimeString('fr-FR')}</p>
                                            </td>
                                            <td className="p-5">
                                                <p className="text-xs font-black text-white/60 uppercase tracking-tight">{log.lesson_slug || "Navigation"}</p>
                                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-0.5">{log.module_slug || "Dashboard"}</p>
                                            </td>
                                            <td className="p-5 text-right">
                                                <span className="text-sm font-black text-brand-gold tabular-nums">
                                                    {Math.round((log.duration_seconds ?? 0) / 60)} min
                                                </span>
                                            </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr><td colSpan={3} className="p-10 text-center text-white/20 text-[10px] font-black uppercase tracking-widest">Aucune donnée de session enregistrée</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                  </div>

                  {/* Right Column: Performance Summary */}
                  <div className="space-y-8">
                     <div className="rounded-[2.5rem] border border-white/10 bg-[#030712] p-8 text-center shadow-2xl">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8">Maîtrise Globale</h3>
                        <CircularProgress 
                           value={selectedLearner.lessons_completed} 
                           max={totalLessons} 
                           size={180} 
                           color="var(--brand-gold)" 
                           label={`${Math.round((selectedLearner.lessons_completed / totalLessons) * 100)}%`}
                           sublabel="CURRICULUM"
                        />
                     </div>

                     <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/30 flex items-center gap-3">
                            <Activity size={14} /> Engagement IA
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Réponses QCM</span>
                                <span className="text-sm font-black text-white tabular-nums">{selectedLearner.quiz_correct}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Examens passés</span>
                                <span className="text-sm font-black text-white tabular-nums">{selectedLearner.exams_taken}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Série active</span>
                                <span className="text-sm font-black text-orange-400 tabular-nums">{selectedLearner.streak} j</span>
                            </div>
                        </div>
                     </div>

                     <div className="rounded-[2.5rem] border border-brand-gold/20 bg-brand-gold/5 p-8 text-center shadow-2xl">
                        <Trophy className="mx-auto h-8 w-8 text-brand-gold mb-4" />
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Certification</h3>
                        <p className="text-xs text-white/50 leading-relaxed font-medium italic">
                            {selectedLearner.lessons_completed / totalLessons >= 0.8 && Object.values(selectedLearner.exam_scores).filter(e => e.score / e.total >= 0.7).length >= 3
                                ? "L'apprenant remplit les critères de génération du certificat."
                                : "Critères ALUR non encore atteints (80% progression + 3 examens réussis)."}
                        </p>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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

function Badge({ icon, label, color }: { icon: React.ReactNode, label: string, color: "purple" | "blue" | "gold" }) {
    const colors = {
        purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
        blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
        gold: "bg-brand-gold/10 text-brand-gold border-brand-gold/20"
    };
    return (
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${colors[color]}`}>
            {icon}
            {label}
        </span>
    );
}
