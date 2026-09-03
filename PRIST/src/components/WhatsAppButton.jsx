
import logo from "../assets/whatsappicon.png";

export default function WhatsAppButton() {
  const phoneNumber = "7012694985";

  const message = encodeURIComponent(
    "Hello Pristine Energy, I am interested in your solar solutions."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Pristine Energy on WhatsApp"
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        h-16
        w-23
        items-center
        justify-center
        rounded-full
        transition-all
        duration-300
        hover:scale-110
        sm:bottom-8
        sm:right-8
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
          h-4
          w-4
          rounded-full
          border-2
          border-white
          bg-green-500
        "
      />
    </a>
  );
}

