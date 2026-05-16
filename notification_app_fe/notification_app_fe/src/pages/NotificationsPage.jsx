import { useEffect, useState } from "react";
import API from "../services/api";
import NotificationCard from "../components/NotificationCard";

function NotificationsPage() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {

      const response = await API.get("/notifications", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJvbS5iaGF2YW5pc2hhbmthcjIwMjJAdml0c3R1ZGVudC5hYy5pbiIsImV4cCI6MTc3ODkzNDAxMSwiaWF0IjoxNzc4OTMzMTExLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGIzMTYzYzQtMGYzMy00MmJiLWI0OTQtZTU4YzZlYzFiMTE4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoib20gYmhhdmFuaSBzaGFua2FyIHRhZGlrb25kYSIsInN1YiI6IjZkODYwZWEyLTQ0YWUtNDJkNy05NmUyLWU1NTQ0ZGMwOWFjNCJ9LCJlbWFpbCI6Im9tLmJoYXZhbmlzaGFua2FyMjAyMkB2aXRzdHVkZW50LmFjLmluIiwibmFtZSI6Im9tIGJoYXZhbmkgc2hhbmthciB0YWRpa29uZGEiLCJyb2xsTm8iOiIyMm1pYzAxMjkiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI2ZDg2MGVhMi00NGFlLTQyZDctOTZlMi1lNTU0NGRjMDlhYzQiLCJjbGllbnRTZWNyZXQiOiJ0cVFSTnZyUXRhVGt0akh6In0.1EOaVevoM4A5kw_cDH_W6uhOv2DUmRc4MZ1xCfCiidw"
        }
      });

      setNotifications(response.data.notifications);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Notifications</h1>

      {
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
          />
        ))
      }
    </div>
  );
}

export default NotificationsPage;