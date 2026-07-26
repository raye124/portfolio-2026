import { motion } from "motion/react";

const skills1 = [
  {
    title: "Python",
    image: "src/assets/images/python.png",
  },
  {
    title: "JavaScript",
    image: "src/assets/images/javascript.png",
  },
  {
    title: "React",
    image: "src/assets/images/react.png",
  },
  {
    title: "Node",
    image: "src/assets/images/node.png",
  },
  {
    title: "Express",
    image: "src/assets/images/express.png",
  },
  {
    title: "PHP",
    image: "src/assets/images/php.png",
  },
  {
    title: "MySQL",
    image: "src/assets/images/mysql.png",
  },
  {
    title: "PostgreSQL",
    image: "src/assets/images/postgres.png",
  }
];

const skills2 = [
  {
    title: "Vite",
    image: "src/assets/images/vite.png",
  },
  {
    title: "Vue",
    image: "src/assets/images/vue.png",
  },
  {
    title: "Docker",
    image: "src/assets/images/docker.png",
  },{
    title: "Kubernetes",
    image: "src/assets/images/kubernetes.png",
  },
  {
    title: "Git",
    image: "src/assets/images/git.png",
  },
  {
    title: "Pandas",
    image: "src/assets/images/pandas.png",
  },
  {
    title: "HTML5",
    image: "src/assets/images/html.png",
  },
  {
    title: "CSS",
    image: "src/assets/images/css.png",
  }
];

function Skills() {
  return (
    <section id="techstack" className="skills">

      <div className="container">

        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>Tech Stack</h2>
        </motion.div>

        <div className="marquee">
  <div className="skills-track left">
    {skills1.map((skill) => (
      <img
        key={skill.title}
        src={skill.image}
        alt={skill.title}
        className="skill-image"
      />
    ))}

    {skills1.map((skill) => (
      <img
        key={`${skill.title}-copy`}
        src={skill.image}
        alt={skill.title}
        className="skill-image"
      />
    ))}
  </div>
</div>

<div className="marquee">
  <div className="skills-track right">
    {skills2.map((skill) => (
      <img
        key={skill.title}
        src={skill.image}
        alt={skill.title}
        className="skill-image"
      />
    ))}

    {skills2.map((skill) => (
      <img
        key={`${skill.title}-copy`}
        src={skill.image}
        alt={skill.title}
        className="skill-image"
      />
    ))}
  </div>
</div>
</div>

    </section>
  );
}

export default Skills;