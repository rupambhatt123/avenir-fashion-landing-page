'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { Playfair_Display, Inter } from 'next/font/google';
import websiteData from '@/data/websiteData.json';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
    <path strokeLinecap="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MailOutline = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
    <path strokeLinejoin="round" d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path strokeLinecap="round" d="M7 7h.01" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
    <path strokeLinejoin="round" d="M21 11.5a8.4 8.4 0 0 1-9 8.3 9 9 0 0 1-3.6-.8L3 21l1.9-5.2A8.3 8.3 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
    <path strokeLinecap="round" d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2" />
  </svg>
);
const PinSolid = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const PhoneSolid = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);
const MailSolid = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.151-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

const fieldBase =
  'w-full rounded-[4px] border border-[#E3DDD3] bg-white pl-11 sm:pl-12 pr-4 text-sm sm:text-base text-[#1A1A1A] placeholder-[#8B8F99] shadow-[0_4px_10px_-8px_rgba(90,60,30,0.3)] outline-none transition-all duration-300 hover:border-[#D2B795] focus:border-[#B07845] focus:shadow-[0_0_0_3px_rgba(176,120,69,0.12)]';
const iconBase =
  'pointer-events-none absolute left-4 h-4 w-4 sm:h-5 sm:w-5 text-[#8E8E96] transition-colors duration-300 group-focus-within:text-[#B07845]';

function Field({ icon, top, children }: { icon: ReactNode; top?: boolean; children: ReactNode }) {
  return (
    <motion.div variants={rise} className="group relative">
      <span className={`${iconBase} ${top ? 'top-4' : 'top-1/2 -translate-y-1/2'}`}>
        {icon}
      </span>
      {children}
    </motion.div>
  );
}

