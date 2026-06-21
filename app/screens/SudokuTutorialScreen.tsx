import { StyleSheet } from 'react-native';

const primaryColor = 'red';
const secondaryColor = '#6c757d';
const fontSizeLarge = 24;
const fontSizeMedium = 16;
const fontSizeSmall = 14;

const flexCenterMixin = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: fontSizeLarge * 2,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: fontSizeMedium,
    color: secondaryColor,
    marginBottom: 8,
  },
  content: {
    fontSize: fontSizeSmall,
    color: secondaryColor,
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  button: {
    ...flexCenterMixin,
    backgroundColor: primaryColor,
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
  },
});

export default styles;
