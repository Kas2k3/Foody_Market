import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;

class ShoppingApiService {
  Future<String?> createFood({
    required String name,
    required String category,
    required String unit,
    required String token,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('http://localhost:8080/it4788/food'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({
          'name': name,
          'category': category,
          'unit': unit,
        }),
      );

      print('Response Status Code: ${response.statusCode}');
      print('Response Body: ${response.body}');

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);
        return data['_id']['\$oid'];
      } else {
        print('Error: ${response.statusCode}');
        return null;
      }
    } catch (err) {
      print('Detailed Error: $err');
      return null;
    }
  }
}