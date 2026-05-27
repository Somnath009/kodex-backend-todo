import app from "./src/app.js"
import connectDB from "./src/config/db.js"

await connectDB()


app.listen(8080, () => {
    console.log("Server is running on port 8080")
})