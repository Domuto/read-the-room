"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient background music for the home screen.
 *
 * Browsers block audio-with-sound from autoplaying until the visitor
 * interacts with the page, so we:
 *   1. try to play on mount (works on browsers that already trust the site),
 *   2. otherwise start on the first pointer / key / touch interaction, and
 *   3. always expose a mute / unmute toggle so visitors stay in control.
 */
export default function AmbientAudio({
  src = "/Birth%20of%20New%20Life.mp3",
  volume = 0.35,
}: {
  src?: string;
  volume?: number;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const userPausedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const events = ["pointerdown", "keydown", "touchstart"] as const;

    const removeListeners = () =>
      events.forEach((e) => window.removeEventListener(e, onInteract));

    const start = () => {
      if (userPausedRef.current) return;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          removeListeners();
        })
        .catch(() => {
          /* still blocked — wait for a real interaction */
        });
    };

    function onInteract(event: Event) {
      // Ignore the toggle itself — it manages playback directly.
      if (
        buttonRef.current &&
        event.target instanceof Node &&
        buttonRef.current.contains(event.target)
      ) {
        return;
      }
      start();
    }

    // First attempt (succeeds where autoplay is permitted).
    start();
    events.forEach((e) =>
      window.addEventListener(e, onInteract, { passive: true })
    );

    return removeListeners;
  }, [volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPausedRef.current = false;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      userPausedRef.current = true;
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute ambient music" : "Play ambient music"}
        aria-pressed={playing}
        title={playing ? "Mute music" : "Play music"}
        className="group absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 bg-ink/30 text-paper backdrop-blur-sm transition hover:border-ember hover:text-ember sm:right-8 sm:top-6"
      >
        {playing ? (
          // Speaker with sound waves
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            <path d="M16 8.5a4 4 0 0 1 0 7" className="animate-pulse" />
            <path d="M18.5 6a7 7 0 0 1 0 12" className="animate-pulse" />
          </svg>
        ) : (
          // Muted speaker
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            <line x1="16" y1="9" x2="22" y2="15" />
            <line x1="22" y1="9" x2="16" y2="15" />
          </svg>
        )}
      </button>
    </>
  );
}
