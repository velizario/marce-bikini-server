"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => (0, process_1.nextTick)(err));
    };
};
