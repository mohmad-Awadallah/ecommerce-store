import { useMemo, useCallback, useEffect } from 'react';

const useSound = (url, options = {}) => {
  const sound = useMemo(() => {
    if (typeof Audio === 'undefined') return null;
    const audio = new Audio(url);
    audio.volume = options.volume || 1;
    if (options.preload) audio.preload = 'auto';
    return audio;
  }, [url, options.volume, options.preload]);

  const playSound = useCallback(async () => {
    if (!sound) return;
    try {
      sound.currentTime = 0;
      await sound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
      if (options.onError) options.onError();
      throw error; // إعادة رمي الخطأ للتعامل معه في الكود الذي يستدعي الدالة
    }
  }, [sound, options]);

  // تأكد من التعامل مع الأخطاء أثناء تحميل الصوت
  useEffect(() => {
    if (sound) {
      sound.onerror = (e) => {
        console.error("Error loading sound:", e);
        if (options.onError) options.onError(e);
      };
    }
  }, [sound, options]);

  // التأكد من تحميل الصوت عند تغيير URL
  useEffect(() => {
    if (sound) {
      sound.pause();
      sound.src = url;
      sound.load();
    }
  }, [url, sound]);

  // تنظيف الصوت عند تدمير المكون
  useEffect(() => {
    return () => {
      if (sound) {
        sound.pause();
        sound.src = '';
      }
    };
  }, [sound]);

  return { playSound };
};

export default useSound;
