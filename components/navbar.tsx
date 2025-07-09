import "../styles/navbar.module.scss";
import Image from "next/image";

function Navbar() {
  return (
    <div className="w-[20%] h-[100%] border-r-[1px] border-gray-300 flex flex-col items-center justify-center">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={200}
        className="mb-6"
      />
      
    </div>
  );
}

export default Navbar;
