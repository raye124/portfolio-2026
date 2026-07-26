"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <header>
      <div className="container">
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#techstack">Tech Stack</a></li>
            <li><a href="#qualifications">Qualifications</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#certifications">Certifications</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="nav-actions">
            <button className="hamburger">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}