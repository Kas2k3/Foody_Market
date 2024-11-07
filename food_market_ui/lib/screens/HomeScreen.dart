import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0; // Biến để lưu chỉ số tab đang được chọn

  // Danh sách các màn hình hoặc widget cho từng tab
  final List<Widget> _screens = [
    const Center(child: Text("Home Screen")),
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
            fontFamily: 'Regular',
            fontWeight: FontWeight.bold,
            fontSize: 36,
          )
        ),
        backgroundColor: const Color(0xFFBF4E19),
        actions: [
          IconButton(
            icon: const Icon(
              Icons.notifications,
              size: 40,
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
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.schedule),
            label: 'Schedule',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: 'Me',
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
