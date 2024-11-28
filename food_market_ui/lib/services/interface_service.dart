abstract class Service<Input, Output> {
  Future<Output> post(Input input);
}
