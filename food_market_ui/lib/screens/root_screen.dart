import 'package:flutter/material.dart';

import 'home_screen.dart';

class RootScreen extends StatefulWidget {
  const RootScreen({super.key});

  @override
  _RootScreenState createState() => _RootScreenState();
}

class _RootScreenState extends State<RootScreen> {
  int _currentIndex = 0; // Biến để lưu chỉ số tab đang được chọn

  // Danh sách các màn hình hoặc widget cho từng tab
  final List<Widget> _screens = [
    const Center(child: HomeScreen()),
    const Center(child: Text("Shopping Screen")),
    const Center(child: Text("Schedule Screen")),
    const Center(child: Text("Me Screen")),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold (
      appBar: AppBar(
        title: const Text(
          'Foody Mart',
          style: TextStyle(
            color: Colors.white,
            fontFamily: 'Roboto',
            fontWeight: FontWeight.bold,
            fontSize: 36,
          )
        ),
        elevation: 10,
        flexibleSpace: ClipRRect(
          borderRadius: const BorderRadius.vertical(
            bottom: Radius.circular(10.0), // Đặt bán kính bo tròn cho phần đáy
          ),
          child: Container(
            color: const Color(0xFFBF4E19), // Màu nền cho AppBar
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(
              Icons.notifications,
              size: 40,
              color: Colors.white,
            ),
            onPressed: () {},
          ),
        ],
          toolbarHeight: 100,
      ),
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        iconSize: 40,
        elevation: 5,
        type: BottomNavigationBarType.shifting,
        currentIndex: _currentIndex,
        //backgroundColor: const Color(0xFFFEC543),
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.black,

        items: const <BottomNavigationBarItem> [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
            backgroundColor: Color(0xFFFEC543),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart),
            label: 'Shopping',
            backgroundColor: Color(0xFFFEC543),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_today),
            label: 'Schedule',
            backgroundColor: Color(0xFFFEC543),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: 'Me',
            backgroundColor: Color(0xFFFEC543),
          ),
        ],

        onTap: (index) {
          setState(() {
            _currentIndex = index; // Cập nhật chỉ số tab khi người dùng chọn
          });
        },
      ),

    );
  }

}
