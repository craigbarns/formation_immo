"use client";

import dynamic from "next/dynamic";

export const InteractiveScenario = dynamic(() => import("@/components/interactive/InteractiveScenario").then(m => m.InteractiveScenario));
export const CaseStudyBlock = dynamic(() => import("@/components/interactive/CaseStudyBlock").then(m => m.CaseStudyBlock));
export const ChatRoleplay = dynamic(() => import("@/components/interactive/ChatRoleplay").then(m => m.ChatRoleplay));
export const DragDropExerciseBlock = dynamic(() => import("@/components/interactive/DragDropExercise").then(m => m.DragDropExerciseBlock));
export const InteractiveTimelineBlock = dynamic(() => import("@/components/interactive/InteractiveTimelineBlock").then(m => m.InteractiveTimelineBlock));
export const ProChecklistBlock = dynamic(() => import("@/components/interactive/ProChecklistBlock").then(m => m.ProChecklistBlock));
export const DataTableBlock = dynamic(() => import("@/components/interactive/DataTableBlock").then(m => m.DataTableBlock));
export const GuidedCalculationBlock = dynamic(() => import("@/components/interactive/GuidedCalculationBlock").then(m => m.GuidedCalculationBlock));
