// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = form.get("name")?.toString() || "";
  const email = form.get("email")?.toString() || "";
  const message = form.get("message")?.toString() || "";
  const token = form.get("g-recaptcha-response")?.toString() || "";

  // 1️⃣ Verify reCAPTCHA v2
  const secret = process.env.RECAPTCHA_SECRET 
    || "6LfGQBcrAAAAAP7Zb9HRWWzYiFvvyAc43ORLd86N";
  const verifyRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    }
  );
  const verifyJson = await verifyRes.json();
  if (!verifyJson.success) {
    return NextResponse.json(
      { error: "reCAPTCHA verification failed." },
      { status: 400 }
    );
  }

  // 2️⃣ Send email via SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${email}>`,
    to: process.env.CONTACT_EMAIL || "support@ikoconnect.com",
    subject: `New Contact Form Submission from ${name}`,
    text: `
      You’ve got a new message from the contact form:

      Name: ${name}
      Email: ${email}

      Message:
      ${message}
    `,
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
