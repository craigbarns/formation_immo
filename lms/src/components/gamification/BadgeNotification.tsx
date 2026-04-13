"use client";

import { useEffect, useState } from "react";
import type { BadgeId } from "@/lib/gamification";
import { getBadge } from "@/lib/gamification";
import { sounds } from "@/lib/sounds";

type Notification = { badgeId: BadgeId; show: boolean };

const RARITY_COLORS = {
  common: "border-zinc-300 bg-zinc-50",
  rare: "border-blue-400 bg-blue-50",
  epic: "border-purple-400 bg-purple-50",
  legendary: "border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50",
};

const RARITY_LABELS = {
  common: "Commun",
  rare: "Rare",
  epic: "Epique",
  legendary: "Legendaire",
};

export function useBadgeNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function notify(badgeId: BadgeId) {
    const badge = getBadge(badgeId);
    if (badge) {
      sounds.badgeUnlock(badge.rarity);
      // Confetti burst
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        const colors =
          badge.rarity === "legendary" ? ["#d4af37", "#f0c040", "#fff8dc"] :
          badge.rarity === "epic"      ? ["#a855f7", "#c084fc", "#f0abfc"] :
          badge.rarity === "rare"      ? ["#3b82f6", "#60a5fa", "#bfdbfe"] :
                                         ["#22c55e", "#86efac", "#dcfce7"];
        confetti({ particleCount: badge.rarity === "legendary" ? 180 : badge.rarity === "epic" ? 120 : 80, spread: 70, origin: { y: 0.3 }, colors });
      });
    }
    setNotifications((prev) => [...prev, { badgeId, show: true }]);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((n) => (n.badgeId === badgeId ? { ...n, show: false } : n)),
      );
    }, 4000);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.badgeId !== badgeId));
    }, 4500);
  }

  return { notifications, notify };
}

export function BadgeNotificationStack({ notifications }: { notifications: { badgeId: BadgeId; show: boolean }[] }) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed right-4 top-20 z-50 flex flex-col gap-3">
      {notifications.map((n) => (
        <BadgeToast key={n.badgeId} badgeId={n.badgeId} show={n.show} />
      ))}
    </div>
  );
}

function BadgeToast({ badgeId, show }: { badgeId: BadgeId; show: boolean }) {
  const badge = getBadge(badgeId);
  if (!badge) return null;

  return (
    <div
      className={`transform border-2 rounded-2xl p-4 shadow-2xl transition-all duration-500 ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } ${RARITY_COLORS[badge.rarity]}`}
      style={{ minWidth: 280 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-inner">
          {badge.icon}
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
            Nouveau badge {RARITY_LABELS[badge.rarity]}
          </p>
          <p className="text-sm font-bold text-[#1a3a5c]">{badge.name}</p>
          <p className="text-xs text-zinc-600">{badge.description}</p>
        </div>
      </div>
    </div>
  );
}
