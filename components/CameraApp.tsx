'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CameraControls from './CameraControls';
import CompositionGuide from './CompositionGuide';
import ProModePanel from './ProModePanel';
import EditingSuite from './EditingSuite';
import SettingsPanel from './SettingsPanel';
import RecordingIndicator from './RecordingIndicator';
import AudioLevelMonitor from './AudioLevelMonitor';

export default function CameraApp() {
  const [isProMode, setIsProMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showEditSuite, setShowEditSuite] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [guideLine, setGuideLine] = useState<'thirds' | 'golden' | 'none'>('thirds');
  const [sceneType, setSceneType] = useState<'landscape' | 'portrait' | 'macro' | 'auto'>('auto');
  const [stabilization, setStabilization] = useState(true);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '2.39:1' | '4:3' | '1:1'>('16:9');
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    initCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (voiceCommands) {
      initVoiceCommands();
    }
  }, [voiceCommands]);

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: true
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
    }
  };

  const initVoiceCommands = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };
      recognition.start();
    }
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('capture') || command.includes('take photo')) {
      capturePhoto();
    } else if (command.includes('record') || command.includes('start recording')) {
      startRecording();
    } else if (command.includes('stop')) {
      stopRecording();
    } else if (command.includes('pro mode')) {
      setIsProMode(true);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        setCapturedMedia(imageData);
        setShowEditSuite(true);
        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
    }
  };

  const startRecording = () => {
    if (streamRef.current && !isRecording) {
      const recorder = new MediaRecorder(streamRef.current);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setCapturedMedia(url);
        setShowEditSuite(true);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);

      if (navigator.vibrate) {
        navigator.vibrate([50, 100, 50]);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '2.39:1': return 'aspect-[2.39/1]';
      case '16:9': return 'aspect-video';
      case '4:3': return 'aspect-[4/3]';
      case '1:1': return 'aspect-square';
      default: return 'aspect-video';
    }
  };

  return (
    <div className={`relative w-screen h-screen bg-dark-bg overflow-hidden ${highContrast ? 'contrast-125' : ''}`}>
      {/* Camera Viewfinder */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className={`relative ${getAspectRatioClass()} max-w-full max-h-full bg-black`}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />

          {/* Composition Guide Overlay */}
          {guideLine !== 'none' && (
            <CompositionGuide type={guideLine} />
          )}

          {/* Recording Indicator */}
          {isRecording && <RecordingIndicator />}

          {/* Audio Level Monitor (when recording) */}
          {isRecording && streamRef.current && (
            <AudioLevelMonitor stream={streamRef.current} />
          )}

          {/* Scene Recognition Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full"
          >
            <span className={`text-xs font-medium ${fontSize === 'large' ? 'text-base' : fontSize === 'medium' ? 'text-sm' : 'text-xs'}`}>
              {sceneType === 'auto' ? '🤖 Auto' : sceneType === 'landscape' ? '🏞️ Landscape' : sceneType === 'portrait' ? '👤 Portrait' : '🔍 Macro'}
            </span>
          </motion.div>

          {/* Stabilization Indicator */}
          {stabilization && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full"
            >
              <span className={`text-xs font-medium ${fontSize === 'large' ? 'text-base' : fontSize === 'medium' ? 'text-sm' : 'text-xs'}`}>
                📐 Stabilized
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Pro Mode Panel */}
      <AnimatePresence>
        {isProMode && (
          <ProModePanel
            sceneType={sceneType}
            onClose={() => setIsProMode(false)}
            fontSize={fontSize}
          />
        )}
      </AnimatePresence>

      {/* Main Controls */}
      <CameraControls
        isProMode={isProMode}
        isRecording={isRecording}
        onToggleProMode={() => setIsProMode(!isProMode)}
        onCapture={capturePhoto}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onOpenSettings={() => setShowSettings(true)}
        fontSize={fontSize}
      />

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            guideLine={guideLine}
            setGuideLine={setGuideLine}
            sceneType={sceneType}
            setSceneType={setSceneType}
            stabilization={stabilization}
            setStabilization={setStabilization}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            fontSize={fontSize}
            setFontSize={setFontSize}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            voiceCommands={voiceCommands}
            setVoiceCommands={setVoiceCommands}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      {/* Editing Suite */}
      <AnimatePresence>
        {showEditSuite && capturedMedia && (
          <EditingSuite
            media={capturedMedia}
            onClose={() => {
              setShowEditSuite(false);
              setCapturedMedia(null);
            }}
            fontSize={fontSize}
          />
        )}
      </AnimatePresence>

      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
