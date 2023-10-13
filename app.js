const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config().parsed;

const authenticateRouter = require("./routers/authentication/authenication.routes");
const orderRouter = require("./routers/order/order.routes");
const customerRouter = require("./routers/customer/customer.routes");
const employeeRouter = require("./routers/employee/employee.routes");
const roleRouter = require("./routers/role/roles.routes");
//Manufacture
const assignmentRouter = require("./routers/manufacture/assignment.routes");
const moveRouter = require("./routers/manufacture/move.routes");
const salaryRouter = require("./routers/manufacture/salary.routes");
const synchronizedRouter = require("./routers/manufacture/synchronized.routes");
const updateRouter = require("./routers/manufacture/update.routes");
//Product
const colorRouter = require("./routers/procduct/color.routes");
const detailRouter = require("./routers/procduct/detail.routes");
const kindRouter = require("./routers/procduct/kind.routes");
const procductRouter = require("./routers/procduct/product.routes");
const sizeRouter = require("./routers/procduct/size.routes");
const typeRouter = require("./routers/procduct/type.routes");
//Report
const orderReportRouter = require("./routers/report/order.routes");
const outputReportRouter = require("./routers/report/output.routes");
const productReportRouter = require("./routers/report/product.routes");
const totalOutputReportRouter = require("./routers/report/total/output.routes");
const totalProductReportRouter = require("./routers/report/total/product.routes");

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/login", authenticateRouter);
app.use("/api/customer", customerRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/role", roleRouter);
app.use("/api/order", orderRouter);
//Manufacture
app.use("/api/assignment", assignmentRouter);
app.use("/api/move", moveRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/synchronized", synchronizedRouter);
app.use("/api", updateRouter);
//Product
app.use("/api", colorRouter);
app.use("/api", detailRouter);
app.use("/api", kindRouter);
app.use("/api", procductRouter);
app.use("/api", sizeRouter);
app.use("/api", typeRouter);
//Report
app.use("/api", orderReportRouter);
app.use("/api", outputReportRouter);
app.use("/api", productReportRouter);
app.use("/api", totalOutputReportRouter);
app.use("/api", totalProductReportRouter);

app.listen(dotenv.PORT, () => {
  console.log("Port is listening.");
});
