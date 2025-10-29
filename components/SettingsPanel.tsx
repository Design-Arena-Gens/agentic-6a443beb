'use client';

import { motion } from 'framer-motion';
import { X, Grid3x3, Maximize, Camera, Volume2, Type, Contrast, Mic } from 'lucide-react';

interface SettingsPanelProps {
  guideLine: 'thirds' | 'golden' | 'none';
  setGuideLine: (value: 'thirds' | 'golden' | 'none') => void;
  sceneType: 'landscape' | 'portrait' | 'macro' | 'auto';
  setSceneType: (value: 'landscape' | 'portrait' | 'macro' | 'auto') => void;
  stabilization: boolean;
  setStabilization: (value: boolean) => void;
  aspectRatio: '16:9' | '2.39:1' | '4:3' | '1:1';
  setAspectRatio: (value: '16:9' | '2.39:1' | '4:3' | '1:1') => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (value: 'small' | 'medium' | 'large') => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  voiceCommands: boolean;
  setVoiceCommands: (value: boolean) => void;
  onClose: () => void;
}

export default function SettingsPanel({
  guideLine,
  setGuideLine,
  sceneType,
  setSceneType,
  stabilization,
  setStabilization,
  aspectRatio,
  setAspectRatio,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  voiceCommands,
  setVoiceCommands,
  onClose
}: SettingsPanelProps) {
  const textSize = fontSize === 'large' ? 'text-base' : fontSize === 'medium' ? 'text-sm' : 'text-xs';
  const titleSize = fontSize === 'large' ? 'text-2xl' : fontSize === 'medium' ? 'text-xl' : 'text-lg';
  const sectionTitle = fontSize === 'large' ? 'text-lg' : fontSize === 'medium' ? 'text-base' : 'text-sm';

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed right-0 top-0 bottom-0 w-96 max-w-[90vw] bg-dark-surface/95 backdrop-blur-xl border-l border-dark-border shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className={`${titleSize} font-bold`}>Settings</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close Settings"
          >
            <X size={20} />
          </motion.button>
        </div>

        <div className="space-y-8">
          {/* Composition Guide */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Grid3x3 size={18} />
              <h3 className={`${sectionTitle} font-semibold`}>Composition Guide</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'none' as const, label: 'Off' },
                { value: 'thirds' as const, label: 'Rule of Thirds' },
                { value: 'golden' as const, label: 'Golden Ratio' }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGuideLine(option.value)}
                  className={`py-2 px-3 rounded-lg ${textSize} font-medium transition-colors ${
                    guideLine === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Scene Type */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera size={18} />
              <h3 className={`${sectionTitle} font-semibold`}>Scene Recognition</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'auto' as const, label: 'Auto' },
                { value: 'landscape' as const, label: 'Landscape' },
                { value: 'portrait' as const, label: 'Portrait' },
                { value: 'macro' as const, label: 'Macro' }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSceneType(option.value)}
                  className={`py-2 px-3 rounded-lg ${textSize} font-medium transition-colors ${
                    sceneType === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Maximize size={18} />
              <h3 className={`${sectionTitle} font-semibold`}>Aspect Ratio</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: '16:9' as const, label: '16:9' },
                { value: '2.39:1' as const, label: '2.39:1' },
                { value: '4:3' as const, label: '4:3' },
                { value: '1:1' as const, label: '1:1' }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAspectRatio(option.value)}
                  className={`py-2 px-2 rounded-lg ${textSize} font-medium transition-colors ${
                    aspectRatio === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Stabilization */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Volume2 size={18} />
              <h3 className={`${sectionTitle} font-semibold`}>Video Stabilization</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStabilization(!stabilization)}
              className={`w-full py-3 px-4 rounded-lg ${textSize} font-medium transition-colors ${
                stabilization
                  ? 'bg-green-500/20 border border-green-500/40 text-green-300'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {stabilization ? 'Enabled' : 'Disabled'}
            </motion.button>
          </div>

          {/* Accessibility Section */}
          <div className="pt-6 border-t border-dark-border">
            <h3 className={`${sectionTitle} font-semibold mb-4`}>Accessibility</h3>

            {/* Font Size */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Type size={18} />
                <span className={textSize}>Font Size</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'small' as const, label: 'Small' },
                  { value: 'medium' as const, label: 'Medium' },
                  { value: 'large' as const, label: 'Large' }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFontSize(option.value)}
                    className={`py-2 px-3 rounded-lg ${textSize} font-medium transition-colors ${
                      fontSize === option.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Contrast size={18} />
                <span className={textSize}>High Contrast</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setHighContrast(!highContrast)}
                className={`w-full py-3 px-4 rounded-lg ${textSize} font-medium transition-colors ${
                  highContrast
                    ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {highContrast ? 'Enabled' : 'Disabled'}
              </motion.button>
            </div>

            {/* Voice Commands */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mic size={18} />
                <span className={textSize}>Voice Commands</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setVoiceCommands(!voiceCommands)}
                className={`w-full py-3 px-4 rounded-lg ${textSize} font-medium transition-colors ${
                  voiceCommands
                    ? 'bg-orange-500/20 border border-orange-500/40 text-orange-300'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {voiceCommands ? 'Enabled' : 'Disabled'}
              </motion.button>
              <p className="text-xs text-white/50 mt-2">
                Say "capture", "record", or "pro mode" to control the camera
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
