const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJvbS5iaGF2YW5pc2hhbmthcjIwMjJAdml0c3R1ZGVudC5hYy5pbiIsImV4cCI6MTc3ODkzMDU1OCwiaWF0IjoxNzc4OTI5NjU4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjU2NDNhZTItM2EzZS00YjgzLWI4ZmUtNGJjYTI1NzIwN2VmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoib20gYmhhdmFuaSBzaGFua2FyIHRhZGlrb25kYSIsInN1YiI6IjZkODYwZWEyLTQ0YWUtNDJkNy05NmUyLWU1NTQ0ZGMwOWFjNCJ9LCJlbWFpbCI6Im9tLmJoYXZhbmlzaGFua2FyMjAyMkB2aXRzdHVkZW50LmFjLmluIiwibmFtZSI6Im9tIGJoYXZhbmkgc2hhbmthciB0YWRpa29uZGEiLCJyb2xsTm8iOiIyMm1pYzAxMjkiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI2ZDg2MGVhMi00NGFlLTQyZDctOTZlMi1lNTU0NGRjMDlhYzQiLCJjbGllbnRTZWNyZXQiOiJ0cVFSTnZyUXRhVGt0akh6In0.BoGsNrEepeeGsNZEyyCY2eWlHwI2-N0crWKxJsjwQ5I";
async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          stack: stack,
          level: level,
          package: packageName,
          message: message
        })
      }
    );

    const data = await response.json();
    console.log("Log API Response:", data);

    return data;
  } catch (error) {
    console.error("Logging failed:", error);
  }
}

module.exports = Log;