import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='p-10 flex items-center gap-4'>
      <a href='https://github.com/Stillwell-C'>Stillwell-C</a>
      <span>|</span>
      <a href='https://github.com/Stillwell-C'>
        <FaGithub size={20} />
      </a>
    </footer>
  );
};

export default Footer;
