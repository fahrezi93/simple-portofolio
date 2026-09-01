import { useState, useEffect } from "react";

export function LocalTime() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setTimeString(`${formatted} (GMT+7)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums">
      {timeString || "01:13 AM (GMT+7)"}
    </span>
  );
}
