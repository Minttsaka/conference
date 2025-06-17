import Affordability from "@/components/landing/Affordable";
import AiPage from "@/components/landing/Ai";
import Control from "@/components/landing/Control";
import Finisher from "@/components/landing/Finisher";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import LandingPage from "@/components/landing/LandingPage";
import React from "react";

export default function Home() {
  return (
    <div className=" ">
      <HeroSection />
      <LandingPage />
      <Affordability />
      <AiPage />
      {/* <Control /> */}
      <Finisher />
      <Footer />
    </div>
  );
}
