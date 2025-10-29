'use client';

import { motion } from 'framer-motion';

interface CompositionGuideProps {
  type: 'thirds' | 'golden';
}

export default function CompositionGuide({ type }: CompositionGuideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-none"
    >
      {type === 'thirds' && (
        <>
          {/* Vertical lines */}
          <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-white" />
          <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-white" />
          {/* Horizontal lines */}
          <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-white" />
          <div className="absolute left-0 right-0 top-2/3 h-[1px] bg-white" />
          {/* Intersection points */}
          <div className="absolute top-1/3 left-1/3 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white" />
          <div className="absolute top-1/3 left-2/3 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white" />
          <div className="absolute top-2/3 left-1/3 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white" />
          <div className="absolute top-2/3 left-2/3 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white" />
        </>
      )}
      {type === 'golden' && (
        <>
          {/* Golden ratio lines (approximately 0.618) */}
          <div className="absolute top-0 bottom-0 left-[38.2%] w-[1px] bg-yellow-400" />
          <div className="absolute top-0 bottom-0 left-[61.8%] w-[1px] bg-yellow-400" />
          <div className="absolute left-0 right-0 top-[38.2%] h-[1px] bg-yellow-400" />
          <div className="absolute left-0 right-0 top-[61.8%] h-[1px] bg-yellow-400" />
          {/* Intersection points */}
          <div className="absolute top-[38.2%] left-[38.2%] w-2 h-2 -ml-1 -mt-1 rounded-full bg-yellow-400" />
          <div className="absolute top-[38.2%] left-[61.8%] w-2 h-2 -ml-1 -mt-1 rounded-full bg-yellow-400" />
          <div className="absolute top-[61.8%] left-[38.2%] w-2 h-2 -ml-1 -mt-1 rounded-full bg-yellow-400" />
          <div className="absolute top-[61.8%] left-[61.8%] w-2 h-2 -ml-1 -mt-1 rounded-full bg-yellow-400" />
        </>
      )}
    </motion.div>
  );
}
