import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const port = process.env.PORT || 5000;

// connections and Listeners
connectToDatabase()
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server is open on ${port} & Connected to Database 👍`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
