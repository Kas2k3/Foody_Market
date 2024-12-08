import 'dart:convert';

import '../models/user.dart';

import 'package:http/http.dart' as http;

class LoginRepository {

  Future<User?> login(String email, String password) async {
    final uri = Uri.parse("http://localhost:8080/it4788/auth/login");
    try {
      final response = await http.post(
        uri,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: {
          'email': email,
          'password': password
        },
      );

      if(response.statusCode == 201) {
        final Map<String, dynamic> bodyContent = json.decode(response.body);
        if (bodyContent['resultCode'] == '00047') {
          return User.fromJson(bodyContent);
        } else {
          print("Failed to login: ${bodyContent['resultMessage']['en']}");
        }
      }

      else {
        print("The request failed with an encoding error: ${response.statusCode}");
      }
    }

    catch (e) {
      throw Exception('Failed to connect to server $e');
    }
    return null;
  }
}