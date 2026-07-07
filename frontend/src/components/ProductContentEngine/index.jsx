import React from 'react';
import './ProductContentEngine.css';

const CONTACT_EMAIL = 'novarch-ai@gmail.com';

const mailto = (subject) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const TEARDOWN_MAILTO = mailto('Free product page teardown request');
const SPRINT_MAILTO = mailto('Starter Sprint — Product Content Engine');
const ENGINE_MAILTO = mailto('Monthly Content Engine — let\'s scope it');

function Icon({ type }) {
  switch (type) {
    case 'page':
      return <svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 12h6M9 16h5" /></svg>;
    case 'angle':
      return <svg viewBox="0 0 24 24"><path d="M4 18 10 8l4 5 6-9" /><path d="M4 18h16" /></svg>;
    case 'script':
      return <svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z" /><path d="M8 9h8M8 12h8M8 15h5" /></svg>;
    case 'video':
      return <svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3z" /></svg>;
    case 'calendar':
      return <svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M8 3v4M16 3v4M8 13h3M13 13h3M8 16h3" /></svg>;
    case 'reviews':
      return <svg viewBox="0 0 24 24"><path d="m12 4 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4 9.3l5-.7z" /></svg>;
    case 'faq':
      return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.8.4-1.4 1-1.4 1.9" /><path d="M12 17h.01" /></svg>;
    case 'photo':
      return <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m4 18 5-4 4 3 3-2 4 3" /></svg>;
    case 'clock':
      return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case 'shield':
      return <svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="m9 12 2 2 4-4" /></svg>;
    case 'spark':
      return <svg viewBox="0 0 24 24"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" /></svg>;
    case 'check':
      return <svg viewBox="0 0 24 24"><path d="m5 13 4 4L19 7" /></svg>;
    case 'arrow':
      return <svg viewBox="0 0 24 24"><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>;
    default:
      return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg>;
  }
}

const contentSources = [
  ['page', 'Product pages', 'Benefits, features, use cases, and positioning already written for you.'],
  ['reviews', 'Reviews', 'Real proof, objections, and the exact language your buyers use.'],
  ['faq', 'FAQs', 'Every buyer question becomes a scroll-stopping short-form video.'],
  ['photo', 'Product photos', 'Existing visual assets repurposed into native vertical content.'],
];

const pipeline = [
  ['page', 'Product page', 'You send the link'],
  ['angle', 'Content angles', 'We find the hooks'],
  ['script', 'Scripts', 'Written to convert'],
  ['video', 'Edited videos', 'Vertical & ready'],
  ['calendar', 'Calendar', '30 days planned'],
];

const stats = [
  ['30 days', 'of short-form content from assets you already own'],
  ['5–7 days', 'from approved assets to finished deliverables'],
  ['0 filming', 'no shoots, no studio, no on-camera talent required'],
];

const painPoints = [
  'You know short-form video drives sales — but you never have time to script and produce it.',
  'Your product pages and reviews are full of angles that never make it to TikTok or Reels.',
  'Agencies want a huge retainer before they\'ve proven a single post works for you.',
  'You\'ve tried posting yourself, but it\'s inconsistent and nothing compounds.',
];

const tiers = [
  {
    name: 'Free Teardown',
    price: '$0',
    cadence: 'no commitment',
    tagline: 'See the opportunity before you spend a cent.',
    features: [
      'We review one product page',
      '3–5 short-form content angles',
      'Written breakdown of what to post',
      'Delivered within 3 business days',
    ],
    cta: 'Request free teardown',
    href: TEARDOWN_MAILTO,
    variant: 'ghost',
  },
  {
    name: 'Starter Sprint',
    price: '$749',
    cadence: 'one-time · 50% to start',
    tagline: 'Test the full workflow on one product batch.',
    features: [
      '15 short-form scripts',
      '5 finished vertical videos',
      'Captions, titles & hooks',
      '14–30 day content calendar',
      'One revision round',
      'Delivery in 5–7 business days',
    ],
    cta: 'Book a Starter Sprint',
    href: SPRINT_MAILTO,
    variant: 'featured',
    badge: 'Most popular',
  },
  {
    name: 'Content Engine',
    price: 'Custom',
    cadence: 'monthly system',
    tagline: 'An always-on pipeline across your full catalog.',
    features: [
      'Everything in Starter Sprint',
      'Ongoing monthly scripts & videos',
      'Multiple products & categories',
      'Monthly strategy + content calendar',
      'Priority delivery & revisions',
      'Performance-led angle refresh',
    ],
    cta: 'Scope a monthly plan',
    href: ENGINE_MAILTO,
    variant: 'ghost',
  },
];

