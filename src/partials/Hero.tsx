import {
  GradientText,
  HeroAvatar,
  HeroSocial,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>Daniel</GradientText> 👋
        </>
      }
      description={
        <>
          <p>i'm interested in new technologies and science in general.</p>
          I studied computer science at <a href="https://h-brs.de">Hochschule Bonn-Rhein-Sieg</a> and finished their with a B.Sc.
          I develop software for many years, mainly in python and typescript(javascript) and recently in golang.

          <div className="h-4"></div>
          <p>I started working as a freelancer in 2020.</p>
          <p>Got an idea for a project? Reach out to me and shedule a call.</p>
        </>
      }
      avatar={
        <img
          className="h-64 w-64 rounded-full"
          src="/assets/images/me.png"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          <a href="https://twitter.com/shidumiro">
            <HeroSocial
              src="/assets/images/twitter-icon.png"
              alt="Twitter icon"
            />
          </a>
          <a href="/">
            <HeroSocial
              src="/assets/images/youtube-icon.png"
              alt="Youtube icon"
            />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };
