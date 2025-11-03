import { useCallback } from 'react';

export const useImageUpload = () => {
  const handleImageUpload = useCallback(async (file) => {
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select an image file");
    }

    const imageUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result);
      reader.readAsDataURL(file);
    });

    const img = new Image();
    img.src = imageUrl;
    await new Promise((resolve) => (img.onload = resolve));

    let finalImageUrl = imageUrl;

    if (img.width > 1080 || img.height > 1920) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const ratio = Math.min(1080 / img.width, 1920 / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      finalImageUrl = canvas.toDataURL("image/jpeg", 0.9);
    }

    return {
      id: Date.now(),
      imageUrl: finalImageUrl,
      timestamp: Date.now(),
      viewed: false,
    };
  }, []);

  return { handleImageUpload };
};
