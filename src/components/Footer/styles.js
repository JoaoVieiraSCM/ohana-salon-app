import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 6,
    paddingHorizontal: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },

  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#555',
    borderRadius: 10,
  },
  expandedContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 78,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 40,
    tintColor: '#FFFFFF',
  },

  linksContainer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pagesTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },

  socialContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialIcon: {
    color: '#d4a632ff',
    marginVertical: 10,
  },
});