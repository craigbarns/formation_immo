/**
 * AI Coach Service - Simulated RAG without external API
 * Uses localStorage and contextual responses based on formation content
 */

import { addMessageToMemory, getCoachMemory, updateUserPreferences, type ChatMessage } from "./ai-coach-storage";

// Knowledge base for contextual responses
const KNOWLEDGE_BASE: Record<string, string[]> = {
  "loi-alur": [
    "La Loi ALUR (Accès au Logement et Urbanisme Rénové) a été adoptée en 2014.",
    "Elle encadre les honoraires des agences immobilières pour la location.",
    "Elle impose des diagnostics obligatoires (DPE, DDT, etc.).",
    "Elle renforce les obligations d'information envers les clients.",
  ],
  "compromis": [
    "Le compromis de vente est un avant-contrat engageant.",
    "Il doit contenir les conditions suspensives (obtention prêt, etc.).",
    "Le délai de rétractation est de 10 jours pour l'acquéreur.",
    "La date butoir doit être clairement indiquée.",
  ],
  "negociation": [
    "La négociation immobilière nécessite de connaître les motivations du vendeur.",
    "Le BREL (Bien à Usage d'Habitation) encadre certaines pratiques.",
    "L'écoute active est essentielle pour réussir une négociation.",
    "Le mandat de vente doit être signé avant toute diffusion.",
  ],
  "financement": [
    "Le taux d'usure est fixé trimestriellement par la Banque de France.",
    "Le PTZ (Prêt à Taux Zéro) est réservé aux primo-accédants.",
    "Le TAEA (Taux Annuel Effectif d'Assurance) doit être indiqué.",
    "Un crédit immobilier peut être renégocié ou racheté.",
  ],
  "rentabilite": [
    "La rentabilité brute = (loyer annuel / prix d'achat) × 100.",
    "La rentabilité nette prend en compte les charges.",
    "Le LMNP (Loueur en Meublé Non Professionnel) offre des avantages fiscaux.",
    "La défiscalisation Pinel est plafonnée à certains zones.",
  ],
  "marketing": [
    "Le portefeuille client est l'actif le plus précieux d'un agent.",
    "Les réseaux sociaux sont essentiels pour la prospection moderne.",
    "Le home staging peut augmenter la valeur perçue d'un bien.",
    "La photographie professionnelle est indispensable.",
  ],
  "terrain": [
    "La viabilité d'un terrain doit être vérifiée (eau, électricité, etc.).",
    "Le COS (Coefficient d'Occupation des Sols) limite la constructibilité.",
    "Les servitudes peuvent limiter l'utilisation du terrain.",
    "Le PLU (Plan Local d'Urbanisme) définit les règles d'urbanisme.",
  ],
};

// Response templates based on intent
const RESPONSE_TEMPLATES = {
  greeting: [
    "Bonjour ! Je suis Marie, votre coach immobilier. Comment puis-je vous aider aujourd'hui ?",
    "Salut ! Prêt(e) à progresser dans votre formation ? Je suis là pour vous accompagner !",
    "Bonjour ! Besoin d'aide sur un point précis de la formation ?",
  ],
  
  motivation: [
    "Vous faites du bon travail ! Continuez comme ça, la persévérance est la clé du succès en immobilier.",
    "N'abandonnez pas ! Chaque leçon vous rapproche de votre objectif.",
    "Je vois que vous progressez bien. Continuez sur cette lancée !",
  ],
  
  exam_prep: [
    "Pour réussir votre examen, je vous recommande de revoir les points clés du module et de faire les QCM plusieurs fois.",
    "La clé de la réussite : révisez régulièrement et utilisez les flashcards pour mémoriser les définitions.",
    "N'oubliez pas de bien lire les questions et de prendre votre temps pendant l'examen !",
  ],
  
  unclear: [
    "Je n'ai pas bien compris votre question. Pouvez-vous reformuler ou me dire sur quel module vous travaillez ?",
    "Hmm, je ne suis pas sûre de comprendre. Essayez de me poser une question sur un sujet précis (ALUR, compromis, financement, etc.)",
  ],
  
  thanks: [
    "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.",
    "Je suis là pour ça ! Bon courage dans votre formation.",
    "De rien ! Continuez à apprendre et à progresser.",
  ],
};

// Intent detection keywords
const INTENT_KEYWORDS: Record<string, string[]> = {
  greeting: ["bonjour", "salut", "hello", "coucou", "hey"],
  motivation: ["découragé", "abandonner", "dur", "difficile", "motivation", "courage"],
  exam_prep: ["examen", "qcm", "test", "réviser", "préparer", "révision"],
  thanks: ["merci", "thanks", "remercie"],
};

function detectIntent(message: string): keyof typeof RESPONSE_TEMPLATES | "knowledge" {
  const lowerMsg = message.toLowerCase();
  
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some(kw => lowerMsg.includes(kw))) {
      return intent as keyof typeof RESPONSE_TEMPLATES;
    }
  }
  
  return "knowledge";
}

