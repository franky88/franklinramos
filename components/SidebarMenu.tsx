import Link from "next/link";

const SidebarMenu = () => {
  return (
    <div className="flex flex-col items-end gap-3 mt-5">
      <div className="hover:-translate-x-4 duration-300">
        <Link href={"#about-me"}>About me</Link>
      </div>
      <div className="hover:-translate-x-4 duration-300">
        <Link href={"#projects"}>Projects</Link>
      </div>
      <div className="hover:-translate-x-4 duration-300">
        <Link href={"#experience"}>Experience</Link>
      </div>
      <div className="hover:-translate-x-4 duration-300">
        <Link href={"#contact"}>Contact</Link>
      </div>
    </div>
  );
};

export default SidebarMenu;
