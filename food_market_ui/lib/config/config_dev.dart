import 'package:flutter/material.dart';

@immutable
class Configuration {
  static const String baseUrl = "localhost:8080/it4788";
  static const bool useMockData = false;
  static const bool logging = true;
  static const int defaultTimeOut = 5;  // In Seconds
}