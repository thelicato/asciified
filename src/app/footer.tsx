import Image from "next/image";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white body-font bg-gray-900 py-8 ">
      <a href="https://thelicato.io" target="_blank" rel="noreferrer">
        <Image
          src="thelicato.svg"
          alt="thelicato"
          width={176}
          height={80}
          className="w-44 mx-auto mb-4"
        />
      </a>

      <div className="md:container mx-auto">
        <div className="w-4/5 mx-auto flex items-center md:flex-row flex-col">
          <p className="text-sm md:text-left text-center">
            © {new Date().getFullYear()} — Made with ❤️ by Angelo Delicato using{" "}
            <a
              href="https://nextjs.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tailwind CSS
            </a>
          </p>

          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a
              className="ml-3 text-gray-500 hover:text-white transition-colors duration-300"
              href="https://github.com/thelicato"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={24} />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
