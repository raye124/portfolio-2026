import { motion } from "motion/react";

import pythonImg from "../assets/images/python.png";
import javascriptImg from "../assets/images/javascript.png";
import reactImg from "../assets/images/react.png";
import nodeImg from "../assets/images/node.png";
import expressImg from "../assets/images/express.png";
import phpImg from "../assets/images/php.png";
import mysqlImg from "../assets/images/mysql.png";
import postgresImg from "../assets/images/postgres.png";

import viteImg from "../assets/images/vite.png";
import vueImg from "../assets/images/vue.png";
import dockerImg from "../assets/images/docker.png";
import kubernetesImg from "../assets/images/kubernetes.png";
import gitImg from "../assets/images/git.png";
import pandasImg from "../assets/images/pandas.png";
import htmlImg from "../assets/images/html.png";
import cssImg from "../assets/images/css.png";

const skills1 = [
  { title: "Python", image: pythonImg },
  { title: "JavaScript", image: javascriptImg },
  { title: "React", image: reactImg },
  { title: "Node", image: nodeImg },
  { title: "Express", image: expressImg },
  { title: "PHP", image: phpImg },
  { title: "MySQL", image: mysqlImg },
  { title: "PostgreSQL", image: postgresImg },
];

const skills2 = [
  { title: "Vite", image: viteImg },
  { title: "Vue", image: vueImg },
  { title: "Docker", image: dockerImg },
  { title: "Kubernetes", image: kubernetesImg },
  { title: "Git", image: gitImg },
  { title: "Pandas", image: pandasImg },
  { title: "HTML5", image: htmlImg },
  { title: "CSS", image: cssImg },
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