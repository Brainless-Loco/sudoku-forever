import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/firebase/firebaseConfig';
import { updateUserInfo } from '@/redux/actions/gridActions';
import { useRouter } from 'expo-router';

export default function HomeScreen({ navigation }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const viewRef = useRef(null);
  const isFocused = useIsFocused();

  const router = useRouter();

  const update_user_info = (info: any) => dispatch(updateUserInfo(info) as any);

  const navigateToAnotherScreen = (screenRoute: string) => {
    // navigation.navigate(screenRoute);
    router.push(screenRoute as any);

  };

  const signOutBtn = () => {
    update_user_info({ userRef: '', userProfilePic: '', userName: '', userEmail: '' });
    AsyncStorage.removeItem('userData');
    AsyncStorage.removeItem('gameData');
    AsyncStorage.removeItem('minuteCount');
    AsyncStorage.removeItem('secondCount');

    signOut(auth).catch((err) => console.error(err));
    router.replace('./LogIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Image style={styles.logo} source={require('@/assets/images/logo.png')} />
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.title}>Sudoku Forever</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigateToAnotherScreen('./LandingPage')} style={styles.navigationBtn}>
          <Ionicons name="game-controller" size={60} color="#e80505" style={styles.navigationIcon} />
          <Text style={styles.btnText}>Playzone</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigateToAnotherScreen('./AllBlogs')} style={styles.navigationBtn}>
          <MaterialCommunityIcons name="post-outline" size={60} color="#e80505" style={styles.navigationIcon} />
          <Text style={styles.btnText}>Blogs</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => navigateToAnotherScreen('./SolveWithAI')} style={styles.navigationBtn}>
          <AntDesign name="camera" size={60} color="#e80505" style={styles.navigationIcon} />
          <Text style={styles.btnText}>AI Solver</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => navigateToAnotherScreen('./Profile')} style={styles.navigationBtn}>
          <Ionicons name="person" size={60} color="#e80505" style={styles.navigationIcon} />
          <Text style={styles.btnText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 2 }}>
        <Text style={styles.othersTitle}>Others</Text>
        <View style={styles.otherNavigationContainer}>
          <TouchableOpacity onPress={() => navigateToAnotherScreen('./HowToPlay')} style={styles.miniNavigationBtn}>
            <Ionicons name="game-controller-outline" size={25} color="#e80505" style={styles.miniNavigationIcon} />
            <Text style={styles.miniBtnText}>How to Play</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigateToAnotherScreen('./WriteBlogScreen')} style={styles.miniNavigationBtn}>
            <FontAwesome name="pencil" size={25} color="#e80505" style={styles.miniNavigationIcon} />
            <Text style={styles.miniBtnText}>Write Blog</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => navigateToAnotherScreen('./AboutTheAPP')} style={styles.miniNavigationBtn}>
            <Ionicons name="information-circle" size={25} color="#e80505" style={styles.miniNavigationIcon} />
            <Text style={styles.miniBtnText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={signOutBtn} style={styles.miniNavigationBtn}>
            <Ionicons name="log-out" size={25} color="#e80505" style={styles.miniNavigationIcon} />
            <Text style={styles.miniBtnText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <TouchableOpacity onPress={signOutBtn} style={styles.signOutBtn}>
        <Ionicons name="log-out" size={20} color="#fff" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#e80505',
    marginBottom: 10,
  },
  container: {
    padding: 15,
    gap: 15,
  },
  otherNavigationContainer:{
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navigationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#e80505',
  },
  navigationIcon: {
    marginRight: 15,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  signOutBtn: {
    flexDirection: 'row',
    backgroundColor: '#e80505',
    padding: 12,
    marginHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  othersTitle: {
    color: '#e80505',
    marginHorizontal: 12,
    paddingLeft: 2,
    fontWeight: 'bold',
    marginTop: 10,
    borderBottomColor: '#e80505',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  miniNavigationBtn: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '22%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: '#e80505',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  miniNavigationIcon: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 2,
  },
  miniBtnText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#e80505',
  },
});
