import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { FridgeItemService } from '@/modules/fridge/fridge.service';
import { CreateFridgeItemDto } from '@/modules/fridge/dto/create-fridge.dto';
import { UpdateFridgeItemDto } from '@/modules/fridge/dto/update-fridge.dto';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';

@Controller('fridge')
export class FridgeItemController {
  constructor(private readonly fridgeItemService: FridgeItemService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createFridgeItem(
    @Body() createFridgeItemDto: CreateFridgeItemDto,
    @Req() request: any,
  ) {
    const userId = request.user._id;
    return this.fridgeItemService.createFridgeItem(createFridgeItemDto, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async UpdateFridgeItemDto(
    @Param('id') id: string,
    @Body() updateFridgeItemDto: UpdateFridgeItemDto,
  ) {
    return this.fridgeItemService.updateFridgeItem(updateFridgeItemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.fridgeItemService.removeFridgeItem(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.fridgeItemService.findAllFridgeItem(query, +current, +pageSize);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getSpecificItem(@Param('id') id: string) {
    return await this.fridgeItemService.getSpecificItem(id);
  }
}
