const axios = require("axios");
const Log = require("../logging_middleware/logger");

const PRIORITY = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTopNotifications() {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications from test server"
    );

    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
            headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJvbS5iaGF2YW5pc2hhbmthcjIwMjJAdml0c3R1ZGVudC5hYy5pbiIsImV4cCI6MTc3ODkzNDAxMSwiaWF0IjoxNzc4OTMzMTExLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGIzMTYzYzQtMGYzMy00MmJiLWI0OTQtZTU4YzZlYzFiMTE4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoib20gYmhhdmFuaSBzaGFua2FyIHRhZGlrb25kYSIsInN1YiI6IjZkODYwZWEyLTQ0YWUtNDJkNy05NmUyLWU1NTQ0ZGMwOWFjNCJ9LCJlbWFpbCI6Im9tLmJoYXZhbmlzaGFua2FyMjAyMkB2aXRzdHVkZW50LmFjLmluIiwibmFtZSI6Im9tIGJoYXZhbmkgc2hhbmthciB0YWRpa29uZGEiLCJyb2xsTm8iOiIyMm1pYzAxMjkiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI2ZDg2MGVhMi00NGFlLTQyZDctOTZlMi1lNTU0NGRjMDlhYzQiLCJjbGllbnRTZWNyZXQiOiJ0cVFSTnZyUXRhVGt0akh6In0.1EOaVevoM4A5kw_cDH_W6uhOv2DUmRc4MZ1xCfCiidw`
            }
        }
    );

    const notifications = response.data.notifications;

    await Log(
      "frontend",
      "info",
      "api",
      `Fetched ${notifications.length} notifications`
    );

    notifications.sort((a, b) => {
      const weightA = PRIORITY[a.Type] || 0;
      const weightB = PRIORITY[b.Type] || 0;

      if (weightB !== weightA) {
        return weightB - weightA;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    await Log(
      "frontend",
      "debug",
      "utils",
      "Notifications sorted by priority and timestamp"
    );

    const top10 = notifications.slice(0, 10);

    await Log(
      "frontend",
      "info",
      "utils",
      "Selected top 10 notifications"
    );

    console.log("\n===== TOP 10 PRIORITY NOTIFICATIONS =====\n");

    top10.forEach((notification, index) => {
      console.log(`${index + 1}. ${notification.Type}`);
      console.log(`   Message   : ${notification.Message}`);
      console.log(`   Timestamp : ${notification.Timestamp}`);
      console.log(`   ID        : ${notification.ID}`);
      console.log();
    });

    await Log(
      "frontend",
      "info",
      "utils",
      "Displayed top 10 notifications"
    );
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    console.error("Error:", error.response?.data || error.message);
  }
}

getTopNotifications();