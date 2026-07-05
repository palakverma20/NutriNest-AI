import Image from "next/image";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
  return (
    <div className="pb-10">
      <Hero/>
      <Features/>
    </div>
  );
}
