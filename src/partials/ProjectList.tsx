import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <div className="flex flex-row justify-between">
        <div>
          Recent Projects
        </div>
        <div>
          <GradientText>
            <a href="/projects">
              Other Projects
            </a>
          </GradientText>
        </div>
      </div>
    }
  >
    <div className="flex flex-col gap-6">
      <Project
        name="Gymcadia - Fitness web app"
        description="Full-stack development of a fitness app, users can create, perform, share and track workouts."
        link="/projects/gymcadia"
        img={{
          src: '/assets/images/projects/gymcadia.png',
          alt: 'Project Web Design',
        }}
        category={
          <>
            <Tags color={ColorTags.FUCHSIA}>Nextjs</Tags>
            <Tags color={ColorTags.LIME}>Python</Tags>
            <Tags color={ColorTags.SKY}>Tailwind.css</Tags>
            <Tags color={ColorTags.ROSE}>TypeScript</Tags>
            <Tags color={ColorTags.ORANGE}>Redis</Tags>
          </>
        }
      />
      <Project
        name="Genetic Rocket"
        description="Inspired by Space-X starship's landing maneuver. This program simulates a rocket that learns to land after a few generations of training."
        link="/projects/genetic-rocket"
        img={{
          src: '/assets/images/projects/genetic-rocket.png',
          alt: 'Project Web Design',
        }}
        category={
          <>
            <Tags color={ColorTags.ROSE}>Javascript</Tags>
            <Tags color={ColorTags.FUCHSIA}>P5.js</Tags>
          </>
        }
      />
      <Project
        name="RL-Maze"
        description="Implementation of an machine learning algorithm, were an agent has to find a goal in an maze."
        link="/projects/rl-maze"
        img={{
          src: '/assets/images/projects/rl-maze.png',
          alt: 'Project Web Design',
        }}
        category={
          <>
            <Tags color={ColorTags.ROSE}>Javascript</Tags>
            <Tags color={ColorTags.FUCHSIA}>P5.js</Tags>
          </>
        }
      />
    </div>
  </Section>
);

export { ProjectList };
