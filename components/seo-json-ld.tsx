import { PROFILE, QUICK_LINKS } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export function SeoJsonLd() {
  const url = getSiteUrl();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    url,
    jobTitle: "Desarrollador Full Stack",
    description: PROFILE.role,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pereira",
      addressCountry: "CO",
    },
    sameAs: [QUICK_LINKS.github, QUICK_LINKS.linkedin],
    knowsAbout: [
      "Next.js",
      "React",
      ".NET",
      "Blazor",
      "SQL Server",
      "Cybersecurity",
      "TypeScript",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portafolio Jancarlo Gallón Cano",
    url,
    description:
      "Portafolio interactivo de Jancarlo Gallón Cano: proyectos full stack, experiencia laboral, laboratorios de ciberseguridad y contacto.",
    inLanguage: ["es-CO", "en"],
    author: { "@type": "Person", name: PROFILE.name },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website]) }}
    />
  );
}
