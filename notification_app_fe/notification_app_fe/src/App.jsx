import { useEffect, useState } from "react";

import axios from "axios";

import {

Container,

Typography,

Card,

CardContent,

Chip,

CircularProgress,

Box

} from "@mui/material";

function App() {

const [notifications, setNotifications] = useState([]);

const [loading, setLoading] = useState(true);

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJvbS5iaGF2YW5pc2hhbmthcjIwMjJAdml0c3R1ZGVudC5hYy5pbiIsImV4cCI6MTc3ODkzNDAxMSwiaWF0IjoxNzc4OTMzMTExLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZGIzMTYzYzQtMGYzMy00MmJiLWI0OTQtZTU4YzZlYzFiMTE4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoib20gYmhhdmFuaSBzaGFua2FyIHRhZGlrb25kYSIsInN1YiI6IjZkODYwZWEyLTQ0YWUtNDJkNy05NmUyLWU1NTQ0ZGMwOWFjNCJ9LCJlbWFpbCI6Im9tLmJoYXZhbmlzaGFua2FyMjAyMkB2aXRzdHVkZW50LmFjLmluIiwibmFtZSI6Im9tIGJoYXZhbmkgc2hhbmthciB0YWRpa29uZGEiLCJyb2xsTm8iOiIyMm1pYzAxMjkiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiI2ZDg2MGVhMi00NGFlLTQyZDctOTZlMi1lNTU0NGRjMDlhYzQiLCJjbGllbnRTZWNyZXQiOiJ0cVFSTnZyUXRhVGt0akh6In0.1EOaVevoM4A5kw_cDH_W6uhOv2DUmRc4MZ1xCfCiidw";

const PRIORITY = {

Placement: 3,

Result: 2,

Event: 1

};

useEffect(() => {

fetchNotifications();

}, []);

async function fetchNotifications() {

try {

  console.log("Fetching notifications...");



  const response = await axios.get(

    "http://4.224.186.213/evaluation-service/notifications",

    {

      headers: {

        Authorization: `Bearer ${ACCESS_TOKEN}`

      }

    }

  );



  const data = response.data.notifications || response.data || [];



  const updated = data.map((notification) => ({

    ...notification,

    weight:

      PRIORITY[

        notification.type ||

        notification.Type ||

        notification.notification_type

      ] || 0

  }));



  updated.sort((a, b) => {

    if (b.weight !== a.weight) {

      return b.weight - a.weight;

    }



    return new Date(

      b.timestamp || b.Timestamp

    ) - new Date(

      a.timestamp || a.Timestamp

    );

  });



  const top10 = updated.slice(0, 10);



  setNotifications(top10);

} catch (error) {

  console.error(

    "Error fetching notifications:",

    error.response?.data || error.message

  );

} finally {

  setLoading(false);

}

}

return (

<Container maxWidth="md" sx={{ marginTop: 4 }}>

  <Typography

    variant="h3"

    align="center"

    gutterBottom

  >

    Campus Notifications

  </Typography>



  <Typography

    variant="body1"

    align="center"

    sx={{ marginBottom: 4 }}

  >

    Top 10 Priority Notifications

  </Typography>



  {loading ? (

    <Box

      display="flex"

      justifyContent="center"

      marginTop={5}

    >

      <CircularProgress />

    </Box>

  ) : (

    notifications.map((notification, index) => (

      <Card

        key={index}

        sx={{

          marginBottom: 3,

          borderRadius: 3,

          boxShadow: 3

        }}

      >

        <CardContent>

          <Box

            display="flex"

            justifyContent="space-between"

            alignItems="center"

            marginBottom={2}

          >

            <Typography variant="h6">

              {notification.type ||

                notification.Type ||

                notification.notification_type}

            </Typography>



            <Chip

              label={`Priority ${notification.weight}`}

              color={

                notification.weight === 3

                  ? "error"

                  : notification.weight === 2

                  ? "warning"

                  : "primary"

              }

            />

          </Box>



          <Typography

            variant="body1"

            sx={{ marginBottom: 2 }}

          >

            {notification.message || notification.Message}

          </Typography>



          <Typography

            variant="body2"

            color="text.secondary"

          >

            {notification.timestamp || notification.Timestamp}

          </Typography>

        </CardContent>

      </Card>

    ))

  )}

</Container>

);

}

export default App;