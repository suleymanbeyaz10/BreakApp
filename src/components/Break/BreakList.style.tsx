import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
  breakItem: {
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 50,
  },
});
