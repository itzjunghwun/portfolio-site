import { Mail, Github, Linkedin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--border)]">
      <div className="px-6 md:px-20 py-12 flex flex-col md:flex-row justify-between gap-8">

        {/* LEFT */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Let’s Connect
          </h2>
          <p className="text-gray-600 max-w-sm">
            I'm always open to opportunities, collaborations, or just talking about tech.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4 text-sm">

          <a 
            href="mailto:itzjunghwun@email.com"
            className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-dark)] transition"
          >
            <Mail size={16} />
            itzjunghwun@email.com
          </a>

          <p className="flex items-center gap-2 text-gray-600">
            <Phone size={16} />
            (770) 568-3181
          </p>

          <a 
            href="https://linkedin.com/in/daniel-seog"
            target="_blank"
            className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-dark)] transition"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>

          <a 
            href="https://github.com/itzjunghwun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-dark)] transition"
          >
            <Github size={16} />
            GitHub
          </a>

        </div>

      </div>
    </footer>
  )
}