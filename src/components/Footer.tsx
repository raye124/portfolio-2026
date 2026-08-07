import { Mail, MapPin } from "lucide-react";

const pages = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Qualifications", href: "#qualifications" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/raye124" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/raye-yap-23404b232" },
  { label: "Telegram", href: "https://t.me/ladygethsemane" },
  { label: "HackerRank", href: "https://www.hackerrank.com/profile/rayeyap124" },
];

const contact = [
  {
    label: "Email",
    value: "rayeyap.work@gmail.com",
    href: "mailto:rayeyap.work@gmail.com",
    icon: Mail,
  },
  {
    label: "Location",
    value: "Singapore",
    href: undefined,
    icon: MapPin,
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden text-white min-h-[400px]" id="contact">

        <div className="relative">

  {/* Brand */}
  <div className="flex flex-col items-center lg:items-start">

  {/* Desktop Centre */}
  <div className="hidden lg:flex absolute left-1/2 top-0 -translate-x-1/2 gap-24 text-xl">

    {/* Pages */}
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold">Pages</h4>
      <ul className="mt-4 space-y-3 text-center">
        {pages.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Socials */}
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold">Socials</h4>
      <ul className="mt-4 space-y-3 text-center">
        {socials.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Contact */}
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold">Contact</h4>
      <ul className="mt-4 space-y-3 text-center">
        {contact.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {item.value}
              </a>
            ) : (
              <span className="text-sm text-white/50">
                {item.value}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>

  </div>

  {/* Mobile */}
  <div className="mt-12 flex flex-col items-center gap-12 lg:hidden">

    {/* Pages */}
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold">Pages</h4>
      <ul className="mt-4 space-y-3 text-center">
        {pages.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="text-sm text-white/50 hover:text-white">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Socials */}
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold">Socials</h4>
      <ul className="mt-4 space-y-3 text-center">
        {socials.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/50 hover:text-white"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Contact */}
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold">Contact</h4>
      <ul className="mt-4 space-y-3 text-center">
        {contact.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a href={item.href} className="text-sm text-white/50 hover:text-white">
                {item.value}
              </a>
            ) : (
              <span className="text-sm text-white/50">{item.value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
</div>
</div>
  </div>

      {/* Background Wordmark */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <p className="absolute bottom-[-30px] right-[-210px] whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-white/10">
          RAYE YAP
        </p>
      </div>
    </footer>
  );
}