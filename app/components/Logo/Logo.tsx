import Image from "next/image";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <Image
        src="/retreatlogo.jpg"
        alt="Retreat RFC Logo"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <span className="text-2xl font-bold text-purple-500 tracking-wide">
        RETREAT<span className="text-white">RFC</span>
      </span>
    </a>
  );
}
