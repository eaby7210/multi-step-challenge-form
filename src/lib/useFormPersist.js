import { useEffect } from "react";

export default function useFormPersistence({
  userId,
  formData,
  setFormData,
  status,
  enable = true,
}) {
  const STORAGE_PREFIX = "ib_formdata_";
  const storageKey = userId ? `${STORAGE_PREFIX}${userId}` : null;

  // 🧩 1️⃣ Effect: Load or clear data ON MOUNT or when status/user changes
  useEffect(() => {
    if (!enable || !storageKey) return;

    if (status === "success") {
      localStorage.removeItem(storageKey);
      console.log(`✅ Cleared saved formData for user_id=${userId}`);
      return;
    }

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log(`💾 Loaded saved formData for user_id=${userId}`);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (err) {
        console.error("⚠️ Failed to parse saved formData:", err);
      }
    }
  }, [userId, status, enable, storageKey, setFormData]);

  // 🧩 2️⃣ Effect: Save data whenever formData changes
  useEffect(() => {
    if (!enable || !storageKey || status === "success") return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(formData));
      // console.log(`💾 Saved formData for ${userId}`);
    } catch (err) {
      console.error("⚠️ Failed to save formData:", err);
    }
  }, [formData, userId, status, enable, storageKey]);
}
