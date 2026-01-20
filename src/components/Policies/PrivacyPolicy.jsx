// components/Policies/PrivacyPolicy.jsx
import React, { useEffect } from 'react';
import '../styles/policies/PrivacyPolicy.scss';

const PrivacyPolicy = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="privacy-policy">
      {/* Hero Section */}
      <section className="privacy-policy__hero">
        <div className="privacy-policy__container">
          <div className="privacy-policy__hero-content">
            <h1 className="privacy-policy__title">
              Motive Home Care
              <span className="privacy-policy__title--accent">Privacy Policy & Terms of Service</span>
            </h1>
            <p className="privacy-policy__last-updated">
              <strong>Last Updated:</strong> December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="privacy-policy__content">
        <div className="privacy-policy__container">
          <div className="privacy-policy__intro">
            <p>
              Motive Home Care ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>") is committed to
              protecting the privacy and security of the personal information we collect and use in the course of providing
              staffing and coordination services for physical, occupational, and speech therapy to home health agencies and
              patients.
            </p>
            <p>
              This Privacy Policy explains what personal information we collect, how we use it, with whom we share it,
              and the choices and rights available to you. It applies to information we collect through our website,
              our communication platforms (including phone and SMS where applicable), and in connection with our
              staffing and coordination services (collectively, the "<strong>Services</strong>").
            </p>
          </div>

          {/* Table of Contents */}
          <div className="privacy-policy__toc">
            <h3 className="privacy-policy__toc-title">Table of Contents</h3>
            <nav className="privacy-policy__toc-nav">
              <button onClick={() => scrollToSection('information-collect')}>1. Information We Collect</button>
              <button onClick={() => scrollToSection('how-collect')}>2. How We Collect Information</button>
              <button onClick={() => scrollToSection('how-use')}>3. How We Use Personal Information</button>
              <button onClick={() => scrollToSection('how-share')}>4. How We Share Personal Information</button>
              <button onClick={() => scrollToSection('sms-communications')}>5. SMS Communications and Consent</button>
              <button onClick={() => scrollToSection('cookies')}>6. Cookies and Tracking Technologies</button>
              <button onClick={() => scrollToSection('data-security')}>7. Data Security</button>
              <button onClick={() => scrollToSection('data-retention')}>8. Data Retention</button>
              <button onClick={() => scrollToSection('your-rights')}>9. Your Rights and Choices</button>
              <button onClick={() => scrollToSection('third-party')}>10. Third-Party Websites and Services</button>
              <button onClick={() => scrollToSection('childrens-privacy')}>11. Children's Privacy</button>
              <button onClick={() => scrollToSection('changes')}>12. Changes to This Privacy Policy</button>
              <button onClick={() => scrollToSection('contact')}>13. Contact Us</button>
            </nav>
          </div>

          {/* Section 1 */}
          <div id="information-collect" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">1. Information We Collect</h2>
            <p>We may collect the following categories of personal information, depending on how you interact with us:</p>

            <h3 className="privacy-policy__subsection-title">1.1 Contact and Identification Information</h3>
            <ul className="privacy-policy__list">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Mailing address or service location</li>
              <li>Agency or organization name and role/title</li>
            </ul>

            <h3 className="privacy-policy__subsection-title">1.2 Professional and Credential Information (Therapists / Clinicians)</h3>
            <ul className="privacy-policy__list">
              <li>Professional license number and licensing state</li>
              <li>Therapy discipline and credentials</li>
              <li>Coverage areas (cities/zip codes)</li>
              <li>Languages spoken</li>
              <li>Availability and scheduling preferences</li>
              <li>Work history and related profile information you provide</li>
            </ul>

            <h3 className="privacy-policy__subsection-title">1.3 Client / Patient-Related Information</h3>
            <p>
              When we coordinate services on behalf of home health agencies or providers, we may receive limited
              patient-related information, which may include:
            </p>
            <ul className="privacy-policy__list">
              <li>Patient name and contact information</li>
              <li>Service address or location</li>
              <li>Referring agency or provider information</li>
              <li>Scheduled visit details and care coordination notes</li>
              <li>
                Health-related information necessary to coordinate therapy services, such as general mobility status,
                functional limitations, or other information relevant to staffing and scheduling
              </li>
            </ul>
            <p className="privacy-policy__note">
              Some of this information may be considered sensitive or health-related and may be protected under
              applicable privacy and health information laws.
            </p>

            <h3 className="privacy-policy__subsection-title">1.4 Communication and Interaction Data</h3>
            <ul className="privacy-policy__list">
              <li>Records of communications with us via phone, email, website forms, or other channels</li>
              <li>
                SMS message content and metadata (where applicable) related to service confirmations, reminders, or
                account notifications
              </li>
              <li>Call details such as date, time, duration, and phone numbers</li>
            </ul>

            <h3 className="privacy-policy__subsection-title">1.5 Technical and Usage Information</h3>
            <ul className="privacy-policy__list">
              <li>IP address and general location inferred from IP</li>
              <li>Browser type, device type, and operating system</li>
              <li>Pages viewed, links clicked, and referring/exit pages</li>
              <li>Other usage information collected via cookies or similar technologies (where used)</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div id="how-collect" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">2. How We Collect Information</h2>
            <p>We collect personal information in several ways, including:</p>
            <ul className="privacy-policy__list">
              <li><strong>Directly from you</strong> when you contact us by phone, email, or through our website forms.</li>
              <li>
                <strong>From partner agencies or providers</strong> that share information with us in order to coordinate
                therapy services for their patients.
              </li>
              <li>
                <strong>Automatically</strong> when you use our website, through cookies and similar technologies that
                collect technical and usage information.
              </li>
              <li>
                <strong>From therapists and clinicians</strong> who provide us with updates related to scheduling, visits,
                and patient progress for coordination and operational purposes.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div id="how-use" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">3. How We Use Personal Information</h2>
            <p>We use the personal information we collect for the following purposes:</p>
            <ul className="privacy-policy__list">
              <li>Coordinating, staffing, and managing therapy services for home health agencies and their patients.</li>
              <li>Scheduling visits, managing calendars, and confirming availability with therapists and agencies.</li>
              <li>Communicating with agencies, therapists, and in some cases patients or caregivers about services.</li>
              <li>Sending service-related notifications, appointment confirmations, and follow-up communications.</li>
              <li>Managing billing, invoicing, and administrative processes related to our Services.</li>
              <li>
                Maintaining business records, quality assurance, and internal analytics to improve our operations and
                Services.
              </li>
              <li>
                Complying with legal, regulatory, and contractual obligations, including health information requirements
                where applicable.
              </li>
              <li>
                Protecting against, identifying, and preventing fraud, unauthorized activity, or misuse of our Services.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div id="how-share" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">4. How We Share Personal Information</h2>
            <p>
              We do <strong>not</strong> sell or rent your personal information. We may share personal information only
              as reasonably necessary for the purposes described in this Privacy Policy, including:
            </p>
            <ul className="privacy-policy__list">
              <li>
                <strong>With home health agencies, providers, and authorized partners</strong> to coordinate therapy
                services, scheduling, and care for patients.
              </li>
              <li>
                <strong>With therapists and clinicians</strong> to provide them with necessary information about patients,
                visit locations, and scheduling details.
              </li>
              <li>
                <strong>With service providers and vendors</strong> that perform functions on our behalf, such as
                communications platforms (phone/SMS), scheduling tools, billing and invoicing systems, and data hosting.
              </li>
              <li>
                <strong>With payment processors or financial institutions</strong> to facilitate payments, payouts, and
                reconciliation where applicable.
              </li>
              <li>
                <strong>With insurers or administrative entities</strong> as needed for billing or compliance purposes,
                where permitted by law or contract.
              </li>
              <li>
                <strong>With regulators, auditors, or legal authorities</strong> when required to comply with applicable
                laws, regulations, court orders, or legal processes.
              </li>
              <li>
                <strong>In the context of a business transfer</strong>, such as a merger, acquisition, or sale of assets,
                where personal information may be transferred as part of the transaction, subject to appropriate
                protections.
              </li>
            </ul>
            <div className="privacy-policy__highlight">
              <p>
                <strong>SMS consent is not shared with third parties or affiliates.</strong><br />
                If you choose to provide consent to receive SMS messages from us, that consent is used only to send you
                text messages related to our Services and is not shared or sold to any third parties or affiliates.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div id="sms-communications" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">5. SMS Communications and Consent</h2>
            <p>
              From time to time, we may offer the option for you to receive SMS (text) messages related to our Services.
              These may include, for example, appointment confirmations, scheduling updates, and account or
              service-related notifications.
            </p>
            <p>
              By providing your mobile phone number and opting in to receive SMS messages (where applicable), you consent
              to receive text messages from Motive Home Care at the number you provide. Participation is voluntary and
              not a condition of receiving services where such consent is not required by law.
            </p>
            <p><strong>SMS consent is not shared with third parties or affiliates.</strong></p>

            <div id="sms-terms" className="privacy-policy__subsection">
              <h3 className="privacy-policy__subsection-title">5.1 SMS Terms &amp; Conditions</h3>

              <h4 className="privacy-policy__sub-subsection-title">Types of Messages You May Receive</h4>
              <p>If you opt in to SMS, you may receive messages such as:</p>
              <ul className="privacy-policy__list">
                <li>Appointment confirmations and reminders</li>
                <li>Scheduling updates or changes</li>
                <li>Service-related notices and account notifications</li>
              </ul>

              <h4 className="privacy-policy__sub-subsection-title">Message Frequency</h4>
              <p>
                Message frequency may vary depending on the nature of your interactions with us and the services being
                coordinated.
              </p>

              <h4 className="privacy-policy__sub-subsection-title">Message and Data Rates</h4>
              <p>
                Message and data rates may apply, depending on your mobile carrier plan. You are responsible for any
                charges assessed by your carrier.
              </p>

              <h4 className="privacy-policy__sub-subsection-title">How to Opt Out</h4>
              <p>
                You may cancel SMS communications at any time. To opt out of receiving SMS messages, reply
                <strong> STOP</strong> to any message you receive from us. After you send <strong>STOP</strong>, we may send
                you a final confirmation message to confirm that you have been unsubscribed.
              </p>

              <h4 className="privacy-policy__sub-subsection-title">How to Get Help</h4>
              <p>
                For help with SMS messages, reply <strong>HELP</strong> to any message you receive, or contact us using the
                information provided in the <button onClick={() => scrollToSection('contact')} className="privacy-policy__inline-link">Contact Us</button> section below.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div id="cookies" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">6. Cookies and Tracking Technologies</h2>
            <p>
              Our website may use cookies or similar technologies to improve your experience, analyze usage, and support
              basic website functions. You may adjust your browser settings to refuse cookies or to alert you when
              cookies are being sent. However, some parts of the website may not function properly without cookies.
            </p>
          </div>

          {/* Section 7 */}
          <div id="data-security" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">7. Data Security</h2>
            <p>
              We use reasonable physical, technical, and administrative safeguards to protect the personal information we
              collect and maintain. While we strive to protect your information, no method of transmission over the
              internet or method of electronic storage is completely secure. Accordingly, we cannot guarantee absolute
              security.
            </p>
          </div>

          {/* Section 8 */}
          <div id="data-retention" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">8. Data Retention</h2>
            <p>
              We retain personal information for as long as necessary to fulfill the purposes described in this Privacy
              Policy, unless a longer retention period is required or permitted by law (for example, for regulatory,
              legal, accounting, or reporting requirements).
            </p>
          </div>

          {/* Section 9 */}
          <div id="your-rights" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">9. Your Rights and Choices</h2>
            <p>
              Depending on your location and applicable law, you may have certain rights regarding your personal
              information, which may include:
            </p>
            <ul className="privacy-policy__list">
              <li>The right to request access to the personal information we hold about you.</li>
              <li>The right to request correction of inaccurate or incomplete information.</li>
              <li>The right to request deletion of certain personal information, subject to legal limits.</li>
              <li>The right to object to or restrict certain processing activities.</li>
              <li>The right to withdraw consent where processing is based on consent (such as SMS communications).</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information in the{' '}
              <button onClick={() => scrollToSection('contact')} className="privacy-policy__inline-link">Contact Us</button>{' '}
              section below. We may need to verify your identity before responding to certain requests.
            </p>
          </div>

          {/* Section 10 */}
          <div id="third-party" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">10. Third-Party Websites and Services</h2>
            <p>
              Our website or communications may include links to third-party websites or services that are not operated
              by Motive Home Care. This Privacy Policy does not apply to those third-party sites or services. We
              encourage you to review the privacy policies of any third-party sites you visit or services you use.
            </p>
          </div>

          {/* Section 11 */}
          <div id="childrens-privacy" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">11. Children's Privacy</h2>
            <p>
              Our Services are not directed to children under the age of 13, and we do not knowingly collect personal
              information directly from children. If we learn that we have collected personal information from a child
              under 13 without appropriate consent, we will take steps to delete that information as required by law.
            </p>
          </div>

          {/* Section 12 */}
          <div id="changes" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technologies,
              legal requirements, or other factors. When we make material changes, we will update the "Last Updated" date
              at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about
              how we protect your information.
            </p>
          </div>

          {/* Section 13 */}
          <div id="contact" className="privacy-policy__section">
            <h2 className="privacy-policy__section-title">13. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests related to this Privacy Policy or our handling of personal
              information, please contact us at:
            </p>
            <div className="privacy-policy__contact-info">
              <p><strong>Motive Home Care</strong></p>
              <p>
                Email: <a href="mailto:hr@motivehomecare.com">hr@motivehomecare.com</a>
              </p>
              <p>
                Phone: <a href="tel:+12134950092">(213) 495-0092</a>
              </p>
            </div>
            <p className="privacy-policy__disclaimer">
              By using our Services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>

          {/* Footer Navigation */}
          <div className="privacy-policy__footer-nav">
            <button onClick={() => scrollToSection('information-collect')} className="privacy-policy__back-to-top">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
              Back to Top
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
