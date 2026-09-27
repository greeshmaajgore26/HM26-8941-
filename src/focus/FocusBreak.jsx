import { useEffect, useState } from "react";

const riddles = [
  {
    question:
      "I have keys but no locks, I have space but no room. What am I?",
    answer: "A keyboard",
  },
  {
    question:
      "What has to be broken before you can use it?",
    answer: "An egg",
  },
  {
    question:
      "What gets wetter the more it dries?",
    answer: "A towel",
  },
  {
    question:
      "I am full of holes but I can still hold water. What am I?",
    answer: "A sponge",
  },
  {
    question:
      "What has a face and two hands but no arms or legs?",
    answer: "A clock",
  },
];

const exercises = [
  {
    title: "Eye Reset",
    duration: "30 seconds",
    instruction:
      "Look away from your screen and focus on something far away for 20–30 seconds.",
  },
  {
    title: "Shoulder Stretch",
    duration: "45 seconds",
    instruction:
      "Roll your shoulders slowly backwards 5 times, then forwards 5 times.",
  },
  {
    title: "Quick Walk",
    duration: "2 minutes",
    instruction:
      "Stand up and take a short walk around your room or workspace.",
  },
  {
    title: "Deep Breathing",
    duration: "1 minute",
    instruction:
      "Take a slow breath in, pause briefly, then breathe out slowly. Repeat several times.",
  },
  {
    title: "Others",
    duration: "Your choice",
    instruction:
      "Take this break however you prefer — listen to music, grab a snack, chat with someone, relax, or do anything else that helps you reset.",
  },
];

