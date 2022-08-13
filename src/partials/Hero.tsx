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
          <p>I'm a Full-Stack-Developer interested in new technologies and science in general.</p>
          I studied computer science at <a target="_blank" className="underline" href="https://h-brs.de">Hochschule Bonn-Rhein-Sieg</a> and finished with a B.Sc.
          <p>
            I develop software for many years, mainly using python and typescript (javascript) and recently Golang.
          </p>

          <div className="h-4"></div>
          <p>I started working as a freelancer in 2020.</p>
          <p>
            Got an idea for a project?
            <GradientText>
              <a target="_blank" className="pl-2" href="mailto:daniel.pink1125@gmail.com">Contact</a>
            </GradientText>
          </p>
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
          <a target="_blank"
            href="https://twitter.com/shidumiro">
            <HeroSocial
              src="/assets/images/twitter-icon.png"
              alt="Twitter icon"
            />
          </a>
          <a target="_blank"
            href="https://github.com/H4sh3">
            <HeroSocial
              src="/assets/images/github-icon.webp"
              alt="Github icon"
            />
          </a>
          <a target="_blank"
            href="https://www.youtube.com/channel/UCjuTxmv0QlmokCyZgMdC4Pw">
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
