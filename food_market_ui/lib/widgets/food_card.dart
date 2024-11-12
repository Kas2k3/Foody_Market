import 'package:flutter/material.dart';

class FoodCard extends StatelessWidget {
  final String image;
  final String title;
  final String subtitle;
  const FoodCard({super.key, required this.image, required this.title, required this.subtitle});
  @override
  Widget build(BuildContext context) {
    return Container(
      child: ListTile(
        leading: Image.asset(image),
        title: Text(
          title,
          style: const TextStyle(
            color: Colors.black,
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: FontWeight.bold,
          )
        ),

        subtitle: Text(
          subtitle,
          style: const TextStyle(
            color: Colors.black,
            fontFamily: 'Roboto',
            fontSize: 12,
            fontWeight: FontWeight.normal,
          )
        ),
      ),
    );
  }

}
