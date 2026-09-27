import { useMemo, useState } from "react";
import { buildStudentAIContext } from "./studentAIContext";

function StudentAIChatbot({
  student,
  mastery,
  activeConcept,
  recommendedConcept,
  interventionSignals,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hi ${
        student?.name || "there"
      }! 👋 I'm your AI learning assistant. I can help you with Class 10 Physics doubts, explain difficult concepts, and learn about your interests so I can personalize examples for you.`,
    },
  ]);

  const context = useMemo(() => {
    return buildStudentAIContext({
      mastery: mastery || {},
      activeConcept: activeConcept || null,
      recommendedConcept: recommendedConcept || null,
      interventionSignals: interventionSignals || [],
    });
  }, [
    mastery,
    activeConcept,
    recommendedConcept,
    interventionSignals,
  ]);

  const sendMessage = async (messageText) => {
    const text = messageText.trim();

    if (!text || isLoading) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text,
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/student-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,

          student: {
            name: student?.name || "Student",

            interests:
              student?.interests ||
              student?.interest ||
              student?.fieldsOfInterest ||
              "",

            motivation:
              student?.motivation || "",

            sessionStyle:
              student?.sessionStyle || "",

            challengeStyle:
              student?.challengeStyle || "",
          },

          context,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to connect to AI tutor.");
      }

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            data.reply ||
            "I couldn't generate a response right now. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Student AI error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            "I'm having trouble connecting right now. Please try again in a moment. 🤖",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleQuickPrompt = (prompt) => {
    sendMessage(prompt);
  };

  const weakConcepts = context.weakConcepts || [];

  return (
    <>
      {/* Floating AI Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={styles.aiButton}
      >
        <span style={styles.robotIcon}>🤖</span>

        <span>
          <strong style={styles.aiButtonTitle}>
            Ask AI Tutor
          </strong>

          <span style={styles.aiButtonSubtitle}>
            Doubts & personalized help
          </span>
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.chatWindow}>
            {/* Header */}
            <div style={styles.header}>
              <div>
                <div style={styles.headerTitle}>
                  🤖 AI Learning Assistant
                </div>

                <div style={styles.headerSubtitle}>
                  Class 10 Physics • Electricity
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                ✕
              </button>
            </div>

            {/* Context */}
            <div style={styles.contextPanel}>
              <div style={styles.contextTitle}>
                🧠 Your current learning context
              </div>

              <div style={styles.contextGrid}>
                <div>
                  <span style={styles.contextLabel}>
                    Current concept
                  </span>

                  <strong>
                    {context.currentConcept || "Not started"}
                  </strong>
                </div>

                <div>
                  <span style={styles.contextLabel}>
                    Next recommended
                  </span>

                  <strong>
                    {context.recommendedConcept ||
                      "Complete diagnostic"}
                  </strong>
                </div>

                <div>
                  <span style={styles.contextLabel}>
                    Weak areas
                  </span>

                  <strong>
                    {weakConcepts.length}
                  </strong>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={styles.messages}>
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  style={{
                    ...styles.messageRow,
                    justifyContent:
                      message.role === "user"
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <div
                    style={{
                      ...styles.messageBubble,
                      ...(message.role === "user"
                        ? styles.userBubble
                        : styles.assistantBubble),
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div style={styles.messageRow}>
                  <div
                    style={{
                      ...styles.messageBubble,
                      ...styles.assistantBubble,
                    }}
                  >
                    Thinking... 🤔
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div style={styles.quickPrompts}>
              <button
                type="button"
                onClick={() =>
                  handleQuickPrompt(
                    "What should I learn next?"
                  )
                }
                style={styles.quickButton}
              >
                What should I learn next?
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickPrompt(
                    "Explain my weak areas."
                  )
                }
                style={styles.quickButton}
              >
                Explain my weak areas
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickPrompt(
                    "Ask me about my interests."
                  )
                }
                style={styles.quickButton}
              >
                My interests
              </button>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={styles.inputArea}
            >
              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Ask a Physics doubt..."
                style={styles.input}
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  ...styles.sendButton,
                  opacity:
                    isLoading || !input.trim()
                      ? 0.5
                      : 1,
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  aiButton: {
    position: "fixed",
    right: "24px",
    bottom: "24px",
    zIndex: 5000,

    display: "flex",
    alignItems: "center",
    gap: "10px",

    padding: "13px 18px",

    border: "1px solid rgba(139, 92, 246, 0.45)",
    borderRadius: "16px",

    background:
      "linear-gradient(135deg, #15132b, #241c46)",

    color: "#ffffff",

    cursor: "pointer",

    boxShadow:
      "0 12px 35px rgba(0, 0, 0, 0.35)",
  },

  robotIcon: {
    fontSize: "25px",
  },

  aiButtonTitle: {
    display: "block",
    fontSize: "14px",
  },

  aiButtonSubtitle: {
    display: "block",
    marginTop: "2px",
    fontSize: "11px",
    opacity: 0.65,
  },

  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 6000,

    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",

    padding: "24px",

    background:
      "rgba(0, 0, 0, 0.35)",
  },

  chatWindow: {
    width: "min(430px, 94vw)",
    height: "min(680px, 88vh)",

    display: "flex",
    flexDirection: "column",

    overflow: "hidden",

    borderRadius: "22px",
    border:
      "1px solid rgba(139, 92, 246, 0.35)",

    background: "#0d0b18",

    color: "#ffffff",

    boxShadow:
      "0 25px 80px rgba(0, 0, 0, 0.6)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "18px 20px",

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "linear-gradient(135deg, #17122d, #21183d)",
  },

  headerTitle: {
    fontSize: "16px",
    fontWeight: 700,
  },

  headerSubtitle: {
    marginTop: "4px",
    fontSize: "11px",
    opacity: 0.6,
  },

  closeButton: {
    border: "none",
    background: "transparent",
    color: "#ffffff",

    fontSize: "18px",

    cursor: "pointer",
    opacity: 0.7,
  },

  contextPanel: {
    padding: "12px 16px",

    borderBottom:
      "1px solid rgba(255,255,255,0.06)",

    background:
      "rgba(139, 92, 246, 0.07)",
  },

  contextTitle: {
    marginBottom: "9px",
    fontSize: "11px",
    fontWeight: 700,
    opacity: 0.7,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  contextGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
    gap: "8px",
  },

  contextLabel: {
    display: "block",
    marginBottom: "3px",
    fontSize: "9px",
    opacity: 0.5,
  },

  contextGridStrong: {
    fontSize: "11px",
  },

  messages: {
    flex: 1,

    overflowY: "auto",

    padding: "18px",

    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  messageRow: {
    display: "flex",
    width: "100%",
  },

  messageBubble: {
    maxWidth: "82%",

    padding: "11px 13px",

    borderRadius: "14px",

    fontSize: "13px",
    lineHeight: 1.5,

    whiteSpace: "pre-wrap",
  },

  assistantBubble: {
    background: "#1a1727",
    border:
      "1px solid rgba(255,255,255,0.07)",
  },

  userBubble: {
    background: "#6d4aff",
    color: "#ffffff",
  },

  quickPrompts: {
    display: "flex",
    gap: "7px",

    padding: "10px 14px",

    overflowX: "auto",

    borderTop:
      "1px solid rgba(255,255,255,0.06)",
  },

  quickButton: {
    flexShrink: 0,

    padding: "7px 10px",

    border:
      "1px solid rgba(139, 92, 246, 0.3)",

    borderRadius: "20px",

    background:
      "rgba(139, 92, 246, 0.08)",

    color: "#ffffff",

    fontSize: "10px",

    cursor: "pointer",
  },

  inputArea: {
    display: "flex",
    gap: "8px",

    padding: "12px 14px",

    borderTop:
      "1px solid rgba(255,255,255,0.08)",
  },

  input: {
    flex: 1,

    minWidth: 0,

    padding: "11px 13px",

    border:
      "1px solid rgba(255,255,255,0.12)",

    borderRadius: "12px",

    outline: "none",

    background: "#171522",

    color: "#ffffff",

    fontSize: "13px",
  },

  sendButton: {
    padding: "0 15px",

    border: "none",
    borderRadius: "12px",

    background: "#6d4aff",
    color: "#ffffff",

    fontWeight: 700,

    cursor: "pointer",
  },
};

export default StudentAIChatbot;