import React, { useState } from "react";

const interests = [
  {
    id: "yoga",
    name: "Yoga",
    icon: "🧘",
    description:
      "Explore movement, breathing, flexibility, balance and mindful practice.",
    status: "COMING SOON"
  },
  {
    id: "psychology",
    name: "Psychology",
    icon: "🧠",
    description:
      "Understand how people think, learn, feel and behave.",
    status: "EXPLORE NOW"
  },
  {
    id: "finance",
    name: "Finance",
    icon: "💰",
    description:
      "Learn the basics of money, saving, budgeting and financial decisions.",
    status: "COMING SOON"
  }
];

function PsychologyContent({ onBack }) {
  const topics = [
    {
      icon: "🔎",
      title: "What is Psychology?",
      content:
        "Psychology is the study of how people think, feel and behave. It helps us understand ourselves and how we interact with the world around us."
    },
    {
      icon: "🧠",
      title: "How We Think",
      content:
        "Our thoughts are influenced by attention, memories, experiences and the way we interpret information. Two people can experience the same situation and understand it differently."
    },
    {
      icon: "❤️",
      title: "Emotions",
      content:
        "Emotions are responses to situations, thoughts and experiences. Understanding emotions can help us recognise how we feel and respond to situations more thoughtfully."
    },
    {
      icon: "📚",
      title: "Learning & Memory",
      content:
        "Learning involves gaining new knowledge or skills. Memory allows us to store and retrieve information. Practice, meaningful connections and active recall can support learning."
    },
    {
      icon: "👤",
      title: "Personality",
      content:
        "Personality describes patterns in how people tend to think, feel and behave. People have different characteristics, preferences and ways of responding to situations."
    },
    {
      icon: "🌱",
      title: "Mental Well-being",
      content:
        "Mental well-being includes how we understand our emotions, handle everyday challenges, maintain relationships and take care of ourselves."
    }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          maxWidth: "1050px",
          margin: "0 auto"
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            marginBottom: "28px",
            padding: "11px 20px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "inherit",
            cursor: "pointer",
            fontSize: "15px"
          }}
        >
          ← Back to Interests
        </button>

        {/* Header */}
        <div
          style={{
            padding: "36px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            marginBottom: "28px"
          }}
        >
          <div
            style={{
              fontSize: "56px",
              marginBottom: "12px"
            }}
          >
            🧠
          </div>

          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              opacity: 0.65,
              marginBottom: "10px"
            }}
          >
            EXPLORE INTERESTS
          </div>

          <h1
            style={{
              fontSize: "42px",
              margin: "0 0 12px"
            }}
          >
            Psychology
          </h1>

          <p
            style={{
              fontSize: "19px",
              lineHeight: 1.6,
              opacity: 0.75,
              maxWidth: "750px",
              margin: 0
            }}
          >
            Understand how people think, learn, feel and behave.
            Explore the fascinating connection between the mind,
            emotions and behaviour.
          </p>
        </div>

        {/* Introduction */}
        <div
          style={{
            padding: "28px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            marginBottom: "28px"
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              marginTop: 0,
              marginBottom: "14px"
            }}
          >
            🌟 Why Explore Psychology?
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              opacity: 0.78,
              margin: 0
            }}
          >
            Psychology can help us become more curious about ourselves
            and the people around us. By exploring thoughts, emotions,
            learning and behaviour, we can better understand everyday
            experiences and human interaction.
          </p>
        </div>

        {/* Topics */}
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "20px"
          }}
        >
          📖 Explore Topics
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}
        >
          {topics.map((topic) => (
            <div
              key={topic.title}
              style={{
                padding: "26px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.10)",
                minHeight: "230px",
                boxSizing: "border-box"
              }}
            >
              <div
                style={{
                  fontSize: "36px",
                  marginBottom: "14px"
                }}
              >
                {topic.icon}
              </div>

              <h3
                style={{
                  fontSize: "21px",
                  margin: "0 0 12px"
                }}
              >
                {topic.title}
              </h3>

              <p
                style={{
                  lineHeight: 1.7,
                  opacity: 0.72,
                  margin: 0
                }}
              >
                {topic.content}
              </p>
            </div>
          ))}
        </div>

        {/* Key takeaways */}
        <div
          style={{
            marginTop: "30px",
            padding: "28px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)"
          }}
        >
          <h2
            style={{
              fontSize: "25px",
              marginTop: 0,
              marginBottom: "18px"
            }}
          >
            💡 Key Takeaways
          </h2>

          <div
            style={{
              display: "grid",
              gap: "12px"
            }}
          >
            <div>✓ Psychology studies thoughts, feelings and behaviour.</div>
            <div>✓ People can interpret the same situation differently.</div>
            <div>✓ Emotions influence how we respond to situations.</div>
            <div>✓ Learning and memory are important parts of human behaviour.</div>
            <div>✓ Understanding ourselves can improve self-awareness.</div>
          </div>
        </div>

        {/* Coming soon message */}
        <div
          style={{
            marginTop: "30px",
            padding: "24px",
            borderRadius: "18px",
            textAlign: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px dashed rgba(255,255,255,0.18)"
          }}
        >
          <div style={{ fontSize: "30px", marginBottom: "8px" }}>
            🚀
          </div>

          <h3
            style={{
              margin: "0 0 8px",
              fontSize: "20px"
            }}
          >
            More Psychology Experiences Coming Soon
          </h3>

          <p
            style={{
              margin: 0,
              opacity: 0.65
            }}
          >
            Interactive activities, quizzes and deeper learning
            experiences can be added here later.
          </p>
        </div>
      </div>
    </div>
  );
}

