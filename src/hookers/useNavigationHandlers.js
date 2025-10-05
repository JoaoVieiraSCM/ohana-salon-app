export function useNavigationHandlers({ navigation, onNavigateContent, onClose }) {


  const handleHomePress = () => {
    if (onClose) { onClose(); }
    if (onNavigateContent) {
      onNavigateContent('Home');
    } else {
      navigation.navigate('Home');
    }
  };

  const handleServicesPress = () => {
    if (onClose) { onClose(); }
    if (onNavigateContent) {
      onNavigateContent('Servicos');
    } else {
      navigation.navigate('Home', { initialContent: 'Servicos' });
    }
  };
  
  const handleInfosPress = () => {
    if (onClose) { onClose(); }
    if (onNavigateContent) {
      onNavigateContent('Infos');
    } else {
      navigation.navigate('Home', { initialContent: 'Infos' });
    }
  };

  const handleLoginPress = () => {
    if (onClose) { onClose(); }
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    if (onClose) { onClose(); }
    navigation.navigate('Register');
  };

  const handleDashboardPress = (params) => {
    if (onClose) { onClose(); }
    navigation.navigate('Dashboard', params);
  };

  const handleBookingPress = (params) => {
    if (onClose) { onClose(); }
    navigation.navigate('Booking', { service: params }); 
  };

  return {
    handleHomePress,
    handleLoginPress,
    handleRegisterPress,
    handleServicesPress,
    handleInfosPress,
    handleDashboardPress,
    handleBookingPress,
  };
}