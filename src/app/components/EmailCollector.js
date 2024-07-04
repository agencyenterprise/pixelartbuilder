'use client';

import { useState } from "react";
import { PaperAirplaneIcon, CheckCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

export function EmailCollector({
  appDomain,
  description = "We're constantly adding new features. Enter your email to stay updated!",
  className,
}) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState('');

  const sendEmail = async () => {
    if (!email) {
      return;
    }

    setEmailSending(true);
    const formBody = `userGroup=${encodeURIComponent(
      appDomain || window.location.host
    )}&email=${encodeURIComponent(email)}`;

    const res = await fetch(
      `https://app.loops.so/api/newsletter-form/clpsl4mk5008ml20ozvjha4wy`,
      {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    setEmailSending(false);
    if (!res.ok) {
      setEmailError("Failed to send email. Please try again.");
      return;
    }

    setEmail("");
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 5000);
  };

  return (
    <div className={twMerge("text-center space-y-2 w-fit mx-auto mt-20", className)}>
      <p>{description}</p>
      <div className="flex items-center justify-center">
        <input
          type="email"
          className="border border-gray-300 rounded-s-lg p-2 text-gray-600 grow"
          placeholder="Enter your email"
          disabled={emailSending}
          value={email}
          onKeyDown={(e) => e.key === "Enter" && sendEmail()}
          onChange={(e) => setEmail(e.target.value)} />
        <button
          className={twMerge(
            "px-5 py-2 bg-logo-bg rounded-e-lg text-white font-bold border border-white/5 hover:text-logo-bg hover:bg-logo-bg/50 transition-colors duration-200 ease-in-out",
            emailSent && "bg-green-500"
          )}
          onClick={sendEmail}
          disabled={!email || emailSent}
        >
          {emailSending
            ? <ArrowPathIcon className="w-6 animate-spin" />
            : emailSent
              ? <CheckCircleIcon className="w-6" />
              : <PaperAirplaneIcon className="w-6" />}
        </button>
      </div>
      {emailError && <p className="text-red-500">{emailError}</p>}
    </div>
  );
}