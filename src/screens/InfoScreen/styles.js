import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16
  },
  title: {
    top: 25,
    fontSize: 32,
    margin: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  body: {
    borderRadius: 10,
    backgroundColor: 'yellow',
    margin: 10
  },
  bodyText: {
    fontSize: 23,
    margin: 20
  },
  confirmButton: {
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: 'green',
    width: 250,
    margin: 75,
    top: 610
  },
  confirmButtonText: {
    fontSize: 32,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 100
  }
});