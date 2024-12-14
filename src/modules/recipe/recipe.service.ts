import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FoodService } from '../food/food.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    private readonly foodService: FoodService, // Inject FoodService
  ) {}

  // Create a recipe
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<any> {
    const { name, description, htmlContent, foodName } = createRecipeDto;

    // Find foodId by foodName
    const foodId = await this.foodService.getFoodIdByName(foodName);

    const createdRecipe = new this.recipeModel({
      name,
      description,
      htmlContent,
      foodId,
    });
    await createdRecipe.save();

    return {
      resultMessage: {
        en: 'Add recipe successful',
        vn: 'Thêm công thức nấu ăn thành công',
      },
      resultCode: '00357',
      newRecipe: createdRecipe,
    };
  }

  // Update a recipe
  async updateRecipe(updateRecipeDto: UpdateRecipeDto): Promise<any> {
    const { recipeId, newName, newDescription, newHtmlContent, newFoodName } =
      updateRecipeDto;

    const recipe = await this.recipeModel.findById(recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found.');
    }

    // Update fields
    if (newName) recipe.name = newName;
    if (newDescription) recipe.description = newDescription;
    if (newHtmlContent) recipe.htmlContent = newHtmlContent;

    // If newFoodName is provided, get foodId
    if (newFoodName) {
      const newFoodId = await this.foodService.getFoodIdByName(newFoodName);
      recipe.foodId = new Types.ObjectId(newFoodId);
    }

    await recipe.save();

    return {
      resultMessage: {
        en: 'Recipe updated successfully.',
        vn: 'Cập nhật công thức nấu ăn thành công',
      },
      resultCode: '00370',
      recipe,
    };
  }

  // Delete a recipe
  async removeRecipe(recipeId: string): Promise<any> {
    const deleted = await this.recipeModel.findByIdAndDelete(recipeId);
    if (!deleted) {
      throw new NotFoundException('Recipe not found.');
    }

    return {
      resultMessage: {
        en: 'Your recipe was deleted successfully.',
        vn: 'Công thức của bạn đã được xóa thành công',
      },
      resultCode: '00376',
    };
  }

  // Get recipes by foodId
  async getRecipesByFoodId(foodId: string): Promise<any> {
    const recipes = await this.recipeModel.find({ foodId }).populate('foodId');

    return {
      resultMessage: {
        en: 'Get recipes successful',
        vn: 'Lấy các công thức thành công',
      },
      resultCode: '00378',
      recipes,
    };
  }
}
