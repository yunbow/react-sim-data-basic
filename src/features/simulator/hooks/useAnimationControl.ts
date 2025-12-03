import { useState, useCallback } from 'react';
import { AnimationState, AnimationSpeed } from '../types';

export const useAnimationControl = () => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isPlaying: false,
    isPaused: false,
    speed: 'normal',
    currentStep: 0,
  });

  const play = useCallback(() => {
    setAnimationState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
    }));
  }, []);

  const pause = useCallback(() => {
    setAnimationState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: true,
    }));
  }, []);

  const stop = useCallback(() => {
    setAnimationState(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      currentStep: 0,
    }));
  }, []);

  const setSpeed = useCallback((speed: AnimationSpeed) => {
    setAnimationState(prev => ({
      ...prev,
      speed,
    }));
  }, []);

  const getAnimationDuration = useCallback((): number => {
    const speedMap: Record<AnimationSpeed, number> = {
      step: 0,
      slow: 2000,
      normal: 1000,
      fast: 300,
    };
    return speedMap[animationState.speed];
  }, [animationState.speed]);

  return {
    animationState,
    play,
    pause,
    stop,
    setSpeed,
    getAnimationDuration,
  };
};
