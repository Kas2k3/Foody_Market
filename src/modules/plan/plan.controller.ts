import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Query,
  Body,
  Param,
  Req,
  UseGuards,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';

@Controller('meal')
export class PlanController {
  constructor(private readonly planService: PlanService) { }

  // Get all meal plans
  @Get()
  @UseGuards(JwtAuthGuard)
  async getMealPlanByDate(@Query('date') date: string) {
    return this.planService.findPlansByDate(date);
  }

  // Create a meal plan
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPlan(@Body() createPlanDto: CreatePlanDto, @Req() request: any) {
    const userIdCreate = request.user.id;
    return this.planService.createPlan(createPlanDto, userIdCreate);
  }

  // Update a meal plan
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePlan(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return this.planService.updatePlan(id, updatePlanDto);
  }

  // Delete a meal plan
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removePlan(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    return this.planService.removePlan(id);
  }
}
