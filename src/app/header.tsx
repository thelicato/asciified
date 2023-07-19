import Image from "next/image";

const Header = () => {
  return (
    <header className="w-4/5 md:w-full md:container mx-auto py-6">
      <Image
        src="/logo.png"
        width={300}
        height={200}
        alt="asciified"
        className="mx-auto"
      />
    </header>
  );
};

export default Header;
