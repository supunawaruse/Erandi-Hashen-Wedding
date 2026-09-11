import { useEffect, useRef, useState } from "react";
import musicSrc from "../assets/page_music.mp3";
import "./MusicPlayer.css";

export default function MusicPlayer({ autoStart = true }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (autoStart) {
      audio.volume = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            // Smooth fade-in to 0.7 volume
            const targetVolume = 0.7;
            const step = 0.05;
            const interval = 80;
            const fadeTimer = setInterval(() => {
              if (!audioRef.current) {
                clearInterval(fadeTimer);
                return;
              }
              if (audioRef.current.volume < targetVolume - step) {
                audioRef.current.volume = Math.min(targetVolume, audioRef.current.volume + step);
              } else {
                audioRef.current.volume = targetVolume;
                clearInterval(fadeTimer);
              }
            }, interval);
          })
          .catch((err) => {
            console.warn("Autoplay blocked or waiting for user interaction:", err);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [autoStart]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (audio.volume === 0) {
        audio.volume = 0.7;
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Playback error:", err);
        });
    }
  };

  return (
    <aside className="music-player-container" aria-label="Music player">
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="auto"
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }}
      />

      {/* Floating musical notes drifting up when playing */}
      {isPlaying && (
        <div className="floating-notes" aria-hidden="true">
          <span className="floating-note note-1">♪</span>
          <span className="floating-note note-2">♫</span>
          <span className="floating-note note-3">♩</span>
        </div>
      )}

      {/* Round playing button */}
      <button
        type="button"
        id="wedding-music-player-btn"
        className={`music-round-btn ${isPlaying ? "is-playing" : "is-paused"}`}
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        aria-pressed={isPlaying}
      >
        {/* Pulsing ambient glow rings */}
        <span className="music-pulse-ring" aria-hidden="true" />
        <span className="music-pulse-ring" aria-hidden="true" />

        {/* Center: Moving sound graph equalizer bars (animating when playing, calm resting wave when paused) */}
        <div className="music-bars" aria-hidden="true">
          <span className="music-bar bar-1" />
          <span className="music-bar bar-2" />
          <span className="music-bar bar-3" />
          <span className="music-bar bar-4" />
        </div>
      </button>
    </aside>
  );
}
