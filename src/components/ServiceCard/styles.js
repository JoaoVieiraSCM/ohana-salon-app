import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,

    width: '100%',
    alignSelf: 'center',

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
  },

  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  serviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  itemText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },

  budgetText: {
    fontSize: 14,
    color: '#25D366',
    marginTop: 10,
  },

  button: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 15,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
