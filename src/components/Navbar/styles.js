import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    backgroundColor: '#000',
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',     
    justifyContent: 'space-between', 
    alignItems: 'center',      
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  logo :  {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
    marginLeft: -10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  menuIconText: {
    color: '#FFFFFF',
    fontSize: 45,
  },
  
})