function ExploreInterests({ student, onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Show Psychology content page
  if (selectedTopic === "psychology") {
    return (
      <PsychologyContent
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div
      className="dashboard-page"
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "32px"
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: "28px",
          padding: "11px 20px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.06)",
          color: "inherit",
          cursor: "pointer",
          fontSize: "15px"
        }}
      >
        ← Back to Dashboard
      </button>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              opacity: 0.7,
              marginBottom: "10px"
            }}
          >
            EXPLORE & DISCOVER
          </div>

          <h1
            style={{
              fontSize: "42px",
              margin: "0 0 12px"
            }}
          >
            ✨ Explore Interests
          </h1>

          <p
            style={{
              fontSize: "18px",
              opacity: 0.75,
              maxWidth: "700px",
              lineHeight: 1.6
            }}
          >
            Choose something you're curious about.
            Learn beyond the school curriculum and
            explore topics at your own pace.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px"
          }}
        >
          {interests.map((interest) => {
            const isPsychology =
              interest.id === "psychology";

            return (
              <div
                key={interest.id}
                onClick={() => {
                  if (isPsychology) {
                    setSelectedTopic("psychology");
                  }
                }}
                style={{
                  padding: "28px",
                  borderRadius: "20px",
                  border:
                    "1px solid rgba(255,255,255,0.12)",
                  background:
                    "rgba(255,255,255,0.05)",
                  cursor: isPsychology
                    ? "pointer"
                    : "default",
                  opacity: isPsychology
                    ? 1
                    : 0.65,
                  transition:
                    "transform 0.2s ease, background 0.2s ease",
                  minHeight: "250px",
                  boxSizing: "border-box"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px"
                    }}
                  >
                    {interest.icon}
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      padding: "7px 10px",
                      borderRadius: "20px",
                      background:
                        isPsychology
                          ? "rgba(100,200,150,0.15)"
                          : "rgba(255,255,255,0.08)"
                    }}
                  >
                    {interest.status}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "26px",
                    marginBottom: "12px"
                  }}
                >
                  {interest.name}
                </h2>

                <p
                  style={{
                    lineHeight: 1.6,
                    opacity: 0.75,
                    minHeight: "75px"
                  }}
                >
                  {interest.description}
                </p>

                <div
                  style={{
                    marginTop: "22px",
                    fontWeight: "700"
                  }}
                >
                  {isPsychology
                    ? "Explore Psychology →"
                    : "Coming soon"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExploreInterests;