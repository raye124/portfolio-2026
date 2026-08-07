import urbanixImg from "../assets/images/urbanix.jpeg";
import urbanix2Img from "../assets/images/urbanix2.jpeg";
import fintellectImg from "../assets/images/fintellect.png";
import petpalImg from "../assets/images/petpal.png";

const projects = [
  {
    title: "URBANIX",
    badge: "Top 5 Finalists",
    event: "SMU Hack for Cities 2026",
    highlights: [
      "Pitched to Infocomm Media Development Authority (IMDA) judges",
      "Led development within 5 days, coordinating rapid prototyping and agile execution.",
      "Implemented an AI chatbot to guide users through policy scenarios and outcome simulations.",
      "Built data visualisations (dashboards, radar charts) for district-level indicators and trade-offs.",
    ],
    images: [urbanixImg, urbanix2Img],
  },
  {
    title: "FinTellect",
    badge: "Runner-Up",
    event: "NTU Fintech Innovator's Hackathon 2026",
    highlights: [
      "Spearheaded design and delivered an AI-powered financial analytics platform within a week.",
      "Built a Financial Time Machine simulator that modelled historical investment scenarios and visualised alternative portfolio outcomes.",
      "Developed financial simulations and predictive insights to help users evaluate future financial decisions and risks.",
    ],
    images: [fintellectImg],
  },
  {
    title: "PetPal",
    badge: "Course Project",
    event: "IS216 Web Application Development II",
    highlights: [
      "Integrated external APIs and supported testing to validate data accuracy and application integration.",
      "Analysed user behaviour and feature usage to identify adoption trends and derive insights.",
      "Defined functional requirements for key system features (authentication, ratings, interactive maps) and enacted implementation.",
    ],
    images: [petpalImg],
  },
];

export default function ProjectsSection() {
  return (
    <div className="w-full flex justify-center px-6 sm:px-8 md:px-10 pt-24 md:pt-36 pb-24 md:pb-32" id="projects">
      <div className="w-full max-w-5xl">
        <h2 className="about-title text-center">
          Projects
        </h2>

        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={project.title}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start pt-12 md:pt-0 md:border-0 first:border-0 first:pt-0"
              >
                {/* Image block */}
                <div
                  className={`md:col-span-6 flex justify-center md:justify-start ${
                    reversed ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="grid grid-cols-1 gap-3 w-full max-w-[320px] sm:max-w-md md:max-w-none">
                    {project.images.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="w-full rounded-2xl border border-neutral-800 object-cover transition-transform duration-500 md:hover:scale-[1.02]"
                      />
                    ))}
                  </div>
                </div>

                {/* Text block */}
                <div
                  className={`md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left ${
                    reversed ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="w-full max-w-xl">
                    <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] sm:text-xs font-medium uppercase tracking-wide text-amber-300 mb-4">
                      {project.badge}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 mb-2">
                      {project.title}
                    </h3>

                    <p className="text-sm text-neutral-500 pb-8">
                      {project.event}
                    </p>


<ul className="space-y-4 text-left">
  {project.highlights.map((item, idx) => (
    <li key={idx} className="flex items-start gap-3">
      <span className="flex h-7 flex-shrink-0 items-center">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      </span>
      <span className="flex-1 text-sm sm:text-base leading-8 text-neutral-400">
        {item}
      </span>
    </li>
  ))}
</ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}