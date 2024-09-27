import Link from "next/link";

export default function SideNav(params) {
  const { id } = params;
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/class"}>Class</Link>
    </div>
  );
}
