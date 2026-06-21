import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '@/firebase/firebaseConfig';
import { updateUserInfo } from '@/redux/actions/gridActions';
import { useRouter } from 'expo-router';


export const LogIn: React.FC<any> = ({ }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      dispatch(
        updateUserInfo({
          userRef: user.uid,
          userProfilePic: user.photoURL || '',
          userName: user.displayName || email.split('@')[0],
          userEmail: user.email || '',
        }) as any
      );

      router.replace('./HomeScreen');

    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/icon.png')}
        />
        <Text style={styles.title}>Sudoku Forever</Text>
        <Text style={styles.subtitle}>Sign In</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.loginBtn, loading && styles.disabledBtn]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginBtnText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('./SignUp')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  logo: {
    alignSelf: 'center',
    color: "#0274ed",
    height: 120,
    width: 120,
    marginTop: 40,
    marginBottom: 50
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e80505',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: '#e80505',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
  },
  signupLink: {
    color: '#e80505',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