function FocusBreak({ onExit, onModeChange }) {
  const [mode, setMode] = useState("focus");

  const [focusMinutes, setFocusMinutes] = useState(25);

  const [focusStarted, setFocusStarted] = useState(false);

  const [timeLeft, setTimeLeft] =
    useState(25 * 60);

  const [riddleIndex, setRiddleIndex] =
    useState(0);

  const [showAnswer, setShowAnswer] =
    useState(false);

  const [exerciseIndex, setExerciseIndex] =
    useState(0);

  useEffect(() => {
    if (mode === "focus" && !focusStarted) {
      return;
    }

    if (timeLeft <= 0) {
      if (mode === "focus") {
        setMode("break");
        setFocusStarted(false);
        onModeChange?.("break");
        setTimeLeft(5 * 60);
      }

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, mode]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
      String(seconds % 60).padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  }

  function startBreak() {
    setMode("break");
    setFocusStarted(false);
    onModeChange?.("break");
    setTimeLeft(5 * 60);
  }

  function startFocusAgain() {
    setMode("focus");
    setFocusStarted(false);
    onModeChange?.("focus");
    setTimeLeft(focusMinutes * 60);
  }

  function beginFocusTimer() {
    const minutes = Number(focusMinutes);

    if (!Number.isFinite(minutes) || minutes < 1) {
      return;
    }

    setMode("focus");
    onModeChange?.("focus");
    setTimeLeft(minutes * 60);
    setFocusStarted(true);
  }

  function nextRiddle() {
    setShowAnswer(false);

    setRiddleIndex(
      (riddleIndex + 1) % riddles.length
    );
  }

  function nextExercise() {
    setExerciseIndex(
      (exerciseIndex + 1) % exercises.length
    );
  }

  const riddle = riddles[riddleIndex];

  const exercise = exercises[exerciseIndex];

  return (
    <div
      style={
        mode === "break"
          ? styles.breakPage
          : focusStarted
          ? styles.activeFocusPage
          : styles.page
      }
    >
      {mode === "focus" && focusStarted ? (
        /* ACTIVE FOCUS: intentionally tiny and pinned to the top */
        <div style={styles.activeFocusBar}>
          <div style={styles.activeFocusLabel}>
            <span style={styles.activeFocusDot}>●</span>
            FOCUS
          </div>

          <div style={styles.activeTimer}>
            {formatTime(timeLeft)}
          </div>

          <div style={styles.activeFocusActions}>
            <button
              type="button"
              onClick={startBreak}
              style={styles.activeBreakButton}
            >
              Break
            </button>

            <button
              type="button"
              onClick={onExit}
              style={styles.activeExitButton}
            >
              ×
            </button>
          </div>
        </div>
      ) : mode === "focus" ? (
        /* FOCUS SETUP */
        <div style={styles.setupCard}>
          <div style={styles.label}>
            FOCUS & WELLBEING
          </div>

          <h1 style={styles.title}>
            Focus session
          </h1>

          <p style={styles.subtitle}>
            Choose how long you want to focus, then start your session.
          </p>

          <div style={styles.timer}>
            {formatTime(focusMinutes * 60)}
          </div>

          <div style={styles.durationPicker}>
            <div style={styles.sectionLabel}>
              SET FOCUS DURATION
            </div>

            <div style={styles.durationRow}>
              {[10, 15, 25, 40, 50].map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => setFocusMinutes(minutes)}
                  style={{
                    ...styles.durationButton,
                    ...(focusMinutes === minutes
                      ? styles.durationButtonSelected
                      : {}),
                  }}
                >
                  {minutes} min
                </button>
              ))}
            </div>

            <div style={styles.customDurationRow}>
              <label style={styles.customLabel}>
                Custom
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={focusMinutes}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    if (Number.isFinite(value)) {
                      setFocusMinutes(value);
                    }
                  }}
                  style={styles.durationInput}
                />
                min
              </label>
            </div>

            <button
              type="button"
              onClick={beginFocusTimer}
              style={styles.button}
            >
              Start {focusMinutes || ""} Minute Focus →
            </button>
          </div>

          <button
            type="button"
            onClick={onExit}
            style={styles.exitButton}
          >
            Exit focus mode
          </button>
        </div>
      ) : (
        /* BREAK: this is rendered inside the full-screen App overlay */
        <div style={styles.breakCard}>
          <div style={styles.breakHeader}>
            <span>5 MINUTE RESET</span>
            <span>Your break is yours.</span>
          </div>

          <div style={styles.breakTimer}>
            {formatTime(timeLeft)}
          </div>

          <div style={styles.section}>
            <div style={styles.sectionLabel}>
              🧩 QUICK RIDDLE
            </div>

            <h2 style={styles.sectionTitle}>
              {riddle.question}
            </h2>

            {showAnswer ? (
              <div style={styles.answer}>
                Answer: {riddle.answer}
              </div>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                style={styles.smallButton}
              >
                Reveal answer
              </button>
            )}

            <button
              onClick={nextRiddle}
              style={styles.linkButton}
            >
              Another riddle →
            </button>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionLabel}>
              🌿 BREAK ACTIVITY
            </div>

            <h2 style={styles.sectionTitle}>
              {exercise.title}
            </h2>

            <div style={styles.duration}>
              {exercise.duration}
            </div>

            <p style={styles.instruction}>
              {exercise.instruction}
            </p>

            {exercise.title === "Others" && (
              <div style={styles.freedomNote}>
                ✨ No rules here. Choose anything that helps you feel refreshed.
              </div>
            )}

            <button
              onClick={nextExercise}
              style={styles.linkButton}
            >
              Another activity →
            </button>
          </div>

          <button
            onClick={startFocusAgain}
            style={styles.button}
          >
            Back to focus →
          </button>

          <button
            onClick={onExit}
            style={styles.exitButton}
          >
            Exit focus mode
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  activeFocusPage: {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0",
    pointerEvents: "none",
  },

  activeFocusBar: {
    width: "min(430px, 92vw)",
    minHeight: "58px",
    boxSizing: "border-box",
    margin: "0",
    padding: "8px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    borderRadius: "0 0 14px 14px",
    background: "rgba(20,23,42,0.98)",
    border: "1px solid rgba(148,163,184,0.15)",
    borderTop: "none",
    boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
    pointerEvents: "auto",
  },

  activeFocusLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#c9c0ff",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  activeFocusDot: {
    color: "#a995ff",
    fontSize: "9px",
  },

  activeTimer: {
    minWidth: "112px",
    padding: "4px 10px",
    boxSizing: "border-box",
    textAlign: "center",
    borderRadius: "10px",
    background: "rgba(128,104,245,0.12)",
    border: "1px solid rgba(128,104,245,0.25)",
    color: "#b7a9ff",
    fontSize: "25px",
    lineHeight: "1.1",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  activeFocusActions: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  activeBreakButton: {
    border: "1px solid rgba(139,112,255,0.3)",
    borderRadius: "8px",
    padding: "7px 9px",
    color: "#d9d2ff",
    background: "rgba(128,104,245,0.08)",
    cursor: "pointer",
    fontSize: "10px",
  },

  activeExitButton: {
    width: "28px",
    height: "28px",
    border: "1px solid rgba(148,163,184,0.18)",
    borderRadius: "8px",
    color: "#9ca4b6",
    background: "rgba(255,255,255,0.04)",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: "1",
  },

  setupCard: {
    width: "min(430px, 92vw)",
    boxSizing: "border-box",
    padding: "16px",
    borderRadius: "0 0 18px 18px",
    background: "rgba(20,23,42,0.98)",
    border: "1px solid rgba(148,163,184,0.15)",
    borderTop: "none",
    boxShadow: "0 18px 45px rgba(0,0,0,0.45)",
    pointerEvents: "auto",
  },

  breakPage: {
    width: "100%",
    minHeight: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    padding: "0",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  breakCard: {
    width: "100%",
    maxWidth: "860px",
    boxSizing: "border-box",
    padding: "28px",
    borderRadius: "24px",
    background: "rgba(20,23,42,0.98)",
    border: "1px solid rgba(148,163,184,0.15)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
    color: "#f4f4f8",
  },

  breakTimer: {
    width: "150px",
    margin: "14px auto 20px",
    padding: "8px 12px",
    boxSizing: "border-box",
    textAlign: "center",
    borderRadius: "14px",
    background: "rgba(128,104,245,0.12)",
    border: "1px solid rgba(128,104,245,0.25)",
    color: "#b7a9ff",
    fontSize: "28px",
    fontWeight: "800",
  },

  page: {
    width: "100%",
    minHeight: "0",
    boxSizing: "border-box",

    background:
      "radial-gradient(circle at 20% 15%, rgba(99,64,180,0.25), transparent 35%), radial-gradient(circle at 80% 20%, rgba(24,111,132,0.16), transparent 30%), #050812",

    color: "#f4f4f8",

    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",

    padding: "8px 12px",

    fontFamily:
      "Inter, system-ui, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "560px",
    boxSizing: "border-box",

    padding: "14px 18px",

    borderRadius: "28px",

    background:
      "rgba(20,23,42,0.94)",

    border:
      "1px solid rgba(148,163,184,0.15)",

    boxShadow:
      "0 30px 90px rgba(0,0,0,0.45)",
  },

  label: {
    color: "#8e96a9",

    fontSize: "10px",

    fontWeight: "800",

    letterSpacing: "1.5px",
  },

  title: {
    margin: "8px 0 5px",
    fontSize: "26px",
  },

  subtitle: {
    color: "#8f97aa",

    fontSize: "13px",

    lineHeight: "1.6",
  },

  timer: {
    margin: "8px auto",

    width: "180px",
    boxSizing: "border-box",

    padding: "8px 14px",

    borderRadius: "20px",

    textAlign: "center",

    background:
      "rgba(128,104,245,0.1)",

    border:
      "1px solid rgba(128,104,245,0.2)",

    color: "#b7a9ff",

    fontSize: "34px",

    fontWeight: "800",

    letterSpacing: "2px",
  },

  durationPicker: {
    marginTop: "8px",
    padding: "12px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(148,163,184,0.08)",
  },

  durationRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "6px",
    marginTop: "8px",
  },

  durationButton: {
    border: "1px solid rgba(139,112,255,0.25)",
    borderRadius: "10px",
    padding: "7px 10px",
    color: "#c9c0ff",
    background: "rgba(128,104,245,0.06)",
    cursor: "pointer",
    fontSize: "11px",
  },

  durationButtonSelected: {
    background: "rgba(128,104,245,0.25)",
    border: "1px solid rgba(139,112,255,0.65)",
    color: "white",
  },

  customDurationRow: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "center",
  },

  customLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#9ca4b6",
    fontSize: "11px",
  },

  durationInput: {
    width: "64px",
    padding: "6px 8px",
    borderRadius: "9px",
    border: "1px solid rgba(139,112,255,0.25)",
    background: "rgba(0,0,0,0.2)",
    color: "white",
    textAlign: "center",
  },

  focusBox: {
    textAlign: "center",
    marginTop: "10px",

    padding: "14px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.025)",
  },

  focusIcon: {
    fontSize: "30px",

    color: "#a995ff",
  },

  breakHeader: {
    display: "flex",

    justifyContent: "space-between",

    gap: "15px",

    color: "#858da0",

    fontSize: "9px",

    fontWeight: "800",

    letterSpacing: "1px",
  },

  section: {
    marginTop: "22px",

    padding: "22px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.025)",

    border:
      "1px solid rgba(148,163,184,0.08)",
  },

  sectionLabel: {
    color: "#9d8cff",

    fontSize: "10px",

    fontWeight: "800",

    letterSpacing: "1px",
  },

  sectionTitle: {
    margin: "12px 0",

    fontSize: "19px",

    lineHeight: "1.5",
  },

  answer: {
    marginTop: "15px",

    padding: "12px",

    borderRadius: "10px",

    background:
      "rgba(76,220,175,0.08)",

    color: "#82e3c0",

    fontSize: "13px",
  },

  duration: {
    display: "inline-block",

    padding: "5px 9px",

    borderRadius: "999px",

    background:
      "rgba(128,104,245,0.1)",

    color: "#b7a9ff",

    fontSize: "10px",
  },

  instruction: {
    color: "#9ca4b6",

    lineHeight: "1.6",

    fontSize: "13px",
  },

  freedomNote: {
    marginTop: "14px",

    padding: "12px",

    borderRadius: "10px",

    background:
      "rgba(76,220,175,0.06)",

    border:
      "1px solid rgba(76,220,175,0.12)",

    color: "#82cdb4",

    fontSize: "12px",

    lineHeight: "1.5",
  },

  button: {
    marginTop: "22px",

    border: "none",

    borderRadius: "13px",

    padding: "14px 22px",

    color: "white",

    fontWeight: "750",

    fontSize: "13px",

    background:
      "linear-gradient(90deg,#8a70ff,#6656ed)",

    cursor: "pointer",
  },

  secondaryButton: {
    marginTop: "18px",

    border:
      "1px solid rgba(139,112,255,0.3)",

    borderRadius: "12px",

    padding: "12px 18px",

    color: "#c9c0ff",

    background:
      "rgba(128,104,245,0.08)",

    cursor: "pointer",
  },

  smallButton: {
    border: "none",

    borderRadius: "10px",

    padding: "10px 14px",

    color: "#ddd8ff",

    background:
      "rgba(128,104,245,0.12)",

    cursor: "pointer",

    fontSize: "11px",
  },

  linkButton: {
    marginLeft: "12px",

    border: "none",

    background: "transparent",

    color: "#8f82e8",

    cursor: "pointer",

    fontSize: "11px",
  },

  exitButton: {
    display: "block",

    margin: "25px auto 0",

    border: "none",

    background: "transparent",

    color: "#697285",

    cursor: "pointer",

    fontSize: "11px",
  },
};

export default FocusBreak;