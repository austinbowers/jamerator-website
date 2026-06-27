import Formcarry from "@/app/contact/components/formcarry";
import { Icon } from "@/app/components/ds/Icon";

export const metadata = {
  title: "Contact | Jamerator",
  description: "Questions, feedback, or a bug to report? Get in touch with the Jamerator team.",
};

const REASONS = [
  { icon: "music", text: "Questions about the app" },
  { icon: "flask", text: "Bug reports" },
  { icon: "heart", text: "Feature requests & feedback" },
];

export default function Contact() {
  return (
    <section className="section section-tint" style={{ position: "relative", minHeight: "calc(100vh - 88px)" }}>
      <div className="decor-disc" style={{ width: 320, height: 320, right: "-90px", top: "-70px", opacity: 0.45 }} />
      <div className="decor-ring" style={{ width: 200, height: 200, left: "-70px", bottom: "50px", opacity: 0.55 }} />
      <div className="wrap contact-grid" style={{ position: "relative" }}>
        <div>
          <span className="pill">
            <Icon name="heart" size={15} color="var(--forest)" strokeWidth={2.4} />
            We&apos;d love to hear from you
          </span>
          <h1 className="h2" style={{ fontSize: "clamp(38px, 7vw, 56px)", margin: "18px 0 16px" }}>
            Get in <span style={{ color: "var(--forest)" }}>touch.</span>
          </h1>
          <p className="body-copy" style={{ fontSize: 18 }}>
            Questions, feedback, or a bug to report? Drop us a note and we&apos;ll get back to you. We read every message.
          </p>
          <div className="contact-list">
            {REASONS.map((r) => (
              <div key={r.text} className="contact-list-item">
                <span className="contact-ico">
                  <Icon name={r.icon} size={19} color="var(--forest)" strokeWidth={2} />
                </span>
                {r.text}
              </div>
            ))}
          </div>
        </div>
        <div className="form-card">
          <Formcarry />
        </div>
      </div>
    </section>
  );
}
