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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'expo-router';

export default function SignUp({ }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !username || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: username,
      });

      Alert.alert('Success', 'Account created successfully');
      router.replace('./HomeScreen');
    } catch (error: any) {
      Alert.alert('Sign Up Error', error.message || 'Failed to create account');
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
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sudoku Forever</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          editable={!loading}
        />

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

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.signupBtn, loading && styles.disabledBtn]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.signupBtnText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.navigate('./LogIn')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e80505',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
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
  signupBtn: {
    backgroundColor: '#e80505',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  signupBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 16,
  },
  loginLink: {
    color: '#e80505',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
