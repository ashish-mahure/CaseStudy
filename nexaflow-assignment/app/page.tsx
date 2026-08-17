import Header from '../components/Header';
import DashboardMockup from '../components/DashboardMockup';
import { ArrowRight } from '../components/Icon';

const logos = ['vertex', 'northstar', 'Axiom', 'MOTION', 'LUMEN'];

const benefits: ReadonlyArray<readonly [string, string, string]> = [
  ['01', 'Connect your tools', 'Integrate the systems your team already uses without rebuilding your technology stack.'],
  ['02', 'Automate repetitive work', 'Replace manual handoffs with reliable workflows and intelligent decision support.'],
  ['03', 'Measure what matters', 'See performance, bottlenecks and opportunities from a single operational view.']
];

const footerGroups: ReadonlyArray<{ title: string; links: string[] }> = [
  { title: 'PRODUCT', links: ['Platform', 'Solutions', 'Pricing'] },
  { title: 'COMPANY', links: ['About', 'Careers', 'Contact'] },
  { title: 'RESOURCES', links: ['Blog', 'Guides', 'Help Center'] }
];

export default function Home() {
  return (
    <main id="top">
      <Header />

      <section className="hero" id="platform">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">AI-POWERED OPERATIONS PLATFORM</p>
            <h1>
              Turn complex work
              <br className="desktop-only" />
              into simple growth.
            </h1>
            <p className="hero-sub">
              NexaFlow connects your teams, data and workflows so your business can move faster with less effort.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#demo">
                Start Free <ArrowRight />
              </a>
              <a className="button button-outline" href="#solutions">
                See How It Works <ArrowRight />
              </a>
            </div>
          </div>

          <DashboardMockup />
        </div>
      </section>

      <section className="trust" aria-label="Trusted companies">
        <div className="container">
          <p className="trust-title">TRUSTED BY MODERN TEAMS</p>
          <div className="logo-row">
            {logos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="value-section" id="solutions">
        <div className="container">
          <p className="eyebrow">WHY NEXAFLOW</p>
          <h2>One platform. Less operational friction.</h2>
          <p className="section-lead">Bring fragmented workflows into one intelligent operating layer.</p>

          <div className="benefit-grid">
            {benefits.map(([number, title, description]) => (
              <article className="benefit-card" key={number}>
                <span className="number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platform-section" id="resources">
        <div className="container">
          <p className="eyebrow light">THE PLATFORM</p>
          <h2>Designed for teams that move fast.</h2>
          <p className="section-lead dark-lead">Everything you need to orchestrate modern operations.</p>

          <div className="feature-grid">
            <article className="feature-card">
              <h3>Workflow automation</h3>
              <p>Build repeatable workflows with triggers, conditions and actions.</p>
              <div className="flow-visual" aria-hidden="true">
                <span className="node purple" />
                <span className="connector" />
                <span className="node blue" />
                <span className="connector" />
                <span className="node green" />
                <span className="connector" />
                <span className="node amber" />
              </div>
            </article>

            <article className="feature-card">
              <h3>Intelligent insights</h3>
              <p>Turn operational data into clear actions with real-time dashboards.</p>
              <div className="insight-visual" aria-hidden="true">
                <div className="bars">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <strong>+28% efficiency</strong>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container testimonial-inner">
          <p className="eyebrow">CUSTOMER STORY</p>
          <blockquote>
            “We reduced operational overhead
            <br className="desktop-only" />
            and finally got one source of truth.”
          </blockquote>
          <p className="attribution">Sarah Chen · COO, Northstar</p>
          <div className="metric">41%</div>
          <p className="metric-label">less time spent on manual processes</p>
        </div>
      </section>

      <section className="cta-section" id="demo">
        <div className="cta-card">
          <h2>
            Ready to simplify the way
            <br className="desktop-only" />
            your team works?
          </h2>
          <p>See what NexaFlow can do for your organization.</p>
          <a className="button button-light" href="mailto:hello@nexaflow.example">
            Book a Demo <ArrowRight />
          </a>
        </div>
      </section>

      <footer className="site-footer" id="company">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#top">NEXAFLOW</a>
            <p>The operating layer for modern teams.</p>
          </div>

          {footerGroups.map((group) => (
            <FooterColumn key={group.title} title={group.title} links={group.links} />
          ))}
        </div>

        <div className="container footer-bottom">
          <span>© 2026 NexaFlow. Design exercise.</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </main>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      {links.map((link) => (
        <a href="#top" key={link}>
          {link}
        </a>
      ))}
    </div>
  );
}
