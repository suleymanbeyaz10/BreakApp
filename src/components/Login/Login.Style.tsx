import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9E4DD',
  },
  text: {
    fontSize: 24,
    color: '#34568B',
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  inner_container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 7,
    borderWidth: 1,
    color: '#34568B',
    borderColor: '#34568B',
    padding: 10,
    fontSize: 18,
    backgroundColor: '#E8E8E8',
  },
  button: {
    margin: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFD662',
  },
  button_text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#34568B',
  },
});
