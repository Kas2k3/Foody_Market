import 'package:flutter/material.dart';
import 'package:food_market_ui/screens/welcome_screen.dart';
import 'package:food_market_ui/services/user_service.dart';
import 'package:food_market_ui/widgets/food_card.dart';

import 'models/user.dart';

void main() async {
  UserService userService = UserService();

  String email = 'phuochavinh@gmail.com';
  String password = '123456789';

  User? user = await userService.login(email, password);

  if (user != null) {
    print("Đăng nhập thành công: ${user.accessToken}");
  } else {
    print("Đăng nhập thất bại.");
  }

  // runApp(
  //     const SafeArea(
  //         child: FoodyMartApp(),
  //     )
  // );
}

class FoodyMartApp extends StatelessWidget {
  const FoodyMartApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: //WelcomeScreen(),
      Scaffold(
        body: Center(
          child: FoodCard(title: 'Cà chua', subtitle: 'So luong con lai: 5 quả', image: 'assets/images/cabbage.png'),
        )
      )
    );
  }
}