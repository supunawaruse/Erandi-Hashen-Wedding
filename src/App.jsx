import { useState } from "react";
import Opener from "./components/Opener";
import Hero from "./components/Hero";
import Couple from "./components/Couple";
import Details from "./components/Details";
import Countdown from "./components/Countdown";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    window.scrollTo(0, 0);
    setOpened(true);
  };

  return (
    <>
      <Opener onOpen={handleOpen} />

      {opened && (
        <>
          <Hero />
          <Couple />
          <Details />
          <RSVP />
          <Countdown />
          <Footer />
          <MusicPlayer autoStart={true} />
        </>
      )}
    </>
  );
}
