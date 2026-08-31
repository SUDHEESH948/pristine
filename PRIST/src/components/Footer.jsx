
import logo from "../assets/logo.png";
import facebookLogo from "../assets/Facebook-f_Logo-Blue-Logo.wine.svg";
import instagramLogo from "../assets/Instagram-Logo.wine.svg";

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
              {/* LOGO */}

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
                  alt="Pristine Energy Logo"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* COMPANY NAME */}

              <div className="flex flex-col leading-none">

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

            {/* DESCRIPTION */}

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Clean, smart solar energy solutions engineered for homes,
              businesses, and industries across Kerala.
            </p>

            {/* ================= SOCIAL ICONS ================= */}

            <div className="flex items-center gap-3 pt-2">

              {/* ================= FACEBOOK ================= */}

              <a
                href="#"
                aria-label="Facebook - Pristine Energy"
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
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-500/50
                  hover:bg-blue-500/10
                "
              >
                <img
                  src={facebookLogo}
                  alt="Facebook"
                  className="h-[18px] w-[18px] object-contain"
                />
              </a>

              {/* ================= INSTAGRAM ================= */}

              <a
                href="#"
                aria-label="Instagram - Pristine Energy"
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
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-pink-500/50
                  hover:bg-pink-500/10
                "
              >
                <img
                  src={instagramLogo}
                  alt="Instagram"
                  className="h-[18px] w-[18px] object-contain"
                />
              </a>

              {/* ================= LINKEDIN ================= */}

              <a
                href="#"
                aria-label="LinkedIn - Pristine Energy"
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
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-500/50
                  hover:bg-blue-500/10
                  hover:text-blue-400
                "
              >
                <svg
                  className="h-[18px] w-[18px] fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM3.555 20.452h3.558V9H3.555v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* ================= WHATSAPP ================= */}

              <a
                href="https://wa.me/917012694985"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp - Pristine Energy"
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
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-green-500/50
                  hover:bg-green-500/10
                  hover:text-green-400
                "
              >
                <svg
                  className="h-[18px] w-[18px] fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.004 2C6.478 2 2 6.477 2 12c0 1.765.46 3.423 1.267 4.866L2 22l5.243-1.245A9.953 9.953 0 0 0 12.004 22C17.523 22 22 17.523 22 12S17.523 2 12.004 2zm0 18.181c-1.56 0-3.09-.418-4.43-1.209l-.317-.188-3.111.738.742-3.035-.207-.329A8.177 8.177 0 0 1 3.818 12c0-4.516 3.67-8.182 8.186-8.182S20.186 7.484 20.186 12s-3.67 8.181-8.182 8.181z" />
                </svg>
              </a>

            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}

          <div>
            <h4
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-200
              "
            >
              Quick Links
            </h4>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="transition hover:text-sky-400"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="transition hover:text-sky-400"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/services"
                  className="transition hover:text-sky-400"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="/projects"
                  className="transition hover:text-sky-400"
                >
                  Projects
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="transition hover:text-sky-400"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* ================= SOLAR SOLUTIONS ================= */}

          <div>
            <h4
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-200
              "
            >
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
            <h4
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-slate-200
              "
            >
              Get in Touch
            </h4>

            <ul className="mt-4 space-y-4 text-sm">

              {/* PHONE */}

              <li>
                <a
                  href="tel:+917012694985"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    transition
                    hover:text-white
                  "
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
                    {/* Phone */}
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </span>

                  +91 7012 694 985
                </a>
              </li>

              {/* WHATSAPP */}

              <li>
                <a
                  href="https://wa.me/917012694985"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    transition
                    hover:text-white
                  "
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
                      group-hover:bg-green-500/10
                      group-hover:text-green-400
                    "
                  >
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12.004 2C6.478 2 2 6.477 2 12c0 1.765.46 3.423 1.267 4.866L2 22l5.243-1.245A9.953 9.953 0 0 0 12.004 22C17.523 22 22 17.523 22 12S17.523 2 12.004 2zm0 18.181c-1.56 0-3.09-.418-4.43-1.209l-.317-.188-3.111.738.742-3.035-.207-.329A8.177 8.177 0 0 1 3.818 12c0-4.516 3.67-8.182 8.186-8.182S20.186 7.484 20.186 12s-3.67 8.181-8.182 8.181z" />
                    </svg>
                  </span>

                  WhatsApp
                </a>
              </li>

              {/* EMAIL */}

              <li>
                <a
                  href="mailto:hello@pristineenergys.in"
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    transition
                    hover:text-white
                  "
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
                    {/* Email */}
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </span>

                  hello@pristineenergys.in
                </a>
              </li>

              {/* LOCATION */}

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
                  {/* Location */}
                  <svg
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                  </svg>
                </span>

                Kozhikode, Kerala, India
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
            © {currentYear} Pristine Energy. All rights reserved.
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
