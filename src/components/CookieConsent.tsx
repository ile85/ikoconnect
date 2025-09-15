"use client";

import { useEffect, useState, useCallback } from "react";

type ConsentState = {
  analytics: boolean;
};

const LS_KEY = "cookie_consent_v1";
const LS_ACK = "cookie_consent_ack";

function loadAnalyticsScripts(domain?: string) {
  // Plausible (пример) – ќе се лоадира само на consent
  if (domain && !document.querySelector('script[data-ikoc="plausible"]')) {
    const s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", domain);
    s.setAttribute("data-ikoc", "plausible");
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }

  // GA4 (опционално):
  // if (!document.querySelector('script[data-ikoc="ga4"]')) {
  //   const s = document.createElement("script");
  //   s.setAttribute("data-ikoc", "ga4");
  //   s.async = true;
  //   s.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
  //   document.head.appendChild(s);
  //   const inl = document.createElement("script");
  //   inl.setAttribute("data-ikoc", "ga4");
  //   inl.innerHTML = `
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());
  //     gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { anonymize_ip: true });
  //   `;
  //   document.head.appendChild(inl);
  // }
}

function unloadAnalyticsScripts() {
  // Избриши ги injected analytics script-овите
  document.querySelectorAll('script[data-ikoc]').forEach((el) => el.remove());
}

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  // INIT
  useEffect(() => {
    try {
      const ack = localStorage.getItem(LS_ACK);
      const stored = getStoredConsent();
      if (ack && stored) {
        setVisible(false);
        setAnalyticsAllowed(stored.analytics);
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  // React на промена на consent
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN; // e.g. "ikoconnect.com"
    if (analyticsAllowed) {
      loadAnalyticsScripts(domain);
    } else {
      unloadAnalyticsScripts();
    }
  }, [analyticsAllowed]);

  const acceptAll = useCallback(() => {
    const state: ConsentState = { analytics: true };
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    localStorage.setItem(LS_ACK, "true");
    setAnalyticsAllowed(true);
    setVisible(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    const state: ConsentState = { analytics: false };
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    localStorage.setItem(LS_ACK, "true");
    setAnalyticsAllowed(false);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-xl flex-col items-center justify-between gap-3 rounded-xl bg-gray-900 p-4 text-sm text-white shadow-xl md:flex-row">
      <p className="text-center md:text-left">
        We use cookies to improve your experience. Control analytics cookies below. See our{" "}
        <a href="/privacy" className="underline hover:text-gray-300">
          Privacy Policy
        </a>
        .
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={rejectNonEssential}
          className="rounded bg-gray-700 px-3 py-2 font-semibold hover:bg-gray-600"
          aria-label="Reject non-essential cookies"
        >
          Reject
        </button>
        <button
          onClick={acceptAll}
          className="rounded bg-white px-4 py-2 font-semibold text-black hover:bg-gray-200"
          aria-label="Accept analytics cookies"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
