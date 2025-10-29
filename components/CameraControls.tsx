'use client';

import { motion } from 'framer-motion';
import { Camera, Video, Settings, Sparkles, Circle } from 'lucide-react';

interface CameraControlsProps {
  isProMode: boolean;
  isRecording: boolean;
  onToggleProMode: () => void;
  onCapture: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onOpenSettings: () => void;
  fontSize: 'small' | 'medium' | 'large';
}

export default function CameraControls({
  isProMode,
  isRecording,
  onToggleProMode,
  onCapture,
  onStartRecording,
  onStopRecording,
  onOpenSettings,
  fontSize
}: CameraControlsProps) {
  const iconSize = fontSize === 'large' ? 28 : fontSize === 'medium' ? 24 : 20;
  const buttonSize = fontSize === 'large' ? 'w-16 h-16' : fontSize === 'medium' ? 'w-14 h-14' : 'w-12 h-12';
  const captureSize = fontSize === 'large' ? 'w-20 h-20' : fontSize === 'medium' ? 'w-18 h-18' : 'w-16 h-16';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-0 left-0 right-0 pb-8 px-6"
    >
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {/* Left Controls */}
        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleProMode}
            className={`${buttonSize} rounded-full backdrop-blur-xl flex items-center justify-center transition-colors ${
              isProMode
                ? 'bg-blue-500/80 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            aria-label="Toggle Pro Mode"
          >
            <Sparkles size={iconSize} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenSettings}
            className={`${buttonSize} bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-colors`}
            aria-label="Settings"
          >
            <Settings size={iconSize} />
          </motion.button>
        </div>

        {/* Center Capture Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? onStopRecording : onCapture}
          className={`${captureSize} relative rounded-full bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-2xl ${
            isRecording ? 'animate-pulse' : ''
          }`}
          aria-label={isRecording ? "Stop Recording" : "Capture Photo"}
        >
          {isRecording ? (
            <div className="w-6 h-6 bg-red-500 rounded-sm" />
          ) : (
            <Circle size={iconSize + 8} className="text-dark-bg" fill="currentColor" />
          )}
        </motion.button>

        {/* Right Controls */}
        <div className="flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`${buttonSize} rounded-full backdrop-blur-xl flex items-center justify-center transition-colors ${
              isRecording
                ? 'bg-red-500/80 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            aria-label={isRecording ? "Stop Recording" : "Start Recording"}
          >
            <Video size={iconSize} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
