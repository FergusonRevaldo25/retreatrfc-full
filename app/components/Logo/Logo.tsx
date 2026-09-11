import Image from "next/image";

export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <Image
        src="/retreatlogo.jpg"
        alt="Retreat RFC Logo"
        width={64}
        height={64}
        quality={100}
        className="w-16 h-16 rounded-full object-cover border-2 border-purple-600"
      />
      <span className="text-2xl font-bold text-purple-500 tracking-wide">
        RETREAT<span className="text-white">RFC</span>
      </span>
    </a>
  );
}
