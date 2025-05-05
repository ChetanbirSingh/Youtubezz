"use client";

import { useState, useEffect, useRef } from "react";
import moment, { Moment } from "moment";

interface Reminder {
  id: string;
  timestamp: number;
  videoTitle: string;
  formattedTime: string;
}

interface Props {
  videoTitle?: string;
}

export default function ReminderNotification({ videoTitle = "Video Title" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [reminderTime, setReminderTime] = useState<Moment>(moment().add(1, "hour"));
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [notifications, setNotifications] = useState<Reminder[]>([]);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("videoReminders");
    if (!stored) return;

    try {
      const reminders: Reminder[] = JSON.parse(stored);
      setNotifications(reminders);

      const now = Date.now();
      reminders.forEach((r) => {
        const timeLeft = r.timestamp - now;
        if (timeLeft > 0) {
          setTimeout(() => {
            showToast(r.videoTitle);
            removeReminder(r.id);
          }, timeLeft);
        } else {
          removeReminder(r.id);
        }
      });
    } catch {
      localStorage.removeItem("videoReminders");
    }
  }, []);

  const showToast = (text: string) => {
    setToast(`⏰ Time to watch: ${text}`);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(""), 5000);
  };

  const setReminder = () => {
    if (!reminderTime || reminderTime.toDate() <= new Date()) {
      setMessage("❌ Pick a future time.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const id = `reminder-${Date.now()}`;
    const timestamp = reminderTime.toDate().getTime();

    const newReminder: Reminder = {
      id,
      timestamp,
      videoTitle,
      formattedTime: reminderTime.format("LLL"),
    };

    const updated = [...notifications, newReminder];
    setNotifications(updated);
    localStorage.setItem("videoReminders", JSON.stringify(updated));
    setMessage(`✅ Reminder set for ${newReminder.formattedTime}`);
    setTimeout(() => setMessage(""), 3000);
    setIsOpen(false);

    setTimeout(() => {
      showToast(videoTitle);
      removeReminder(id);
    }, timestamp - Date.now());
  };

  const removeReminder = (id: string) => {
    const updated = notifications.filter((r) => r.id !== id);
    setNotifications(updated);
    localStorage.setItem("videoReminders", JSON.stringify(updated));
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center relative">
        <span className="text-xl">⏰</span>
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs text-white flex items-center justify-center rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {toast && (
        <div className="fixed bottom-5 right-5 bg-white text-black px-4 py-2 rounded shadow-lg z-50">
          {toast}
        </div>
      )}

      {isOpen && (
        <div className="absolute top-12 right-0 bg-[#1c1c1c] w-72 p-4 border border-gray-700 rounded-lg shadow-xl z-50">
          <h3 className="text-white mb-2">Set Reminder</h3>
          <input
            type="date"
            value={reminderTime.format("YYYY-MM-DD")}
            onChange={(e) => {
              const date = moment(e.target.value);
              if (date.isValid()) {
                setReminderTime((prev) =>
                  moment(prev).year(date.year()).month(date.month()).date(date.date())
                );
              }
            }}
            className="w-full mb-2 p-2 rounded bg-gray-800 text-white text-sm"
          />
          <input
            type="time"
            value={reminderTime.format("HH:mm")}
            onChange={(e) => {
              const [h, m] = e.target.value.split(":");
              setReminderTime((prev) =>
                moment(prev).hour(parseInt(h)).minute(parseInt(m))
              );
            }}
            className="w-full mb-3 p-2 rounded bg-gray-800 text-white text-sm"
          />

          <button
            onClick={setReminder}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm"
          >
            Set Reminder
          </button>

          {message && <p className="text-green-400 text-xs mt-2">{message}</p>}

          {notifications.length > 0 && (
            <div className="mt-4 text-sm text-white space-y-2 max-h-32 overflow-y-auto">
              {notifications.map((r) => (
                <div key={r.id} className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <div>
                    <p className="truncate">{r.videoTitle}</p>
                    <p className="text-xs text-gray-400">{moment(r.timestamp).format("MMM D, h:mm A")}</p>
                  </div>
                  <button
                    onClick={() => removeReminder(r.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
