import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#000',
  },
   headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 15,
    letterSpacing: 1, 
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 20, 
    padding: 20,
    paddingBottom: 20,
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    width: '100%',
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000'
  },
  button: {
    backgroundColor: '#FFD700', 
    width: '100%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#000', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
      marginTop: 12,
  },
  registerText: {
      fontSize: 14,
      color: '#555',
  }
});