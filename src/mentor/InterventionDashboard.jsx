import { useState } from "react";

function InterventionDashboard() {
  const [activeTab, setActiveTab] = useState("interventions");
  const [showAttempts, setShowAttempts] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [actionTaken, setActionTaken] = useState(false);

  const student = {
    name: "Ananya",
    classLevel: "10",
    subject: "Physics",
    concept: "Resistance",
    mastery: 65,
    previousMastery: 72,
    repeatedErrors: 4,
    sessionsAffected: 2,
    status: "HIGH",
    trend: -7
  };

  const attempts = [
    {
      date: "Today",
      question: "Which factor affects resistance?",
      result: "Incorrect",
      detail: "Confused resistance with current."
    },
    {
      date: "Yesterday",
      question: "Calculate resistance using V = IR.",
      result: "Incorrect",
      detail: "Used current as the final answer."
    },
    {
      date: "Yesterday",
      question: "What happens to resistance when length increases?",
      result: "Correct",
      detail: "Correctly identified the relationship."
    },
    {
      date: "2 days ago",
      question: "Identify resistance in a circuit.",
      result: "Incorrect",
      detail: "Could not distinguish resistance from voltage."
    }
  ];

  const actionPlan = [
    {
      number: "01",
      title: "Revise the core relationship",
      description:
        "Review the relationship between voltage, current and resistance before introducing new problems."
    },
    {
      number: "02",
      title: "Give 3 guided problems",
      description:
        "Start with scaffolded questions that explicitly identify the known and unknown quantities."
    },
    {
      number: "03",
      title: "Apply it to circuits",
      description:
        "Follow with 2 circuit-based problems to check whether the concept transfers to a new context."
    }
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header style={styles.header}>
          <div>
            <div style={styles.eyebrow}>
              MENTOR WORKSPACE
            </div>

            <h1 style={styles.title}>
              👨‍🏫 Mentor Dashboard
            </h1>

            <p style={styles.subtitle}>
              Monitor learning evidence, identify students who
              need support, and take targeted action.
            </p>
          </div>

          <div style={styles.headerDate}>
            <span style={styles.dateLabel}>
              TODAY
            </span>
            <strong>27 Sep 2026</strong>
          </div>
        </header>

        {/* =====================================================
            TOP METRICS
        ===================================================== */}

        <div style={styles.metricsGrid}>
          <MetricCard
            icon="👥"
            label="Students monitored"
            value="12"
            detail="Across your subject"
          />

          <MetricCard
            icon="🚨"
            label="Needs attention"
            value="1"
            detail="Proactive intervention"
            danger
          />

          <MetricCard
            icon="📈"
            label="Avg. mastery"
            value="78%"
            detail="+4% this week"
          />

          <MetricCard
            icon="✅"
            label="Interventions"
            value="8"
            detail="Completed this month"
          />
        </div>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div style={styles.tabs}>
          <TabButton
            active={activeTab === "interventions"}
            icon="🚨"
            label="Interventions"
            onClick={() => setActiveTab("interventions")}
          />

          <TabButton
            active={activeTab === "report"}
            icon="📊"
            label="Daily Report"
            onClick={() => setActiveTab("report")}
          />

          <TabButton
            active={activeTab === "contact"}
            icon="💬"
            label="Contact Student"
            onClick={() => setActiveTab("contact")}
          />
        </div>

        {/* =====================================================
            INTERVENTIONS
        ===================================================== */}

        {activeTab === "interventions" && (
          <>
            {/* Alert */}
            <div style={styles.alertBanner}>
              <div style={styles.alertIcon}>
                🚨
              </div>

              <div style={{ flex: 1 }}>
                <div style={styles.alertTitle}>
                  Proactive intervention recommended
                </div>

                <div style={styles.alertText}>
                  Ananya's mastery of Resistance has fallen
                  from 72% to 65% across the last two sessions.
                </div>
              </div>

              <div style={styles.priorityBadge}>
                HIGH PRIORITY
              </div>
            </div>

            {/* Student overview */}
            <section style={styles.studentCard}>

              <div style={styles.studentHeader}>
                <div style={styles.studentIdentity}>
                  <div style={styles.avatar}>
                    A
                  </div>

                  <div>
                    <div style={styles.studentName}>
                      {student.name}
                    </div>

                    <div style={styles.studentMeta}>
                      Class {student.classLevel}
                      {" • "}
                      {student.subject}
                    </div>
                  </div>
                </div>

                <div style={styles.studentStatus}>
                  <span style={styles.statusDot}></span>
                  Intervention needed
                </div>
              </div>

              {/* Mastery row */}
              <div style={styles.masterySection}>

                <div style={styles.masteryMain}>
                  <div style={styles.masteryLabel}>
                    CURRENT MASTERY
                  </div>

                  <div style={styles.masteryValue}>
                    {student.mastery}%
                  </div>

                  <div style={styles.masteryChange}>
                    ↓ {Math.abs(student.trend)}% from previous mastery
                  </div>
                </div>

                <div style={styles.masteryChart}>
                  <div style={styles.chartLabel}>
                    MASTERY TREND
                  </div>

                  <div style={styles.chartBars}>
                    <TrendBar
                      label="Previous"
                      value={72}
                    />

                    <TrendBar
                      label="Current"
                      value={65}
                      active
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* Evidence grid */}
            <div style={styles.sectionHeading}>
              <div>
                <div style={styles.eyebrow}>
                  INTERVENTION SIGNAL
                </div>

                <h2 style={styles.sectionTitle}>
                  Why is Ananya being flagged?
                </h2>
              </div>
            </div>

            <div style={styles.evidenceGrid}>

              <EvidenceCard
                icon="📚"
                label="Concept"
                value={student.concept}
                description="Current concept requiring support"
              />

              <EvidenceCard
                icon="🔁"
                label="Repeated errors"
                value={student.repeatedErrors}
                description="Similar mistakes detected"
                danger
              />

              <EvidenceCard
                icon="🧠"
                label="Sessions affected"
                value={student.sessionsAffected}
                description="Learning sessions showing the pattern"
              />

              <EvidenceCard
                icon="📉"
                label="Mastery change"
                value={`${student.trend}%`}
                description="Change from previous measurement"
                danger
              />

            </div>

            {/* Pattern analysis */}
            <section style={styles.analysisCard}>
              <div style={styles.analysisIcon}>
                🧠
              </div>

              <div style={{ flex: 1 }}>
                <div style={styles.cardEyebrow}>
                  DETECTED PATTERN
                </div>

                <h3 style={styles.analysisTitle}>
                  Student repeatedly confuses current and resistance.
                </h3>

                <p style={styles.analysisText}>
                  The error appears across multiple attempts rather
                  than being an isolated mistake. This suggests that
                  the underlying relationship between voltage, current
                  and resistance may not yet be secure.
                </p>

                <div style={styles.causeBox}>
                  <span style={styles.causeIcon}>
                    🔎
                  </span>

                  <div>
                    <strong>
                      Likely underlying cause
                    </strong>

                    <p>
                      Weak understanding of the relationship between
                      voltage, current and resistance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Action plan */}
            <section style={styles.actionCard}>

              <div style={styles.actionHeader}>
                <div>
                  <div style={styles.cardEyebrow}>
                    RECOMMENDED INTERVENTION
                  </div>

                  <h2 style={styles.actionTitle}>
                    Targeted support plan
                  </h2>

                  <p style={styles.actionSubtitle}>
                    The system recommends reinforcing the prerequisite
                    before asking the student to progress.
                  </p>
                </div>

                <div style={styles.actionIcon}>
                  💡
                </div>
              </div>

              <div style={styles.planList}>
                {actionPlan.map((item) => (
                  <div
                    key={item.number}
                    style={styles.planItem}
                  >
                    <div style={styles.planNumber}>
                      {item.number}
                    </div>

                    <div>
                      <h3 style={styles.planTitle}>
                        {item.title}
                      </h3>

                      <p style={styles.planDescription}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.actionButtons}>
                <button
                  style={styles.primaryButton}
                  onClick={() => {
                    setActionTaken(true);
                    setShowActionPlan(true);
                  }}
                >
                  {actionTaken
                    ? "✓ Intervention Assigned"
                    : "Take Action →"}
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() =>
                    setShowAttempts(!showAttempts)
                  }
                >
                  {showAttempts
                    ? "Hide Attempts"
                    : "View Attempts"}
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => {
                    setShowContact(true);
                  }}
                >
                  💬 Contact Student
                </button>
              </div>

              {actionTaken && (
                <div style={styles.successMessage}>
                  ✓ Intervention plan assigned for Ananya.
                  The mentor can now track whether mastery improves
                  after reassessment.
                </div>
              )}

            </section>

            {/* Attempts */}
            {showAttempts && (
              <section style={styles.attemptsCard}>
                <div style={styles.cardEyebrow}>
                  RECENT EVIDENCE
                </div>

                <h2 style={styles.sectionTitle}>
                  Recent attempts
                </h2>

                <p style={styles.mutedText}>
                  The attempts that contributed to the intervention signal.
                </p>

                <div style={styles.attemptList}>
                  {attempts.map((attempt, index) => (
                    <div
                      key={index}
                      style={styles.attemptRow}
                    >
                      <div style={styles.attemptIcon}>
                        {attempt.result === "Correct"
                          ? "✓"
                          : "×"}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={styles.attemptQuestion}>
                          {attempt.question}
                        </div>

                        <div style={styles.attemptDetail}>
                          {attempt.detail}
                        </div>
                      </div>

                      <div style={styles.attemptRight}>
                        <span
                          style={
                            attempt.result === "Correct"
                              ? styles.correctTag
                              : styles.incorrectTag
                          }
                        >
                          {attempt.result}
                        </span>

                        <span style={styles.attemptDate}>
                          {attempt.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer insight */}
            <div style={styles.insightBanner}>
              <span style={styles.insightIcon}>
                💡
              </span>

              <div>
                <strong>
                  Intervention principle
                </strong>

                <p>
                  Don't simply give more questions. Address the
                  misconception, then reassess whether the student
                  can demonstrate the concept independently.
                </p>
              </div>
            </div>
          </>
        )}

        {/* =====================================================
            DAILY REPORT
        ===================================================== */}

        {activeTab === "report" && (
          <DailyReport />
        )}

        {/* =====================================================
            CONTACT
        ===================================================== */}

        {activeTab === "contact" && (
          <ContactStudent
            onBack={() =>
              setActiveTab("interventions")
            }
          />
        )}

      </div>

      {/* Contact modal */}
      {showContact && (
        <ContactModal
          studentName={student.name}
          onClose={() => setShowContact(false)}
        />
      )}
    </div>
  );
}


/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  icon,
  label,
  value,
  detail,
  danger
}) {
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricTop}>
        <span style={styles.metricIcon}>
          {icon}
        </span>

        {danger && (
          <span style={styles.metricAlert}>
            Attention
          </span>
        )}
      </div>

      <div style={styles.metricValue}>
        {value}
      </div>

      <div style={styles.metricLabel}>
        {label}
      </div>

      <div style={styles.metricDetail}>
        {detail}
      </div>
    </div>
  );
}


