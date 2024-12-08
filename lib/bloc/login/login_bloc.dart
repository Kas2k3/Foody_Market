import 'package:flutter_bloc/flutter_bloc.dart';

import '../../repository/login_repository.dart';
import '../../utils/secure_storage.dart';
import 'login_event.dart';
import 'login_state.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final LoginRepository _loginRepository;

  LoginBloc({
    required LoginRepository loginRepository,
  })  : _loginRepository = loginRepository,
        super(const LoginInitial()) {
    on<LoginSubmitted>(_onLoginSubmitted);
  }

  Future<void> _onLoginSubmitted(
      LoginSubmitted event,
      Emitter<LoginState> emit,
      ) async {
    try {
      emit(const LoginLoading());

      final user = await _loginRepository.login(
        event.email,
        event.password,
      );

      // Save tokens to secure storage
      await SecureStorage.setAccessToken(user!.accessToken);
      await SecureStorage.setRefreshToken(user!.refreshToken);

      emit(LoginSuccess(user!));
    } catch (error) {
      emit(LoginFailure(error.toString()));
    }
  }
}