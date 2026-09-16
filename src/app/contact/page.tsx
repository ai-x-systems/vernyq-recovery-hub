"use client";
import { useState } from "react";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  return (
    <div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <div className="py-8 lg:py-12 max-w-3xl">
          <h1 className="text-h1 text-[#0A182E]">Contact Us</h1>
          <p className="text-body-lg text-[#555555] mt-3">Have a question about our products, orders, or cold plunging? We're here to help.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 pb-20">
          <div className="space-y-6">
            {[{ Icon: Mail, title: "Email", text: "support@vernyq.com" }, { Icon: Clock, title: "Response Time", text: "Within 1-2 business days" }, { Icon: MessageSquare, title: "Support Categories", text: "Product, Orders, Shipping, Warranty, Returns" }].map(({ Icon, title, text }) => (
              <div key={title} className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-5">
                <Icon className="size-5 text-[#0084FF] mb-3" />
                <h3 className="text-body-sm font-medium text-[#0A182E]">{title}</h3>
                <p className="text-body-sm text-[#555555] mt-1">{text}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-[#f3f1ee] border border-[#e0ddd8] rounded-[0.5rem] p-8 text-center">
                <h2 className="text-h3 text-[#0A182E]">Message Sent</h2>
                <p className="text-body-sm text-[#555555] mt-2">Thank you! We'll get back to you within 1-2 business days.</p>
              </div>
            ) : (
              <form onSubmit={async e => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setSending(true);
                try {
                  const { error } = await supabase.from("contact_messages").insert({
                    name: String(fd.get("name") || ""),
                    email: String(fd.get("email") || ""),
                    message: String(fd.get("message") || ""),
                  });
                  if (error) throw error;
                  setSubmitted(true);
                } catch (err) {
                  console.error("Contact failed:", err);
                  alert("Could not send your message. Please email support@vernyq.com directly.");
                } finally {
                  setSending(false);
                }
              }} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">Name *</label><input name="name" type="text" required className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF]" placeholder="Your name" /></div>
                  <div><label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">Email *</label><input name="email" type="email" required className="w-full h-11 px-4 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF]" placeholder="you@example.com" /></div>
                </div>
                <div><label className="text-body-sm font-medium text-[#0A182E] block mb-1.5">Message *</label><textarea name="message" required rows={6} className="w-full px-4 py-3 bg-[#faf9f7] border border-[#e0ddd8] rounded-[0.5rem] text-body-sm text-[#0A182E] placeholder:text-[#888888] focus:outline-none focus:border-[#0084FF] resize-none" placeholder="How can we help?" /></div>
                <button type="submit" disabled={sending} className="h-12 px-8 bg-[#0A182E] text-[#faf9f7] text-body-sm font-medium rounded-[0.5rem] hover:bg-[#0A182E]/90 transition-colors disabled:opacity-50">{sending ? "Sending..." : "Send Message"}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
