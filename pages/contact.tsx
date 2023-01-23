import React from 'react';
import NextHeadSeo from 'next-head-seo';
import Headline from 'components/ui/Headline';
import ContactForm from 'components/contact';

type Props = {};

const Contact = (props: Props) => {
  return (
    <>
      <NextHeadSeo
        title={'Jaro Ratz - Contact Me'}
        robots="noindex, nofollow"
      />
      <Headline title="Contact Me" />
      <ContactForm />
    </>
  );
};

export default Contact;
