import 'package:flutter/material.dart';
import 'package:food_market_ui/widgets/CardItem.dart';

class HorizontalCardList extends StatelessWidget {
  final String title; // Tiêu đề của phần danh sách
  final List<CardItem> cardItems; // Danh sách các CardItem

  // Constructor nhận vào tiêu đề và danh sách CardItem
  const HorizontalCardList({
    super.key,
    required this.title,
    required this.cardItems,
  });

  @override
  Widget build(BuildContext context) {
    return Card( // Sử dụng Card để tạo hiệu ứng đổ bóng cho cả khối
      elevation: 5, // Đặt độ cao của bóng
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10), // Tạo góc bo tròn cho Card
      ),
      margin: const EdgeInsets.all(10), // Khoảng cách bên ngoài của Card
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style:const TextStyle(
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFFFF3700),
                  ),
                ),
                const Text(
                  '>> Xem tất cả',
                  style: TextStyle(
                    fontSize: 10,
                    fontFamily: 'Roboto',
                    fontStyle: FontStyle.italic,
                    color: Color(0xFF029BD3),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          SizedBox(
            height: 140,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 10), // Khoảng cách ở đầu và cuối danh sách
              itemCount: cardItems.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(top: 10, bottom: 10), // Thêm khoảng cách trên và dưới của mỗi card
                  child: cardItems[index],
                );
              },
              separatorBuilder: (context, index) => const SizedBox(width: 30), // Khoảng cách giữa các `CardItem`
            ),
          ),
        ],
      ),
    );
  }
}
