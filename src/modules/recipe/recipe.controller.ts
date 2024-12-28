import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Query,
    UseGuards,
    BadRequestException,
  } from '@nestjs/common';
  import { RecipeService } from './recipe.service';
  import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
  import { CreateRecipeDto } from './dto/create-recipe.dto';
  import { UpdateRecipeDto } from './dto/update-recipe.dto';
  
  @Controller('recipe')
  @UseGuards(JwtAuthGuard)
  export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}
  
    // 1. Create recipe
    @Post()
    async createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
      return this.recipeService.createRecipe(createRecipeDto);
    }
  
    // 2. Update recipe
    @Put()
    async updateRecipe(@Body() updateRecipeDto: UpdateRecipeDto) {
      const { recipeId } = updateRecipeDto;
      if (!recipeId) {
        throw new BadRequestException('Recipe ID is required.');
      }
      return this.recipeService.updateRecipe(updateRecipeDto);
    }
  
    // 3. Delete recipe
    @Delete()
    async deleteRecipe(@Body() body: { recipeId: string }) {
      const { recipeId } = body;
      if (!recipeId) {
        throw new BadRequestException('Recipe ID is required.');
      }
      return this.recipeService.removeRecipe(recipeId);
    }
  
    // 4. Get recipes by food ID
    @Get()
    async getRecipesByFoodId(@Query('foodId') foodId: string) {
      if (!foodId) {
        throw new BadRequestException('Food ID is required.');
      }
      return this.recipeService.getRecipesByFoodId(foodId);
    }


    @Get('all')
    async getAllRecipes() {
      return this.recipeService.getAllRecipes();
    }
  }
  