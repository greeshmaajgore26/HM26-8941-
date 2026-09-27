import { useState } from "react";
import "./index.css";

import Psychology from "./Psychology";
import StudentAIChatbot from "./ai/StudentAIChatbot";
import RethemingDemo from "./ai/RethemingDemo";
import InterventionDashboard from "./mentor/InterventionDashboard";


// Person 2 - Physics learning engine
import KnowledgeGraph from "./physics/KnowledgeGraph";
import QuizScreen from "./physics/QuizScreen";
import DiagnosticScreen from "./physics/DiagnosticScreen";
import RevisionScreen from "./physics/RevisionScreen";
import ChapterAssessment from "./physics/ChapterAssessment";
import FocusBreak from "./focus/FocusBreak";

import { learningContent } from "./physics/learningContent";
import { popQuizQuestions } from "./physics/quiz";
import { completeLearningSession } from "./physics/sessionEngine";
import { getNextConcept } from "./physics/progression";
import { generateInterventionSignals } from "./physics/interventionSignals";

/* ============================================================
   FOCUS OVERLAY
   ============================================================

   Focus mode:
   - small box at top
   - course remains visible
   - does not block the page

   Break mode:
   - full screen
   - blocks the course
   - shows all break activities
============================================================ */

function FocusOverlay({
  mode,
  onExit,
  onModeChange
}) {
  const isBreak = mode === "break";

  return (
    <div
      style={
        isBreak
          ? focusStyles.breakOverlay
          : focusStyles.focusOverlay
      }
    >
      <div
        style={
          isBreak
            ? focusStyles.breakWindow
            : focusStyles.focusWindow
        }
      >
        <FocusBreak
          onExit={onExit}
          onModeChange={onModeChange}
        />
      </div>
    </div>
  );
}

