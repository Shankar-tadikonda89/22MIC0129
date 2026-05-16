import { Card, CardContent, Typography } from "@mui/material";

function NotificationCard({ notification }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {notification.type}
        </Typography>

        <Typography>
          {notification.message}
        </Typography>

        <Typography variant="body2">
          {notification.timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;