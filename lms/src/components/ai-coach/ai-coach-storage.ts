/**
 * Storage for AI Coach conversations
 */

const STORAGE_KEY = "formation-ai-coach-memories";

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  context?: {
    moduleSlug?: string;
    lessonSlug?: string;
    lessonTitle?: string;
  };
}

export interface ConversationMemory {
  messages: ChatMessage[];
  userPreferences: {
    name?: string;
    weakTopics?: string[];
    strongTopics?: string[];
    lastInteractedAt?: string;
  };
}

const DEFAULT_MEMORY: ConversationMemory = {
  messages: [],
  userPreferences: {},
};

export function getCoachMemory(): ConversationMemory {
  if (typeof window === "undefined") return { ...DEFAULT_MEMORY };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_MEMORY };
    return { ...DEFAULT_MEMORY, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_MEMORY };
  }
}

export function saveCoachMemory(memory: ConversationMemory) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
}

export function addMessageToMemory(
  message: Omit<ChatMessage, "id" | "timestamp">
): ConversationMemory {
  const memory = getCoachMemory();
  const newMessage: ChatMessage = {
    ...message,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  memory.messages.push(newMessage);
  memory.userPreferences.lastInteractedAt = newMessage.timestamp;
  
  // Keep only last 50 messages
  if (memory.messages.length > 50) {
    memory.messages = memory.messages.slice(-50);
  }
  
  saveCoachMemory(memory);
  return memory;
}

export function clearCoachMemory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function updateUserPreferences(
  preferences: Partial<ConversationMemory["userPreferences"]>
): ConversationMemory {
  const memory = getCoachMemory();
  memory.userPreferences = { ...memory.userPreferences, ...preferences };
  saveCoachMemory(memory);
  return memory;
}
