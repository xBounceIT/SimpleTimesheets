"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeEntriesController = void 0;
const common_1 = require("@nestjs/common");
const time_entries_service_1 = require("./time-entries.service");
const create_time_entry_dto_1 = require("./dto/create-time-entry.dto");
const update_time_entry_dto_1 = require("./dto/update-time-entry.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
let TimeEntriesController = class TimeEntriesController {
    timeEntriesService;
    constructor(timeEntriesService) {
        this.timeEntriesService = timeEntriesService;
    }
    create(createTimeEntryDto) {
        return this.timeEntriesService.create(createTimeEntryDto);
    }
    findAll() {
        return this.timeEntriesService.findAll();
    }
    findOne(id) {
        return this.timeEntriesService.findOne(+id);
    }
    update(id, updateTimeEntryDto) {
        return this.timeEntriesService.update(+id, updateTimeEntryDto);
    }
    remove(id) {
        return this.timeEntriesService.remove(+id);
    }
};
exports.TimeEntriesController = TimeEntriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_time_entry_dto_1.CreateTimeEntryDto]),
    __metadata("design:returntype", void 0)
], TimeEntriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TimeEntriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimeEntriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_time_entry_dto_1.UpdateTimeEntryDto]),
    __metadata("design:returntype", void 0)
], TimeEntriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TimeEntriesController.prototype, "remove", null);
exports.TimeEntriesController = TimeEntriesController = __decorate([
    (0, roles_decorator_1.Roles)(roles_decorator_1.Role.USER, roles_decorator_1.Role.MANAGER, roles_decorator_1.Role.SUB_MANAGER),
    (0, common_1.Controller)('time-entries'),
    __metadata("design:paramtypes", [time_entries_service_1.TimeEntriesService])
], TimeEntriesController);
//# sourceMappingURL=time-entries.controller.js.map