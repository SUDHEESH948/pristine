
import logo from "../assets/whatsappicon.png";

export default function WhatsAppButton() {
  const phoneNumber = "7012694985";

  const message = encodeURIComponent(
    "Hello Pristine Horizon, I am interested in your solar solutions."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Pristine Horizon on WhatsApp"
      className="
        fixed
        bottom-5
        right-5
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        transition-all
        duration-300
        hover:scale-110
        sm:bottom-6
        sm:right-6
      "
    >
      <img
        src={logo}
        alt="WhatsApp"
        className="
          h-full
          w-full
          rounded-full
          object-contain
          drop-shadow-xl
        "
      />

      {/* Online indicator */}
      <span
        className="
          absolute
          right-0
          top-0
          h-3.5
          w-3.5
          rounded-full
          border-2
          border-white
          bg-green-500
        "
      />
    </a>
  );
}

