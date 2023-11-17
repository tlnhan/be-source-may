const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config().parsed;

//Authentication
const authenticateRouter = require("./routers/authentication/authenication.routes");
//Customer
const customerRouter = require("./routers/customer/customer.routes");
const salalryRouter = require("./routers/employee/salary.routes");
//Employee
const employeeRouter = require("./routers/employee/employee.routes");
//Roler
const roleRouter = require("./routers/role/roles.routes");
//Manufacture
const assignmentRouter = require("./routers/manufacture/assignment.routes");
// const moveRouter = require("./routers/manufacture/move.routes");
const salaryRouter = require("./routers/manufacture/salary.routes");
// const synchronizedRouter = require("./routers/manufacture/synchronized.routes");
const updateRouter = require("./routers/manufacture/update.routes");
const updateQuantityRouter = require("./routers/manufacture/updatequantity.routes");
const blockOrOpenQuantityRouter = require("./routers/manufacture/block_or_open_quantity.routes");
//Product
const colorRouter = require("./routers/procduct/color.routes");
const detailRouter = require("./routers/procduct/detail.routes");
const kindRouter = require("./routers/procduct/kind.routes");
const procductRouter = require("./routers/procduct/product.routes");
const sizeRouter = require("./routers/procduct/size.routes");
const typeRouter = require("./routers/procduct/type.routes");
//Report
// const orderReportRouter = require("./routers/report/order.routes");
// const outputReportRouter = require("./routers/report/output.routes");
// const productReportRouter = require("./routers/report/product.routes");
// const totalOutputReportRouter = require("./routers/report/total/output.routes");
// const totalProductReportRouter = require("./routers/report/total/product.routes");
//List
const listDetailRouter = require("./routers/list/list_detail.routes");
const listSizeRouter = require("./routers/list/list_size.routes");
const listKindProductRouter = require("./routers/list/list_kindProduct.routes");
const listDVTRouter = require("./routers/list/list_dvt.routes");
const listKindRouter = require("./routers/list/list_kind.routes");
const listKindOfProductRouter = require("./routers/list/list_kind_product.routes");
const listColorRouter = require("./routers/list/list_color.routes");
//Order
const orderHRouter = require("./routers/order/order_H.routes");
const orderLRouter = require("./routers/order/order_L.routes");
//Follow
const sizeFollowProductRouter = require("./routers/follow/size.follow.product.routes");
const colorFollowProductRouter = require("./routers/follow/color.follow.product.routes");
//Department
const departmentRouter = require("./routers/department/department.routes");
//Position
const positionRouter = require("./routers/position/position.routes");
//Quantity
const quantityRouter = require("./routers/quantity/quantity.routes");

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Authentication
app.use("/api/login", authenticateRouter);
//Customer
app.use("/api/customer", customerRouter);
//Employee
app.use("/api/employee", employeeRouter);
app.use("/api/employee/salary", salalryRouter);
//Role
app.use("/api/role", roleRouter);
//Manufacture
app.use("/api/manufacture/assignment", assignmentRouter);
// app.use("/api/manufacture/move", moveRouter);
app.use("/api/manufacture/salary", salaryRouter);
// app.use("/api/manufacture/synchronized", synchronizedRouter);
app.use("/api/manufacture/update", updateRouter);
app.use("/api/manufacture/update/quantity", updateQuantityRouter);
app.use(
  "/api/manufacture/update/blockOrOpenQuantity",
  blockOrOpenQuantityRouter
);
//Product
app.use("/api/product/color", colorRouter);
app.use("/api/product/detail", detailRouter);
app.use("/api/product/kind", kindRouter);
app.use("/api/product/product", procductRouter);
app.use("/api/product/size", sizeRouter);
app.use("/api/product/type", typeRouter);
//Report
// app.use("/api/report/order", orderReportRouter);
// app.use("/api/report/output", outputReportRouter);
// app.use("/api/report/product", productReportRouter);
// app.use("/api/report/totalOutput", totalOutputReportRouter);
// app.use("/api/report/totalProduct", totalProductReportRouter);
//List
app.use("/api/list/detail", listDetailRouter);
app.use("/api/list/size", listSizeRouter);
app.use("/api/list/kindProduct", listKindProductRouter);
app.use("/api/list/dvt", listDVTRouter);
app.use("/api/list/kind", listKindRouter);
app.use("/api/list/kind/product", listKindOfProductRouter);
app.use("/api/list/color", listColorRouter);
//Order
app.use("/api/order/H", orderHRouter);
app.use("/api/order/L", orderLRouter);
//Follow
app.use("/api/follow/product/size", sizeFollowProductRouter);
app.use("/api/follow/product/color", colorFollowProductRouter);
//Department
app.use("/api/department", departmentRouter);
//Position
app.use("/api/position", positionRouter);
//Quantity
app.use("/api/quantity", quantityRouter);

app.listen(dotenv.PORT, () => {
  console.log("Port is listening.");
});
