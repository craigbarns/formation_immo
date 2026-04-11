/**
 * Date utilities
 */

export function formatDistanceToNow(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInMs = now.getTime() - target.getTime();
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) {
    return "à l'instant";
  } else if (diffInMins < 60) {
    return `il y a ${diffInMins} min`;
  } else if (diffInHours < 24) {
    return `il y a ${diffInHours}h`;
  } else if (diffInDays === 1) {
    return "hier";
  } else if (diffInDays < 7) {
    return `il y a ${diffInDays} jours`;
  } else if (diffInDays < 30) {
    return `il y a ${Math.floor(diffInDays / 7)} semaine(s)`;
  } else {
    return target.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  }
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }
  return `${mins} min`;
}
