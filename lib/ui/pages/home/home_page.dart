import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../../gen/assets.gen.dart';
import '../me/me_page.dart';
import '../schedule/schedule_page.dart';
import '../shopping/shopping_page.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 0;

  final List<Widget> _pages = [
    HomeContent(),     // Main content of the Home page
    ShoppingPage(),    // Shopping page
    SchedulePage(),    // Schedule page
    MePage(),          // Me page
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Foody Mart',
          style: TextStyle(
            color: Colors.white,
            fontSize: 36,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {
              // Notification action
            },
          ),
        ],
        backgroundColor: const Color(0xFFBF4E19),
      ),
      body: _pages[_currentIndex], // Show the selected page
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
            icon: SvgPicture.asset(Assets.icons.icHome),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: SvgPicture.asset(Assets.icons.icShoppingCart),
            label: 'Shopping',
          ),
          BottomNavigationBarItem(
            icon: SvgPicture.asset(Assets.icons.icSchedule),
            label: 'Schedule',
          ),
          BottomNavigationBarItem(
            icon: SvgPicture.asset(Assets.icons.icUser),
            label: 'Me',
          ),
        ],
        currentIndex: _currentIndex, // Highlight the current page
        selectedItemColor: Colors.orange,
        unselectedItemColor: Colors.grey,
        onTap: (index) {
          setState(() {
            _currentIndex = index; // Update the selected page index
          });
        },
      ),
    );
  }
}

class HomeContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Section(
            title: 'Thực phẩm gần đây',
            items: ['Item 1', 'Item 2', 'Item 3'],
          ),
          Section(
            title: 'Hôm nay ăn gì?',
            items: ['Item 4', 'Item 5', 'Item 6'],
          ),
          Section(
            title: 'Công thức nấu ăn',
            items: ['Item 7', 'Item 8', 'Item 9'],
          ),
          ShoppingSection(),
        ],
      ),
    );
  }
}

class Section extends StatelessWidget {
  final String title;
  final List<String> items;

  const Section({required this.title, required this.items});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(
                  color: Color(0xFFFF3700),
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              TextButton(
                onPressed: () {
                  // Action for "See All"
                },
                child: const Text(
                  '>> Xem tất cả',
                  style: TextStyle(color: Colors.blue),
                ),
              ),
            ],
          ),
          Container(
            height: 120, // Height of the section's horizontal list
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: items.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: Card(
                    child: Container(
                      width: 100,
                      child: Column(
                        children: [
                          Expanded(
                            child: Image.network(
                              'https://via.placeholder.com/100',
                              fit: BoxFit.cover,
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(
                              items[index],
                              style: const TextStyle(fontSize: 12),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class ShoppingSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Thực phẩm cần mua',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          ListTile(
            leading: Image.network('https://via.placeholder.com/50'),
            title: const Text('Cải thảo/ Cải bao'),
            subtitle: const Text('Số lượng: 2 bắp'),
          ),
        ],
      ),
    );
  }
}
