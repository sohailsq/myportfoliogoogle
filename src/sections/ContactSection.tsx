import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, Clock, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await api.submitContact(formData);
      setSuccessMsg(res.message || 'Message delivered successfully! I will respond promptly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to deliver message. Please reach out directly to sohailshah14921@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sohailshah14921@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-slate-800/80 bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                07. Inquiries &amp; Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-100 mt-2 text-balance">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed font-sans">
                Currently open to full-time software engineering roles, high-impact web &amp; mobile product builds, and technical consultations.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#0e131f]/75 border border-slate-800/80 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Direct Email</span>
                    <a
                      href="mailto:sohailshah14921@gmail.com"
                      className="text-xs sm:text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors font-mono"
                    >
                      sohailshah14921@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-slate-700/60"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e131f]/75 border border-slate-800/80 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-400/10 text-sky-400 border border-sky-400/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Primary Location</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-100">
                    Hyderabad, Telangana, India (IST UTC+5:30)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e131f]/75 border border-slate-800/80 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Turnaround</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-100">
                    Prompt response within 24 business hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0e131f]/85 border border-slate-800/90 shadow-2xl">
            <h3 className="text-lg font-bold font-display text-slate-100 mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              Fill out this form to connect directly. Inquiries are stored securely with anti-spam rate limiting.
            </p>

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Software Engineer Role / Project Consultation"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the engineering opportunity, project scope, or technical challenge..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors resize-y shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-amber-400/10 cursor-pointer active:scale-95"
              >
                {loading ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
