import { useCallback, useEffect, useRef, useState } from "react";

const backgroundMusicUrl = new URL(
  "../assets/audio/background.mp3",
  import.meta.url,
).href;

function useBackgroundMusic() {
  const audioRef = useRef(null);
  const hasAttemptedInteractionRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return false;
    }

    if (!audio.paused) {
      setIsPlaying(true);
      return true;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      void play();
    } else {
      pause();
    }
  }, [pause, play]);

  useEffect(() => {
    if (typeof Audio === "undefined") {
      return undefined;
    }

    const audio = new Audio(backgroundMusicUrl);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    void play();

    const handleFirstInteraction = () => {
      if (hasAttemptedInteractionRef.current) {
        return;
      }

      hasAttemptedInteractionRef.current = true;
      void play();
    };

    const events = [
      "click",
      "keydown",
      "mousedown",
      "touchstart",
      "pointerdown",
    ];
    events.forEach((eventName) => {
      window.addEventListener(eventName, handleFirstInteraction, {
        passive: true,
      });
    });

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, handleFirstInteraction);
      });
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audio.src = "";
    };
  }, [play]);

  return {
    isPlaying,
    toggleMusic,
  };
}

export default useBackgroundMusic;
