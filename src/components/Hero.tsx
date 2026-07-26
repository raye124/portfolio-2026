import { useEffect, useState } from "react";
import heroVideo from "../assets/videos/hero.mp4";
import { AppleHelloEnglishEffect, AppleHelloVietnameseEffect } from "./AppleHello";
import { motion, AnimatePresence } from "motion/react";

function Hero() {
const [stage, setStage] = useState(0);

// 0 = English
// 1 = Vietnamese
// 2 = Hero

    const roles = [
    "Product Builder",
    "Problem Solver",
    "Systems Thinker"
    ];

const [text, setText] = useState("");
const [roleIndex, setRoleIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);
console.log(stage);

useEffect(() => {
  const currentRole = roles[roleIndex];

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1500;
  }

  if (isDeleting && charIndex === 0) {
    speed = 500;
  }

  const timer = setTimeout(() => {
    if (!isDeleting) {
      setText(currentRole.substring(0, charIndex + 1));
      setCharIndex(charIndex + 1);

      if (charIndex === currentRole.length) {
        setIsDeleting(true);
      }
    } else {
      setText(currentRole.substring(0, charIndex - 1));
      setCharIndex(charIndex - 1);

      if (charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }
  }, speed);

  return () => clearTimeout(timer);

}, [charIndex, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

<div className="hero-content">

  {stage === 0 && (
      <AppleHelloEnglishEffect
        speed={0.8}
        onAnimationComplete={() => setStage(1)}
      />
  )}

{stage === 1 && (
  <AppleHelloVietnameseEffect
    speed={0.38}
    onAnimationComplete={() => setStage(2)}
  />
)}

<AnimatePresence>
  {stage === 2 && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
    >
      <h1>
        <span>Raye's Portfolio</span>
      </h1>

      <div className="code-brackets">
        <span className="dynamic-text">{text}</span>
        <span className="bracket">|</span>
      </div>

            <div className="hero-buttons">

                <a
                    href="src/assets/rayeyap_resume_NEW.pdf"
                    download
                    className="btn btn-resume"
                >
                    Download Resume
                </a>

                <a
                    href="#contact"
                    className="btn btn-outline"
                >
                    Contact Me
                </a>

            </div>
         </motion.div>
  )}
</AnimatePresence>

</div>
    </section>
  );
}

export default Hero;