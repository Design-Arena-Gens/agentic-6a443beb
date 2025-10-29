'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';

interface AudioLevelMonitorProps {
  stream: MediaStream;
}

export default function AudioLevelMonitor({ stream }: AudioLevelMonitorProps) {
  const [level, setLevel] = useState(0);
  const animationFrameRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode>();

  useEffect(() => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);

    source.connect(analyser);
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateLevel = () => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setLevel(Math.min((average / 128) * 100, 100));
      }
      animationFrameRef.current = requestAnimationFrame(updateLevel);
    };

    updateLevel();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioContext.close();
    };
  }, [stream]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute bottom-24 right-4 bg-black/80 backdrop-blur-xl px-4 py-3 rounded-2xl"
    >
      <div className="flex items-center gap-3">
        <Volume2 size={18} className="text-white" />
        <div className="flex gap-1 items-end h-8">
          {[...Array(12)].map((_, i) => {
            const threshold = (i / 12) * 100;
            const isActive = level > threshold;
            return (
              <motion.div
                key={i}
                animate={{
                  height: isActive ? `${20 + (i * 3)}px` : '4px',
                  backgroundColor: isActive
                    ? level > 80
                      ? '#ef4444'
                      : level > 50
                      ? '#f59e0b'
                      : '#10b981'
                    : 'rgba(255, 255, 255, 0.2)'
                }}
                transition={{ duration: 0.1 }}
                className="w-1 rounded-full"
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