const faqs = [
  [
    'Do I need to film anything or be on camera?',
    'No. We build everything from assets you already have — product pages, reviews, FAQs, and your existing product photos. No shoots, no studio, no on-camera talent.',
  ],
  [
    'What exactly do I receive?',
    'The Starter Sprint delivers 15 short-form scripts, 5 finished vertical videos, captions, titles and hooks, plus a 14–30 day content calendar — ready to post to Reels, TikTok, and Shorts.',
  ],
  [
    'How fast is delivery?',
    'Standard delivery is 5–7 business days after we receive your assets. Monthly Content Engine clients get priority turnaround.',
  ],
  [
    'What if I don\'t like the content?',
    'Every Starter Sprint includes a revision round. And the free teardown means you see our thinking before you pay anything — so there are no surprises.',
  ],
  [
    'Which brands is this built for?',
    'Shopify and DTC ecommerce brands with real product pages and reviews who want consistent short-form content without hiring an in-house team.',
  ],
];

function ProductContentEngine() {
  return (
    <main className="pce-page">
      <header className="pce-header">
        <a className="pce-logo" href="/">NOVARCH</a>
        <nav>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a className="pce-nav-cta" href={TEARDOWN_MAILTO}>Free teardown</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="pce-hero">
        <div className="pce-hero-glow" aria-hidden="true" />
        <div className="pce-kicker">
          <span className="pce-dot" /> Product Content Engine by NOVARCH
        </div>
        <h1>
          You already wrote the content.<br />
          It's <span className="pce-accent">buried in your product pages.</span>
        </h1>
        <p className="pce-lede">
          We turn your existing product pages, reviews, FAQs, and photos into 30 days of
          scroll-stopping short-form video — scripts, Reels, TikToks, Shorts, captions, and a
          content calendar. No filming. No retainer to find out if it works.
        </p>
        <div className="pce-actions">
          <a className="pce-primary" href={TEARDOWN_MAILTO}>
            Get a free page teardown <Icon type="arrow" />
          </a>
          <a className="pce-secondary" href="#pricing">See pricing &amp; packages</a>
        </div>
        <div className="pce-trust">
          <span><Icon type="check" /> No filming required</span>
          <span><Icon type="check" /> Built from assets you own</span>
          <span><Icon type="check" /> Founder-led delivery</span>
        </div>
      </section>

      {/* STATS */}
      <section className="pce-stats">
        {stats.map(([big, small]) => (
          <div className="pce-stat" key={big}>
            <strong>{big}</strong>
            <span>{small}</span>
          </div>
        ))}
      </section>

      {/* PAIN / HOOK */}
      <section className="pce-section pce-pain">
        <span className="pce-label">Sound familiar?</span>
        <h2>Short-form is the channel. Consistency is the problem.</h2>
        <div className="pce-pain-grid">
          {painPoints.map((point) => (
            <div className="pce-pain-item" key={point}>
              <span className="pce-x" aria-hidden="true">✕</span>
              <p>{point}</p>
            </div>
          ))}
        </div>
        <p className="pce-pain-turn">
          The raw material isn't missing — it's already sitting in your store. What's missing is the
          system that turns it into content you can actually post.
        </p>
      </section>

      {/* CONTENT SOURCES */}
      <section className="pce-section pce-grid">
        <div className="pce-grid-copy">
          <span className="pce-label">The opportunity</span>
          <h2>Every product page is a month of content.</h2>
          <p>
            Most brands don't lack ideas — they lack a repeatable way to mine them. We pull proven
            angles from four sources you already have and turn them into a short-form workflow.
          </p>
        </div>
        <div className="pce-card-list">
          {contentSources.map(([icon, title, copy]) => (
            <article className="pce-card" key={title}>
              <span className="pce-card-icon"><Icon type={icon} /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="pce-section pce-process" id="how">
        <span className="pce-label">How it works</span>
        <h2>Product page in. Content workflow out.</h2>
        <p className="pce-process-lede">
          One link from you kicks off a five-step pipeline. You approve; we produce.
        </p>
        <div className="pce-pipeline">
          {pipeline.map(([icon, title, copy], i) => (
            <React.Fragment key={title}>
              <div className="pce-step">
                <span className="pce-step-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pce-step-icon"><Icon type={icon} /></span>
                <strong>{title}</strong>
                <small>{copy}</small>
              </div>
              {i < pipeline.length - 1 && <span className="pce-step-line" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="pce-section pce-pricing" id="pricing">
        <div className="pce-pricing-head">
          <span className="pce-label">Packages</span>
          <h2>Start free. Scale when it works.</h2>
          <p>
            Three ways to work with us — start with a free teardown, test the full workflow with a
            one-time sprint, or build an always-on engine across your catalog.
          </p>
        </div>
        <div className="pce-tiers">
          {tiers.map((tier) => (
            <article className={`pce-tier ${tier.variant}`} key={tier.name}>
              {tier.badge && <span className="pce-tier-badge">{tier.badge}</span>}
              <div className="pce-tier-name">{tier.name}</div>
              <div className="pce-tier-price">
                <strong>{tier.price}</strong>
                <span>{tier.cadence}</span>
              </div>
              <p className="pce-tier-tagline">{tier.tagline}</p>
              <ul>
                {tier.features.map((f) => (
                  <li key={f}><Icon type="check" /> {f}</li>
                ))}
              </ul>
              <a
                className={tier.variant === 'featured' ? 'pce-primary full' : 'pce-secondary full'}
                href={tier.href}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
        <div className="pce-guarantee">
          <span className="pce-guarantee-icon"><Icon type="shield" /></span>
          <p>
            <strong>Zero-risk start.</strong> The free teardown shows you real content angles before
            any payment. If the sprint deliverables miss the mark, your revision round makes it right.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="pce-section pce-faq" id="faq">
        <div className="pce-faq-head">
          <span className="pce-label">Questions</span>
          <h2>Everything you're probably wondering.</h2>
        </div>
        <div className="pce-faq-list">
          {faqs.map(([q, a]) => (
            <details className="pce-faq-item" key={q}>
              <summary>
                {q}
                <span className="pce-faq-plus" aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pce-section pce-cta">
        <div className="pce-cta-card">
          <span className="pce-label">Start here</span>
          <h2>See what's hiding in one product page.</h2>
          <p>
            Send us a single product page and we'll show you 3–5 short-form content ideas you can
            post from assets you already own — free, no strings, no call required.
          </p>
          <div className="pce-actions center">
            <a className="pce-primary" href={TEARDOWN_MAILTO}>
              Request my free teardown <Icon type="arrow" />
            </a>
            <a className="pce-secondary" href={SPRINT_MAILTO}>Book a Starter Sprint</a>
          </div>
          <p className="pce-cta-scarcity">
            <Icon type="clock" /> Founder-led delivery — we take on a limited number of sprints each month.
          </p>
        </div>
      </section>

      <footer className="pce-footer">
        <div>
          <strong>NOVARCH</strong>
          <p>
            NOVARCH builds workflow systems that turn scattered information into structured execution.
            Product Content Engine is our ecommerce content sprint: product information in, short-form
            content workflow out.
          </p>
        </div>
        <div className="pce-footer-contact">
          <span>Get in touch</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </footer>
    </main>
  );
}

export default ProductContentEngine;
