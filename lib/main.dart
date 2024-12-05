import 'package:flutter/material.dart';
import 'package:foody_mart_prj/ui/pages/home/home_page.dart';
import 'package:foody_mart_prj/ui/pages/login/login_page.dart';

void main() {
  runApp(FoodyMartApp());
}

class FoodyMartApp extends StatelessWidget {
  const FoodyMartApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Foody Mart',
      theme: ThemeData(
        primaryColor: Colors.orange,
      ),
      home: HomePage(),
    );
  }
}
