"use strict";
// User Router
const userRouter = express.Router();
app.use("/api/v1/users", userRouter);
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getSingleUser).patch(updateUser);