function App() {
  // ============================================================
  // GENERAL APP STATE
  // ============================================================

  const [role, setRole] = useState(null);
  const [step, setStep] = useState(1);

  const [showProfileReveal, setShowProfileReveal] =
    useState(false);

  const [showDashboard, setShowDashboard] =
    useState(false);

  const [showPsychology, setShowPsychology] =
    useState(false);

  const [showRetheming, setShowRetheming] =
    useState(false);

  const [selectedBadge, setSelectedBadge] =
    useState(null);

  // ============================================================
  // PHYSICS STATE
  // ============================================================

  const [physicsScreen, setPhysicsScreen] =
    useState(null);

  /*
    focusActive:
      Is the focus system currently open?

    focusMode:
      "focus" = small box at top
      "break" = full screen blocking overlay
  */
  const [focusActive, setFocusActive] =
    useState(false);

  const [focusMode, setFocusMode] =
    useState("focus");

  const [mastery, setMastery] = useState({
    "electric-current": 0,
    "potential-difference": 0,
    resistance: 0,
    "ohms-law": 0,
    "series-parallel": 0,
    "electrical-power": 0
  });

  const [diagnosticCompleted, setDiagnosticCompleted] =
    useState(false);

  const [activeConcept, setActiveConcept] =
    useState(null);

  const [quizResult, setQuizResult] =
    useState(null);

  const [diagnosticResult, setDiagnosticResult] =
    useState(null);

  const [assessmentResult, setAssessmentResult] =
    useState(null);

  // ============================================================
  // STUDENT PROFILE
  // ============================================================

  const [student, setStudent] = useState({
    name: "",
    classLevel: "10",
    learningGoal: "",
    explanationStyle: "",
    attentionSpan: "",
    customAttentionSpan: "",
    studyPlace: "",
    studyEnvironment: "",
    interests: "",
    extracurricular: "",
    frustration: "",
    mistakePreference: "",
    challengeStyle: "",
    motivation: "",
    sessionStyle: ""
  });

  const totalSteps = 10;

  // ============================================================
  // PROFILE HELPERS
  // ============================================================

  const updateStudent = (field, value) => {
    setStudent((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const nextStep = () => {
    setStep((previous) =>
      Math.min(totalSteps, previous + 1)
    );
  };

  const previousStep = () => {
    setStep((previous) =>
      Math.max(1, previous - 1)
    );
  };

  const progress = Math.round(
    (step / totalSteps) * 100
  );

  const getFocusTime = () => {
    if (student.attentionSpan === "custom") {
      return student.customAttentionSpan
        ? `${student.customAttentionSpan} min`
        : "Flexible";
    }

    return student.attentionSpan
      ? `${student.attentionSpan} min`
      : "Flexible";
  };

  const getExplanationShort = () => {
    const value = student.explanationStyle;

    if (
      value ===
      "Show me a visual or diagram"
    ) {
      return "Visual learner";
    }

    if (
      value ===
      "Give me a real-life example"
    ) {
      return "Example-driven";
    }

    if (
      value ===
      "Explain it step-by-step"
    ) {
      return "Step-by-step";
    }

    if (
      value ===
      "Let me try a question"
    ) {
      return "Learn by doing";
    }

    if (
      value ===
      "Start simple, then go deeper"
    ) {
      return "Simple → deep";
    }

    return "Personalized";
  };

  const getStudyStyle = () => {
    if (
      student.studyPlace ===
      "Quiet room"
    ) {
      return "Quiet-space learner";
    }

    if (
      student.studyPlace ===
      "Library or study space"
    ) {
      return "Structured-space learner";
    }

    if (
      student.studyPlace ===
      "Some background noise"
    ) {
      return "Ambient learner";
    }

    if (
      student.studyPlace ===
      "Outdoors"
    ) {
      return "Environment-flexible";
    }

    return "Flexible environment";
  };

  const getMistakeStyle = () => {
    const value =
      student.mistakePreference;

    if (
      value ===
      "Tell me exactly where I went wrong"
    ) {
      return "Direct feedback";
    }

    if (
      value ===
      "Give me a hint first"
    ) {
      return "Hint-first learner";
    }

    if (
      value ===
      "Show me a similar example"
    ) {
      return "Example-based recovery";
    }

    if (
      value ===
      "Let me try again without help"
    ) {
      return "Independent retry";
    }

    return "Adaptive feedback";
  };

  const getChallengeShort = () => {
    if (
      student.challengeStyle ===
      "Start easy and build up"
    ) {
      return "Progressive challenge";
    }

    if (
      student.challengeStyle ===
      "Challenge me quickly"
    ) {
      return "Challenge seeker";
    }

    if (
      student.challengeStyle ===
      "Give me hints when I struggle"
    ) {
      return "Supported challenge";
    }

    if (
      student.challengeStyle ===
      "Let me choose the difficulty"
    ) {
      return "Difficulty control";
    }

    return "Adaptive challenge";
  };

  // ============================================================
  // PROFILE REVEAL DATA
  // ============================================================

  const profileTraits = [
    {
      icon: "🧠",
      title: getExplanationShort(),
      text:
        "We'll shape explanations around how concepts click for you."
    },
    {
      icon: "⏱️",
      title: `${getFocusTime()} focus`,
      text:
        "Learning sessions can be structured around your natural attention span."
    },
    {
      icon: "📍",
      title: getStudyStyle(),
      text:
        "Your preferred environment will influence how we structure sessions."
    },
    {
      icon: "💡",
      title: getMistakeStyle(),
      text:
        "When you get stuck, feedback will follow your preferred approach."
    },
    {
      icon: "🎯",
      title: getChallengeShort(),
      text:
        "Question difficulty will adapt as your understanding grows."
    },
    {
      icon: "🚀",
      title:
        student.motivation ||
        "Progress motivated",
      text:
        "We'll use the things that motivate you to keep momentum going."
    }
  ];

  const badges = [
    {
      emoji: "🌱",
      title: "First Step",
      description:
        "Complete your first learning activity.",
      unlocked: true
    },
    {
      emoji: "🔥",
      title: "On Fire",
      description:
        "Maintain a 7-day learning streak.",
      unlocked: false
    },
    {
      emoji: "🎯",
      title: "Focused Learner",
      description:
        "Complete five focused learning sessions.",
      unlocked: false
    },
    {
      emoji: "🧠",
      title: "Knowledge Builder",
      description:
        "Master your first major concept.",
      unlocked: false
    }
  ];

  const finishOnboarding = () => {
    if (!student.motivation) {
      alert(
        "Choose what motivates you."
      );
      return;
    }

    if (!student.sessionStyle) {
      alert(
        "Choose how you'd like your sessions to feel."
      );
      return;
    }

    setShowProfileReveal(true);
  };

  // ============================================================
  // PHYSICS ENGINE
  // ============================================================

  const recommendedConcept =
    diagnosticCompleted
      ? getNextConcept(mastery)
      : null;

  const interventionSignals =
    diagnosticCompleted
      ? generateInterventionSignals(
          mastery
        )
      : [];

  // ============================================================
  // FOCUS CONTROLS
  // ============================================================

  const startFocusSession = () => {
    setFocusMode("focus");
    setFocusActive(true);
  };

  const closeFocusSession = () => {
    setFocusActive(false);
    setFocusMode("focus");
  };

  const handleFocusModeChange = (
    nextMode
  ) => {
    setFocusMode(nextMode);
  };

  // ============================================================
  // START PHYSICS
  // ============================================================

  const startPhysics = () => {
    setShowDashboard(true);
    setShowPsychology(false);
    setShowRetheming(false);
    setPhysicsScreen("dashboard");
  };

  // ============================================================
  // DIAGNOSTIC
  // ============================================================

  const startDiagnostic = () => {
    setPhysicsScreen("diagnostic");
  };

  const handleDiagnosticComplete = (
    result
  ) => {
    const diagnosticMastery =
      result?.mastery || {
        "electric-current": 0,
        "potential-difference": 0,
        resistance: 0,
        "ohms-law": 0,
        "series-parallel": 0,
        "electrical-power": 0
      };

    setDiagnosticResult(result);
    setMastery(diagnosticMastery);
    setDiagnosticCompleted(true);

    const nextConcept =
      getNextConcept(
        diagnosticMastery
      );

    setActiveConcept(
      result?.nextConcept?.id ||
        nextConcept?.id ||
        null
    );

    setPhysicsScreen(
      "diagnostic-result"
    );
  };

  // ============================================================
  // LEARNING
  // ============================================================

  const startLearning = (
    conceptId
  ) => {
    if (!conceptId) {
      setPhysicsScreen("dashboard");
      return;
    }

    setActiveConcept(conceptId);
    setQuizResult(null);
    setPhysicsScreen("learning");
  };

  // ============================================================
  // QUIZ
  // ============================================================

  const startQuiz = () => {
    if (!activeConcept) {
      setPhysicsScreen("dashboard");
      return;
    }

    setPhysicsScreen("quiz");
  };

  const handleQuizComplete = (
    answers
  ) => {
    if (!activeConcept) {
      setPhysicsScreen("dashboard");
      return;
    }

    const questions =
      popQuizQuestions[
        activeConcept
      ] || [];

    const result =
      completeLearningSession(
        mastery,
        activeConcept,
        questions,
        answers
      );

    // Calculate the score from the answers actually submitted.
    // This is the single source of truth for the percentage
    // shown on the result screen and for pass/fail.
    let correctAnswers = 0;

    questions.forEach((question) => {
      const selectedAnswer = answers?.[question.id];
      const correctAnswer = question.correctAnswer;

      const normalizedSelected =
        typeof selectedAnswer === "string"
          ? selectedAnswer.trim().toLowerCase()
          : "";

      const normalizedCorrect =
        typeof correctAnswer === "string"
          ? correctAnswer.trim().toLowerCase()
          : "";

      if (normalizedSelected === normalizedCorrect) {
        correctAnswers += 1;
      }
    });

    const quizScore =
      questions.length > 0
        ? Math.round(
            (correctAnswers / questions.length) * 100
          )
        : 0;

    const passed = quizScore >= 80;

    const normalizedResult = {
      ...result,
      score: quizScore,
      quizScore,
      passed,
      action: passed ? "continue" : "revise",
      remediationRequired: !passed,
      remediationConcept: !passed
        ? activeConcept
        : null
    };

    setMastery(
      normalizedResult.updatedMastery
    );

    setQuizResult(normalizedResult);

    if (normalizedResult.passed) {
      setPhysicsScreen("result");
    } else {
      setPhysicsScreen("revision");
    }
  };

  // ============================================================
  // REASSESSMENT
  // ============================================================

  const startReassessment = () => {
    setPhysicsScreen("quiz");
  };

  // ============================================================
  // CONTINUE AFTER QUIZ
  // ============================================================

  const continueAfterResult = () => {
    const nextConcept =
      quizResult?.nextConcept ||
      getNextConcept(mastery);

    if (nextConcept?.id) {
      setActiveConcept(
        nextConcept.id
      );

      setPhysicsScreen("learning");
    } else {
      setPhysicsScreen("dashboard");
    }
  };

  // ============================================================
  // CHAPTER ASSESSMENT
  // ============================================================

  const startChapterAssessment = () => {
    if (!diagnosticCompleted) {
      alert(
        "Please complete the diagnostic assessment first."
      );
      return;
    }

    setPhysicsScreen(
      "chapter-assessment"
    );
  };

  const handleAssessmentComplete = (
    result
  ) => {
    setAssessmentResult(result);

    if (result?.mastery) {
      setMastery(result.mastery);
    } else if (result?.passed) {
      setMastery({
        ...mastery,
        "electric-current": 100,
        "potential-difference": 100,
        resistance: 100,
        "ohms-law": 100,
        "series-parallel": 100,
        "electrical-power": 100
      });
    }

    setPhysicsScreen(
      "assessment-result"
    );
  };

  const exitAssessment = () => {
    setPhysicsScreen("dashboard");
  };

  // ============================================================
  // EXIT PHYSICS
  // ============================================================

  const exitPhysics = () => {
    closeFocusSession();
    setPhysicsScreen(null);
    setShowDashboard(true);
  };

  // ============================================================
  // PHYSICS DASHBOARD
  // ============================================================

  if (physicsScreen === "dashboard") {
    return (
      <div style={physicsStyles.page}>

        {focusActive && (
          <FocusOverlay
            mode={focusMode}
            onExit={closeFocusSession}
            onModeChange={
              handleFocusModeChange
            }
          />
        )}

        <div style={physicsStyles.dashboard}>
          <button
            style={
              physicsStyles.secondaryButton
            }
            onClick={exitPhysics}
          >
            ← Back to Learning Space
          </button>

          <div style={physicsStyles.card}>
            <div style={physicsStyles.label}>
              CLASS {student.classLevel} • EXAM PREP
            </div>

            <h1 style={physicsStyles.title}>
              ⚡ Physics Learning
            </h1>

            <p
              style={
                physicsStyles.subtitle
              }
            >
              Your learning path adapts to what you
              demonstrate you understand.
            </p>

            <div
              style={
                physicsStyles.highlight
              }
            >
              <strong>
                Learn → Recall → Measure → Adapt
              </strong>

              <p
                style={{
                  marginBottom: 0
                }}
              >
                You won't be forced to repeat concepts
                you've already demonstrated.
              </p>
            </div>

            <div
              style={
                physicsStyles.recommendation
              }
            >
              <div
                style={
                  physicsStyles.smallLabel
                }
              >
                RECOMMENDED NEXT CONCEPT
              </div>

              <h2>
                {recommendedConcept?.name ||
                  recommendedConcept?.title ||
                  "Take the diagnostic assessment"}
              </h2>

              <p>
                The prerequisite-aware learning path
                chooses what you should work on next.
              </p>
            </div>

            <div
              style={physicsStyles.actions}
            >
              <button
                style={
                  physicsStyles.button
                }
                onClick={
                  startDiagnostic
                }
              >
                🧪 Take Diagnostic
              </button>

              <button
                style={
                  physicsStyles.secondaryButton
                }
                onClick={() => {
                  if (
                    recommendedConcept?.id
                  ) {
                    startLearning(
                      recommendedConcept.id
                    );
                  } else {
                    startDiagnostic();
                  }
                }}
              >
                📚 Continue Learning
              </button>

              <button
                style={
                  physicsStyles.secondaryButton
                }
                onClick={
                  startChapterAssessment
                }
              >
                📝 Chapter Assessment
              </button>

              <button
                style={
                  physicsStyles.secondaryButton
                }
                onClick={() =>
                  setPhysicsScreen(
                    "knowledge-graph"
                  )
                }
              >
                🗺️ Knowledge Map
              </button>

              {/* IMPORTANT:
                  This no longer changes physicsScreen.
                  It opens the small focus box on top. */}
              <button
                style={
                  physicsStyles.secondaryButton
                }
                onClick={
                  startFocusSession
                }
              >
                ⏱️ Start Focus Session
              </button>

              <button
                style={
                  physicsStyles.secondaryButton
                }
                onClick={() => {
                  setPhysicsScreen(
                    null
                  );
                  setShowRetheming(
                    true
                  );
                }}
              >
                ✨ AI Re-theme Demo
              </button>
            </div>

            <div
              style={physicsStyles.graph}
            >
              <h2>
                Current Concept Mastery
              </h2>

              {!diagnosticCompleted ? (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "20px",
                    borderRadius: "14px",
                    background:
                      "rgba(255,255,255,0.04)",
                    color: "#aeb5c5"
                  }}
                >
                  Complete the diagnostic assessment
                  to see your demonstrated mastery.
                </div>
              ) : (
                Object.entries(
                  mastery
                ).map(
                  ([
                    concept,
                    score
                  ]) => (
                    <div
                      key={concept}
                      style={{
                        marginTop:
                          "14px",
                        padding:
                          "16px",
                        borderRadius:
                          "14px",
                        background:
                          "rgba(255,255,255,0.04)"
                      }}
                    >
                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between"
                        }}
                      >
                        <strong>
                          {concept
                            .replaceAll(
                              "-",
                              " "
                            )
                            .replace(
                              /\b\w/g,
                              (
                                letter
                              ) =>
                                letter.toUpperCase()
                            )}
                        </strong>

                        <strong>
                          {score}%
                        </strong>
                      </div>

                      <div
                        style={{
                          marginTop:
                            "8px",
                          height:
                            "8px",
                          borderRadius:
                            "8px",
                          background:
                            "rgba(255,255,255,0.08)"
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.max(
                              0,
                              Math.min(
                                100,
                                score
                              )
                            )}%`,
                            height:
                              "100%",
                            borderRadius:
                              "8px",
                            background:
                              score >=
                              80
                                ? "#4ade80"
                                : score >=
                                  60
                                ? "#facc15"
                                : "#f87171"
                          }}
                        />
                      </div>
                    </div>
                  )
                )
              )}
            </div>

            {interventionSignals?.length >
              0 && (
              <div
                style={
                  physicsStyles.interventionCard
                }
              >
                <div className="learning-signals">
                  <h3>
                    ⚠️ Learning Signals
                  </h3>

                  {interventionSignals.map(
                    (signal) => (
                      <div
                        key={
                          signal.conceptId
                        }
                        className={`signal-card ${signal.severity}`}
                      >
                        <div className="signal-header">
                          <div>
                            <strong>
                              {
                                signal.conceptName
                              }
                            </strong>

                            <span
                              className={`signal-badge ${signal.severity}`}
                            >
                              {signal.severity.toUpperCase()}
                            </span>
                          </div>

                          <span className="signal-score">
                            {signal.score}%
                          </span>
                        </div>

                        <p className="signal-recommendation">
                          {
                            signal.recommendation
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // DIAGNOSTIC
  // ============================================================

  if (physicsScreen === "diagnostic") {
    return (
      <div
        style={physicsStyles.page}
      >
        <div
          style={
            physicsStyles.dashboard
          }
        >
          <button
            style={
              physicsStyles.secondaryButton
            }
            onClick={() =>
              setPhysicsScreen(
                "dashboard"
              )
            }
          >
            ← Back
          </button>

          <DiagnosticScreen
            onComplete={
              handleDiagnosticComplete
            }
            onBack={() =>
              setPhysicsScreen(
                "dashboard"
              )
            }
          />
        </div>
      </div>
    );
  }

  // ============================================================
  // DIAGNOSTIC RESULT
  // ============================================================

  if (
    physicsScreen ===
    "diagnostic-result"
  ) {
    const nextConcept =
      diagnosticResult?.nextConcept ||
      getNextConcept(mastery);

    return (
      <div
        style={physicsStyles.page}
      >
        <div style={physicsStyles.card}>
          <div style={physicsStyles.label}>
            DIAGNOSTIC COMPLETE
          </div>

          <h1 style={physicsStyles.title}>
            Your learning path is ready
          </h1>

          <p
            style={
              physicsStyles.subtitle
            }
          >
            We used your demonstrated understanding
            to decide what comes next.
          </p>

          {diagnosticResult?.mastery && (
            <div
              style={
                physicsStyles.section
              }
            >
              <strong>
                Concept mastery
              </strong>

              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  marginTop: "15px"
                }}
              >
                {Object.entries(
                  diagnosticResult.mastery
                ).map(
                  ([
                    concept,
                    score
                  ]) => (
                    <div
                      key={concept}
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        padding:
                          "12px",
                        borderRadius:
                          "12px",
                        background:
                          "rgba(255,255,255,0.04)"
                      }}
                    >
                      <span>
                        {concept
                          .replaceAll(
                            "-",
                            " "
                          )
                          .replace(
                            /\b\w/g,
                            (
                              letter
                            ) =>
                              letter.toUpperCase()
                          )}
                      </span>

                      <strong>
                        {score}%
                      </strong>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div
            style={
              physicsStyles.recommendation
            }
          >
            <div
              style={
                physicsStyles.smallLabel
              }
            >
              NEXT RECOMMENDED CONCEPT
            </div>

            <h2>
              {nextConcept?.name ||
                nextConcept?.title ||
                activeConcept
                  ?.replaceAll(
                    "-",
                    " "
                  )
                  .replace(
                    /\b\w/g,
                    (letter) =>
                      letter.toUpperCase()
                  ) ||
                "Continue with your learning path"}
            </h2>

            <p>
              We'll focus on the next concept whose
              prerequisites are demonstrated.
            </p>
          </div>

          <div
            style={physicsStyles.actions}
          >
            <button
              style={
                physicsStyles.button
              }
              onClick={() => {
                const nextId =
                  diagnosticResult
                    ?.nextConcept
                    ?.id ||
                  nextConcept?.id ||
                  activeConcept;

                if (nextId) {
                  startLearning(
                    nextId
                  );
                } else {
                  setPhysicsScreen(
                    "dashboard"
                  );
                }
              }}
            >
              Start Learning →
            </button>

            <button
              style={
                physicsStyles.secondaryButton
              }
              onClick={() =>
                setPhysicsScreen(
                  "dashboard"
                )
              }
            >
              Physics Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // LEARNING SESSION
  // ============================================================

  if (
    physicsScreen === "learning"
  ) {
    const content =
      learningContent?.[
        activeConcept
      ];

    return (
      <div
        style={physicsStyles.page}
      >
        {focusActive && (
          <FocusOverlay
            mode={focusMode}
            onExit={closeFocusSession}
            onModeChange={
              handleFocusModeChange
            }
          />
        )}

        <div style={physicsStyles.card}>
          <div style={physicsStyles.label}>
            PHYSICS • LEARNING SESSION
          </div>

          <h1 style={physicsStyles.title}>
            {content?.title ||
              activeConcept
                ?.replaceAll(
                  "-",
                  " "
                )
                .replace(
                  /\b\w/g,
                  (letter) =>
                    letter.toUpperCase()
                ) ||
              "Learning Session"}
          </h1>

          <p
            style={
              physicsStyles.subtitle
            }
          >
            Learn the concept, then demonstrate your
            understanding with a short recall quiz.
          </p>

          <div
            style={
              physicsStyles.section
            }
          >
            {content?.explanation ||
              content?.description ||
              "Learn the concept and then demonstrate your understanding with a short quiz."}
          </div>

          {content?.formula && (
            <div
              style={
                physicsStyles.formula
              }
            >
              {content.formula}
            </div>
          )}

          {content?.example && (
            <div
              style={
                physicsStyles.example
              }
            >
              <strong>
                Example
              </strong>
              <br />
              {content.example}
            </div>
          )}

          <div
            style={
              physicsStyles.highlight
            }
          >
            <strong>
              No timer by default
            </strong>

            <p
              style={{
                marginBottom: 0
              }}
            >
              Take the time you need to understand
              the concept before moving to recall.
            </p>
          </div>

          <div
            style={physicsStyles.actions}
          >
            <button
              style={
                physicsStyles.button
              }
              onClick={startQuiz}
            >
              🧠 Take Pop Quiz
            </button>

            <button
              style={
                physicsStyles.secondaryButton
              }
              onClick={
                startFocusSession
              }
            >
              ⏱️ Focus Mode
            </button>

            <button
              style={
                physicsStyles.secondaryButton
              }
              onClick={() =>
                setPhysicsScreen(
                  "dashboard"
                )
              }
            >
              ← Physics Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // QUIZ
  // ============================================================

  if (physicsScreen === "quiz") {
    const questions =
      popQuizQuestions[
        activeConcept
      ] || [];

    return (
      <div
        style={physicsStyles.page}
      >
        <div
          style={
            physicsStyles.dashboard
          }
        >
          <QuizScreen
            conceptId={
              activeConcept
            }
            questions={questions}
            onComplete={
              handleQuizComplete
            }
            onBack={() =>
              setPhysicsScreen(
                "learning"
              )
            }
          />
        </div>
      </div>
    );
  }

  // ============================================================
  // REVISION
  // ============================================================

  if (
    physicsScreen === "revision"
  ) {
    return (
      <div
        style={physicsStyles.page}
      >
        <div style={physicsStyles.card}>
          <div style={physicsStyles.label}>
            TARGETED REVISION
          </div>

          <h1 style={physicsStyles.title}>
            Let's strengthen this concept
          </h1>

          <p
            style={
              physicsStyles.subtitle
            }
          >
            Your quiz showed that this concept needs
            more practice before progression.
          </p>

          <div
            style={
              physicsStyles.interventionCard
            }
          >
            <strong>
              Revision required
            </strong>

            <p>
              We'll focus specifically on the parts
              that caused difficulty instead of forcing
              you to repeat everything.
            </p>
          </div>

          <RevisionScreen
            conceptId={activeConcept}
            onContinue={startReassessment}
          />
          <div
            style={physicsStyles.actions}
          >
            <button
              style={
                physicsStyles.secondaryButton
              }
              onClick={() =>
                setPhysicsScreen(
                  "dashboard"
                )
              }
            >
              ← Physics Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // QUIZ RESULT
  // ============================================================

  if (
    physicsScreen === "result"
  ) {
    return (
      <div
        style={physicsStyles.page}
      >
        <div style={physicsStyles.card}>
          <div style={physicsStyles.label}>
            CONCEPT CHECK COMPLETE
          </div>

          <h1 style={physicsStyles.title}>
            {quizResult?.passed
              ? "Concept demonstrated 🎉"
              : "Let's keep working"}
          </h1>

          <div
            style={physicsStyles.score}
          >
            {quizResult?.score ?? 0}%
          </div>

          <p
            style={
              physicsStyles.subtitle
            }
          >
            {quizResult?.passed
              ? "You demonstrated enough understanding to progress."
              : "This concept needs another targeted revision."}
          </p>

          <div
            style={physicsStyles.actions}
          >
            {quizResult?.passed ? (
              <button
                style={
                  physicsStyles.button
                }
                onClick={
                  continueAfterResult
                }
              >
                Continue Learning →
              </button>
            ) : (
              <button
                style={
                  physicsStyles.button
                }
                onClick={() =>
                  setPhysicsScreen(
                    "revision"
                  )
                }
              >
                Start Targeted Revision →
              </button>
            )}

            <button
              style={
                physicsStyles.secondaryButton
              }
              onClick={() =>
                setPhysicsScreen(
                  "dashboard"
                )
              }
            >
              Physics Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // CHAPTER ASSESSMENT
  // ============================================================

  if (
    physicsScreen ===
    "chapter-assessment"
  ) {
    return (
      <div
        style={physicsStyles.page}
      >
        <div
          style={
            physicsStyles.dashboard
          }
        >
          <ChapterAssessment
            mastery={mastery}
            onComplete={
              handleAssessmentComplete
            }
            onExit={
              exitAssessment
            }
            onBack={
              exitAssessment
            }
          />
        </div>
      </div>
    );
  }

  // ============================================================
  // ASSESSMENT RESULT
  // ============================================================

  if (
    physicsScreen ===
    "assessment-result"
  ) {
    return (
      <div
        style={physicsStyles.page}
      >
        <div style={physicsStyles.card}>
          <div style={physicsStyles.label}>
            CHAPTER ASSESSMENT
          </div>

          <h1 style={physicsStyles.title}>
            Assessment complete
          </h1>

          <p
            style={
              physicsStyles.subtitle
            }
          >
            {assessmentResult?.passed
              ? "You demonstrated mastery across the chapter."
              : "Some concepts still need more evidence of understanding."}
          </p>

          {assessmentResult?.score !==
            undefined && (
            <div
              style={
                physicsStyles.score
              }
            >
              {assessmentResult.score}%
            </div>
          )}

          <div
            style={physicsStyles.actions}
          >
            <button
              style={
                physicsStyles.button
              }
              onClick={() =>
                setPhysicsScreen(
                  "dashboard"
                )
              }
            >
              Back to Physics
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // KNOWLEDGE GRAPH
  // ============================================================

  if (
    physicsScreen ===
    "knowledge-graph"
  ) {
    return (
      <div
        style={physicsStyles.page}
      >
        <div
          style={physicsStyles.dashboard}
        >

          {/* BACK TO PHYSICS DASHBOARD */}
          <button
            style={{
              ...physicsStyles.secondaryButton,
              marginBottom: "20px"
            }}
            onClick={() =>
              setPhysicsScreen("dashboard")
            }
          >
            ← Back to Physics Dashboard
          </button>

          <KnowledgeGraph
            mastery={mastery}
          />

        </div>
      </div>
    );
  }

  // ============================================================
  // AI RE-THEMING
  // ============================================================

  if (showRetheming) {
    return (
      <div>
        <button
          onClick={() =>
            setShowRetheming(
              false
            )
          }
          style={{
            margin: "20px",
            padding: "10px 18px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>

        <RethemingDemo />
      </div>
    );
  }

  // ============================================================
  // MENTOR
  // ============================================================

  if (role === "mentor") {
    return (
      <div>
        <button
          onClick={() =>
            setRole(null)
          }
          style={{
            margin: "20px",
            padding: "10px 18px",
            cursor: "pointer"
          }}
        >
          ← Back to Role Selection
        </button>

        <InterventionDashboard />
      </div>
    );
  }

  // ============================================================
  // PSYCHOLOGY
  // ============================================================

  if (showPsychology) {
    return (
      <Psychology
        student={student}
        onBack={() =>
          setShowPsychology(false)
        }
      />
    );
  }

  // ============================================================
  // PROFILE REVEAL
  // ============================================================

  if (showProfileReveal) {
    return (
      <div className="profile-reveal-page">
        <div className="profile-reveal-glow"></div>

        <div className="profile-reveal-card">
          <div className="profile-reveal-top">
            <span className="profile-reveal-label">
              ✨ YOUR PERSONALIZED LEARNING PROFILE
            </span>

            <span className="profile-ready">
              READY
            </span>
          </div>

          <div className="profile-avatar">
            {student.name
              ? student.name
                  .charAt(0)
                  .toUpperCase()
              : "L"}
          </div>

          <h1>
            We learned a little about you,
            <span>
              {" "}
              {student.name ||
                "Learner"}.
            </span>
          </h1>

          <p className="profile-reveal-subtitle">
            Here's how we'll personalize your learning
            experience.
          </p>

          <div className="profile-traits">
            {profileTraits.map(
              (trait, index) => (
                <div
                  className="profile-trait"
                  key={trait.title}
                  style={{
                    animationDelay: `${index * 0.08}s`
                  }}
                >
                  <div className="trait-icon">
                    {trait.icon}
                  </div>

                  <div className="trait-content">
                    <strong>
                      {trait.title}
                    </strong>

                    <p>
                      {trait.text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          {student.interests && (
            <div className="personalization-box">
              <div className="personalization-icon">
                ✨
              </div>

              <div>
                <strong>
                  We'll connect learning to what you love.
                </strong>

                <p>
                  {student.interests}
                  {student.extracurricular
                    ? ` • ${student.extracurricular}`
                    : ""}
                </p>
              </div>
            </div>
          )}

          <div className="profile-footer">
            <div>
              <span className="mini-dot"></span>
              Profile created
            </div>

            <div>
              <span className="mini-dot"></span>
              Ready to adapt
            </div>

            <div>
              <span className="mini-dot"></span>
              Student-first
            </div>
          </div>

          <button
            className="profile-enter-button"
            onClick={() => {
              setShowProfileReveal(
                false
              );
              setShowDashboard(
                true
              );
            }}
          >
            Enter My Learning Space →
          </button>

          <button
            className="profile-back-button"
            onClick={() =>
              setShowProfileReveal(
                false
              )
            }
          >
            ← Review my answers
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // STUDENT DASHBOARD
  // ============================================================

  if (showDashboard) {
    const overallProgress =
      diagnosticCompleted
        ? Math.round(
            Object.values(
              mastery
            ).reduce(
              (
                sum,
                value
              ) =>
                sum + value,
              0
            ) /
              Math.max(
                1,
                Object.values(
                  mastery
                ).length
              )
          )
        : 0;

    return (
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <p className="dashboard-small">
              YOUR PERSONAL LEARNING SPACE
            </p>

            <h1>
              Hi,{" "}
              {student.name ||
                "Learner"} 👋
            </h1>

            <p className="dashboard-subtitle">
              Your learning experience adapts to you.
            </p>
          </div>

          <div
            className="streak-card"
            onClick={() =>
              alert(
                "Keep learning every day to increase your streak!"
              )
            }
          >
            <span>🔥</span>

            <div>
              <strong>
                3 Day Streak
              </strong>

              <small>
                Keep it going!
              </small>
            </div>
          </div>
        </div>

        <div className="personalized-banner">
          <div className="banner-icon">
            ✨
          </div>

          <div>
            <strong>
              Your learning experience is personalized
            </strong>

            <p>
              Built around your goals, preferences,
              interests and learning habits.
            </p>
          </div>

          <div className="banner-tag">
            Class {student.classLevel}
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-info">
            <div>
              <h2>
                Your Learning Progress
              </h2>

              <p>
                Build your knowledge one concept at a time.
              </p>
            </div>

            <strong>
              {diagnosticCompleted
                ? `${overallProgress}%`
                : "Not assessed"}
            </strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${overallProgress}%`
              }}
            ></div>
          </div>

          <div className="progress-caption">
            <span>
              Adaptive progress
            </span>

            <span>
              {diagnosticCompleted
                ? "Continue your learning path"
                : "Next: Diagnostic assessment"}
            </span>
          </div>
        </div>

        <h2 className="section-title">
          What would you like to do?
        </h2>

        <div className="learning-options">
          <div
            className="learning-card exam-card"
            onClick={
              startPhysics
            }
          >
            <div className="card-top-row">
              <div className="card-icon">
                📚
              </div>

              <span className="card-status">
                CLASS{" "}
                {student.classLevel}
              </span>
            </div>

            <h2>
              Exam Prep
            </h2>

            <p>
              Prepare for your Class 10 exams with a
              learning path adapted to your current
              understanding.
            </p>

            <div className="card-preview">
              <span>
                ⚡ Physics
              </span>

              <span>•</span>

              <span>
                Adaptive path
              </span>
            </div>

            <span className="card-action">
              Start Learning →
            </span>
          </div>

          <div
            className="learning-card interest-card"
            onClick={() =>
              setShowPsychology(
                true
              )
            }
          >
            <div className="card-top-row">
              <div className="card-icon">
                ✨
              </div>

              <span className="card-status">
                EXPLORE
              </span>
            </div>

            <h2>
              Explore Interests
            </h2>

            <p>
              Discover topics beyond your school
              curriculum and connect learning with
              what you enjoy.
            </p>

            <div className="card-preview">
              <span>
                🧠 Psychology
              </span>

              <span>•</span>

              <span>
                Curiosity mode
              </span>
            </div>

            <span className="card-action">
              Explore →
            </span>
          </div>
        </div>

        <h2 className="section-title">
          🧠 Your Learning Profile
        </h2>

        <div className="profile-summary">
          <div className="summary-item">
            <span>🎯</span>

            <div>
              <small>
                YOUR GOAL
              </small>

              <strong>
                {student.learningGoal ||
                  "Understanding concepts"}
              </strong>
            </div>
          </div>

          <div className="summary-item">
            <span>💡</span>

            <div>
              <small>
                EXPLANATIONS
              </small>

              <strong>
                {getExplanationShort()}
              </strong>
            </div>
          </div>

          <div className="summary-item">
            <span>⏱️</span>

            <div>
              <small>
                FOCUS TIME
              </small>

              <strong>
                {getFocusTime()}
              </strong>
            </div>
          </div>

          <div className="summary-item">
            <span>📍</span>

            <div>
              <small>
                STUDY SPACE
              </small>

              <strong>
                {student.studyPlace ||
                  "Flexible"}
              </strong>
            </div>
          </div>

          <div className="summary-item">
            <span>🧩</span>

            <div>
              <small>
                CHALLENGE STYLE
              </small>

              <strong>
                {getChallengeShort()}
              </strong>
            </div>
          </div>

          <div className="summary-item">
            <span>🚀</span>

            <div>
              <small>
                MOTIVATION
              </small>

              <strong>
                {student.motivation ||
                  "Progress"}
              </strong>
            </div>
          </div>
        </div>

      <StudentAIChatbot
        student={student}
        mastery={mastery}
        activeConcept={activeConcept}
        recommendedConcept={recommendedConcept}
        interventionSignals={interventionSignals}
      />



        <h2 className="section-title">
          🏆 Your Badges
        </h2>

        <div className="badges-grid">
          {badges.map(
            (badge) => (
              <div
                key={
                  badge.title
                }
                className={`badge-card ${
                  badge.unlocked
                    ? ""
                    : "badge-locked"
                }`}
                onClick={() =>
                  setSelectedBadge(
                    badge
                  )
                }
              >
                <div className="large-badge">
                  {badge.emoji}
                </div>

                <h3>
                  {badge.title}
                </h3>

                <p>
                  {badge.unlocked
                    ? "Unlocked ✓"
                    : "Locked 🔒"}
                </p>
              </div>
            )
          )}
        </div>

        {selectedBadge && (
          <div
            className="badge-overlay"
            onClick={() =>
              setSelectedBadge(
                null
              )
            }
          >
            <div
              className="badge-popup"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="popup-badge">
                {
                  selectedBadge.emoji
                }
              </div>

              <h2>
                {
                  selectedBadge.title
                }
              </h2>

              <p>
                {
                  selectedBadge.description
                }
              </p>

              <strong>
                {selectedBadge.unlocked
                  ? "✓ Unlocked"
                  : "🔒 Keep learning to unlock"}
              </strong>

              <button
                onClick={() =>
                  setSelectedBadge(
                    null
                  )
                }
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="dashboard-bottom">
          <div className="mini-section">
            <h2>
              ✨ What makes you, you?
            </h2>

            <div className="interest-tags">
              {student.interests ? (
                <span>
                  {
                    student.interests
                  }
                </span>
              ) : (
                <span>
                  Your interests will personalize
                  future lessons.
                </span>
              )}

              {student.extracurricular && (
                <span>
                  {
                    student.extracurricular
                  }
                </span>
              )}
            </div>

            <p>
              Your interests can be used to make
              examples, explanations and challenges
              more relevant to you.
            </p>
          </div>

          <div className="mini-section">
            <h2>
              ⚡ Your next step
            </h2>

            <div
              className="next-step-card"
              onClick={
                startDiagnostic
              }
              style={{
                cursor: "pointer"
              }}
            >
              <div className="next-step-icon">
                🧪
              </div>

              <div>
                <strong>
                  Take your diagnostic assessment
                </strong>

                <p>
                  We'll figure out what you already know
                  before deciding what you need to learn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // ROLE SELECTION
  // ============================================================

  if (!role) {
    return (
      <div className="app">
        <div className="welcome-card">
          <div className="question-number">
            ✨
          </div>

          <h1>
            Personalized Learning
          </h1>

          <p>
            Choose how you want to enter the platform.
          </p>

          <div className="interest-list">
            <button
              onClick={() =>
                setRole("student")
              }
              style={{
                width: "100%",
                padding: "18px",
                marginBottom:
                  "15px",
                cursor: "pointer",
                fontSize: "18px"
              }}
            >
              👩‍🎓 Student
              <br />

              <small>
                Enter my learning space
              </small>
            </button>

            <button
              onClick={() =>
                setRole("mentor")
              }
              style={{
                width: "100%",
                padding: "18px",
                cursor: "pointer",
                fontSize: "18px"
              }}
            >
              👨‍🏫 Mentor
              <br />

              <small>
                View student progress and interventions
              </small>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // ONBOARDING
  // ============================================================

  return (
    <div className="app">
      <div className="welcome-card">
        <div className="onboarding-progress">
          <div className="progress-top">
            <span>
              BUILDING YOUR LEARNING PROFILE
            </span>

            <strong>
              {step}/{totalSteps}
            </strong>
          </div>

          <div className="onboarding-track">
            <div
              className="onboarding-fill"
              style={{
                width: `${progress}%`
              }}
            ></div>
          </div>
        </div>

        {/* ======================================================
            STEP 1
        ====================================================== */}

        {step === 1 && (
          <>
            <div className="question-number">
              01
            </div>

            <h1>
              👋 Let's start with you.
            </h1>

            <p>
              Before we teach you, we want to
              understand you.
            </p>

            <label>
              What should we call you?
            </label>

            <input
              type="text"
              placeholder="Your name"
              value={
                student.name
              }
              onChange={(event) =>
                updateStudent(
                  "name",
                  event.target.value
                )
              }
              autoFocus
            />

            <button
              onClick={() => {
                if (
                  !student.name.trim()
                ) {
                  alert(
                    "Tell us your name first 🙂"
                  );
                  return;
                }

                nextStep();
              }}
            >
              Let's go →
            </button>
          </>
        )}

        {/* ======================================================
            STEP 2
        ====================================================== */}

        {step === 2 && (
          <>
            <div className="question-number">
              02
            </div>

            <h1>
              🎯 Where are you headed?
            </h1>

            <p>
              Tell us what you're working toward so
              your learning path has a purpose.
            </p>

            <label>
              What matters most to you?
            </label>

            <div className="interest-list">
              {[
                "Getting better grades",
                "Understanding concepts deeply",
                "Preparing for an exam",
                "Building confidence",
                "Learning because I'm curious"
              ].map(
                (goal) => (
                  <label
                    key={goal}
                    className={`interest-option ${
                      student.learningGoal ===
                      goal
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="goal"
                      checked={
                        student.learningGoal ===
                        goal
                      }
                      onChange={() =>
                        updateStudent(
                          "learningGoal",
                          goal
                        )
                      }
                    />

                    <span>
                      {goal}
                    </span>
                  </label>
                )
              )}
            </div>

            <label>
              What class are you currently in?
            </label>

            <select
              value={
                student.classLevel
              }
              onChange={(event) =>
                updateStudent(
                  "classLevel",
                  event.target.value
                )
              }
            >
              <option value="10">
                Class 10
              </option>

              <option value="9">
                Class 9
              </option>

              <option value="11">
                Class 11
              </option>

              <option value="12">
                Class 12
              </option>
            </select>

            <button
              onClick={() => {
                if (
                  !student.learningGoal
                ) {
                  alert(
                    "Choose the goal that fits you best."
                  );
                  return;
                }

                nextStep();
              }}
            >
              Continue →
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}

        {/* ======================================================
            STEP 3
        ====================================================== */}

        {step === 3 && (
          <>
            <div className="question-number">
              03
            </div>

            <h1>
              🧠 How should we explain things?
            </h1>

            <p>
              Imagine you're stuck on a difficult
              concept. What would make it click?
            </p>

            <label>
              Pick what sounds most helpful.
            </label>

            <div className="interest-list">
              {[
                "Show me a visual or diagram",
                "Give me a real-life example",
                "Explain it step-by-step",
                "Let me try a question",
                "Start simple, then go deeper"
              ].map(
                (style) => (
                  <label
                    key={style}
                    className={`interest-option ${
                      student.explanationStyle ===
                      style
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="explanation"
                      checked={
                        student.explanationStyle ===
                        style
                      }
                      onChange={() =>
                        updateStudent(
                          "explanationStyle",
                          style
                        )
                      }
                    />

                    <span>
                      {style}
                    </span>
                  </label>
                )
              )}
            </div>

            <button
              onClick={() => {
                if (
                  !student.explanationStyle
                ) {
                  alert(
                    "Choose the explanation style that feels most natural."
                  );
                  return;
                }

                nextStep();
              }}
            >
              Continue →
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}

        {/* ======================================================
            STEP 4
        ====================================================== */}

        {step === 4 && (
          <>
            <div className="question-number">
              04
            </div>

            <h1>
              ⏱️ How does your focus work?
            </h1>

            <p>
              We'll use this to shape your learning
              sessions and breaks.
            </p>

            <label>
              How long can you comfortably focus?
            </label>

            <select
              value={
                student.attentionSpan
              }
              onChange={(event) =>
                updateStudent(
                  "attentionSpan",
                  event.target.value
                )
              }
            >
              <option value="">
                Choose a focus duration
              </option>

              <option value="10">
                10 minutes
              </option>

              <option value="15">
                15 minutes
              </option>

              <option value="25">
                25 minutes
              </option>

              <option value="40">
                40 minutes
              </option>

              <option value="50">
                50 minutes
              </option>

              <option value="custom">
                Something else
              </option>
            </select>

            {student.attentionSpan ===
              "custom" && (
              <>
                <label>
                  Your preferred duration
                </label>

                <input
                  type="number"
                  min="1"
                  max="180"
                  placeholder="Example: 35"
                  value={
                    student.customAttentionSpan
                  }
                  onChange={(event) =>
                    updateStudent(
                      "customAttentionSpan",
                      event.target.value
                    )
                  }
                />
              </>
            )}

            <button
              onClick={() => {
                if (
                  !student.attentionSpan
                ) {
                  alert(
                    "Choose a focus duration."
                  );
                  return;
                }

                if (
                  student.attentionSpan ===
                    "custom" &&
                  (!student.customAttentionSpan ||
                    Number(
                      student.customAttentionSpan
                    ) < 1)
                ) {
                  alert(
                    "Enter a valid duration."
                  );
                  return;
                }

                nextStep();
              }}
            >
              Continue →
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}

        {/* ======================================================
            STEP 5
        ====================================================== */}

        {step === 5 && (
          <>
            <div className="question-number">
              05
            </div>

            <h1>
              📍 Where do you learn best?
            </h1>

            <p>
              Your environment can affect how we
              structure your sessions.
            </p>

            <label>
              Pick the place that feels most like you.
            </label>

            <div className="interest-list">
              {[
                "Quiet room",
                "Library or study space",
                "Some background noise",
                "Outdoors",
                "It depends on the day"
              ].map(
                (place) => (
                  <label
                    key={place}
                    className={`interest-option ${
                      student.studyPlace ===
                      place
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="place"
                      checked={
                        student.studyPlace ===
                        place
                      }
                      onChange={() =>
                        updateStudent(
                          "studyPlace",
                          place
                        )
                      }
                    />

                    <span>
                      {place}
                    </span>
                  </label>
                )
              )}
            </div>

            <button
              onClick={() => {
                if (
                  !student.studyPlace
                ) {
                  alert(
                    "Choose the environment where you usually learn best."
                  );
                  return;
                }

                nextStep();
              }}
            >
              Continue →
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}

        {/* ======================================================
            STEP 6
        ====================================================== */}

        {step === 6 && (
          <>
            <div className="question-number">
              06
            </div>

            <h1>
              🎧 What gets you into the zone?
            </h1>

            <p>
              Think about the little things that make
              studying easier.
            </p>

            <label>
              Choose what sounds most like you.
            </label>

            <div className="interest-list">
              {[
                "Complete silence",
                "Music in the background",
                "Short breaks",
                "Changing activities",
                "Having someone nearby"
              ].map(
                (environment) => (
                  <label
                    key={
                      environment
                    }
                    className={`interest-option ${
                      student.studyEnvironment ===
                      environment
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="environment"
                      checked={
                        student.studyEnvironment ===
                        environment
                      }
                      onChange={() =>
                        updateStudent(
                          "studyEnvironment",
                          environment
                        )
                      }
                    />

                    <span>
                      {environment}
                    </span>
                  </label>
                )
              )}
            </div>

            <button
              onClick={() => {
                if (
                  !student.studyEnvironment
                ) {
                  alert(
                    "Pick the option that best describes you."
                  );
                  return;
                }

                nextStep();
              }}
            >
              Continue →
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}

        {/* ======================================================
            STEP 7
        ====================================================== */}

        {step === 7 && (
          <>
            <div className="question-number">
              07
            </div>

            <h1>
              ❤️ What are you into?
            </h1>

            <p>
              This is where learning can start feeling
              genuinely personal.
            </p>

            <label>
              What could you get completely absorbed in?
            </label>

            <textarea
              placeholder="Badminton, F1, music, gaming, psychology, drawing..."
              value={
                student.interests
              }
              onChange={(event) =>
                updateStudent(
                  "interests",
                  event.target.value
                )
              }
            />

            <label>
              Anything else you love doing?
            </label>

            <textarea
              placeholder="Sports, hobbies, clubs, creative activities..."
              value={
                student.extracurricular
              }
              onChange={(event) =>
                updateStudent(
                  "extracurricular",
                  event.target.value
                )
              }
            />

            <button
              onClick={
                nextStep
              }
            >
              Continue →
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}

        {/* ======================================================
            STEP 8
        ====================================================== */}

        {step === 8 && (
          <>
            <div className="question-number">
              08
            </div>

            <h1>
              😤 What frustrates you?
            </h1>

            <p>
              Knowing this helps us avoid teaching you
              in a way that gets in your way.
            </p>

            <label>
              What bothers you most?
            </label>

            <div className="interest-list">
              {[
                "Too much information at once",
                "Repeating things I already know",
                "Not knowing where to start",
                "Difficult questions too early",
                "Long explanations"
              ].map(
                (problem) => (
                  <label
                    key={problem}
                    className={`interest-option ${
                      student.frustration ===
                      problem
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="frustration"
                      checked={
                        student.frustration ===
                        problem
                      }
                      onChange={() =>
                        updateStudent(
                          "frustration",
                          problem
                        )
                      }
                    />

                    <span>
                      {problem}
                    </span>
                  </label>
                )
              )}
            </div>

            <button
              onClick={() => {
                if (
                  !student.frustration
                ) {
                  alert(
                    "Choose what frustrates you most."
                  );
                  return;
                }

                nextStep();
              }}
            >
              Continue →
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}

        {/* ======================================================
            STEP 9
        ====================================================== */}

        {step === 9 && (
          <>
            <div className="question-number">
              09
            </div>

            <h1>
              🧩 How should we handle challenges?
            </h1>

            <p>
              Your answers can help us decide how quickly
              to increase difficulty.
            </p>

            <label>
              Which sounds most like you?
            </label>

            <div className="interest-list">
              {[
                "Start easy and build up",
                "Challenge me quickly",
                "Give me hints when I struggle",
                "Let me choose the difficulty"
              ].map(
                (challenge) => (
                  <label
                    key={challenge}
                    className={`interest-option ${
                      student.challengeStyle ===
                      challenge
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="challenge"
                      checked={
                        student.challengeStyle ===
                        challenge
                      }
                      onChange={() =>
                        updateStudent(
                          "challengeStyle",
                          challenge
                        )
                      }
                    />

                    <span>
                      {challenge}
                    </span>
                  </label>
                )
              )}
            </div>

            <label>
              When you make a mistake, what would you
              prefer?
            </label>

            <div className="interest-list">
              {[
                "Tell me exactly where I went wrong",
                "Give me a hint first",
                "Show me a similar example",
                "Let me try again without help"
              ].map(
                (preference) => (
                  <label
                    key={
                      preference
                    }
                    className={`interest-option ${
                      student.mistakePreference ===
                      preference
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="mistake"
                      checked={
                        student.mistakePreference ===
                        preference
                      }
                      onChange={() =>
                        updateStudent(
                          "mistakePreference",
                          preference
                        )
                      }
                    />

                    <span>
                      {preference}
                    </span>
                  </label>
                )
              )}
            </div>

            <button
              onClick={() => {
                if (
                  !student.challengeStyle
                ) {
                  alert(
                    "Choose how you'd like challenges to work."
                  );
                  return;
                }

                if (
                  !student.mistakePreference
                ) {
                  alert(
                    "Choose how you'd like to learn from mistakes."
                  );
                  return;
                }

                nextStep();
              }}
            >
              Continue →
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}

        {/* ======================================================
            STEP 10
        ====================================================== */}

        {step === 10 && (
          <>
            <div className="question-number">
              10
            </div>

            <h1>
              🚀 What keeps you going?
            </h1>

            <p>
              Your motivation can shape how the app
              encourages you.
            </p>

            <label>
              What would make you want to keep learning?
            </label>

            <div className="interest-list">
              {[
                "Seeing my progress",
                "Streaks",
                "Unlocking badges",
                "Friendly challenges",
                "Knowing I'm improving"
              ].map(
                (motivation) => (
                  <label
                    key={
                      motivation
                    }
                    className={`interest-option ${
                      student.motivation ===
                      motivation
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="motivation"
                      checked={
                        student.motivation ===
                        motivation
                      }
                      onChange={() =>
                        updateStudent(
                          "motivation",
                          motivation
                        )
                      }
                    />

                    <span>
                      {motivation}
                    </span>
                  </label>
                )
              )}
            </div>

            <label>
              What should your study sessions feel like?
            </label>

            <select
              value={
                student.sessionStyle
              }
              onChange={(event) =>
                updateStudent(
                  "sessionStyle",
                  event.target.value
                )
              }
            >
              <option value="">
                Choose a style
              </option>

              <option value="Calm and focused">
                Calm and focused
              </option>

              <option value="Fast-paced">
                Fast-paced
              </option>

              <option value="Interactive">
                Interactive
              </option>

              <option value="Like a game">
                Like a game
              </option>

              <option value="Like a personal tutor">
                Like a personal tutor
              </option>
            </select>

            <button
              onClick={
                finishOnboarding
              }
            >
              Build My Learning Experience ✨
            </button>

            <button
              onClick={
                previousStep
              }
              className="back-button"
            >
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// PHYSICS STYLES
// ============================================================

const physicsStyles = {
  /*
    IMPORTANT:
    The Exam Prep page itself is now full screen.
  */
  page: {
    width: "100%",
    minHeight: "100vh",
    padding: "24px",
    boxSizing: "border-box",
    background: "#050812"
  },

  dashboard: {
    width: "1200px",
    maxWidth: "100%",
    margin: "0 auto",
    boxSizing: "border-box"
  },

  /*
    IMPORTANT:
    Removed maxHeight: 360px.
    That was forcing the Exam Prep content
    into a tiny scroll box.
  */
  card: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    boxSizing: "border-box",
    paddingBottom: "40px"
  },

  label: {
    color: "#8e96a9",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px"
  },

  title: {
    margin: "12px 0 8px",
    fontSize: "32px",
    letterSpacing: "-0.8px"
  },

  subtitle: {
    color: "#8f97aa",
    fontSize: "14px",
    lineHeight: "1.6"
  },

  section: {
    marginTop: "28px",
    color: "#cbd0dc",
    lineHeight: "1.7"
  },

  formula: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "15px",
    background:
      "rgba(128,104,245,0.1)",
    color: "#b7a9ff",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "800"
  },

  example: {
    marginTop: "20px",
    padding: "18px",
    borderRadius: "14px",
    background:
      "rgba(255,255,255,0.03)",
    color: "#aeb5c5",
    lineHeight: "1.6"
  },

  highlight: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "16px",
    background:
      "rgba(128,104,245,0.09)",
    border:
      "1px solid rgba(128,104,245,0.18)"
  },

  recommendation: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, rgba(128,104,245,0.14), rgba(40,180,200,0.07))",
    border:
      "1px solid rgba(139,112,255,0.22)"
  },

  interventionCard: {
    marginTop: "18px",
    padding: "22px",
    borderRadius: "18px",
    background:
      "rgba(248,113,113,0.07)",
    border:
      "1px solid rgba(248,113,113,0.18)"
  },

  smallLabel: {
    color: "#858da0",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1px"
  },

  button: {
    marginTop: "20px",
    border: "none",
    borderRadius: "13px",
    padding: "14px 23px",
    color: "white",
    fontWeight: "750",
    fontSize: "13px",
    background:
      "linear-gradient(90deg,#8a70ff,#6656ed)",
    cursor: "pointer"
  },

  secondaryButton: {
    marginTop: "20px",
    border:
      "1px solid rgba(139,112,255,0.35)",
    borderRadius: "13px",
    padding: "14px 23px",
    color: "#c9c0ff",
    fontWeight: "700",
    fontSize: "13px",
    background:
      "rgba(128,104,245,0.08)",
    cursor: "pointer"
  },

  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "25px"
  },

  graph: {
    marginTop: "35px"
  },

  score: {
    marginTop: "25px",
    color: "#a995ff",
    fontSize: "52px",
    fontWeight: "800"
  }
};

// ============================================================
// FOCUS STYLES
// ============================================================

const focusStyles = {
  /*
    FOCUS MODE
    ------------------------------------------------------------
    Small box at the top.
    The Exam Prep page remains visible.
    It does NOT block the rest of the page.
  */
  focusOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    pointerEvents: "none"
  },

  focusWindow: {
    width: "min(520px, 92vw)",
    maxHeight: "calc(100vh - 20px)",
    overflow: "visible",
    pointerEvents: "auto",
    borderRadius: "0 0 20px 20px",
    boxShadow:
      "0 18px 45px rgba(0,0,0,0.45)"
  },

  /*
    BREAK MODE
    ------------------------------------------------------------
    Full screen.
    Dark background.
    Blocks the course completely.
  */
  breakOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 10000,
    width: "100vw",
    height: "100vh",
    background:
      "rgba(3,5,12,0.94)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter:
      "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    pointerEvents: "auto",
    boxSizing: "border-box",
    padding: "24px"
  },

  breakWindow: {
    width: "min(900px, 94vw)",
    maxHeight: "92vh",
    overflowY: "auto",
    pointerEvents: "auto",
    borderRadius: "26px",
    boxShadow:
      "0 30px 100px rgba(0,0,0,0.7)"
  }
};

export default App;