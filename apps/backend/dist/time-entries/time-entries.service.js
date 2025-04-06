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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeEntriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TimeEntriesService = class TimeEntriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        return this.prisma.timeEntry.create({
            data: {
                userId: createDto.userId,
                clientId: createDto.clientId,
                projectId: createDto.projectId,
                taskId: createDto.taskId,
                duration: createDto.duration,
                notes: createDto.notes,
                date: createDto.date,
            },
        });
    }
    async findAll() {
        return this.prisma.timeEntry.findMany();
    }
    async findOne(id) {
        const entry = await this.prisma.timeEntry.findUnique({
            where: { id },
        });
        if (!entry)
            throw new common_1.NotFoundException(`TimeEntry ${id} not found`);
        return entry;
    }
    async update(id, updateDto) {
        return this.prisma.timeEntry.update({
            where: { id },
            data: {
                userId: updateDto.userId,
                clientId: updateDto.clientId,
                projectId: updateDto.projectId,
                taskId: updateDto.taskId,
                duration: updateDto.duration,
                notes: updateDto.notes,
                date: updateDto.date,
            },
        });
    }
    async remove(id) {
        return this.prisma.timeEntry.delete({
            where: { id },
        });
    }
};
exports.TimeEntriesService = TimeEntriesService;
exports.TimeEntriesService = TimeEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimeEntriesService);
//# sourceMappingURL=time-entries.service.js.map