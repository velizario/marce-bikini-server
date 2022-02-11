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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
class MongoRepository {
    constructor(model) {
        this.model = model;
    }
    add(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDoc = yield this.model.create(document);
            return newDoc;
        });
    }
    edit(id, document) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDoc = yield this.model.findByIdAndUpdate(id, document, {
                new: true,
                runValidators: true,
            });
            return updatedDoc;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndDelete(id);
        });
    }
    findAll(reqObj) {
        return __awaiter(this, void 0, void 0, function* () {
            // Build query
            // 1) Remove special conditions. Not mandatory in latest version?
            const _a = Object.assign({}, reqObj), { page, sort, limit, fields } = _a, queryObj = __rest(_a, ["page", "sort", "limit", "fields"]);
            // 2) Finding
            // fix searches for queries, containing gte|gt|lte|lt (adds to the search string $ in front of these conditions)
            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
            let query = this.model.find(JSON.parse(queryStr));
            // 3) Sorting
            if (reqObj.sort) {
                const sortBy = reqObj.sort.replace(",", " ").concat(" _id");
                query = query.sort(sortBy);
            }
            else {
                query = query.sort("firstName _id");
            }
            // 4) Field Limiting
            if (reqObj.fields) {
                const fields = reqObj.fields.replace(",", " ");
                query = query.select(fields);
            }
            else {
                query.select("-__v");
            }
            // 5) Pagination
            if (reqObj.page && reqObj.limit) {
                const page = Number(reqObj.page) || 1;
                const limit = Number(reqObj.limit) || 100;
                const skip = (page - 1) * limit;
                query = query.skip(skip).limit(limit);
                const numDocs = yield this.model.countDocuments();
                if (skip >= numDocs)
                    throw new Error("This page does not exist");
            }
            // execute query
            const data = yield query;
            return data;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.model.findById(id).lean();
            return data;
        });
    }
    getCount() {
        throw new Error("Method not implemented.");
    }
}
exports.MongoRepository = MongoRepository;
