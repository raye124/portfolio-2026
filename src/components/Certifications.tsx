import googleImg from "../assets/images/google.png";
import metaImg from "../assets/images/meta.png";
import uomImg from "../assets/images/uom.png";
import datacampImg from "../assets/images/datacamp.png";
import alibabaImg from "../assets/images/alibaba.png";

type CardData = {
  category: string;
  title: string;
  src: string;
};

const cards: CardData[] = [
  {
    category: "Google",
    title: "Agile Project Management",
    src: googleImg,
  },
  {
    category: "Meta",
    title: "Introduction to Frontend Development",
    src: metaImg,
  },
  {
    category: "University of Michigan",
    title: "Building Web Applications in PHP",
    src: uomImg,
  },
  {
    category: "DataCamp",
    title: "Intermediate SQL",
    src: datacampImg,
  },
  {
    category: "DataCamp",
    title: "Data Manipulation with Pandas",
    src: datacampImg,
  },
  {
    category: "Alibaba",
    title: "Alibaba Cloud Certification",
    src: alibabaImg,
  }
];

export default function ISadCarousel() {
  return (
    <section className="flex w-full flex-col items-center bg-black py-16 sm:py-20" id="certifications">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="about-title text-center">
          Certifications
        </h2>

        <div className="mt-20 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-16 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
          {cards.map((card) => (
            <div
              key={card.title}
              className="relative h-[28rem] w-[20rem] flex-none snap-start overflow-hidden rounded-3xl bg-neutral-900 sm:h-[36rem] sm:w-[24rem]"
            >
              <img
                src={card.src}
                alt={card.title}
                className="absolute inset-0 h-full w-full rounded-3xl object-cover brightness-65"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-black/60 via-transparent to-transparent" />
              <div className="absolute left-6 top-6 p-6 sm:left-8 sm:top-8">
                <p className="text-sm font-medium text-white/90 sm:text-base">
                  {card.category}
                </p>
                <h3 className="mt-2 max-w-[85%] text-2xl font-semibold text-white sm:text-3xl">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}