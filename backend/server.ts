import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const { PORT } = process.env;
if (!PORT) {
  throw new Error("No port provided");
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
