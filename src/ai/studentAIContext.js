export function buildStudentAIContext({
  mastery,
  activeConcept,
  recommendedConcept,
  interventionSignals,
}) {
  return {
    subject: "Class 10 Physics",

    chapter: "Electricity",

    currentConcept: activeConcept || null,

    mastery: {
      ...mastery,
    },

    weakConcepts: interventionSignals.map((signal) => ({
      conceptId: signal.conceptId,
      conceptName: signal.conceptName,
      score: signal.score,
      severity: signal.severity,
      recommendation: signal.recommendation,
    })),

    recommendedConcept:
      recommendedConcept?.name || null,

    learningPrinciple:
      "Do not repeat mastered concepts unnecessarily. Do not allow students to skip concepts whose prerequisites are not mastered.",
  };
}