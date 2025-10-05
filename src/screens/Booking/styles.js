import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFBF00',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 5, 
  },
  datePickerButton: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FFD700', 
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  disabledInput: {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
  },
});

export default styles;