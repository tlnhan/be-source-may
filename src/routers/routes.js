const express = require("express");
const authenticationRoutes = require("./authentication/routes");
const detailedQuantityTableRoutes = require("./quantity/detailed_quantity_table/routes");
const customerRoutes = require("./customer/routes");
const departmentRoutes = require("./department/routes");
const employeeRoutes = require("./employee/routes");
const salaryEmployeesRoutes = require("./employee/salary/routes");
const colorAccordingToProductRoutes = require("./according_to_product/color/routes");
const detailAccordingToProductRoutes = require("./according_to_product/detail/routes");
const sizeAccordingToProductRoutes = require("./according_to_product/size/routes");
const displayEmployeesByOutputStatusRoutes = require("./out_put/d.e.b.o.s/routes");
const lockOrOpenOutputRoutes = require("./out_put/lock_or_open_output/routes");
const productionAssignmentRoutes = require("./production_assignment/routes");
const productQuantityTableRoutes = require("./quantity/product_quantity_table/routes");
const updateOutputRoutes = require("./out_put/update_output/routes");
const aggregateOutputRoutes = require("./out_put/aggregate_output/routes");
const listColorRoutes = require("./list/color/routes");
const listDetailRoutes = require("./list/detail/routes");
const listProductRoutes = require("./list/product/routes");
const listKindProductRoutes = require("./list/product/kind/routes");
const listTypeProductRoutes = require("./list/product/type/routes");
const listSizeRoutes = require("./list/size/routes");
const listUnitRoutes = require("./list/unit/routes");
const productColorRoutes = require("./procduct/color/routes");
const productDetailRoutes = require("./procduct/detail/routes");
const productSizeRoutes = require("./procduct/size/routes");
const orderHRoutes = require("./orders/H/routes");
const orderLRoutes = require("./orders/L/routes");
const positionRoutes = require("./positions/routes");
const detailedProductStatisticRoutes = require("./statistic/detailed_product/routes");
const OAAPSStatisticRoutes = require("./statistic/o.a.a.p.s/routes");

const router = express.Router();

router.use("/login", authenticationRoutes);
router.use("/detailedQuantityTableRoutes", detailedQuantityTableRoutes);
router.use("/customer", customerRoutes);
router.use("/department", departmentRoutes);
router.use("/employee", employeeRoutes);
router.use("/employee/salary", salaryEmployeesRoutes);
router.use("/accordingToProduct/color", colorAccordingToProductRoutes);
router.use("/accordingToProduct/detail", detailAccordingToProductRoutes);
router.use("/accordingToProduct/size", sizeAccordingToProductRoutes);
router.use(
  "/displayEmployeesByOutputStatus",
  displayEmployeesByOutputStatusRoutes
);
router.use("/lockOrOpenOutput", lockOrOpenOutputRoutes);
router.use("/productionAssignment", productionAssignmentRoutes);
router.use("/productQuantityTable", productQuantityTableRoutes);
router.use("/updateOutput", updateOutputRoutes);
router.use("/aggregateOutput", aggregateOutputRoutes);
router.use("/list/color", listColorRoutes);
router.use("/list/detail", listDetailRoutes);
router.use("/list/product", listProductRoutes);
router.use("/list/kindProduct", listKindProductRoutes);
router.use("/list/typeProduct", listTypeProductRoutes);
router.use("/list/size", listSizeRoutes);
router.use("/list/unit", listUnitRoutes);
router.use("/product/color", productColorRoutes);
router.use("/product/detail", productDetailRoutes);
router.use("/product/size", productSizeRoutes);
router.use("/order/H", orderHRoutes);
router.use("/order/L", orderLRoutes);
router.use("/position", positionRoutes);
router.use("/statistic/detaledProduct", detailedProductStatisticRoutes);
router.use("/statistic/oaaps", OAAPSStatisticRoutes);

module.exports = router;