function findRelevantKnowledge(message: string, context?: { moduleSlug?: string }): string[] {
  const lowerMsg = message.toLowerCase();
  const relevant: string[] = [];
  
  // Check context first
  if (context?.moduleSlug && KNOWLEDGE_BASE[context.moduleSlug]) {
    relevant.push(...KNOWLEDGE_BASE[context.moduleSlug]);
  }
  
  // Check all knowledge bases for keywords
  for (const [topic, facts] of Object.entries(KNOWLEDGE_BASE)) {
    if (lowerMsg.includes(topic) || facts.some(f => lowerMsg.includes(f.toLowerCase().split(" ")[0]))) {
      relevant.push(...facts);
    }
  }
  
  // Search by keyword matching
  const keywords = ["alur", "compromis", "négociation", "mandat", "financement", "crédit", "rentabilité", "pinel", "lmnp", "marketing", "prospection", "terrain", "viabilité", "cos"];
  for (const kw of keywords) {
    if (lowerMsg.includes(kw)) {
      for (const [topic, facts] of Object.entries(KNOWLEDGE_BASE)) {
        if (facts.some(f => f.toLowerCase().includes(kw))) {
          relevant.push(...facts);
        }
      }
    }
  }
  
  // Remove duplicates and limit
  return [...new Set(relevant)].slice(0, 3);
}

function generateKnowledgeResponse(query: string, knowledge: string[]): string {
  if (knowledge.length === 0) {
    return "Je n'ai pas trouvé d'information précise sur ce sujet dans votre formation. Essayez de consulter les fiches récapitulatives ou les ressources du module concerné. Vous pouvez aussi me demander quelque chose sur la Loi ALUR, les compromis, le financement, la rentabilité, le marketing ou les terrains.";
  }
  
  const intro = "Voici ce que je peux vous dire à ce sujet :\n\n";
  const facts = knowledge.map((k, i) => `${i + 1}. ${k}`).join("\n\n");
  const outro = "\n\nAvez-vous d'autres questions sur ce sujet ?";
  
  return intro + facts + outro;
}

function getRandomResponse(templateKey: keyof typeof RESPONSE_TEMPLATES): string {
  const responses = RESPONSE_TEMPLATES[templateKey];
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function sendMessageToCoach(
  message: string,
  context?: { moduleSlug?: string; lessonSlug?: string; lessonTitle?: string }
): Promise<{ response: string; message: ChatMessage }> {
  // Add user message to memory
  addMessageToMemory({
    role: "user",
    content: message,
    context,
  });
  
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  // Detect intent and generate response
  const intent = detectIntent(message);
  let responseText: string;
  
  if (intent === "knowledge") {
    const knowledge = findRelevantKnowledge(message, context);
    responseText = generateKnowledgeResponse(message, knowledge);
    
    // Update user preferences based on topics
    if (context?.moduleSlug) {
      const memory = getCoachMemory();
      const weakTopics = new Set(memory.userPreferences.weakTopics || []);
      
      // If user asks many questions on same topic, mark as potentially weak
      const recentMessages = memory.messages.slice(-10);
      const topicQuestions = recentMessages.filter(m => 
        m.role === "user" && m.context?.moduleSlug === context.moduleSlug
      );
      
      if (topicQuestions.length >= 3) {
        weakTopics.add(context.moduleSlug);
        updateUserPreferences({ weakTopics: Array.from(weakTopics) });
      }
    }
  } else {
    responseText = getRandomResponse(intent);
  }
  
  // Add assistant response to memory
  const memory = addMessageToMemory({
    role: "assistant",
    content: responseText,
    context,
  });
  
  return { response: responseText, message: memory.messages[memory.messages.length - 1] };
}

export function getConversationHistory(): ChatMessage[] {
  return getCoachMemory().messages;
}

export function getPersonalizedRecommendation(): string {
  const memory = getCoachMemory();
  const { weakTopics, lastInteractedAt } = memory.userPreferences;
  
  // Check if user hasn't interacted in a while
  if (lastInteractedAt) {
    const daysSince = Math.floor((Date.now() - new Date(lastInteractedAt).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince >= 3) {
      return "Vous ne vous êtes pas connecté(e) depuis quelques jours. N'oubliez pas de maintenir votre streak ! Une petite session de 15 minutes suffit pour progresser.";
    }
  }
  
  // Recommend based on weak topics
  if (weakTopics && weakTopics.length > 0) {
    const topic = weakTopics[weakTopics.length - 1];
    const topicNames: Record<string, string> = {
      "loi-alur": "la Loi ALUR",
      "compromis": "les compromis de vente",
      "negociation": "la négociation",
      "financement": "le financement",
      "rentabilite": "la rentabilité",
      "marketing": "le marketing",
      "terrain": "les terrains",
    };
    return `Je vois que vous avez eu des questions sur ${topicNames[topic] || topic}. Souhaitez-vous que nous révisions ensemble les points clés ?`;
  }
  
  // Default recommendations
  const defaults = [
    "Avez-vous essayé les simulateurs interactifs ? Ils sont excellents pour mettre en pratique vos connaissances.",
    "N'oubliez pas de consulter vos flashcards régulièrement pour ancrer vos connaissances !",
    "Votre prochaine leçon vous attend. Prêt(e) à continuer votre progression ?",
  ];
  
  return defaults[Math.floor(Math.random() * defaults.length)];
}
