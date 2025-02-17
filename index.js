const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const usersRouter=require("./Routers/usersRoute")
const departmentsRouter=require("./Routers/departmentsRouter")
const employeesRouter=require("./Routers/employeesRouter")
const shiftsRouter=require("./Routers/shiftsRouter")
const loginRouter=require("./Routers/loginRouter")
const assignmentsRouter=require("./Routers/assignmentsRouter")
const actionsRouter=require("./Routers/actionsRouter")
const app = express()
app.use(express.json())
app.use(cors())
app.listen(8000, ()=>console.log("online.."))
app.use("/users", usersRouter)
app.use("/employees", employeesRouter)
app.use("/departments", departmentsRouter)
app.use("/shifts", shiftsRouter)
app.use("/login", loginRouter )
app.use("/assignments", assignmentsRouter )
app.use("/actions", actionsRouter )
mongoose.connect("mongodb://127.0.0.1:27017/nodeJsProject").then(console.log("connected to db"))