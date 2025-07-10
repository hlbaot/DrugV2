import "../styles/navbar.module.scss";
import Link from "next/link";

function Navbar() {
  return (
    <div className="w-[20%] h-screen border-r-[1px] border-gray-300 flex flex-col items-center bg-red-300">
      <img className="w-[12.5rem] h-[10rem]" src="/logo.png" alt="logo" />
      <div className="flex flex-col gap-4">
        <Link href="/home">Home</Link>
        <Link href="/message">Message</Link>
        <Link href="/save">Save</Link>
        {/* create */}
        <Link href="/profile">Hồ sơ</Link>
        {/* noti */}
        {/* more */}
      </div>
    </div>
  );
}

export default Navbar;
