import type { Metadata } from 'next';
import Headline from 'components/ui/Headline';
import ContactForm from 'components/contact';

export const metadata: Metadata = {
  title: 'Contact Me',
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return (
    <>
      <Headline title="Contact Me" />
      <ContactForm />
    </>
  );
}
