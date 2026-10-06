import type { Metadata } from 'next';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Privacy Policy – Flora Collectible Game',
  description:
    'Privacy Policy for the Flora Collectible Game, effective October 6, 2026.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-6 pb-16 pt-28 sm:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="mb-10">
            <h1 className="mb-3 text-3xl font-bold leading-tight sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="text-[var(--text-muted)]">
              <strong>Effective Date:</strong> October 6, 2026
            </p>
          </header>

          <div className="space-y-8 leading-7 text-[var(--text-secondary)]">
            <section aria-labelledby="information-we-collect">
              <h2
                id="information-we-collect"
                className="mb-3 text-xl font-semibold text-[var(--text-primary)]"
              >
                1. Information We Collect
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Camera Access:</strong> The app uses your device’s camera to capture images of flora for collectible card generation.
                </li>
                <li>
                  <strong>Device Storage:</strong> Images are processed locally on your device. No personal files are accessed.
                </li>
                <li>
                  <strong>No Personal Data:</strong> The app does not collect names, emails, phone numbers, or location data beyond what you manually provide (e.g., capture location metadata).
                </li>
              </ul>
            </section>

            <section aria-labelledby="how-we-use-information">
              <h2
                id="how-we-use-information"
                className="mb-3 text-xl font-semibold text-[var(--text-primary)]"
              >
                2. How We Use Information
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>Captured images are transformed into collectible cards within the app.</li>
                <li>Data is used solely for gameplay and is not shared externally.</li>
              </ul>
            </section>

            <section aria-labelledby="data-sharing">
              <h2
                id="data-sharing"
                className="mb-3 text-xl font-semibold text-[var(--text-primary)]"
              >
                3. Data Sharing
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>We do not sell, rent, or share your data with third parties.</li>
                <li>No analytics or advertising SDKs are integrated.</li>
              </ul>
            </section>

            <section aria-labelledby="security">
              <h2
                id="security"
                className="mb-3 text-xl font-semibold text-[var(--text-primary)]"
              >
                4. Security
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>All processing happens locally on your device.</li>
                <li>We do not transmit or store your data on external servers.</li>
              </ul>
            </section>

            <section aria-labelledby="childrens-privacy">
              <h2
                id="childrens-privacy"
                className="mb-3 text-xl font-semibold text-[var(--text-primary)]"
              >
                5. Children’s Privacy
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>This app is suitable for general audiences.</li>
                <li>No personal information is collected from children.</li>
              </ul>
            </section>

            <section aria-labelledby="contact-us">
              <h2
                id="contact-us"
                className="mb-3 text-xl font-semibold text-[var(--text-primary)]"
              >
                6. Contact Us
              </h2>
              <p className="mb-2">
                If you have questions about this Privacy Policy, please contact:
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  className="text-[var(--teal)] underline underline-offset-2"
                  href="mailto:support@halfbloodcoder.com"
                >
                  support@halfbloodcoder.com
                </a>
              </p>
              <p>
                <strong>Website:</strong>{' '}
                <a
                  className="break-all text-[var(--teal)] underline underline-offset-2"
                  href="https://halfbloodcoder.com/privacy"
                >
                  https://halfbloodcoder.com/privacy
                </a>
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
