import 'package:flutter/material.dart';
import 'package:food_market_ui/widgets/CardList.dart';
import '../widgets/CardItem.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView( // Bọc toàn bộ nội dung trong SingleChildScrollView để có thể kéo xuống
      child: Column(
        children: [
          Center(
            child: HorizontalCardList(
              title: 'Thực phẩm gần đây',
              cardItems: const [
                CardItem(imagePath: 'assets/images/fried_eggs.png', titleName: 'Trứng chiên nước mắm'),
                CardItem(imagePath: 'assets/images/fried_eggs.png', titleName: 'Trứng chiên nước mắm'),
                CardItem(imagePath: 'assets/images/fried_eggs.png', titleName: 'Trứng chiên nước mắm'),
                CardItem(imagePath: 'assets/images/fried_eggs.png', titleName: 'Trứng chiên nước mắm'),
                CardItem(imagePath: 'assets/images/fried_eggs.png', titleName: 'Trứng chiên nước mắm'),
              ],
            ),
          ),
          Center(
            child: HorizontalCardList(
              title: 'Hôm nay ăn gì?',
              cardItems: const [
                CardItem(imagePath: 'assets/images/meat.png', titleName: 'Cơm tấm/Cơm sườn'),
                CardItem(imagePath: 'assets/images/meat.png', titleName: 'Cơm tấm/Cơm sườn'),
                CardItem(imagePath: 'assets/images/meat.png', titleName: 'Cơm tấm/Cơm sườn'),
                CardItem(imagePath: 'assets/images/meat.png', titleName: 'Cơm tấm/Cơm sườn'),
                CardItem(imagePath: 'assets/images/meat.png', titleName: 'Cơm tấm/Cơm sườn'),
              ],
            ),
          ),
          Center(
            child: HorizontalCardList(
              title: 'Công thức nấu ăn',
              cardItems: const [
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
              ],
            ),
          ),
          Center(
            child: HorizontalCardList(
              title: 'Công thức nấu ăn',
              cardItems: const [
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
                CardItem(imagePath: 'assets/images/onion.png', titleName: 'Lòng xào gà mướp'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
