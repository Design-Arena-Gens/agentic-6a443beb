'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Lightbulb } from 'lucide-react';

interface ProModePanelProps {
  sceneType: 'landscape' | 'portrait' | 'macro' | 'auto';
  onClose: () => void;
  fontSize: 'small' | 'medium' | 'large';
}

interface CameraSettings {
  iso: number;
  aperture: string;
  shutterSpeed: string;
  whiteBalance: string;
}

export default function ProModePanel({ sceneType, onClose, fontSize }: ProModePanelProps) {
  const [settings, setSettings] = useState<CameraSettings>({
    iso: 400,
    aperture: 'f/2.8',
    shutterSpeed: '1/125',
    whiteBalance: 'Auto'
  });

  const textSize = fontSize === 'large' ? 'text-lg' : fontSize === 'medium' ? 'text-base' : 'text-sm';
  const titleSize = fontSize === 'large' ? 'text-2xl' : fontSize === 'medium' ? 'text-xl' : 'text-lg';

  useEffect(() => {
    // AI-powered suggestions based on scene type
    const suggestions = getSceneSuggestions(sceneType);
    setSettings(suggestions);
  }, [sceneType]);

  const getSceneSuggestions = (scene: string): CameraSettings => {
    switch (scene) {
      case 'landscape':
        return {
          iso: 100,
          aperture: 'f/11',
          shutterSpeed: '1/250',
          whiteBalance: 'Daylight'
        };
      case 'portrait':
        return {
          iso: 200,
          aperture: 'f/2.8',
          shutterSpeed: '1/125',
          whiteBalance: 'Auto'
        };
      case 'macro':
        return {
          iso: 400,
          aperture: 'f/5.6',
          shutterSpeed: '1/60',
          whiteBalance: 'Auto'
        };
      default:
        return {
          iso: 400,
          aperture: 'f/2.8',
          shutterSpeed: '1/125',
          whiteBalance: 'Auto'
        };
    }
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: 'spring', damping: 25 }}
      className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-dark-surface/95 backdrop-blur-xl border-r border-dark-border shadow-2xl z-50"
    >
      <div className="h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className={`${titleSize} font-bold`}>Pro Mode</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close Pro Mode"
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* AI Suggestion Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <Lightbulb size={20} className="text-blue-400 mt-0.5" />
            <div>
              <p className={`${textSize} text-blue-300 font-medium mb-1`}>AI Suggestion</p>
              <p className="text-xs text-blue-200/80">
                Settings optimized for {sceneType} photography
              </p>
            </div>
          </div>
        </motion.div>

        {/* Settings Controls */}
        <div className="flex-1 space-y-6 overflow-y-auto">
          {/* ISO */}
          <div>
            <label className={`${textSize} font-medium block mb-3`}>ISO</label>
            <input
              type="range"
              min="100"
              max="3200"
              step="100"
              value={settings.iso}
              onChange={(e) => setSettings({ ...settings, iso: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-white/60">100</span>
              <span className={`${textSize} text-white font-semibold`}>{settings.iso}</span>
              <span className="text-xs text-white/60">3200</span>
            </div>
          </div>

          {/* Aperture */}
          <div>
            <label className={`${textSize} font-medium block mb-3`}>Aperture</label>
            <div className="grid grid-cols-4 gap-2">
              {['f/1.8', 'f/2.8', 'f/5.6', 'f/11'].map((value) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSettings({ ...settings, aperture: value })}
                  className={`py-2 px-3 rounded-lg ${textSize} font-medium transition-colors ${
                    settings.aperture === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Shutter Speed */}
          <div>
            <label className={`${textSize} font-medium block mb-3`}>Shutter Speed</label>
            <div className="grid grid-cols-3 gap-2">
              {['1/30', '1/60', '1/125', '1/250', '1/500', '1/1000'].map((value) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSettings({ ...settings, shutterSpeed: value })}
                  className={`py-2 px-2 rounded-lg text-xs font-medium transition-colors ${
                    settings.shutterSpeed === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>
          </div>

          {/* White Balance */}
          <div>
            <label className={`${textSize} font-medium block mb-3`}>White Balance</label>
            <div className="grid grid-cols-2 gap-2">
              {['Auto', 'Daylight', 'Cloudy', 'Tungsten'].map((value) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSettings({ ...settings, whiteBalance: value })}
                  className={`py-2 px-3 rounded-lg ${textSize} font-medium transition-colors ${
                    settings.whiteBalance === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </motion.div>
  );
}
