import 'package:flutter/material.dart';

class CardItem extends StatelessWidget {

  final String imagePath;
  final String titleName;

  const CardItem({super.key, required this.imagePath, required this.titleName});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 98,
      height: 114,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(5),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 3,
            blurRadius: 10,
            offset: const Offset(0,3),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 5),
        child: Column(
         children: [
            Image.asset(
              imagePath,
              height: 78,
            ),
           const SizedBox(height: 5),
           Text (
             titleName,
               textAlign: TextAlign.center,
             style:const TextStyle(
               fontSize: 10,
               fontFamily: 'Roboto',
               fontWeight: FontWeight.normal,
               color: Colors.black,

             )
           )

         ],
        )
      )
    );
  }
}