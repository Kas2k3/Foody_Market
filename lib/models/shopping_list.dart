class ShoppingList {
  int id;
  String name;
  String note;
  int belongsToGroupAdminId;
  int assignedToUserId;
  String date;
  String createAt;
  String updateAt;
  int userId;
  String username;
  List<String> details;

  ShoppingList({
    required this.id,
    required this.name,
    required this.note,
    required this.belongsToGroupAdminId,
    required this.assignedToUserId,
    required this.date,
    required this.createAt,
    required this.updateAt,
    required this.userId,
    required this.username,
    required this.details,
  });

  factory ShoppingList.fromJson(Map<String, dynamic> json) {
    return ShoppingList(
        id: json['id'],
        name: json['name'],
        note: json['note'],
        belongsToGroupAdminId: json['belongsToGroupAdminId'],
        assignedToUserId: json['assignedToUserId'],
        date: json['date'],
        createAt: json['createAt'],
        updateAt: json['updateAt'],
        userId: json['UserId'],
        username: json['username'],
        details: json['details']
    );
  }
}