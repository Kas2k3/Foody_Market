import '../../models/food.dart';

abstract class FoodState {
  const FoodState();
}

class FoodInitialState extends FoodState {
  final List<Food> listFood;
  FoodInitialState({required this.listFood});
}

