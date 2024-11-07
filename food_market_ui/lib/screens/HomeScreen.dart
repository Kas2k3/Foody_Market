import 'package:flutter/material.dart';

import '../widgets/CardItem.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: CardItem(imagePath: 'assets/images/fried_eggs.png', titleName: "Trứng chiên mắm nước"),
    );
  }
}