import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, Clock } from 'lucide-react';
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
      setSuccessMsg(res.message || 'Message sent successfully! Sohail will respond promptly.');
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
    <section id="contact" className="py-20 md:py-28 border-t border-neutral-800/80 light:border-neutral-200 bg-neutral-950/40 light:bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 light:text-amber-800 font-semibold">
                07. Inquiries &amp; Collaboration
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-neutral-100 light:text-neutral-900 mt-2 text-balance">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 light:text-neutral-600 mt-2 leading-relaxed">
                Currently open to full-time engineering roles, technical contract consultations, and high-impact fintech / mobile product development.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800/80 light:border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 light:text-neutral-500 block">Direct Email</span>
                    <a
                      href="mailto:sohailshah14921@gmail.com"
                      className="text-xs sm:text-sm font-semibold text-neutral-100 light:text-neutral-900 hover:text-amber-400 transition-colors font-mono"
                    >
                      sohailshah14921@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-neutral-400 hover:text-neutral-200 light:hover:text-neutral-900 bg-neutral-800 light:bg-neutral-100 rounded-md transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800/80 light:border-neutral-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 light:text-neutral-500 block">Primary Location</span>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-100 light:text-neutral-900">
                    Hyderabad, Telangana, India (IST UTC+5:30)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 light:bg-white border border-neutral-800/80 light:border-neutral-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 light:text-neutral-500 block">Response SLA</span>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-100 light:text-neutral-900">
                    Within 24 business hours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form connected to POST /api/contact */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-neutral-900 light:bg-white border border-neutral-800 light:border-neutral-200 shadow-xl">
            <h3 className="text-lg font-bold font-display text-neutral-100 light:text-neutral-900 mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-neutral-400 light:text-neutral-600 mb-6">
              Submissions are validated, rate-limited, and recorded in the database.
            </p>

            {successMsg && (
              <div className="mb-5 p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-5 p-4 rounded-lg bg-red-950/20 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 light:text-neutral-700 mb-1.5">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 rounded-lg text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 light:text-neutral-700 mb-1.5">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 rounded-lg text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 light:text-neutral-700 mb-1.5">
                  Subject / Topic <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Software Engineer Role / Project Architecture Discussion"
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 rounded-lg text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 light:text-neutral-700 mb-1.5">
                  Message <span className="text-amber-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your team, tech stack, or the project challenge you are working on..."
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 light:bg-neutral-50 border border-neutral-800 light:border-neutral-300 rounded-lg text-neutral-100 light:text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Submitting to REST API...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
