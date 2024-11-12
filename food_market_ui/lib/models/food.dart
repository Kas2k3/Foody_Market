class Food {
  int id;
  String name;
  String imageUrl;
  String type;
  String createAt;
  String updateAt;
  int foodCategoryId;
  String foodCategory;
  int userId;
  int unitOfMeasurementId;
  String unitOfMeasurement;

  Food({
    required this.id,
    required this.name,
    required this.imageUrl,
    required this.type,
    required this.createAt,
    required this.updateAt,
    required this.foodCategoryId,
    required this.foodCategory,
    required this.userId,
    required this.unitOfMeasurementId,
    required this.unitOfMeasurement,
  });

  factory Food.fromJson(Map<String, dynamic> json) {
    return Food(
      id: json['id'],
      name: json['name'],
      imageUrl: json['imageUrl'],
      type: json['type'],
      createAt: json['createAt'],
      updateAt: json['updateAt'],
      foodCategoryId: json['FoodCategoryId'],
      foodCategory: json['FoodCategory']['name'],
      userId: json['UserId'],
      unitOfMeasurementId: json['UnitOfMeasurementId'],
      unitOfMeasurement: json['UnitOfMeasurement']['unitName']
    );
  }

}
