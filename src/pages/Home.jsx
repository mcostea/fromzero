import React from "react";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import About from "@/components/landing/About";
import WhoAmI from "@/components/landing/WhoAmI";
import Deliverables from "@/components/landing/Deliverables";
import Scope from "@/components/landing/Scope";
import Requirements from "@/components/landing/Requirements";
import Pricing from "@/components/landing/Pricing";
import BookCall from "@/components/landing/BookCall";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <About />
        <WhoAmI />
        <Deliverables />
        <Scope />
        <Requirements />
        <Pricing />
        <BookCall />
      </main>
      <Footer />
    </div>
  );
}