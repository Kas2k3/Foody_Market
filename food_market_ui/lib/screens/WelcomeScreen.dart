import 'package:flutter/material.dart';
import 'package:food_market_ui/screens/HomeScreen.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold (
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration:const  BoxDecoration (
          image: DecorationImage(
            image: AssetImage('assets/images/welcome.png'),
            fit: BoxFit.cover
          ),
        ),
        child:Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Spacer(),
            Padding (
                padding: const EdgeInsets.only(bottom: 60),
                child: SizedBox(
                  width: 225,
                  height: 52,
                  child: ElevatedButton(
                      onPressed: () {
                        // Điều hướng đến màn hình Home khi người dùng nhấn nút
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => HomeScreen()),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFBF4E19), // Mã màu cho button
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(80), // Bo góc cho nút
                        ),
                      ),

                  child:const Text(
                    'LOGIN NOW!',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Roboto'
                    )
                  )
                  )
                ),
            ),
          ],
        )
      )
    );
  }

}