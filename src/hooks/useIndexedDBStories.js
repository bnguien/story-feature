import { useState, useEffect } from "react";
import { useImageUpload } from "./useImageUpload";

export function useIndexedDBStories(dbName = "StoryDB", expireHours = 24) {
  const [stories, setStories] = useState([]);
  const { handleImageUpload } = useImageUpload(); 
  useEffect(() => {
    const openReq = indexedDB.open(dbName, 1);
    openReq.onupgradeneeded = () => {
      const db = openReq.result;
      if (!db.objectStoreNames.contains("stories")) {
        db.createObjectStore("stories", { keyPath: "id" });
      }
    };

    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction("stories", "readonly");
      const store = tx.objectStore("stories");
      const req = store.getAll();

      req.onsuccess = () => {
        const all = req.result;
        const now = Date.now();

        const valid = all.filter((s) => now - s.createdAt < expireHours * 60 * 60 * 1000);

        const withUrls = valid.map((s) => ({
          ...s,
          imageUrl: URL.createObjectURL(s.blob),
        }));

        setStories(withUrls);
      };
    };
  }, [dbName, expireHours]);

  const addStory = async (file) => {
    try {
      const processed = await handleImageUpload(file); 
      const res = await fetch(processed.imageUrl);
      const blob = await res.blob();

      const story = {
        id: Date.now(),
        blob,
        createdAt: Date.now(),
      };

      const openReq = indexedDB.open(dbName, 1);
      openReq.onsuccess = () => {
        const db = openReq.result;
        const tx = db.transaction("stories", "readwrite");
        const store = tx.objectStore("stories");
        store.add(story);

        const imageUrl = URL.createObjectURL(blob);
        setStories((prev) => [...prev, { ...story, imageUrl }]);
      };
    } catch (err) {
      console.error("Error adding story:", err);
    }
  };

  const removeExpiredStories = () => {
    const openReq = indexedDB.open(dbName, 1);
    openReq.onsuccess = () => {
      const db = openReq.result;
      const tx = db.transaction("stories", "readwrite");
      const store = tx.objectStore("stories");

      const now = Date.now();
      const getAll = store.getAll();
      getAll.onsuccess = () => {
        getAll.result.forEach((story) => {
          if (now - story.createdAt >= expireHours * 60 * 60 * 1000) {
            store.delete(story.id);
          }
        });
      };
    };
  };

  return { stories, addStory, removeExpiredStories };
}
