"use client";

import { useEffect, useState } from "react";

export default function Discover() {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);

  const [dragStart, setDragStart] = useState(null);
  const [dragX, setDragX] = useState(0);

  useEffect(() => {
    async function loadProfiles() {
      try {
        const response = await fetch("/api/feed");
        const data = await response.json();

        setProfiles(data);
      } catch (error) {
        console.error("Failed to load profiles:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfiles();
  }, []);

  const currentProfile = profiles[currentIndex];

  async function handleSwipe(action) {
    if (!currentProfile || swiping) return;

    setSwiping(true);

    try {
      const response = await fetch("/api/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: currentProfile.id,
          action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.error);
        return;
      }

      setDragX(0);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Failed to save swipe:", error);
    } finally {
      setSwiping(false);
    }
  }

  function handlePointerDown(event) {
    if (swiping) return;

    setDragStart(event.clientX);
  }

  function handlePointerMove(event) {
    if (dragStart === null || swiping) return;

    const distance = event.clientX - dragStart;

    // Slight resistance for a more natural drag feel
    setDragX(distance * 0.92);
  }

  function handlePointerUp() {
    if (dragStart === null || swiping) return;

    if (dragX > 120) {
      handleSwipe("like");
    } else if (dragX < -120) {
      handleSwipe("pass");
    } else {
      setDragX(0);
    }

    setDragStart(null);
  }

  function handlePointerCancel() {
    setDragX(0);
    setDragStart(null);
  }

  const rotation = dragX / 18;

  const likeOpacity = Math.min(Math.max(dragX / 120, 0), 1);
  const passOpacity = Math.min(Math.max(-dragX / 120, 0), 1);

  // Loading state
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 px-5">
        <div className="w-full max-w-sm rounded-[28px] bg-white p-8 text-center shadow-2xl ring-1 ring-black/5">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          </div>

          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            Finding profiles
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Please wait while we load your discover feed.
          </p>
        </div>
      </main>
    );
  }

  // Empty state
  if (!currentProfile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 px-5">
        <div className="w-full max-w-sm rounded-[30px] bg-white p-8 text-center shadow-2xl ring-1 ring-black/5">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl shadow-inner">
            💫
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            You're all caught up!
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            You've seen all the available profiles for now. Check back later
            for more people to discover.
          </p>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            No more profiles available
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-lg font-bold text-white shadow-sm">
                  C
                </div>

                <h1 className="text-2xl font-extrabold tracking-tight">
                  Discover
                </h1>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Find someone you might like
              </p>
            </div>

            <div className="rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-bold text-gray-500 shadow-sm">
              {currentIndex + 1} / {profiles.length}
            </div>
          </div>
        </header>

        {/* Profile Area */}
        <section className="flex flex-1 items-center justify-center px-4 py-5 sm:px-5 sm:py-7">
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            className="relative w-full touch-none select-none overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14)] ring-1 ring-black/5"
            style={{
              transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
              transition:
                dragStart === null
                  ? "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
              cursor: dragStart !== null ? "grabbing" : "grab",
            }}
          >
            {/* Swipe feedback */}
            <div
              className="pointer-events-none absolute left-5 top-5 z-20 rotate-[-12deg] rounded-xl border-4 border-green-500 bg-white/90 px-4 py-2 text-2xl font-black tracking-wide text-green-500 shadow-lg backdrop-blur-sm"
              style={{
                opacity: likeOpacity,
                transform: `rotate(-12deg) scale(${0.9 + likeOpacity * 0.1})`,
              }}
            >
              LIKE
            </div>

            <div
              className="pointer-events-none absolute right-5 top-5 z-20 rotate-[12deg] rounded-xl border-4 border-red-500 bg-white/90 px-4 py-2 text-2xl font-black tracking-wide text-red-500 shadow-lg backdrop-blur-sm"
              style={{
                opacity: passOpacity,
                transform: `rotate(12deg) scale(${0.9 + passOpacity * 0.1})`,
              }}
            >
              PASS
            </div>

            {/* Profile Photo */}
            <div className="relative h-[330px] overflow-hidden bg-gray-200 sm:h-[350px]">
              <img
                src={currentProfile.image}
                alt={currentProfile.name}
                className="block h-full w-full object-cover"
                draggable="false"
              />

              {/* Image overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2 className="text-[30px] font-extrabold tracking-tight text-white drop-shadow-md sm:text-3xl">
                  {currentProfile.name}, {currentProfile.age}
                </h2>

                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-sm font-medium text-white/95 drop-shadow">
                    📍 {currentProfile.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="p-5 sm:p-6">
              {/* College */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-base">
                  🎓
                </div>

                <span className="text-sm font-semibold text-gray-600">
                  {currentProfile.college}
                </span>
              </div>

              {/* Bio */}
              <p className="mt-4 text-[15px] leading-6 text-gray-700">
                {currentProfile.bio}
              </p>

              {/* Interests */}
              <div className="mt-5">
                <p className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-gray-400">
                  Interests
                </p>

                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="border-t border-gray-200/70 bg-white/90 px-5 pb-6 pt-4 backdrop-blur-xl">
          <div className="flex items-center justify-center gap-8">
            {/* Pass */}
            <button
              disabled={swiping}
              onClick={() => handleSwipe("pass")}
              aria-label="Pass"
              className="group flex h-[68px] w-[68px] items-center justify-center rounded-full border border-gray-200 bg-white text-2xl shadow-lg transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:border-red-200 hover:bg-red-50 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                ❌
              </span>
            </button>

            {/* Like */}
            <button
              disabled={swiping}
              onClick={() => handleSwipe("like")}
              aria-label="Like"
              className="group flex h-[68px] w-[68px] items-center justify-center rounded-full bg-black text-2xl text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-gray-800 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="transition-transform duration-200 group-hover:scale-110">
                ❤️
              </span>
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Swipe left to pass · Swipe right to like
          </p>
        </div>
      </div>
    </main>
  );
}