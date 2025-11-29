import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './src/services/authContext.js'; 

import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import DashboardScreen from './src/screens/Dashboard';
import BookingScreen from './src/screens/Booking';
import CreateServiceScreen from './src/screens/CreateService';
import EditServiceScreen from './src/screens/EditService';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Fazer Agendamento' }} />
          <Stack.Screen name="CreateService" component={CreateServiceScreen} options={{ title: 'Adicionar Serviço' }} />
          <Stack.Screen name="EditService" component={EditServiceScreen} options={{ title: 'Editar Serviço' }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}