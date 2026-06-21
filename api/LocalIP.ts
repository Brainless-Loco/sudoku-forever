// API utilities for network communication

const getIPV4 = async (): Promise<string | null> => {
  try {
    // Note: react-native-network-info may not work with Expo managed services
    // This is a placeholder for network operations
    return null;
  } catch (error) {
    console.error('Error retrieving IP address:', error);
    return null;
  }
};

export default getIPV4;
