import 'package:flutter/material.dart';
import 'package:food_market_ui/screens/WelcomeScreen.dart';

void main() {
  runApp(
      const SafeArea(
          child: FoodyMartApp(),
      )
  );
}

class FoodyMartApp extends StatelessWidget {
  const FoodyMartApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: WelcomeScreen(),
    );
  }
}