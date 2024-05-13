export default function (errorCode: any) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Geçersiz email adresi';

    case 'auth/user-not-found':
      return 'Kullanıcı bulunamadı';

    case 'auth/wrong-password':
      return 'Şifre hatalı';

    case 'auth/email-already-in-use':
      return 'Email adresi zaten kullanılıyor';

    case 'auth/weak-password':
      return 'Şifre zayıf';

    case 'auth/wrong-password':
      return 'Şifre hatalı';

    default:
      return 'Bir hata oluştu';
  }
}
