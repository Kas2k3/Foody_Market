import 'food.dart';

class Recipe {
  int id;
  String name;
  String description;
  String htmlContent;
  String createAt;
  String updateAt;
  Food food;

  Recipe({
    required this.id,
    required this.name,
    required this.description,
    required this.htmlContent,
    required this.createAt,
    required this.updateAt,
    required this.food
  });

  factory Recipe.fromJson(Map<String, dynamic> json) {
    return Recipe(
        id: json['id'],
        name: json['name'],
        description: json['description'],
        htmlContent: json['htmlContent'],
        createAt: json['createAt'],
        updateAt: json['updateAt'],
        food: Food.fromJson(json['food'])
    );
  }
}