/* ============================================================
   TAB
============================================================ */

function TabButton({
  active,
  icon,
  label,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.tab,
        ...(active ? styles.activeTab : {})
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}


/* ============================================================
   EVIDENCE CARD
============================================================ */

function EvidenceCard({
  icon,
  label,
  value,
  description,
  danger
}) {
  return (
    <div style={styles.evidenceCard}>
      <div style={styles.evidenceIcon}>
        {icon}
      </div>

      <div style={styles.cardEyebrow}>
        {label}
      </div>

      <div
        style={{
          ...styles.evidenceValue,
          ...(danger
            ? styles.dangerValue
            : {})
        }}
      >
        {value}
      </div>

      <div style={styles.evidenceDescription}>
        {description}
      </div>
    </div>
  );
}


/* ============================================================
   TREND BAR
============================================================ */

function TrendBar({
  label,
  value,
  active
}) {
  return (
    <div style={styles.trendRow}>
      <span style={styles.trendLabel}>
        {label}
      </span>

      <div style={styles.trendTrack}>
        <div
          style={{
            ...styles.trendFill,
            width: `${value}%`,
            ...(active
              ? styles.currentTrend
              : {})
          }}
        />
      </div>

      <strong style={styles.trendValue}>
        {value}%
      </strong>
    </div>
  );
}


/* ============================================================
   DAILY REPORT
============================================================ */

function DailyReport() {
  return (
    <section>
      <div style={styles.reportHeader}>
        <div>
          <div style={styles.eyebrow}>
            DAILY LEARNING REPORT
          </div>

          <h2 style={styles.reportTitle}>
            Today's Student Overview
          </h2>

          <p style={styles.subtitle}>
            A quick summary of learning evidence and students
            who may need mentor attention.
          </p>
        </div>

        <div style={styles.reportDate}>
          Saturday
          <strong>27 Sep</strong>
        </div>
      </div>

      <div style={styles.reportSummaryGrid}>
        <ReportStat
          label="Learning sessions"
          value="18"
          icon="📚"
        />

        <ReportStat
          label="Assessments completed"
          value="14"
          icon="📝"
        />

        <ReportStat
          label="Students improving"
          value="9"
          icon="📈"
        />

        <ReportStat
          label="Intervention signals"
          value="1"
          icon="🚨"
        />
      </div>

      <div style={styles.reportCard}>
        <div style={styles.cardEyebrow}>
          ATTENTION REQUIRED
        </div>

        <h2 style={styles.sectionTitle}>
          One student needs proactive support
        </h2>

        <div style={styles.reportStudent}>
          <div style={styles.avatar}>
            A
          </div>

          <div style={{ flex: 1 }}>
            <strong style={styles.studentName}>
              Ananya
            </strong>

            <p style={styles.mutedText}>
              Physics • Resistance • Mastery dropped 7%
            </p>
          </div>

          <span style={styles.priorityBadge}>
            HIGH
          </span>
        </div>
      </div>

      <div style={styles.reportCard}>
        <div style={styles.cardEyebrow}>
          MENTOR SUMMARY
        </div>

        <h2 style={styles.sectionTitle}>
          What changed today?
        </h2>

        <div style={styles.summaryItem}>
          <span>✓</span>
          <p>
            9 students showed stable or improving mastery.
          </p>
        </div>

        <div style={styles.summaryItem}>
          <span>✓</span>
          <p>
            14 assessment attempts were recorded.
          </p>
        </div>

        <div style={styles.summaryItem}>
          <span>!</span>
          <p>
            Ananya showed a repeated misconception around Resistance.
          </p>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   REPORT STAT
============================================================ */

function ReportStat({
  icon,
  label,
  value
}) {
  return (
    <div style={styles.reportStat}>
      <div style={styles.reportStatIcon}>
        {icon}
      </div>

      <strong style={styles.reportStatValue}>
        {value}
      </strong>

      <span style={styles.reportStatLabel}>
        {label}
      </span>
    </div>
  );
}


/* ============================================================
   CONTACT STUDENT
============================================================ */

function ContactStudent({
  onBack
}) {
  const [message, setMessage] = useState(
    "Hi Ananya, I noticed you're finding Resistance difficult. Let's work through the concept together before your next assessment."
  );

  const [sent, setSent] = useState(false);

  return (
    <section>
      <button
        onClick={onBack}
        style={styles.backButton}
      >
        ← Back to Interventions
      </button>

      <div style={styles.contactCard}>
        <div style={styles.contactAvatar}>
          A
        </div>

        <div style={styles.contactHeader}>
          <div style={styles.eyebrow}>
            STUDENT COMMUNICATION
          </div>

          <h2 style={styles.reportTitle}>
            Contact Ananya
          </h2>

          <p style={styles.subtitle}>
            Send a supportive message based on the detected
            learning pattern.
          </p>
        </div>

        <div style={styles.messageContext}>
          <span>💡</span>

          <div>
            <strong>
              Suggested context
            </strong>

            <p>
              Resistance • 65% mastery • repeated errors detected
            </p>
          </div>
        </div>

        <label style={styles.inputLabel}>
          Message
        </label>

        <textarea
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          style={styles.textarea}
          rows={6}
        />

        <button
          style={styles.primaryButton}
          onClick={() => setSent(true)}
        >
          {sent
            ? "✓ Message Sent"
            : "Send Message →"}
        </button>

        {sent && (
          <div style={styles.successMessage}>
            ✓ Message sent to Ananya.
          </div>
        )}
      </div>
    </section>
  );
}


/* ============================================================
   CONTACT MODAL
============================================================ */

function ContactModal({
  studentName,
  onClose
}) {
  const [message, setMessage] = useState(
    "Hi Ananya, I noticed you're finding Resistance difficult. Let's work through it together."
  );

  const [sent, setSent] = useState(false);

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>

        <button
          onClick={onClose}
          style={styles.modalClose}
        >
          ×
        </button>

        <div style={styles.modalIcon}>
          💬
        </div>

        <div style={styles.eyebrow}>
          QUICK MESSAGE
        </div>

        <h2 style={styles.modalTitle}>
          Contact {studentName}
        </h2>

        <p style={styles.mutedText}>
          Send a supportive message to the student.
        </p>

        <textarea
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          rows={5}
          style={styles.textarea}
        />

        <button
          style={styles.primaryButton}
          onClick={() => setSent(true)}
        >
          {sent
            ? "✓ Message Sent"
            : "Send Message"}
        </button>

        {sent && (
          <div style={styles.successMessage}>
            ✓ Your message has been sent.
          </div>
        )}
      </div>
    </div>
  );
}


/* ============================================================
   STYLES
============================================================ */

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    padding: "36px 28px 70px",
    boxSizing: "border-box",
    background:
      "linear-gradient(135deg, #080a18 0%, #0d1224 52%, #07151b 100%)",
    color: "#f5f7ff"
  },

  container: {
    maxWidth: "1180px",
    margin: "0 auto"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "30px",
    marginBottom: "32px"
  },

  eyebrow: {
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    opacity: 0.55,
    marginBottom: "8px"
  },

  title: {
    margin: 0,
    fontSize: "40px",
    lineHeight: 1.15
  },

  subtitle: {
    margin: "10px 0 0",
    maxWidth: "700px",
    lineHeight: 1.65,
    opacity: 0.66
  },

  headerDate: {
    minWidth: "150px",
    padding: "15px 18px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.10)",
    textAlign: "right",
    fontSize: "14px"
  },

  dateLabel: {
    display: "block",
    fontSize: "10px",
    letterSpacing: "1px",
    opacity: 0.45,
    marginBottom: "5px"
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "14px",
    marginBottom: "24px"
  },

  metricCard: {
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.09)"
  },

  metricTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  metricIcon: {
    fontSize: "25px"
  },

  metricAlert: {
    padding: "5px 8px",
    borderRadius: "20px",
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "0.8px",
    background: "rgba(240,90,100,0.13)"
  },

  metricValue: {
    fontSize: "30px",
    fontWeight: "800",
    marginTop: "15px"
  },

  metricLabel: {
    fontSize: "14px",
    fontWeight: "700",
    marginTop: "3px"
  },

  metricDetail: {
    fontSize: "12px",
    opacity: 0.5,
    marginTop: "5px"
  },

  tabs: {
    display: "flex",
    gap: "8px",
    padding: "6px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.04)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    marginBottom: "24px"
  },

  tab: {
    flex: 1,
    padding: "13px 16px",
    border: "none",
    borderRadius: "10px",
    background: "transparent",
    color: "#f5f7ff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700"
  },

  activeTab: {
    background: "rgba(110,130,255,0.18)",
    boxShadow:
      "0 4px 18px rgba(0,0,0,0.18)"
  },

  alertBanner: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px 22px",
    borderRadius: "18px",
    background:
      "linear-gradient(90deg, rgba(220,70,80,0.13), rgba(220,70,80,0.04))",
    border:
      "1px solid rgba(230,90,100,0.25)",
    marginBottom: "20px"
  },

  alertIcon: {
    fontSize: "28px"
  },

  alertTitle: {
    fontWeight: "800",
    marginBottom: "5px"
  },

  alertText: {
    fontSize: "13px",
    opacity: 0.68,
    lineHeight: 1.5
  },

  priorityBadge: {
    padding: "8px 12px",
    borderRadius: "20px",
    background: "rgba(240,80,90,0.15)",
    border:
      "1px solid rgba(240,100,110,0.25)",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1px",
    whiteSpace: "nowrap"
  },

  studentCard: {
    padding: "25px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.055)",
    border:
      "1px solid rgba(255,255,255,0.10)",
    marginBottom: "32px"
  },

  studentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px"
  },

  studentIdentity: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },

  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #6675e8, #4f9fb0)",
    fontSize: "19px",
    fontWeight: "900"
  },

  studentName: {
    fontSize: "20px",
    fontWeight: "800"
  },

  studentMeta: {
    fontSize: "13px",
    opacity: 0.55,
    marginTop: "3px"
  },

  studentStatus: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "12px",
    fontWeight: "700",
    opacity: 0.75
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#e56b72"
  },

  masterySection: {
    display: "grid",
    gridTemplateColumns:
      "minmax(180px, 0.7fr) minmax(300px, 1.3fr)",
    gap: "40px",
    alignItems: "center"
  },

  masteryLabel: {
    fontSize: "10px",
    letterSpacing: "1.3px",
    fontWeight: "800",
    opacity: 0.5
  },

  masteryValue: {
    fontSize: "48px",
    fontWeight: "900",
    margin: "3px 0"
  },

  masteryChange: {
    color: "#ef8a90",
    fontSize: "12px",
    fontWeight: "700"
  },

  masteryChart: {
    padding: "18px",
    borderRadius: "15px",
    background: "rgba(0,0,0,0.15)"
  },

  chartLabel: {
    fontSize: "10px",
    letterSpacing: "1px",
    opacity: 0.5,
    marginBottom: "15px"
  },

  chartBars: {
    display: "grid",
    gap: "12px"
  },

  trendRow: {
    display: "grid",
    gridTemplateColumns: "70px 1fr 45px",
    gap: "10px",
    alignItems: "center"
  },

  trendLabel: {
    fontSize: "11px",
    opacity: 0.55
  },

  trendTrack: {
    height: "8px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden"
  },

  trendFill: {
    height: "100%",
    borderRadius: "10px",
    background: "rgba(150,160,180,0.55)"
  },

  currentTrend: {
    background:
      "linear-gradient(90deg, #6675e8, #62a9a2)"
  },

  trendValue: {
    fontSize: "12px",
    textAlign: "right"
  },

  sectionHeading: {
    marginBottom: "17px"
  },

  sectionTitle: {
    margin: 0,
    fontSize: "23px"
  },

  evidenceGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "14px",
    marginBottom: "20px"
  },

  evidenceCard: {
    padding: "21px",
    borderRadius: "17px",
    background: "rgba(255,255,255,0.045)",
    border:
      "1px solid rgba(255,255,255,0.08)"
  },

  evidenceIcon: {
    fontSize: "23px",
    marginBottom: "15px"
  },

  cardEyebrow: {
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.2px",
    opacity: 0.48,
    marginBottom: "7px"
  },

  evidenceValue: {
    fontSize: "23px",
    fontWeight: "800"
  },

  dangerValue: {
    color: "#ef8a90"
  },

  evidenceDescription: {
    fontSize: "12px",
    opacity: 0.48,
    marginTop: "5px",
    lineHeight: 1.4
  },

  analysisCard: {
    display: "flex",
    gap: "20px",
    padding: "27px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.09)",
    marginBottom: "20px"
  },

  analysisIcon: {
    width: "48px",
    height: "48px",
    flexShrink: 0,
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(100,120,255,0.12)",
    fontSize: "23px"
  },

  analysisTitle: {
    margin: "0 0 9px",
    fontSize: "19px"
  },

  analysisText: {
    margin: 0,
    lineHeight: 1.65,
    opacity: 0.64,
    fontSize: "14px"
  },

  causeBox: {
    display: "flex",
    gap: "11px",
    marginTop: "18px",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(100,120,255,0.07)",
    border:
      "1px solid rgba(100,120,255,0.13)"
  },

  causeIcon: {
    fontSize: "18px"
  },

  "causeBox p": {
    margin: "4px 0 0",
    opacity: 0.62,
    fontSize: "13px"
  },

  actionCard: {
    padding: "28px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(100,120,255,0.10), rgba(70,180,160,0.055))",
    border:
      "1px solid rgba(110,140,255,0.18)",
    marginBottom: "20px"
  },

  actionHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "25px"
  },

  actionTitle: {
    margin: "0 0 7px",
    fontSize: "25px"
  },

  actionSubtitle: {
    margin: 0,
    opacity: 0.58,
    fontSize: "13px",
    lineHeight: 1.5
  },

  actionIcon: {
    fontSize: "32px"
  },

  planList: {
    display: "grid",
    gap: "10px",
    marginBottom: "25px"
  },

  planItem: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    borderRadius: "13px",
    background: "rgba(0,0,0,0.13)"
  },

  planNumber: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9px",
    background: "rgba(110,130,255,0.16)",
    fontSize: "11px",
    fontWeight: "900"
  },

  planTitle: {
    margin: "0 0 5px",
    fontSize: "15px"
  },

  planDescription: {
    margin: 0,
    fontSize: "12px",
    opacity: 0.56,
    lineHeight: 1.5
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  primaryButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #6675e8, #5b9eac)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "13px"
  },

  secondaryButton: {
    padding: "12px 17px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.045)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px"
  },

  successMessage: {
    marginTop: "15px",
    padding: "13px 15px",
    borderRadius: "10px",
    background: "rgba(70,200,130,0.10)",
    border:
      "1px solid rgba(70,200,130,0.22)",
    fontSize: "13px"
  },

  attemptsCard: {
    padding: "27px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.045)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    marginBottom: "20px"
  },

  mutedText: {
    margin: "7px 0 0",
    fontSize: "13px",
    opacity: 0.55,
    lineHeight: 1.5
  },

  attemptList: {
    marginTop: "20px"
  },

  attemptRow: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "15px 0",
    borderBottom:
      "1px solid rgba(255,255,255,0.07)"
  },

  attemptIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(240,80,90,0.10)",
    color: "#ef8a90",
    fontWeight: "900"
  },

  attemptQuestion: {
    fontSize: "13px",
    fontWeight: "700"
  },

  attemptDetail: {
    fontSize: "11px",
    opacity: 0.5,
    marginTop: "4px"
  },

  attemptRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "5px"
  },

  correctTag: {
    padding: "5px 8px",
    borderRadius: "20px",
    background: "rgba(70,200,130,0.10)",
    fontSize: "10px",
    fontWeight: "800"
  },

  incorrectTag: {
    padding: "5px 8px",
    borderRadius: "20px",
    background: "rgba(240,80,90,0.10)",
    color: "#ef8a90",
    fontSize: "10px",
    fontWeight: "800"
  },

  attemptDate: {
    fontSize: "10px",
    opacity: 0.4
  },

  insightBanner: {
    display: "flex",
    gap: "14px",
    padding: "18px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.035)",
    border:
      "1px solid rgba(255,255,255,0.07)"
  },

  insightIcon: {
    fontSize: "22px"
  },

  "insightBanner p": {
    margin: "5px 0 0",
    opacity: 0.55,
    fontSize: "12px",
    lineHeight: 1.5
  },

  reportHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "25px",
    marginBottom: "25px"
  },

  reportTitle: {
    margin: 0,
    fontSize: "28px"
  },

  reportDate: {
    padding: "13px 17px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    textAlign: "right",
    fontSize: "12px",
    opacity: 0.65
  },

  "reportDate strong": {
    display: "block",
    fontSize: "17px",
    color: "#fff",
    opacity: 1
  },

  reportSummaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "14px",
    marginBottom: "20px"
  },

  reportStat: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border:
      "1px solid rgba(255,255,255,0.08)"
  },

  reportStatIcon: {
    fontSize: "22px"
  },

  reportStatValue: {
    display: "block",
    fontSize: "30px",
    marginTop: "12px"
  },

  reportStatLabel: {
    display: "block",
    fontSize: "12px",
    opacity: 0.5,
    marginTop: "3px"
  },

  reportCard: {
    padding: "25px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.045)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    marginBottom: "16px"
  },

  reportStudent: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    marginTop: "18px",
    borderRadius: "13px",
    background: "rgba(0,0,0,0.14)"
  },

  summaryItem: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px 0",
    borderBottom:
      "1px solid rgba(255,255,255,0.06)"
  },

  "summaryItem p": {
    margin: 0,
    fontSize: "13px",
    opacity: 0.68
  },

  backButton: {
    marginBottom: "20px",
    padding: "10px 15px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    cursor: "pointer"
  },

  contactCard: {
    maxWidth: "760px",
    margin: "20px auto",
    padding: "32px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.055)",
    border:
      "1px solid rgba(255,255,255,0.10)"
  },

  contactAvatar: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #6675e8, #4f9fb0)",
    fontSize: "23px",
    fontWeight: "900",
    marginBottom: "22px"
  },

  contactHeader: {
    marginBottom: "24px"
  },

  messageContext: {
    display: "flex",
    gap: "12px",
    padding: "16px",
    borderRadius: "13px",
    background: "rgba(100,120,255,0.07)",
    marginBottom: "20px"
  },

  inputLabel: {
    display: "block",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "8px"
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.18)",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "14px",
    lineHeight: 1.6,
    resize: "vertical",
    marginBottom: "14px",
    outline: "none"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 10000,
    background: "rgba(0,0,0,0.72)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box"
  },

  modal: {
    position: "relative",
    width: "min(550px, 100%)",
    padding: "30px",
    borderRadius: "22px",
    background: "#111526",
    border:
      "1px solid rgba(255,255,255,0.12)",
    boxShadow:
      "0 30px 100px rgba(0,0,0,0.55)"
  },

  modalClose: {
    position: "absolute",
    right: "17px",
    top: "13px",
    width: "32px",
    height: "32px",
    border: "none",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.07)",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer"
  },

  modalIcon: {
    fontSize: "34px",
    marginBottom: "15px"
  },

  modalTitle: {
    margin: 0,
    fontSize: "25px"
  }
};

export default InterventionDashboard;