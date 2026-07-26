"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import raye from "../assets/images/raye.png";

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <section id="about" ref={sectionRef} className="about-section">
  <div className="about-container">

    <motion.h2
      className="about-title"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      About Me
    </motion.h2>

    <motion.div
      className="about-image"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    >
      <div className="image-placeholder">
        <img src={raye} alt="Raye" />
      </div>
    </motion.div>

    <motion.div
      className="about-text"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <p>
  Penultimate Information Systems student at Singapore Management University (SMU), majoring in Business Analytics and Artificial Intelligence. <br /><br />
  
  Before pivoting to tech, I studied the humanities in junior college, an experience that continues to shape how I think. As I deepen my technical expertise, I've come to believe more than ever that <b>technology and humanity shouldn't exist in silos</b>. <br /><br />
  
  Aspiring to become a business analyst or product manager, I hope to bridge these two worlds by combining analytical thinking with effective communication, while keeping people at the heart of every project.
  <br /><br />
  
  When I’m not coding or tinkering with workflow models, I enjoy writing and exploring human behavior through philosophy and psychology — all of which influence how I solve problems, make decisions, and design with empathy.
</p>
    </motion.div>

  </div>
</section>
  );
}