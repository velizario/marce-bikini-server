"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
const cartsRouter_1 = __importDefault(require("./routes/cartsRouter"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const helmet_1 = __importDefault(require("helmet"));
exports.app = (0, express_1.default)();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // Security http headers
        exports.app.use((0, helmet_1.default)());
        exports.app.use((0, morgan_1.default)("dev"));
        // app.use("/", express.static(path.join(__dirname, "../public")));
        exports.app.use(express_1.default.json()); //middleware to handle incoming request data i.e. data from  the body is added to the 'req' object argument. This way req.body is available as object
        // Additional middleware which will set headers that we need on each request.
        exports.app.use(function (req, res, next) {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
            res.setHeader("Access-Control-Max-Age", 3600); // 1 hour
            // Disable caching so we'll always get the latest posts.
            res.setHeader("Cache-Control", "no-cache");
            next();
        });
        // Products router
        // app.use("/api/v1/products", productsRouter);
        // Users Router
        exports.app.use("/api/v1/users", usersRouter_1.default);
        // Carts Router
        exports.app.use("/api/v1/carts", cartsRouter_1.default);
        exports.app.all("*", (req, res, next) => {
            next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
        });
        exports.app.use(errorController_1.default);
        // Defines Route for HTTP method 'get' and for path '/products'. Gets all products
        // app.get("/api/v1/products", getAllProducts);
        // Defines Route for HTTP method 'get' and for path '/products/:id'. Gets single product
        // app.get("/api/v1/products/:id", getSingleProduct);
        // Defines Route for HTTP method 'post' and for path '/api/v1/products'. Creates new product
        // app.post("/api/v1/products", createProduct);
        // Defines Route for HTTP method 'patch' and for path '/api/v1/products'. Updates existing product
        // app.patch("/api/v1/products/:id", updateProduct);
    });
}
start();
