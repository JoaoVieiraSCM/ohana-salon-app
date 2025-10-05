import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 20,
    padding: 25,
    paddingTop: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  profileIconContainer: {
    marginBottom: 20,
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  inputView: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  inputText: {
    fontSize: 16,
    color: '#555',
  },
  redefineLink: {
    color: '#007BFF',
    textAlign: 'right',
    marginTop: 8,
  },
  // logoutButton: {
  //   backgroundColor: '#FFD700',
  //   borderRadius: 10,
  //   paddingVertical: 15,
  //   width: '100%',
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  // logoutButtonText: {
  //   color: '#333',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});