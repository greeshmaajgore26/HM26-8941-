import { useState } from "react";
import canonicalQuestion from "../data/canonicalQuestion";
import { rethemeQuestion } from "./rethemeQuestion";
import { validateQuestion } from "./validateQuestion";

function RethemingDemo() {
  const [theme, setTheme] = useState("football");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showValidation, setShowValidation] = useState(false);

  const generatedQuestion = rethemeQuestion(
    canonicalQuestion,
    theme
  );

  const validation = validateQuestion(
    canonicalQuestion,
    generatedQuestion
  );

  const correctAnswer = String(
    generatedQuestion.correctAnswer
  ).trim();

  const themeInfo = {
    football: {
      icon: "⚽",
      name: "Football",
      title: "Football Training Challenge",
    },
    marine: {
      icon: "🌊",
      name: "Marine Science",
      title: "Marine Science Challenge",
    },
    finance: {
      icon: "💰",
      name: "Finance",
      title: "Finance Challenge",
    },
  };

  const currentTheme = themeInfo[theme];

  const options = [
    correctAnswer,
    "7",
    "2.5",
    "25",
  ].filter(
    (value, index, array) =>
      array.indexOf(value) === index
  );

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const isCorrect =
    selectedAnswer !== null &&
    String(selectedAnswer).trim() === correctAnswer;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.badge}>
            AI PERSONALIZED LEARNING
          </div>

          <h1 style={styles.title}>
            🤖 AI Contextual Re-Theming
          </h1>

          <p style={styles.subtitle}>
            The learning objective stays the same while
            the story adapts to what you are interested in.
          </p>
        </div>

        {/* INTEREST SELECTION */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            ✨ Choose Your Interest
          </h2>

          <p style={styles.mutedText}>
            Pick an interest and see the same learning
            concept presented in a new context.
          </p>

          <div style={styles.themeRow}>
            {Object.entries(themeInfo).map(
              ([key, info]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  style={{
                    ...styles.themeButton,
                    ...(theme === key
                      ? styles.activeTheme
                      : {}),
                  }}
                >
                  <span style={styles.themeIcon}>
                    {info.icon}
                  </span>

                  <span>{info.name}</span>

                  {theme === key && (
                    <span style={styles.check}>
                      ✓
                    </span>
                  )}
                </button>
              )
            )}
          </div>
        </div>

        {/* STUDENT QUESTION */}
        <div style={styles.questionCard}>

          <div style={styles.questionTop}>
            <div>
              <div style={styles.label}>
                PERSONALIZED CHALLENGE
              </div>

              <h2 style={styles.questionTitle}>
                {currentTheme.icon}{" "}
                {currentTheme.title}
              </h2>
            </div>

            <div style={styles.difficulty}>
              Medium
            </div>
          </div>

          <div style={styles.questionBox}>
            <div style={styles.label}>
              YOUR QUESTION
            </div>

            <p style={styles.question}>
              {generatedQuestion.question}
            </p>
          </div>

          <h3 style={styles.answerHeading}>
            What is your answer?
          </h3>

          <div style={styles.options}>
            {options.map((option) => {
              const selected =
                selectedAnswer === option;

              let optionStyle = styles.option;

              if (selected && isCorrect) {
                optionStyle = {
                  ...styles.option,
                  ...styles.correctOption,
                };
              }

              if (selected && !isCorrect) {
                optionStyle = {
                  ...styles.option,
                  ...styles.wrongOption,
                };
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  style={optionStyle}
                >
                  {option} {generatedQuestion.answerUnit}
                </button>
              );
            })}
          </div>

          {/* RESULT */}
          {selectedAnswer !== null && (
            <div
              style={
                isCorrect
                  ? styles.correctMessage
                  : styles.retryMessage
              }
            >
              <div style={styles.resultIcon}>
                {isCorrect ? "🎉" : "💡"}
              </div>

              <div>
                <h3 style={styles.resultTitle}>
                  {isCorrect
                    ? "Correct!"
                    : "Not quite yet"}
                </h3>

                <p style={styles.resultText}>
                  {isCorrect
                    ? "Great job! You demonstrated understanding of the concept."
                    : "Try again. Think about the relationship between the values given in the question."}
                </p>

                {isCorrect && (
                  <div style={styles.concept}>
                    ✓ Concept demonstrated:{" "}
                    {canonicalQuestion.concept}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* LEARNING OBJECTIVE */}
        <div style={styles.objectiveCard}>
          <div style={styles.objectiveIcon}>
            🎯
          </div>

          <div>
            <div style={styles.label}>
              WHAT STAYS THE SAME?
            </div>

            <h3 style={styles.objectiveTitle}>
              The learning objective
            </h3>

            <p style={styles.objectiveText}>
              The AI changes the story and context,
              but the underlying Physics concept,
              reasoning and answer remain unchanged.
            </p>
          </div>
        </div>

        {/* TECHNICAL VALIDATION */}
        <div style={styles.validationArea}>
          <button
            onClick={() =>
              setShowValidation(!showValidation)
            }
            style={styles.validationButton}
          >
            <span>
              🔒 AI Safety & Validation
            </span>

            <span>
              {showValidation ? "▲" : "▼"}
            </span>
          </button>

          {showValidation && (
            <div style={styles.validationPanel}>
              <h3 style={styles.validationTitle}>
                {validation.valid
                  ? "✅ Validation Passed"
                  : "❌ Validation Failed"}
              </h3>

              {validation.valid ? (
                <>
                  <p style={styles.validationText}>
                    The generated question preserved
                    the locked learning information.
                  </p>

                  <div style={styles.checks}>
                    <div>✓ Concept preserved</div>
                    <div>✓ Variables preserved</div>
                    <div>✓ Correct answer preserved</div>
                    <div>✓ Learning objective preserved</div>
                  </div>
                </>
              ) : (
                <>
                  <p style={styles.validationText}>
                    The generated question failed
                    validation and should not be shown
                    to the student.
                  </p>

                  {validation.errors.map((error) => (
                    <div
                      key={error}
                      style={styles.error}
                    >
                      ⚠️ {error}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    padding: "40px 24px 70px",
    background:
      "linear-gradient(135deg, #080a18, #0d1224, #07151b)",
    color: "#f5f7ff",
  },

  container: {
    width: "100%",
    maxWidth: "1050px",
    margin: "0 auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  badge: {
    display: "inline-block",
    padding: "7px 14px",
    borderRadius: "20px",
    background: "rgba(100,130,255,0.14)",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    marginBottom: "16px",
  },

  title: {
    margin: "0 0 12px",
    fontSize: "42px",
  },

  subtitle: {
    maxWidth: "700px",
    margin: "0 auto",
    fontSize: "17px",
    lineHeight: 1.6,
    opacity: 0.7,
  },

  section: {
    marginBottom: "28px",
  },

  sectionTitle: {
    margin: "0 0 7px",
    fontSize: "25px",
  },

  mutedText: {
    margin: "0 0 18px",
    opacity: 0.6,
  },

  themeRow: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "12px",
  },

  themeButton: {
    position: "relative",
    padding: "17px",
    borderRadius: "14px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "#f5f7ff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },

  activeTheme: {
    background: "rgba(100,130,255,0.18)",
    border:
      "1px solid rgba(130,150,255,0.55)",
  },

  themeIcon: {
    fontSize: "22px",
    marginRight: "8px",
  },

  check: {
    position: "absolute",
    right: "14px",
  },

  questionCard: {
    padding: "34px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.055)",
    border:
      "1px solid rgba(255,255,255,0.13)",
    marginBottom: "22px",
  },

  questionTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },

  label: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.4px",
    opacity: 0.5,
    marginBottom: "7px",
  },

  questionTitle: {
    margin: 0,
    fontSize: "28px",
  },

  difficulty: {
    padding: "7px 12px",
    borderRadius: "20px",
    background: "rgba(255,190,80,0.12)",
    fontSize: "12px",
    fontWeight: "700",
  },

  questionBox: {
    padding: "25px",
    borderRadius: "17px",
    background: "rgba(0,0,0,0.2)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    marginBottom: "25px",
  },

  question: {
    margin: 0,
    fontSize: "20px",
    lineHeight: 1.75,
  },

  answerHeading: {
    fontSize: "18px",
    marginBottom: "14px",
  },

  options: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: "12px",
  },

  option: {
    padding: "17px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.045)",
    color: "#f5f7ff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },

  correctOption: {
    background: "rgba(60,210,130,0.16)",
    border:
      "1px solid rgba(60,220,140,0.55)",
  },

  wrongOption: {
    background: "rgba(240,80,90,0.14)",
    border:
      "1px solid rgba(240,100,110,0.45)",
  },

  correctMessage: {
    display: "flex",
    gap: "15px",
    marginTop: "22px",
    padding: "19px",
    borderRadius: "15px",
    background: "rgba(60,210,130,0.10)",
    border:
      "1px solid rgba(60,210,130,0.28)",
  },

  retryMessage: {
    display: "flex",
    gap: "15px",
    marginTop: "22px",
    padding: "19px",
    borderRadius: "15px",
    background: "rgba(240,170,70,0.09)",
    border:
      "1px solid rgba(240,170,70,0.25)",
  },

  resultIcon: {
    fontSize: "27px",
  },

  resultTitle: {
    margin: "0 0 5px",
    fontSize: "18px",
  },

  resultText: {
    margin: 0,
    opacity: 0.7,
    lineHeight: 1.5,
  },

  concept: {
    marginTop: "10px",
    fontSize: "13px",
    fontWeight: "700",
  },

  objectiveCard: {
    display: "flex",
    gap: "17px",
    padding: "23px",
    borderRadius: "18px",
    background: "rgba(100,130,255,0.07)",
    border:
      "1px solid rgba(100,130,255,0.18)",
    marginBottom: "22px",
  },

  objectiveIcon: {
    fontSize: "30px",
  },

  objectiveTitle: {
    margin: "0 0 7px",
    fontSize: "19px",
  },

  objectiveText: {
    margin: 0,
    opacity: 0.65,
    lineHeight: 1.6,
  },

  validationArea: {
    marginTop: "20px",
  },

  validationButton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 18px",
    borderRadius: "13px",
    border:
      "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.035)",
    color: "#f5f7ff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
  },

  validationPanel: {
    marginTop: "10px",
    padding: "23px",
    borderRadius: "16px",
    background: "rgba(0,0,0,0.18)",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  validationTitle: {
    margin: "0 0 10px",
    fontSize: "20px",
  },

  validationText: {
    opacity: 0.65,
    lineHeight: 1.6,
  },

  checks: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "9px",
    marginTop: "16px",
  },

  error: {
    padding: "10px",
    marginTop: "8px",
    borderRadius: "8px",
    background: "rgba(240,80,90,0.10)",
    fontSize: "13px",
  },
};

export default RethemingDemo;