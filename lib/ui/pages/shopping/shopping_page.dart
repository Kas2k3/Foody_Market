import 'package:flutter/material.dart';

import '../../../services/shopping_api_service.dart';

class ShoppingPage extends StatefulWidget {
  @override
  _ShoppingPageState createState() => _ShoppingPageState();
}

class _ShoppingPageState extends State<ShoppingPage> {
  final List<Map<String, String>> shoppingItems = [
    {'name': 'Cải thảo', 'quantity': '2 bắp'},
    {'name': 'Cà chua', 'quantity': '1 kg'},
    {'name': 'Thịt bò', 'quantity': '500g'},
  ];

  final List<Map<String, String>> availableItems = [
    {'name': 'Cải thảo', 'quantity': '2 bắp'},
    {'name': 'Cà chua', 'quantity': '1 kg'},
    {'name': 'Thịt bò', 'quantity': '500g'},
    {'name': 'Hành lá', 'quantity': '200g'},
    {'name': 'Ớt chuông', 'quantity': '1 kg'},
  ];

  final TextEditingController _searchController = TextEditingController();
  List<Map<String, String>> filteredItems = [];

  bool isSearching = false;

  @override
  void initState() {
    super.initState();
    filteredItems = availableItems; // Hiển thị tất cả item ban đầu
  }

  void _addItem(Map<String, String> item) {
    setState(() {
      shoppingItems.add(item);
    });
  }

  void _removeItem(int index) {
    setState(() {
      shoppingItems.removeAt(index);
    });
  }

  void _startSearch() {
    setState(() {
      isSearching = true;
    });
  }

  void _stopSearch() {
    setState(() {
      isSearching = false;
      filteredItems = availableItems; // Reset danh sách tìm kiếm
      _searchController.clear();
    });
  }

  void _search(String query) {
    setState(() {
      filteredItems = availableItems
          .where((item) =>
          item['name']!.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: isSearching
            ? TextField(
          controller: _searchController,
          autofocus: true,
          decoration: InputDecoration(
            hintText: 'Tìm thực phẩm...',
            border: InputBorder.none,
            hintStyle: TextStyle(color: Colors.white70),
          ),
          style: TextStyle(color: Colors.white),
          onChanged: _search,
        )
            : Text(
          'Danh Sách Mua Sắm',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Color(0xFFBF4E19),
        actions: [
          if (!isSearching)
            IconButton(
              icon: Icon(Icons.search),
              onPressed: _startSearch,
            )
          else
            IconButton(
              icon: Icon(Icons.close),
              onPressed: _stopSearch,
            ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(8.0),
        itemCount: shoppingItems.length,
        itemBuilder: (context, index) {
          final item = shoppingItems[index];
          return Card(
            elevation: 4,
            margin: const EdgeInsets.only(bottom: 12),
            child: ListTile(
              // leading: Image.network('https://via.placeholder.com/50'),
              title: Text(item['name']!),
              subtitle: Text('Số lượng: ${item['quantity']}'),
              trailing: IconButton(
                icon: Icon(Icons.delete, color: Colors.red),
                onPressed: () => _removeItem(index),
              ),
            ),
          );
        },
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: () => _showCreateFoodDialog(context),
            backgroundColor: Colors.green,
            heroTag: 'createFood',
            child: Icon(Icons.create, color: Colors.white),
          ),
          SizedBox(width: 16),
          FloatingActionButton(
            onPressed: () => _showSearchDialog(context),
            backgroundColor: Colors.orange,
            heroTag: 'searchFood',
            child: Icon(Icons.add, color: Colors.white),
          ),
        ],
      ),
    );
  }

  void _showSearchDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Container(
              height: MediaQuery.of(context).size.height * 0.6,
              padding: EdgeInsets.all(8.0),
              child: Column(
                children: [
                  TextField(
                    decoration: InputDecoration(
                      labelText: 'Tìm thực phẩm',
                      border: OutlineInputBorder(),
                    ),
                    onChanged: (value) {
                      setState(() {
                        filteredItems = availableItems
                            .where((item) => item['name']!
                            .toLowerCase()
                            .contains(value.toLowerCase()))
                            .toList();
                      });
                    },
                  ),
                  Expanded(
                    child: ListView.builder(
                      itemCount: filteredItems.length,
                      itemBuilder: (context, index) {
                        final item = filteredItems[index];
                        return ListTile(
                          leading: Icon(Icons.food_bank),
                          title: Text(item['name']!),
                          subtitle: Text('Số lượng: ${item['quantity']}'),
                          onTap: () {
                            _addItem(item);
                            Navigator.pop(context);
                          },
                        );
                      },
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  void _showCreateFoodDialog(BuildContext context) {
    final nameController = TextEditingController();
    final categoryController = TextEditingController();
    final unitController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Tạo thực phẩm mới'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Tên thực phẩm'),
            ),
            TextField(
              controller: categoryController,
              decoration: InputDecoration(labelText: 'Danh mục'),
            ),
            TextField(
              controller: unitController,
              decoration: InputDecoration(labelText: 'Đơn vị'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Hủy'),
          ),
          TextButton(
            onPressed: () async {
              print('Bắt đầu tạo thức ăn mới');
              print('Tên: ${nameController.text}');
              print('Danh mục: ${categoryController.text}');
              print('Đơn vị: ${unitController.text}');
              final apiService = ShoppingApiService();
              final result = await apiService.createFood(
                name: nameController.text,
                category: categoryController.text,
                unit: unitController.text,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhdmluaHBodW9jQGdtYWlsLmNvbSIsInN1YiI6IjY3MGZlZjhkNmVmNjlhMDM3MWQ5MjUzNiIsImlhdCI6MTczMjgxMzc1OSwiZXhwIjoxNzY0MzQ5NzU5fQ.WqsBMbvmQrkGQQZTOo5LYY-1fCGyuIEmrYojlQ6brOc'
              );

              if (result != null) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Tạo thực phẩm thành công!')),
                );
                Navigator.pop(context);
              } else {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Có lỗi xảy ra khi tạo thực phẩm')),
                );
              }
            },
            child: Text('Tạo'),
          ),
        ],
      ),
    );
  }
}