export default function ContactSection() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : 'hidden';

  const contactData =
    websiteData.categories.Fashion.sections.ContactPage.variants.FashionContact1;
  const commonData = websiteData.common;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => setSent(false), 6000);
    return () => clearTimeout(t);
  }, [sent]);

  const info = [
    { icon: <PinSolid />, label: contactData.info.address.label, lines: [contactData.info.address.line1, contactData.info.address.line2], href: undefined as string | undefined },
    { icon: <PhoneSolid />, label: contactData.info.phone.label, lines: [contactData.info.phone.display], href: contactData.info.phone.href },
    { icon: <MailSolid />, label: contactData.info.email.label, lines: [contactData.info.email.display], href: contactData.info.email.href },
  ];

  const socials = [
    { label: 'Facebook', href: commonData.socialLinks.facebook, icon: <FacebookIcon /> },
    { label: 'Instagram', href: commonData.socialLinks.instagram, icon: <InstagramIcon /> },
    { label: 'Twitter', href: commonData.socialLinks.twitter, icon: <TwitterIcon /> },
    { label: 'Pinterest', href: commonData.socialLinks.pinterest, icon: <PinterestIcon /> },
  ];

  const circle =
    'flex h-11 w-11 sm:h-12 sm:w-12 lg:h-13 lg:w-13 shrink-0 items-center justify-center rounded-full bg-[#F6EBDE] text-[#141414] transition-colors duration-500';

  return (
    <div id="contact" className={`${inter.className} relative isolate overflow-x-clip bg-[#FFFDFB] text-[#1A1A1A] pt-14`}>
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          {/* Form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="rounded-[6px] border border-[#F3E9DC] bg-[#FBF6EF] p-6 shadow-[0_20px_45px_-30px_rgba(90,60,30,0.35)] sm:p-8 lg:p-9"
          >
            <motion.div variants={stagger} initial={initial} whileInView="show" viewport={{ once: true }}>
              <motion.p variants={rise} className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#B4722E]">
                {contactData.form.badge}
              </motion.p>
              <motion.span
                className="mt-2 block h-[2px] w-9 origin-left bg-[#C79A68]"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              />
              <motion.h2 variants={rise} className={`${playfair.className} mt-3 text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight text-[#141414]`}>
                {contactData.form.title}
              </motion.h2>
              <motion.p variants={rise} className="mt-2 text-xs sm:text-sm leading-relaxed text-[#7A7F8C]">
                {contactData.form.description}
              </motion.p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              variants={stagger}
              initial={initial}
              whileInView="show"
              viewport={{ once: true }}
              className="mt-6 space-y-3.5 sm:space-y-4"
            >
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <Field icon={<UserIcon />}>
                  <input
                    type="text"
                    required
                    placeholder={contactData.form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`${fieldBase} h-11 sm:h-12`}
                  />
                </Field>
                <Field icon={<MailOutline />}>
                  <input
                    type="email"
                    required
                    placeholder={contactData.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`${fieldBase} h-11 sm:h-12`}
                  />
                </Field>
              </div>

              <Field icon={<TagIcon />}>
                <input
                  type="text"
                  required
                  placeholder={contactData.form.subjectPlaceholder}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`${fieldBase} h-11 sm:h-12`}
                />
              </Field>

              <Field icon={<ChatIcon />} top>
                <textarea
                  rows={4}
                  required
                  placeholder={contactData.form.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${fieldBase} block h-28 sm:h-32 resize-y pt-3`}
                />
              </Field>

              <motion.div variants={rise} className="pt-1">
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative flex h-11 sm:h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-[4px] bg-[#A87049] text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-[0_12px_24px_-10px_rgba(120,75,30,0.6)] outline-none"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-[#8F6030] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative">{contactData.form.buttonText}</span>
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {sent && (
                  <motion.p
                    role="status"
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-center gap-2.5 overflow-hidden rounded-[4px] border border-[#DCC7AB] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#6E4A24]"
                  >
                    {contactData.form.successMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>

          {/* Details */}
          <div className="relative lg:pt-2">
            <motion.div variants={stagger} initial={initial} whileInView="show" viewport={{ once: true }} className="relative z-10">
              <motion.p variants={rise} className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#B4722E]">
                {contactData.info.badge}
              </motion.p>
              <motion.span
                className="mt-2 block h-[2px] w-9 origin-left bg-[#C79A68]"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
              />
              <motion.h2 variants={rise} className={`${playfair.className} mt-3 text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight text-[#141414]`}>
                {contactData.info.title}
              </motion.h2>
              <motion.p variants={rise} className="mt-2 text-xs sm:text-sm leading-relaxed text-[#7A7F8C]">
                {contactData.info.description}
              </motion.p>
            </motion.div>

            <motion.ul variants={stagger} initial={initial} whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative z-10 mt-6 space-y-4 sm:space-y-5">
              {info.map((row) => (
                <motion.li key={row.label} variants={rise} className="group flex items-center gap-3.5 sm:gap-4">
                  <motion.span className={`${circle} group-hover:bg-[#B07845] group-hover:text-white`}>
                    <span className="block h-5 w-5 sm:h-6 sm:w-6">{row.icon}</span>
                  </motion.span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#B5733B]">{row.label}</h3>
                    {row.href ? (
                      <a href={row.href} className="mt-0.5 block text-sm sm:text-base leading-snug text-[#141414] transition-colors hover:text-[#A86F35]">
                        {row.lines[0]}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm sm:text-base leading-snug text-[#141414]">
                        {row.lines.map((l, i) => (
                          <span key={i} className="block">{l}</span>
                        ))}
                      </p>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={stagger} initial={initial} whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative z-10 mt-6">
              <motion.h3 variants={rise} className={`${playfair.className} text-xl sm:text-2xl font-normal leading-tight text-[#141414]`}>
                {contactData.info.follow.title}
              </motion.h3>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`${circle} outline-none hover:bg-[#B07845] hover:text-white`}
                  >
                    <span className="block h-4 w-4 sm:h-5 sm:w-5">{s.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative h-[260px] sm:h-[340px] lg:h-[420px] w-full overflow-hidden bg-[#EADFD2]"
      >
        <iframe
          title={contactData.map.title}
          src={contactData.map.src}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'saturate(0.85) sepia(0.12) brightness(1.04) contrast(0.96)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  );
}