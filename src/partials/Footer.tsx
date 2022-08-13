import { FooterCopyright, Section } from 'astro-boilerplate-components';

import { AppConfig } from '@/utils/AppConfig';
import { CTA } from './CTA';

const Footer = () => (
  <Section>
    <FooterCopyright site_name={AppConfig.site_name} />
    <CTA />
  </Section>
);

export { Footer };
