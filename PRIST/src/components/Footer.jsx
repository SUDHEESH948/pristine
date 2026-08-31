
import logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="
        relative
        overflow-hidden
        border-t
        border-slate-800/80
        bg-[#07111f]
        text-slate-400
      "
    >
      {/* ================= TOP ACCENT ================= */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-sky-500/50
          to-transparent
        "
      />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {/* ================= MAIN FOOTER ================= */}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= BRAND ================= */}

          <div className="space-y-5">

            <a
              href="/"
              className="
                inline-flex
                items-center
                gap-3
                transition
                hover:opacity-90
              "
            >

              {/* ================= LOGO ================= */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-2
                  border-sky-400/30
                  bg-white
                  shadow-lg
                  shadow-sky-500/10
                "
              >
                <img
                  src={logo}
                  alt="Pristine Horizon Logo"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>

              {/* ================= COMPANY NAME ================= */}

              <div className="flex flex-col leading-none">

                {/* MAIN COMPANY */}

                <span
                  className="
                    text-lg
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  PRISTINE{" "}
                  <span className="text-sky-500">
                    HORIZON
                  </span>
                </span>

                {/* SUB BRAND */}

                <span
                  className="
                    mt-1.5
                    text-[9px]
                    font-extrabold
                    tracking-[2px]
                    text-sky-400
                  "
                >
                  PRISTINE ENERGY
                </span>

                {/* TAGLINE */}

                <span
                  className="
                    mt-1
                    text-[7px]
                    font-bold
                    tracking-[2px]
                    text-slate-500
                  "
                >
                  SOLAR SOLUTIONS
                </span>

              </div>
            </a>

            {/* ================= DESCRIPTION ================= */}

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Clean, smart solar energy solutions engineered for homes,
              businesses, and industries across Kerala.
            </p>

            {/* ================= SOCIAL ICONS ================= */}

            <div className="flex items-center gap-3 pt-2">

              {/* LinkedIn */}

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-800
                  bg-slate-900/60
                  text-slate-400
                  transition
                  hover:border-sky-500/40
                  hover:bg-sky-500/10
                  hover:text-sky-400
                "
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.66 1.66c0 .92.74 1.66 1.66 1.66.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66Z" />
                </svg>
              </a>

              {/* Instagram */}

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-800
                  bg-slate-900/60
                  text-slate-400
                  transition
                  hover:border-sky-500/40
                  hover:bg-sky-500/10
                  hover:text-sky-400
                "
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.07-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

              {/* WhatsApp */}

              <a
                href="#"
                aria-label="WhatsApp"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-800
                  bg-slate-900/60
                  text-slate-400
                  transition
                  hover:border-sky-500/40
                  hover:bg-sky-500/10
                  hover:text-sky-400
                "
              >
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.22-.19-.47-.32" />
                </svg>
              </a>

            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}

          

          {/* ================= SOLAR SOLUTIONS ================= */}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Solar Solutions
            </h4>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                <a
                  href="/services"
                  className="transition hover:text-sky-400"
                >
                  Residential Solar
                </a>
              </li>

              <li>
                <a
                  href="/services"
                  className="transition hover:text-sky-400"
                >
                  Commercial Rooftop
                </a>
              </li>

              <li>
                <a
                  href="/services"
                  className="transition hover:text-sky-400"
                >
                  Industrial Solutions
                </a>
              </li>

              <li>
                <a
                  href="/services"
                  className="transition hover:text-sky-400"
                >
                  Battery &amp; Off-Grid Systems
                </a>
              </li>

              <li>
                <a
                  href="/services"
                  className="transition hover:text-sky-400"
                >
                  Solar Maintenance
                </a>
              </li>

            </ul>
          </div>

          {/* ================= CONTACT ================= */}

          <div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Get in Touch
            </h4>

            <ul className="mt-4 space-y-4 text-sm">

              {/* Phone */}

              <li>
                <a
                  href="tel:+919000000000"
                  className="group flex items-center gap-3 transition hover:text-white"
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-800
                      text-slate-400
                      transition
                      group-hover:bg-sky-500/10
                      group-hover:text-sky-400
                    "
                  >
                    ☎
                  </span>

                  +91 90000 00000
                </a>
              </li>

              {/* Email */}

              <li>
                <a
                  href="mailto:hello@pristineenergys.in"
                  className="group flex items-center gap-3 transition hover:text-white"
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-slate-800
                      text-slate-400
                      transition
                      group-hover:bg-sky-500/10
                      group-hover:text-sky-400
                    "
                  >
                    ✉
                  </span>

                  hello@pristineenergys.in
                </a>
              </li>

              {/* Location */}

              <li className="flex items-center gap-3">

                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-slate-800
                    text-slate-400
                  "
                >
                  📍
                </span>

                Kerala, India

              </li>

            </ul>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}

        <div
          className="
            mt-14
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-slate-800/80
            pt-6
            text-xs
            text-slate-500
            sm:flex-row
          "
        >

          <p>
            © {currentYear} Pristine Horizon. All rights reserved.
          </p>

          <div className="flex items-center gap-4">

            <a
              href="#privacy"
              className="transition hover:text-sky-400"
            >
              Privacy Policy
            </a>

            <span>•</span>

            <a
              href="#terms"
              className="transition hover:text-sky-400"
            >
              Terms of Service
            </a>

          </div>

          <p>
            Designed &amp; Developed by{" "}
            <a
              href="https://winshineinfotech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-medium
                text-slate-300
                transition
                hover:text-sky-400
              "
            >
              Winshine Infotech
            </a>
          </p>

        </div>

      </div>
    </footer>
  );
}

