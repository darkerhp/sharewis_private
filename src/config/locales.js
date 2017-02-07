import I18n from 'react-native-i18n';

import {
  ACT_SITE_URL,
  ACT_TOS_URL,
  ACT_PRIVACY_URL,
  ACT_PRO_COURSES_URL,
} from '../constants/Api';

const locales = {
  ja: {
    accountSettings: 'アカウント情報',
    actWebsite: 'ShareWisのWebサイト',
    back: '戻る',
    close: '閉じる',
    myCourse: 'マイコース',
    downloadAlreadyInProgress: '現在他のレクチャーをダウンロード中です',
    downloadAvailable: 'ダウンロード済みレクチャーあり',
    email: 'メールアドレス',
    emailNotFound: 'Facebookからメールアドレスを取得することができませんでした。Facebookの共有設定をご確認ください',
    emailOrUsername: 'メールアドレスまたはアカウント名',
    emailLoginLabel: 'メールアドレスでログインする',
    errorTitle: 'エラー',
    facebookLabel: 'Facebookアカウントでログインする',
    facebookUserDoesNotExist: '登録されていないFacebookアカウントです。ShareWis ACTのサイトからアカウントを作成してください',
    inquiry: 'お問い合わせ',
    loading: '読み込み中',
    login: 'ログイン',
    loginEmailError: 'メールアドレス、ユーザー名またはパスワードが正しくありません',
    loginFacebookError: 'Facebookログインが失敗しました',
    networkFailure: 'ネットワークエラー',
    next: '次へ',
    nextLecture: '次のレクチャーへ',
    nickName: 'ニックネーム',
    noCourses: `購入済みのコースがない方は、 ${ACT_SITE_URL} よりお手続きを進めてください。`,
    noLogin: 'ログインすると購入後のプロコースをアプリで受講できます。',
    offlineErrorTitle: 'ネットワークエラー',
    offlineErrorMessage: '続行するにはインターネット接続が必要です',
    offlineLecture: 'このレクチャーはオフラインで受講できません',
    passwordForgotten: 'パスワードを忘れた方はこちら',
    passwordPlaceHolder: 'パスワード',
    privacy: 'プライバシーポリシー',
    profile: 'プロフィール',
    progressText: 'のレクチャーが完了しました',
    required: '必要です',
    searchMore: 'さらにコースを探す',
    signupText: `アカウントをお持ちでない方は ${ACT_SITE_URL} からアカウントを作成してください`,
    slide1Text: 'ShareWisは90秒で学べる無料のスナックコースとプロが教えるプロコースで学べる学習アプリです。',
    slide2Text: 'スナックコースの90秒動画でちょこっと賢くなろう！',
    slide3Text: 'さらに深く学びたい方にはプロが教えるプロコースも！さあ、はじめよう！',
    tos: '利用規約',
    totalDurationFormat: '計 h時間m分',
    userName: 'アカウント名',
    // 新規登録
    signup: 'アカウント登録',
    noAccountYet: '新規登録の方はこちら',
    alreadyHaveAnAccount: 'すでにアカウントをお持ちの方はこちら',
    signupWithEmail: 'メールアドレスで登録する',
    signupEmailError: 'ユーザー登録に失敗しました',
    invalidEmail: '正しいメールアドレスを入力してください。',
    invalidPassword: 'パスワードは半角英数またはアンダースコアで入力してください。',
    tooShortPassword: 'パスワードは6文字以上で入力してください。',
    agreeTosAndPolicy: `登録を完了すると、 ${ACT_TOS_URL} 及び ${ACT_PRIVACY_URL} に同意することになります。`,
    skipSignup: '登録せずにアプリを使う',
    skipLogin: 'ログインせずにアプリを使う',
    // スナックコース
    snackCourse: 'スナックコース',
    proCourse: 'プロコース',
    backToCourseList: 'コース一覧に戻る',
    // トップページ
    top: 'TOP',
    recommendedSnackCourse: 'オススメのスナックコース',
    noProCourses: `購入済みのプロコースがない方は、 ${ACT_PRO_COURSES_URL} よりお手続きを進めてください。`,
  },
  en: {
    accountSettings: 'Account Info',
    actWebsite: "ShareWis's website",
    back: 'Back',
    close: 'close',
    myCourse: 'My Courses',
    downloadAlreadyInProgress: 'download already in progress.',
    downloadAvailable: 'Downloaded lectures exist',
    email: 'E-mail',
    emailNotFound: 'We were unable to fetch your email from Facebook. Please review your Facebook settings to allow sharing your email.',
    emailOrUsername: 'E-mail or Username',
    emailLoginLabel: 'Login with your e-mail',
    errorTitle: 'Error',
    facebookLabel: 'Login with your Facebook account',
    facebookUserDoesNotExist: 'Your Facebook account is not registered. Please sign up from ShareWis ACT website',
    inquiry: 'Contact us',
    loading: 'loading...',
    login: 'Login',
    loginEmailError: 'Invalid email, username or password',
    loginFacebookError: 'Login with Facebook failed.',
    networkFailure: 'Network error.',
    next: 'Next',
    nextLecture: 'Next lecture',
    nickName: 'Nickname',
    noCourses: `If you haven't purchased any courses yet, please go to the ${ACT_SITE_URL}.`,
    noLogin: 'You can take your purchased Pro Courses after signing in.',
    offlineErrorTitle: 'No Internet Connection',
    offlineErrorMessage: 'Please check and try again',
    offlineLecture: 'Sorry, this lecture is not available offline',
    passwordForgotten: 'Forgot your password?',
    passwordPlaceHolder: 'Password',
    privacy: 'Privacy policy',
    profile: 'PROFILE',
    progressText: 'lectures completed',
    required: 'Required',
    searchMore: 'Get more courses',
    signupText: `If you don't have a ShareWis ACT account, please sign up from the ${ACT_SITE_URL}.`,
    slide1Text: 'ShareWis is an app to learn with free Snack Courses just in 90 second and Pro Courses created by professional instructors.',
    slide2Text: 'Get a bit smarter just in 90 seconds with Snack Courses!',
    slide3Text: 'Want to learn more? Pro Courses are available!Let\'s get started!',
    tos: 'Terms of use',
    totalDurationFormat: '[Total ]h[ hours ]m[ minutes]',
    userName: 'Account Name',
    // 新規登録
    signup: 'Sign up',
    noAccountYet: 'No account yet?',
    alreadyHaveAnAccount: 'Already have an account?',
    signupWithEmail: 'Signup by e-mail',
    signupEmailError: 'Signup failed',
    invalidEmail: 'Invalid value for the e-mail.',
    invalidPassword: 'You can use alphabets or numbers for password.',
    tooShortPassword: 'Password must be at least 6 characters.',
    agreeTosAndPolicy: `By completing this sign up process, you agree to our ${ACT_TOS_URL} and ${ACT_PRIVACY_URL}.`,
    skipSignup: 'Skip Signup',
    skipLogin: 'Skip Login',
    // スナックコース
    snackCourse: 'Snack Courses',
    proCourse: 'Pro Courses',
    backToCourseList: 'Go back to course list',
    // トップページ
    top: 'TOP',
    recommendedSnackCourse: 'Featured Snack Courses',
    noProCourses: `If you haven't purchased any pro courses yet, please go to the ${ACT_PRO_COURSES_URL}.`,
  },
  vi: {
    accountSettings: 'Thông tin tài khoản',
    actWebsite: 'trang web ShareWis',
    back: 'Trở lại',
    close: 'Đóng',
    myCourse: 'các khóa học của tôi',
    downloadAlreadyInProgress: 'Tải về đã được tiến hành',
    downloadAvailable: 'Bài giảng tải về đã tồn tại',
    email: 'Địa chỉ email',
    emailNotFound: 'Chúng tôi không thể tìm nạp email của bạn từ Facebook. Hãy xem xét cài đặt Facebook của bạn để cho phép chia sẻ email của bạn.',
    emailOrUsername: 'Địa chỉ email hoặc tên tài khoản',
    emailLoginLabel: 'Đăng nhập với email',
    errorTitle: 'lỗi',
    facebookLabel: 'Đăng nhập bằng tài khoản Facebook',
    facebookUserDoesNotExist: 'Chúng tôi không thể tìm thấy người dùng của bạn trong ShareWis ACT. Hãy đăng ký từ trang web ShareWis ACT',
    inquiry: 'Liền hề',
    loading: 'Đang tải…',
    login: 'Đăng nhập',
    loginEmailError: 'Đăng nhập thất bại sử dụng các email và mật khẩu.',
    loginFacebookError: 'Đăng nhập với Facebook thất bại.',
    networkFailure: 'Đã xảy ra lỗi mạng. Vui lòng thử lại sau.',
    next: 'kế tiếp',
    nextLecture: 'bài giảng tiếp theo',
    nickName: 'Nickname',
    noCourses: `Nếu bạn chưa mua bất kỳ khóa học nào, vui lòng vào ${ACT_SITE_URL}.`,
    noLogin: 'Bạn có thể tham Pro Courses mua sau khi đăng nhập.',
    offlineErrorTitle: 'Không có kết nối',
    offlineErrorMessage: 'Vui lòng kiểm tra và thử lại',
    offlineLecture: 'Xin lỗi, bài giảng này không có sẵn ở chế độ offline',
    passwordForgotten: 'Quên mật khẩu',
    passwordPlaceHolder: 'Mật khẩu',
    privacy: 'Chính sách bảo mật',
    profile: 'Hồ sơ',
    progressText: 'bài giảng hoàn thành',
    required: 'Cần thiết',
    searchMore: 'Tìm kiếm nhiều',
    signupText: `Nếu bạn không có một tài khoản ShareWis ACT, xin vui lòng đăng ký từ ${ACT_SITE_URL}.`,
    slide1Text: 'ShareWis là một ứng dụng học tập với các khóa Snack Courses miễn phí chỉ trong 90 giây và Pro Courses được tạo ra bởi các giảng viên chuyên nghiệp.',
    slide2Text: 'Thông minh hơn một chút chỉ trong 90 giây với Snack Courses!',
    slide3Text: 'Muốn học nhiều hơn? Đã có Pro Courses!Bắt đầu nào!',
    tos: 'Điều khoản sử dụng',
    totalDurationFormat: '[Tổng cộng ]h[ giờ ]m[ phút]',
    userName: 'Tên tài khoản',
    // 新規登録
    signup: 'Đăng ký tài khoản',
    noAccountYet: 'Đăng ký mới',
    alreadyHaveAnAccount: 'Đã có tài khoản',
    signupWithEmail: 'Đăng ký bằng địa chỉ email',
    signupEmailError: 'Bạn đã đăng ký thất bại',
    invalidEmail: 'Email có giá trị không hợp lệ.',
    invalidPassword: 'Bạn có thể sử dụng bảng chữ cái hoặc số cho mật khẩu.',
    tooShortPassword: 'Mật khẩu cần dài ít nhất 6 ký tự.',
    agreeTosAndPolicy: `Khi hoàn thành đăng ký nghĩa là bạn đồng ý với ${ACT_TOS_URL} và ${ACT_PRIVACY_URL}.`,
    skipSignup: 'Sử dụng các ứng dụng mà không cần đăng ký',
    skipLogin: 'Bỏ qua đăng nhập',
    // スナックコース
    snackCourse: 'Snack Courses',
    proCourse: 'Pro Courses',
    backToCourseList: 'Trở lại danh sách khoá học',
    // トップページ
    top: 'TRANG ĐẦU',
    recommendedSnackCourse: 'Snack Courses nổi bật',
    noProCourses: `Nếu bạn không mua bất kỳ Pro Courses nào, vui lòng vào ${ACT_PRO_COURSES_URL}.`,
  },
};

export default function setupI18n() {
  I18n.fallbacks = true;
  I18n.defaultLocale = 'en-US';
  I18n.translations = locales;
}
