"use client";

import { useState } from "react";

const WEB3FORMS_ACCESS_KEY = "3fe9c7a1-dafc-4b6b-b15a-6006e08b4ea1";

const fieldClass =
  "w-full rounded-lg border border-line bg-ink/40 px-4 py-3 text-paper placeholder:text-haze/70 transition focus:border-ember focus:outline-none";

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setResult("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult("Thanks — we'll be in touch soon.");
        form.reset();
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch {
      setResult("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-haze"
        >
          Name
        </label>
        <input id="name" type="text" name="name" required className={fieldClass} />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-haze"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-haze"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center rounded-full border border-paper/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition hover:border-ember hover:bg-ember hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sending ? "Sending…" : "Send"}
      </button>

      {result && (
        <p className="font-mono text-sm text-haze" role="status" aria-live="polite">
          {result}
        </p>
      )}
    </form>
  );
}
