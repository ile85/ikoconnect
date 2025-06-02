// src/app/contact/ContactForm.tsx
"use client";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          size: "invisible";
          callback: (token: string) => void;
        }
      ) => number;
      execute: (widgetId: number) => void;
    };
  }
}

import React, {
  useState,
  useRef,
  useEffect,
  type FormEvent,
} from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  // React Hook Form setup
  const {
    register,
    handleSubmit: RHFSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  // We’ll store the sanitized form data here, then send it when recaptcha is done:
  const [pendingData, setPendingData] = useState<FormData | null>(null);

  // Status: "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // We'll keep track of the widget ID from grecaptcha.render(...)
  const widgetIdRef = useRef<number | null>(null);

  // A ref to the container where the invisible reCAPTCHA widget will be rendered
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);

  // Callback that grecaptcha will call when the user passes the invisible reCAPTCHA
  const onRecaptchaSuccess = (token: string) => {
    // "token" is the g-recaptcha-response. Now we can submit to /api/contact
    if (!pendingData) {
      console.error("No form data to submit after reCAPTCHA.");
      setStatus("error");
      return;
    }

    // Build payload with recaptcha token
    const payload = {
      ...pendingData,
      "g-recaptcha-response": token,
    };

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response not ok");
        }
        return res.json();
      })
      .then(() => {
        setStatus("success");
        reset(); // clear the form
      })
      .catch((err) => {
        console.error("ContactForm /api/contact error:", err);
        setStatus("error");
      });
  };

  // 1) Load the invisible reCAPTCHA widget on mount:
  useEffect(() => {
    // Ensure grecaptcha is available
    if (
      typeof window === "undefined" ||
      !window.grecaptcha ||
      widgetIdRef.current !== null ||
      !recaptchaContainerRef.current
    ) {
      return;
    }

    // Render an "invisible" widget
    widgetIdRef.current = window.grecaptcha.render(
      recaptchaContainerRef.current,
      {
        sitekey: "6LfGQBcrAAAAAN0p4eMHPQ2gnTqpetUIAbHaVTZW",
        size: "invisible",
        callback: onRecaptchaSuccess,
      }
    );
  }, [recaptchaContainerRef.current]);

  // 2) When form is submitted:
  const onSubmit = (data: FormData) => {
    // 2a) If grecaptcha isn’t ready, show error
    if (
      typeof window === "undefined" ||
      !window.grecaptcha ||
      widgetIdRef.current === null
    ) {
      console.error("reCAPTCHA not ready");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setPendingData(data);

    // 2b) Fire off the recaptcha check; once it succeeds,
    //     onRecaptchaSuccess(token) will be called
    window.grecaptcha.execute(widgetIdRef.current);
  };

  // 3) Fire confetti + show modal when status becomes "success"
  useEffect(() => {
    if (status === "success") {
      // Launch confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [status]);

  return (
    <>
      {/* 1) Load the reCAPTCHA script. The "render=explicit" param
               ensures we can call grecaptcha.render() manually. */}
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="beforeInteractive"
      />

      <form
        onSubmit={RHFSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-6"
        aria-labelledby="contact-form-heading"
        noValidate
      >
        <h2 id="contact-form-heading" className="sr-only">
          Contact Form
        </h2>

        {/* NAME */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Your Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="First & last name"
            type="text"
            className={`input-field ${
              errors.name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 animate-fade-in" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Email Address
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="you@example.com"
            type="email"
            className={`input-field ${
              errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 animate-fade-in" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Message
          </label>
          <textarea
            id="message"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
            placeholder="How can we help you?"
            rows={4}
            className={`input-field ${
              errors.message ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 animate-fade-in" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Invisible reCAPTCHA container */}
        <div
          ref={recaptchaContainerRef}
          aria-label="Invisible reCAPTCHA"
          className="hidden"
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting || status === "sending"}
          className={`btn w-full ${
            isSubmitting || status === "sending"
              ? "opacity-60 cursor-not-allowed"
              : ""
          }`}
        >
          {status === "sending" || isSubmitting
            ? "Sending…"
            : "Send Message"}
        </button>

        {/* ERROR FEEDBACK */}
        {status === "error" && (
          <div
            role="alert"
            className="mt-2 text-red-600 animate-fade-in text-center"
          >
            Oops! Something went wrong. Please try again.
          </div>
        )}
      </form>

      {/* THANK YOU MODAL (only show when status === "success") */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            className="
              fixed inset-0 z-50 flex items-center justify-center
              bg-black bg-opacity-50
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
                bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md
                text-center shadow-xl
              "
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.1 } }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
                Thank You!
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Your message has been sent successfully.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn px-8 py-2"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
