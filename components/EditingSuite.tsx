'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Download, Sliders, Palette } from 'lucide-react';

interface EditingSuiteProps {
  media: string;
  onClose: () => void;
  fontSize: 'small' | 'medium' | 'large';
}

const filters = [
  { name: 'None', filter: '' },
  { name: 'Vivid', filter: 'saturate(1.5) contrast(1.1)' },
  { name: 'Cinematic', filter: 'sepia(0.3) contrast(1.2) brightness(0.9)' },
  { name: 'B&W', filter: 'grayscale(1) contrast(1.2)' },
  { name: 'Vintage', filter: 'sepia(0.5) saturate(0.8) hue-rotate(-10deg)' },
  { name: 'Cool', filter: 'saturate(1.2) hue-rotate(-15deg) brightness(1.05)' },
  { name: 'Warm', filter: 'saturate(1.3) hue-rotate(15deg) brightness(1.05)' },
  { name: 'Fade', filter: 'contrast(0.85) brightness(1.2) saturate(0.8)' },
];

const colorGrades = [
  { name: 'Natural', adjust: { brightness: 100, contrast: 100, saturation: 100 } },
  { name: 'Film', adjust: { brightness: 105, contrast: 110, saturation: 90 } },
  { name: 'Moody', adjust: { brightness: 85, contrast: 120, saturation: 80 } },
  { name: 'Bright', adjust: { brightness: 115, contrast: 95, saturation: 110 } },
];

export default function EditingSuite({ media, onClose, fontSize }: EditingSuiteProps) {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const textSize = fontSize === 'large' ? 'text-base' : fontSize === 'medium' ? 'text-sm' : 'text-xs';
  const titleSize = fontSize === 'large' ? 'text-2xl' : fontSize === 'medium' ? 'text-xl' : 'text-lg';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = media;
    link.download = `pro-camera-${Date.now()}.png`;
    link.click();
  };

  const getFilterStyle = () => {
    return {
      filter: `${filters[selectedFilter].filter} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border">
        <h2 className={`${titleSize} font-bold`}>Edit</h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={18} />
            <span className={textSize}>Save</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </motion.button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={media}
          alt="Preview"
          style={getFilterStyle()}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Editing Tools */}
      <div className="border-t border-dark-border bg-dark-surface/95 backdrop-blur-xl">
        {/* Filters */}
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center gap-2 mb-3">
            <Palette size={18} />
            <h3 className={`${textSize} font-semibold`}>Filters</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter, index) => (
              <motion.button
                key={filter.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg ${textSize} font-medium transition-colors ${
                  selectedFilter === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {filter.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Color Grading */}
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center gap-2 mb-3">
            <Sliders size={18} />
            <h3 className={`${textSize} font-semibold`}>Color Grading</h3>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {colorGrades.map((grade, index) => (
              <motion.button
                key={grade.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedGrade(index);
                  setBrightness(grade.adjust.brightness);
                  setContrast(grade.adjust.contrast);
                  setSaturation(grade.adjust.saturation);
                }}
                className={`py-2 px-3 rounded-lg ${textSize} font-medium transition-colors ${
                  selectedGrade === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {grade.name}
              </motion.button>
            ))}
          </div>

          {/* Manual Adjustments */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-white/70">Brightness</label>
                <span className="text-xs text-white font-medium">{brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-white/70">Contrast</label>
                <span className="text-xs text-white font-medium">{contrast}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-white/70">Saturation</label>
                <span className="text-xs text-white font-medium">{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  );
}
