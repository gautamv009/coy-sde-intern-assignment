"use client";

import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        const response = await fetch("/api/matches");

        if (!response.ok) {
          throw new Error("Failed to load matches");
        }

        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Matches loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8f9fb",
        padding: "32px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          Your Matches
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "28px",
          }}
        >
          People who liked you back
        </p>

        {loading ? (
          <p>Loading matches...</p>
        ) : matches.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "40px 24px",
              textAlign: "center",
              boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>
              💙
            </div>

            <h2 style={{ marginBottom: "8px" }}>
              No matches yet
            </h2>

            <p style={{ color: "#777" }}>
              Keep discovering people. Your mutual matches will appear here.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {matches.map((match) => (
              <div
                key={match.id}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={match.image}
                  alt={match.name}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "18px" }}>
                  <h2
                    style={{
                      margin: "0 0 6px",
                      fontSize: "22px",
                    }}
                  >
                    {match.name}, {match.age}
                  </h2>

                  <p
                    style={{
                      margin: "0 0 6px",
                      color: "#666",
                    }}
                  >
                    {match.city}
                  </p>

                  <p
                    style={{
                      margin: "0 0 14px",
                      color: "#777",
                      fontSize: "14px",
                    }}
                  >
                    {match.college}
                  </p>

                  <p
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    {match.bio}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginTop: "14px",
                    }}
                  >
                    {match.interests.map((interest) => (
                      <span
                        key={interest}
                        style={{
                          background: "#f0f1f5",
                          borderRadius: "999px",
                          padding: "6px 10px",
                          fontSize: "12px",
                        }}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}