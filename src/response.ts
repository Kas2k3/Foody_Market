export class ResponseCodeStore {
  private static responseCodes = {
    '00005': {
      en: 'Please provide all required information to send the code.',
      vn: 'Vui lòng cung cấp đầy đủ thông tin để gửi mã.',
    },
    '00006': {
      en: 'Access denied. No token was provided.',
      vn: 'Truy cập bị từ chối. Không có token được cung cấp.',
    },
    '00007': {
      en: 'Invalid user ID.',
      vn: 'ID người dùng không hợp lệ.',
    },
    '00008': {
      en: 'An internal server error has occurred, please try again.',
      vn: 'Đã xảy ra lỗi máy chủ nội bộ, vui lòng thử lại.',
    },
    '00009': {
      en: 'Cannot find a verified user with the provided code and ID. Please ensure that the account has been verified and activated.',
      vn: 'Không thể tìm thấy người dùng đã xác minh với mã và ID được cung cấp. Hãy đảm bảo rằng tài khoản đã được xác minh và kích hoạt.',
    },
    '00011': {
      en: 'Your session has expired, please log in again.',
      vn: 'Phiên của bạn đã hết hạn, vui lòng đăng nhập lại.',
    },
    '00012': {
      en: 'Invalid token. The token may have expired.',
      vn: 'Token không hợp lệ. Token có thể đã hết hạn.',
    },
    '00017': {
      en: 'Access denied. You do not have permission to access.',
      vn: 'Truy cập bị từ chối. Bạn không có quyền truy cập.',
    },
    '00019': {
      en: 'Access denied. You do not have permission to access.',
      vn: 'Truy cập bị từ chối. Bạn không có quyền truy cập.',
    },
    '00021': {
      en: 'Access denied. You do not have permission to access.',
      vn: 'Truy cập bị từ chối. Bạn không có quyền truy cập.',
    },
    '00022': {
      en: 'No ID was provided in the parameter. Please enter an ID.',
      vn: 'Không có ID được cung cấp trong tham số. Vui lòng nhập một ID.',
    },
    '00023': {
      en: 'The provided ID is not a valid object ID.',
      vn: 'ID được cung cấp không phải là một đối tượng ID hợp lệ.',
    },
    '00024': {
      en: 'Too many requests.',
      vn: 'Quá nhiều yêu cầu.',
    },
    '00025': {
      en: 'Please provide all required fields!',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
    },
    '00026': {
      en: 'Please provide a valid email address!',
      vn: 'Vui lòng cung cấp một địa chỉ email hợp lệ!',
    },
    '00027': {
      en: 'Please provide a password longer than 6 characters and shorter than 20 characters.',
      vn: 'Vui lòng cung cấp mật khẩu dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
    },
    '00028': {
      en: 'Please provide a name longer than 3 characters and shorter than 30 characters.',
      vn: 'Vui lòng cung cấp một tên dài hơn 3 ký tự và ngắn hơn 30 ký tự.',
    },
    '00029': {
      en: 'Please provide a valid email address!',
      vn: 'Vui lòng cung cấp một địa chỉ email hợp lệ!',
    },
    '00032': {
      en: 'An account with this email address already exists.',
      vn: 'Một tài khoản với địa chỉ email này đã tồn tại.',
    },
    '00035': {
      en: 'You have successfully registered.',
      vn: 'Bạn đã đăng ký thành công.',
    },
    '00036': {
      en: 'Cannot find an account with this email address.',
      vn: 'Không tìm thấy tài khoản với địa chỉ email này.',
    },
    '00038': {
      en: 'Please provide all required fields!',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
    },
    '00039': {
      en: 'Please provide a valid email address!',
      vn: 'Vui lòng cung cấp một địa chỉ email hợp lệ!',
    },
    '00040': {
      en: 'Please provide a password longer than 6 characters and shorter than 20 characters.',
      vn: 'Vui lòng cung cấp mật khẩu dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
    },
    '00042': {
      en: 'Cannot find an account with this email address.',
      vn: 'Không tìm thấy tài khoản với địa chỉ email này.',
    },
    '00043': {
      en: 'Your email has not been activated, please register first.',
      vn: 'Email của bạn chưa được kích hoạt, vui lòng đăng ký trước.',
    },
    '00044': {
      en: 'Your email has not been verified, please verify your email.',
      vn: 'Email của bạn chưa được xác minh, vui lòng xác minh email của bạn.',
    },
    '00045': {
      en: 'You have entered an invalid email or password.',
      vn: 'Bạn đã nhập một email hoặc mật khẩu không hợp lệ.',
    },
    '00047': {
      en: 'You have logged in successfully.',
      vn: 'Bạn đã đăng nhập thành công.',
    },
    '00048': {
      en: 'The code has been successfully sent to your email.',
      vn: 'Mã đã được gửi đến email của bạn thành công.',
    },
    '00050': {
      en: 'Logged out successfully.',
      vn: 'Đăng xuất thành công.',
    },
    '00052': {
      en: 'Cannot find the user.',
      vn: 'Không thể tìm thấy người dùng.',
    },
    '00053': {
      en: 'Please send a confirmation code.',
      vn: 'Vui lòng gửi một mã xác nhận.',
    },
    '00054': {
      en: 'The code you entered does not match the code we sent to your email. Please check again.',
      vn: 'Mã bạn nhập không khớp với mã chúng tôi đã gửi đến email của bạn. Vui lòng kiểm tra lại.',
    },
    '00055': {
      en: 'Invalid token. The token may have expired.',
      vn: 'Token không hợp lệ. Token có thể đã hết hạn.',
    },
    '00058': {
      en: 'Your email address has been successfully verified.',
      vn: 'Địa chỉ email của bạn đã được xác minh thành công.',
    },
    '00059': {
      en: 'Please provide a refresh token.',
      vn: 'Vui lòng cung cấp token làm mới.',
    },
    '00061': {
      en: 'The provided token does not match the user, please log in.',
      vn: 'Token được cung cấp không khớp với người dùng, vui lòng đăng nhập.',
    },
    '00062': {
      en: 'The token has expired, please log in.',
      vn: 'Token đã hết hạn, vui lòng đăng nhập.',
    },
    '00063': {
      en: 'Cannot verify the token, please log in.',
      vn: 'Không thể xác minh token, vui lòng đăng nhập.',
    },
    '00065': {
      en: 'The token has been successfully refreshed.',
      vn: 'Token đã được làm mới thành công.',
    },
    '00066': {
      en: 'Please provide a password longer than 6 and shorter than 20 characters.',
      vn: 'Vui lòng cung cấp một mật khẩu dài hơn 6 và ngắn hơn 20 ký tự.',
    },
    '00068': {
      en: 'The new password has been successfully created.',
      vn: 'Mật khẩu mới đã được tạo thành công.',
    },
    '00069': {
      en: 'Please provide both old and new passwords longer than 6 characters and shorter than 20 characters.',
      vn: 'Vui lòng cung cấp mật khẩu cũ và mới dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
    },
    '00072': {
      en: 'Your old password does not match the password you entered, please enter the correct password.',
      vn: 'Mật khẩu cũ của bạn không khớp với mật khẩu bạn nhập, vui lòng nhập mật khẩu đúng.',
    },
    '00073': {
      en: 'Your new password should not be the same as the old password, please try a different password.',
      vn: 'Mật khẩu mới của bạn không nên giống với mật khẩu cũ, vui lòng thử một mật khẩu khác.',
    },
    '00076': {
      en: 'Your password has been successfully changed.',
      vn: 'Mật khẩu của bạn đã được thay đổi thành công.',
    },
    '00077': {
      en: 'Please provide a name longer than 3 characters and shorter than 30 characters.',
      vn: 'Vui lòng cung cấp một tên dài hơn 3 ký tự và ngắn hơn 30 ký tự.',
    },
    '00078': {
      en: 'Valid gender options are female-male-other, please provide one of them.',
      vn: 'Các tùy chọn giới tính hợp lệ, female-male-other, vui lòng cung cấp một trong số chúng.',
    },
    '00079': {
      en: 'Valid language options are tr-en, please provide one of them.',
      vn: 'Các tùy chọn ngôn ngữ hợp lệ, tr-en, vui lòng cung cấp một trong số chúng.',
    },
    '00080': {
      en: 'Please provide a valid birth date.',
      vn: 'Vui lòng cung cấp một ngày sinh hợp lệ.',
    },
    '00081': {
      en: 'Please provide a username longer than 3 characters and shorter than 15 characters.',
      vn: 'Vui lòng cung cấp một tên người dùng dài hơn 3 ký tự và ngắn hơn 15 ký tự.',
    },
    '00084': {
      en: 'A user with this username already exists, please enter another one.',
      vn: 'Đã có một người dùng với tên người dùng này, vui lòng nhập tên khác.',
    },
    '00086': {
      en: 'Your profile information has been successfully changed.',
      vn: 'Thông tin hồ sơ của bạn đã được thay đổi thành công.',
    },
    '00089': {
      en: 'User information has been retrieved successfully.',
      vn: 'Thông tin người dùng đã được lấy thành công.',
    },
    '00092': {
      en: 'Your account has been successfully deleted.',
      vn: 'Tài khoản của bạn đã bị xóa thành công.',
    },
    '00093': {
      en: 'Cannot create a group, you are already part of one.',
      vn: 'Không thể tạo nhóm, bạn đã thuộc về một nhóm rồi.',
    },
    '00095': {
      en: 'Group created successfully.',
      vn: 'Tạo nhóm thành công.',
    },
    '00096': {
      en: 'You are not part of any group.',
      vn: 'Bạn không thuộc về nhóm nào.',
    },
    '00098': {
      en: 'Success.',
      vn: 'Thành công.',
    },
    '00099': {
      en: 'This user is already part of a group.',
      vn: 'Người này đã thuộc về một nhóm.',
    },
    '00099x': {
      en: 'This user does not exist.',
      vn: 'Không tồn tại user này.',
    },
    '00100': {
      en: 'Missing username.',
      vn: 'Thiếu username.',
    },
    '00102': {
      en: 'User added to group successfully.',
      vn: 'Người dùng thêm vào nhóm thành công.',
    },
    '00103': {
      en: 'This user is not in any group.',
      vn: 'Người này chưa vào nhóm nào.',
    },
    '00104': {
      en: 'You are not an admin, cannot delete.',
      vn: 'Bạn không phải admin, không thể xóa.',
    },
    '00106': {
      en: 'Deleted successfully.',
      vn: 'Xóa thành công.',
    },
    '00107': {
      en: 'Missing username.',
      vn: 'Thiếu username.',
    },
    '00109': {
      en: 'System log retrieved successfully.',
      vn: 'Lấy log hệ thống thành công.',
    },
    '00110': {
      en: 'Units retrieved successfully.',
      vn: 'Lấy các unit thành công.',
    },
    '00112': {
      en: 'Missing unit name information.',
      vn: 'Thiếu thông tin tên của đơn vị.',
    },
    '00113': {
      en: 'A unit with this name already exists.',
      vn: 'Đã tồn tại đơn vị có tên này.',
    },
    '00114': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00115': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00116': {
      en: 'Unit created successfully.',
      vn: 'Tạo đơn vị thành công.',
    },
    '00117': {
      en: 'Missing old name, new name information.',
      vn: 'Thiếu thông tin name cũ, name mới.',
    },
    '00118': {
      en: 'Old name matches new name.',
      vn: 'Tên cũ trùng với tên mới.',
    },
    '00119': {
      en: 'Cannot find unit with provided name.',
      vn: 'Không tìm thấy đơn vị với tên cung cấp.',
    },
    '00120': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00121': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00122': {
      en: 'Unit modified successfully.',
      vn: 'Sửa đổi đơn vị thành công.',
    },
    '00123': {
      en: 'Missing unit name information.',
      vn: 'Thiếu thông tin tên của đơn vị.',
    },
    '00125': {
      en: 'Cannot find unit with provided name.',
      vn: 'Không tìm thấy đơn vị với tên cung cấp.',
    },
    '00126': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00127': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00128': {
      en: 'Unit deleted successfully.',
      vn: 'Xóa đơn vị thành công.',
    },
    '00129': {
      en: 'Categories retrieved successfully.',
      vn: 'Lấy các category thành công.',
    },
    '00131': {
      en: 'Missing category name information.',
      vn: 'Thiếu thông tin tên của category.',
    },
    '00132': {
      en: 'A category with this name already exists.',
      vn: 'Đã tồn tại category có tên này.',
    },
    '00133': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00134': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00135': {
      en: 'Category created successfully.',
      vn: 'Tạo category thành công.',
    },
    '00136': {
      en: 'Missing old name, new name information.',
      vn: 'Thiếu thông tin name cũ, name mới.',
    },
    '00137': {
      en: 'Old name matches new name.',
      vn: 'Tên cũ trùng với tên mới.',
    },
    '00138': {
      en: 'Cannot find category with provided name.',
      vn: 'Không tìm thấy category với tên cung cấp.',
    },
    '00138x': {
      en: 'New name already exists.',
      vn: 'Tên mới đã tồn tại.',
    },
    '00139': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00140': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00141': {
      en: 'Category modified successfully.',
      vn: 'Sửa đổi category thành công.',
    },
    '00142': {
      en: 'Missing category name information.',
      vn: 'Thiếu thông tin tên của category.',
    },
    '00143': {
      en: 'Cannot find category with provided name.',
      vn: 'Không tìm thấy category với tên cung cấp.',
    },
    '00144': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00145': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00146': {
      en: 'Category deleted successfully.',
      vn: 'Xóa category thành công.',
    },
    '00147': {
      en: 'Please provide all required fields!',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
    },
    '00148': {
      en: 'Please provide a valid food name.',
      vn: 'Vui lòng cung cấp tên của thực phẩm hợp lệ!',
    },
    '00149': {
      en: 'Please provide the name of the food category.',
      vn: 'Vui lòng cung cấp tên của category của thực phẩm.',
    },
    '00150': {
      en: 'Please provide the measurement unit name for the food.',
      vn: 'Vui lòng cung cấp tên đơn vị đo của thực phẩm.',
    },
    '00151': {
      en: 'A food item with this name already exists.',
      vn: 'Đã tồn tại thức ăn với tên này.',
    },
    '00152': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00153': {
      en: 'Unit with the provided name not found.',
      vn: 'Không tìm thấy đơn vị với tên cung cấp.',
    },
    '00154': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00155': {
      en: 'Category with the provided name not found.',
      vn: 'Không tìm thấy category với tên cung cấp.',
    },
    '00156': {
      en: 'Please join a group first to create food.',
      vn: 'Hãy vào nhóm trước để tạo thực phẩm.',
    },
    '00157': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00158': {
      en: 'Image upload failed.',
      vn: 'đăng tải ảnh thất bại.',
    },
    '00159': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00160': {
      en: 'Food created successfully.',
      vn: 'Tạo thực phẩm thành công.',
    },
    '00161': {
      en: 'Please provide all required fields!',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
    },
    '00162': {
      en: 'Please provide a valid food name.',
      vn: 'Vui lòng cung cấp tên thực phẩm hợp lệ!',
    },
    '00163': {
      en: 'Please provide at least one of the following fields: newName, newCategory, newUnit.',
      vn: 'Vui lòng cung cấp ít nhất một trong các trường sau, newName, newCategory, newUnit.',
    },
    '00164': {
      en: 'Please provide a valid new category for the food.',
      vn: 'Vui lòng cung cấp một danh mục mới hợp lệ cho thực phẩm.',
    },
    '00165': {
      en: 'Please provide a valid new unit for the food.',
      vn: 'Vui lòng cung cấp một đơn vị mới hợp lệ cho thực phẩm.',
    },
    '00166': {
      en: 'Please provide a valid new name for the food.',
      vn: 'Vui lòng cung cấp một tên mới hợp lệ cho thực phẩm.',
    },
    '00167': {
      en: 'The food with the provided name does not exist.',
      vn: 'Thực phẩm với tên đã cung cấp không tồn tại.',
    },
    '00167x': {
      en: 'You do not have permission to edit.',
      vn: 'Bạn không có quyền chỉnh sửa.',
    },
    '00168': {
      en: 'Server error.',
      vn: 'server error.',
    },
    '00169': {
      en: 'Unit with the provided name not found.',
      vn: 'Không tìm thấy đơn vị với tên đã cung cấp.',
    },
    '00171': {
      en: 'Category with the provided name not found.',
      vn: 'Không tìm thấy danh mục với tên đã cung cấp.',
    },
    '00173': {
      en: 'A food item with this name already exists.',
      vn: 'Một thực phẩm với tên này đã tồn tại.',
    },
    '00178': {
      en: 'Success.',
      vn: 'Thành công.',
    },
    '00179': {
      en: 'Please provide a food name.',
      vn: 'Vui lòng cung cấp tên thực phẩm.',
    },
    '00180': {
      en: 'Food with the provided name not found.',
      vn: 'Không tìm thấy thực phẩm với tên đã cung cấp.',
    },
    '00181': {
      en: 'You do not have permission.',
      vn: 'Bạn không có quyền.',
    },
    '00184': {
      en: 'Food deleted successfully.',
      vn: 'Xóa thực phẩm thành công.',
    },
    '00185': {
      en: 'You have not joined any group.',
      vn: 'Bạn chưa vào nhóm nào.',
    },
    '00188': {
      en: 'Food list retrieved successfully.',
      vn: 'Lấy danh sách thực phẩm thành công.',
    },
    '00190': {
      en: 'Please provide a valid food name!',
      vn: 'Vui lòng cung cấp một tên thực phẩm hợp lệ!',
    },
    '00191': {
      en: "Please provide a valid 'use within' value!",
      vn: "Vui lòng cung cấp một giá trị 'sử dụng trong khoảng' hợp lệ!",
    },
    '00192': {
      en: 'Please provide a valid quantity!',
      vn: 'Vui lòng cung cấp một số lượng hợp lệ!',
    },
    '00193': {
      en: 'Invalid note format!',
      vn: 'Định dạng ghi chú không hợp lệ!',
    },
    '00194': {
      en: 'Food does not exist.',
      vn: 'Thực phẩm không tồn tại.',
    },
    '00196': {
      en: 'User does not have permission as they are not part of the group.',
      vn: 'Người dùng không có quyền do không thuộc nhóm.',
    },
    '00198': {
      en: 'The food is not under the management rights of the group.',
      vn: 'Thực phẩm không thuộc quyền quản trị của nhóm.',
    },
    '00199': {
      en: 'Item in the fridge for the food already exists.',
      vn: 'Mục trong tủ lạnh cho thực phẩm đã tồn tại.',
    },
    '00202': {
      en: 'Fridge item created successfully.',
      vn: 'Mục trong tủ lạnh được tạo thành công.',
    },
    '00203': {
      en: 'Please provide all necessary fields.',
      vn: 'Vui cung cấp tất cả các trường cần thiết.',
    },
    '00204': {
      en: 'Please provide the ID of the fridge item.',
      vn: 'Vui lòng cung cấp id của item tủ lạnh.',
    },
    '00204x': {
      en: 'Please provide at least one of the following fields: newQuantity, newNote, newUseWithin.',
      vn: 'Vui lòng cung cấp ít nhất một trong các trường sau, newQuantity, newNote, newUseWithin.',
    },
    '00205': {
      en: "Please provide a valid 'use within' value!",
      vn: "Vui lòng cung cấp một giá trị 'sử dụng trong' hợp lệ!",
    },
    '00206': {
      en: 'Please provide a valid quantity!',
      vn: 'Vui lòng cung cấp một lượng hợp lệ!',
    },
    '00207': {
      en: 'Invalid new note format!',
      vn: 'Định dạng ghi chú mới không hợp lệ!',
    },
    '00207x': {
      en: 'Invalid new food name format!',
      vn: 'Định dạng tên thức ăn mới không hợp lệ!',
    },
    '00208': {
      en: 'Food does not exist.',
      vn: 'Thực phẩm không tồn tại.',
    },
    '00210': {
      en: 'User does not belong to any groups.',
      vn: 'Người dùng không thuộc bất kỳ nhóm nào.',
    },
    '00212': {
      en: "The fridge is not under the group's administration.",
      vn: 'Tủ lạnh không thuộc quản trị viên nhóm.',
    },
    '00213': {
      en: 'Fridge item does not exist.',
      vn: 'Mục tủ lạnh không tồn tại.',
    },
    '00214x': {
      en: 'New food name does not exist.',
      vn: 'Tên thực phẩm mới không tồn tại.',
    },
    '00216': {
      en: 'Fridge item updated successfully.',
      vn: 'Cập nhật mục tủ lạnh thành công.',
    },
    '00217': {
      en: 'Please provide a food name.',
      vn: 'Vui lòng cung cấp tên thực phẩm.',
    },
    '00218': {
      en: 'Food with the provided name not found.',
      vn: 'Không tìm thấy thực phẩm với tên đã cung cấp.',
    },
    '00219': {
      en: 'You do not have permission.',
      vn: 'Bạn không có quyền.',
    },
    '00221': {
      en: 'The fridge item linked to this food has not been created yet.',
      vn: 'Mục trong tủ lạnh liên kết với thực phẩm này chưa được tạo.',
    },
    '00224': {
      en: 'Fridge item deleted successfully.',
      vn: 'Xóa mục trong tủ lạnh thành công.',
    },
    '00225': {
      en: 'You have not joined any group.',
      vn: 'Bạn chưa vào nhóm nào.',
    },
    '00228': {
      en: 'Fridge item list retrieved successfully.',
      vn: 'Lấy danh sách đồ tủ lạnh thành công.',
    },
    '00229': {
      en: 'Please provide a food name.',
      vn: 'Vui lòng cung cấp tên thực phẩm.',
    },
    '00230': {
      en: 'Food with the provided name not found.',
      vn: 'Không tìm thấy thực phẩm với tên đã cung cấp.',
    },
    '00232': {
      en: 'You do not have permission.',
      vn: 'Bạn không có quyền.',
    },
    '00234': {
      en: 'The fridge item linked to this food has not been created yet.',
      vn: 'Mục trong tủ lạnh liên kết với thực phẩm này chưa được tạo.',
    },
    '00237': {
      en: 'Specific item retrieved successfully.',
      vn: 'Lấy item cụ thể thành công.',
    },
    '00238': {
      en: 'Please provide all necessary fields.',
      vn: 'Vui cung cấp tất cả các trường cần thiết.',
    },
    '00239': {
      en: 'Please provide a name.',
      vn: 'Vui lòng cung cấp tên.',
    },
    '00240': {
      en: 'Please provide assignToUsername.',
      vn: 'Vui lòng cung cấp assignToUsername.',
    },
    '00241': {
      en: 'Invalid note format.',
      vn: 'Định dạng ghi chú không hợp lệ.',
    },
    '00242': {
      en: 'Invalid date format.',
      vn: 'Định dạng ngày không hợp lệ.',
    },
    '00243': {
      en: 'Unauthorized access. You do not have permission.',
      vn: 'Truy cập không được ủy quyền. Bạn không có quyền.',
    },
    '00245': {
      en: 'Assigned username does not exist.',
      vn: 'Tên người dùng được gán không tồn tại.',
    },
    '00246': {
      en: 'Unauthorized access. You do not have permission to assign this shopping list to this user.',
      vn: 'Truy cập không được ủy quyền. Bạn không có quyền gán danh sách mua sắm cho người dùng này.',
    },
    '00249': {
      en: 'Shopping list created successfully.',
      vn: 'Danh sách mua sắm đã được tạo thành công.',
    },
    '00250': {
      en: 'Please provide all necessary fields.',
      vn: 'Vui cung cấp tất cả các trường cần thiết.',
    },
    '00251': {
      en: 'Please provide the list ID.',
      vn: 'Vui lòng cung cấp id danh sách.',
    },
    '00252': {
      en: 'Please provide at least one of the following fields: newName, newAssignToUsername, newNote, newDate.',
      vn: 'Vui lòng cung cấp ít nhất một trong những trường sau, newName, newAssignToUsername, newNote, newDate.',
    },
    '00253': {
      en: 'Invalid new name format.',
      vn: 'Định dạng tên mới không hợp lệ.',
    },
    '00254': {
      en: 'Invalid new assigned username format.',
      vn: 'Định dạng tên người được giao mới không hợp lệ.',
    },
    '00255': {
      en: 'Invalid new note format.',
      vn: 'Định dạng ghi chú mới không hợp lệ.',
    },
    '00256': {
      en: 'Invalid new date format.',
      vn: 'Định dạng ngày mới không hợp lệ.',
    },
    '00258': {
      en: 'User is not a group administrator.',
      vn: 'Người dùng không phải là quản trị viên nhóm.',
    },
    '00260': {
      en: 'Shopping list not found.',
      vn: 'Không tìm thấy danh sách mua sắm.',
    },
    '00261': {
      en: 'User is not the administrator of this shopping list.',
      vn: 'Người dùng không phải là quản trị viên của danh sách mua sắm này.',
    },
    '00262': {
      en: 'User does not exist.',
      vn: 'Người dùng không tồn tại.',
    },
    '00263': {
      en: 'User does not have permission to assign this list to the username.',
      vn: 'Người dùng không có quyền gán danh sách này cho tên người dùng.',
    },
    '00266': {
      en: 'Shopping list updated successfully.',
      vn: 'Cập nhật danh sách mua sắm thành công.',
    },
    '00267': {
      en: 'Provide the required fields.',
      vn: 'Cung cấp các trường cần thiết.',
    },
    '00268': {
      en: 'Please provide the list ID.',
      vn: 'Vui lòng cung cấp id danh sách.',
    },
    '00270': {
      en: 'User is not a group administrator.',
      vn: 'Người dùng không phải là quản trị viên nhóm.',
    },
    '00272': {
      en: 'Shopping list not found.',
      vn: 'Không tìm thấy danh sách mua sắm.',
    },
    '00273': {
      en: 'User is not the administrator of this shopping list.',
      vn: 'Người dùng không phải là quản trị viên của danh sách mua sắm này.',
    },
    '00275': {
      en: 'Successfully deleted shopping list.',
      vn: 'Xóa danh sách mua sắm thành công.',
    },
    '00276': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00277': {
      en: 'Please provide an ID for the list.',
      vn: 'Vui lòng cung cấp một ID của danh sách.',
    },
    '00278': {
      en: 'Please provide an array of tasks.',
      vn: 'Vui lòng cung cấp một mảng nhiệm vụ.',
    },
    '00279': {
      en: 'Please provide an array of tasks with valid fields.',
      vn: 'Vui lòng cung cấp một mảng nhiệm vụ với các trường hợp lệ.',
    },
    '00281': {
      en: 'User is not a group administrator.',
      vn: 'Người dùng không phải là quản trị viên của nhóm.',
    },
    '00283': {
      en: 'Shopping list not found.',
      vn: 'Không tìm thấy danh sách mua sắm.',
    },
    '00284': {
      en: 'User is not the administrator of this shopping list.',
      vn: 'Người dùng không phải là quản trị viên của danh sách mua sắm này.',
    },
    '00285': {
      en: 'No food found with the provided name in the array.',
      vn: 'Không tìm thấy một món ăn với tên cung cấp trong mảng.',
    },
    '00285x': {
      en: 'This food type already exists in the list.',
      vn: 'Loại thức ăn này đã có trong danh sách rồi.',
    },
    '00287': {
      en: 'Task added successfully.',
      vn: 'Thêm nhiệm vụ thành công.',
    },
    '00288': {
      en: 'This user is not part of any group.',
      vn: 'Người dùng này chưa thuộc nhóm nào.',
    },
    '00292': {
      en: 'Successfully retrieved the list of shopping lists.',
      vn: 'Lấy danh sách các shopping list thành công.',
    },
    '00293': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00294': {
      en: 'Please provide a task ID in the taskId field.',
      vn: 'Vui lòng cung cấp một ID nhiệm vụ trong trường taskId.',
    },
    '00296': {
      en: 'No task found with the provided ID.',
      vn: 'Không tìm thấy nhiệm vụ với ID đã cung cấp.',
    },
    '00297': {
      en: 'User is not a group administrator.',
      vn: 'Người dùng không phải là quản trị viên nhóm.',
    },
    '00299': {
      en: 'Successfully deleted task.',
      vn: 'Xóa nhiệm vụ thành công.',
    },
    '00300': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00301': {
      en: 'Please provide a task ID in the taskId field.',
      vn: 'Vui lòng cung cấp một ID nhiệm vụ trong trường taskId.',
    },
    '00302': {
      en: 'Please provide at least one of the following fields: newFoodName, newQuantity.',
      vn: 'Vui lòng cung cấp ít nhất một trong những trường sau, newFoodName, newQuantity.',
    },
    '00303': {
      en: 'Please provide a valid newFoodName.',
      vn: 'Vui lòng cung cấp một newFoodName hợp lệ.',
    },
    '00304': {
      en: 'Please provide a valid newQuantity.',
      vn: 'Vui lòng cung cấp một newQuantity hợp lệ.',
    },
    '00306': {
      en: 'No task found with the provided ID.',
      vn: 'Không tìm thấy nhiệm vụ với ID đã cung cấp.',
    },
    '00307': {
      en: 'User is not a group administrator.',
      vn: 'Người dùng không phải là quản trị viên nhóm.',
    },
    '00308': {
      en: 'No task found with the provided name.',
      vn: 'Không tìm thấy nhiệm vụ với tên đã cung cấp.',
    },
    '00309': {
      en: 'This food already exists in the current shopping list.',
      vn: 'Thực phẩm này đã tồn tại trong danh sách mua hàng hiện tại.',
    },
    '00312': {
      en: 'Task updated successfully.',
      vn: 'Cập nhật nhiệm vụ thành công.',
    },
    '00313': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00314': {
      en: 'Please provide a valid food name.',
      vn: 'Vui lòng cung cấp một tên thực phẩm hợp lệ.',
    },
    '00315': {
      en: 'Please provide a valid timestamp.',
      vn: 'Vui lòng cung cấp một dấu thời gian hợp lệ.',
    },
    '00316': {
      en: 'Please provide a valid name for the meal: breakfast, lunch, dinner.',
      vn: 'Vui lòng cung cấp một tên hợp lệ cho bữa ăn: sáng, trưa, tối.',
    },
    '00317': {
      en: 'No food found with the provided name.',
      vn: 'Không tìm thấy thực phẩm với tên đã cung cấp.',
    },
    '00319': {
      en: 'User is not a group administrator.',
      vn: 'Người dùng không phải là quản trị viên nhóm.',
    },
    '00322': {
      en: 'Meal plan added successfully.',
      vn: 'Thêm kế hoạch bữa ăn thành công.',
    },
    '00323': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00324': {
      en: 'Please provide a valid plan ID.',
      vn: 'Vui lòng cung cấp một ID kế hoạch hợp lệ.',
    },
    '00325': {
      en: 'No plan found with the provided ID.',
      vn: 'Không tìm thấy kế hoạch với ID đã cung cấp.',
    },
    '00327': {
      en: 'User is not a group administrator.',
      vn: 'Người dùng không phải là quản trị viên nhóm.',
    },
    '00330': {
      en: 'Your meal plan has been successfully deleted.',
      vn: 'Kế hoạch bữa ăn của bạn đã được xóa thành công.',
    },
    '00331': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00332': {
      en: 'Please provide a plan ID!',
      vn: 'Vui lòng cung cấp một ID kế hoạch!',
    },
    '00333': {
      en: 'Please provide at least one of the following fields: newFoodName, newTimestamp, newName.',
      vn: 'Vui lòng cung cấp ít nhất một trong các trường sau, newFoodName, newTimestamp, newName.',
    },
    '00334': {
      en: 'Please provide a valid new food name!',
      vn: 'Vui lòng cung cấp một tên thực phẩm mới hợp lệ!',
    },
    '00335': {
      en: 'Please provide a valid timestamp!',
      vn: 'Vui lòng cung cấp một dấu thời gian hợp lệ!',
    },
    '00336': {
      en: 'Please provide a valid name: breakfast, lunch, dinner!',
      vn: 'Vui lòng cung cấp một tên hợp lệ, sáng, trưa, tối!',
    },
    '00337': {
      en: 'No plan found with the provided ID.',
      vn: 'Không tìm thấy kế hoạch với ID đã cung cấp.',
    },
    '00339': {
      en: 'User is not a group administrator.',
      vn: 'Người dùng không phải là quản trị viên nhóm.',
    },
    '00341': {
      en: 'The new food name does not exist.',
      vn: 'Tên thực phẩm mới không tồn tại.',
    },
    '00344': {
      en: 'Meal plan updated successfully.',
      vn: 'Cập nhật kế hoạch bữa ăn thành công.',
    },
    '00345': {
      en: 'You are not in any group.',
      vn: 'Bạn chưa vào nhóm nào.',
    },
    '00348': {
      en: 'Successfully retrieved the list.',
      vn: 'Lấy danh sách thành công.',
    },
    '00349': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00350': {
      en: 'Please provide a valid food name.',
      vn: 'Vui lòng cung cấp một tên thực phẩm hợp lệ.',
    },
    '00351': {
      en: 'Please provide a valid recipe name.',
      vn: 'Vui lòng cung cấp một tên công thức hợp lệ.',
    },
    '00352': {
      en: 'Please provide a valid recipe description.',
      vn: 'Vui lòng cung cấp một mô tả công thức hợp lệ.',
    },
    '00353': {
      en: 'Please provide valid HTML content for the recipe.',
      vn: 'Vui lòng cung cấp nội dung HTML công thức hợp lệ.',
    },
    '00354': {
      en: 'No food found with the provided name.',
      vn: 'Không tìm thấy thực phẩm với tên đã cung cấp.',
    },
    '00357': {
      en: 'Recipe added successfully.',
      vn: 'Thêm công thức nấu ăn thành công.',
    },
    '00358': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00359': {
      en: 'Please provide a recipe ID!',
      vn: 'Vui lòng cung cấp một ID công thức!',
    },
    '00360': {
      en: 'Please provide at least one of the following fields: newFoodName, newDescription, newHtmlContent, newName.',
      vn: 'Vui lòng cung cấp ít nhất một trong các trường sau, newFoodName, newDescription, newHtmlContent, newName.',
    },
    '00361': {
      en: 'Please provide a valid new food name!',
      vn: 'Vui lòng cung cấp một tên thực phẩm mới hợp lệ!',
    },
    '00362': {
      en: 'Please provide a valid new description!',
      vn: 'Vui lòng cung cấp một mô tả mới hợp lệ!',
    },
    '00363': {
      en: 'Please provide valid new HTML content!',
      vn: 'Vui lòng cung cấp nội dung HTML mới hợp lệ!',
    },
    '00364': {
      en: 'Please provide a valid new recipe name!',
      vn: 'Vui lòng cung cấp một tên công thức mới hợp lệ!',
    },
    '00365': {
      en: 'No recipe found with the provided ID.',
      vn: 'Không tìm thấy công thức với ID đã cung cấp.',
    },
    '00367': {
      en: 'The new food name does not exist.',
      vn: 'Tên thực phẩm mới không tồn tại.',
    },
    '00370': {
      en: 'Recipe updated successfully.',
      vn: 'Cập nhật công thức nấu ăn thành công.',
    },
    '00371': {
      en: 'Please provide all required fields.',
      vn: 'Vui lòng cung cấp tất cả các trường bắt buộc.',
    },
    '00372': {
      en: 'Please provide a valid recipe ID.',
      vn: 'Vui lòng cung cấp một ID công thức hợp lệ.',
    },
    '00373': {
      en: 'No recipe found with the provided ID.',
      vn: 'Không tìm thấy công thức với ID đã cung cấp.',
    },
    '00376': {
      en: 'Your recipe has been successfully deleted.',
      vn: 'Công thức của bạn đã được xóa thành công.',
    },
    '00378': {
      en: 'Successfully retrieved the recipes.',
      vn: 'Lấy các công thức thành công.',
    },
  };

  public static getMessage(code: string, lang: 'en' | 'vn' = 'en'): string {
    return this.responseCodes[code]?.[lang] || 'Unknown error';
  }
}
