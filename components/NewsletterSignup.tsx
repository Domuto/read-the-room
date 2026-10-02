"use client";

import { useState } from "react";

// Klaviyo "READ THE ROOM" list. Override via env if it ever changes.
const LIST_ID = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID ?? "XicGpH";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY;

type Status = "idle" | "sending" | "done" | "error";

export default function NewsletterSignup({
  className = "",
}: {
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!PUBLIC_KEY) {
      setStatus("error");
      setMessage("Signup is unavailable right now.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch(
        `https://a.klaviyo.com/client/subscriptions/?company_id=${PUBLIC_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            revision: "2024-10-15",
          },
          body: JSON.stringify({
            data: {
              type: "subscription",
              attributes: {
                profile: {
                  data: {
                    type: "profile",
                    attributes: { email },
                  },
                },
              },
              relationships: {
                list: { data: { type: "list", id: LIST_ID } },
              },
            },
          }),
        },
      );

      // The client subscriptions endpoint returns 202 Accepted on success.
      if (response.ok || response.status === 202) {
        setStatus("done");
        setMessage("You're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const done = status === "done";

  return (
    <div className={className}>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          aria-label="Email address"
          disabled={status === "sending" || done}
          className="w-44 rounded-full border border-paper/30 bg-ink/40 px-4 py-2 font-mono text-xs text-paper placeholder:text-haze/60 transition focus:border-ember focus:outline-none disabled:opacity-60 sm:w-52"
        />
        <button
          type="submit"
          disabled={status === "sending" || done}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-paper/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition hover:border-ember hover:bg-ember hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "…" : "Join"}
        </button>
      </form>

      {message && (
        <p
          className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-haze"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
}
