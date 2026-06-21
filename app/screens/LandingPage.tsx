import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { game_pattern_formation, gridUpdate, update_asyncstorage_for_a_new_game, update_from_last_saved_game, update_remaining_num_list } from '../../redux/actions/gridActions';
import { generate_a_new_pattern } from '../../sudoku_maker/sudoku_pattern_generator';
import { useEffect, useRef, useState } from 'react';
import { gsap, Back } from 'gsap-rn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/build/Ionicons';

const LandingPage: React.FC<any> = ({ }) => {
  const dispatch = useDispatch();
  
  const router = useRouter();

  const viewRef = useRef<any>(null);
  const isFocused = useIsFocused();

  const [loading, setloading] = useState(false);

  const update_current_game = (pattern: number[][]) => dispatch(gridUpdate(pattern) as any);
  const form_new_game = (props: any) => dispatch(game_pattern_formation(props) as any);
  const update_from_last_played_game = (gameData: any) => { dispatch(update_from_last_saved_game(gameData) as any); };
  const update_asyncstorage_for__new_game = () => { dispatch(update_asyncstorage_for_a_new_game() as any); };
  const update_remaining_nums_list = () => { dispatch(update_remaining_num_list() as any); };

  const [gameData, setgameData] = useState<any>(null);

  const update_everything_for_playzone = async (gameLevel: number) => {
    setloading(true);
    try {
      var new_pattern = generate_a_new_pattern();
      const pattern = new_pattern.map((arr: number[]) => arr.slice());
      form_new_game({ pattern, gameLevel });
      update_current_game(new_pattern);
      update_asyncstorage_for__new_game();
      update_remaining_nums_list();
      setloading(false);
      AsyncStorage.removeItem('minuteCount');
      AsyncStorage.removeItem('secondCount');
      router.push('./Playzone');
    } catch (e) {
      alert('Something went wrong!' + (e as Error).message);
    }
  };

  const retrieveGameData = async () => {
    try {
      const value = await AsyncStorage.getItem('gameData');
      if (value !== null && value !== undefined) {
        const gameData = JSON.parse(value);
        setgameData(gameData);
      } else {
        // throw new Error('No gameData value found in AsyncStorage.');
      }
    } catch (error) {
      throw error;
    }
  };

  const update_everything_for_playzone_via_saved_game = async () => {
    try {
      update_from_last_played_game(gameData);
      update_remaining_nums_list();
      router.push('./Playzone');
    } catch (error) {
      console.log('Error retrieving gameData:', error);
    }
  };

  useEffect(() => {
    retrieveGameData();
    const view = viewRef.current;
    gsap.to(view, { duration: 1, transform: { rotate: 360, scale: 1 }, ease: Back.easeInOut });
  }, []);


  return (
    <View style={styles.container}>
      <Image
        ref={viewRef}
        style={styles.logo}
        source={require('../../assets/images/icon.png')}
      />
      <Text style={styles.welcomeText}>Let's Play<Text style={{ color: 'red' }}> Sudoku</Text></Text>
      <Text style={styles.modeTitle}>Please select a mode</Text>
      <TouchableOpacity
        style={styles.enterPlayzoneBtn}
        onPress={async () => { update_everything_for_playzone(1); }}>
        <Text style={styles.btnText}>Newbie</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.enterPlayzoneBtn}
        onPress={async () => { update_everything_for_playzone(2); }}>
        <Text style={styles.btnText}>Expert</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.enterPlayzoneBtn}
        onPress={async () => { update_everything_for_playzone(3); }}>
        <Text style={styles.btnText}>Master</Text>
      </TouchableOpacity>

      {gameData != null && gameData != undefined && (
        <TouchableOpacity
          style={[styles.enterPlayzoneBtn, { width: '80%' }]}
          onPress={() => { update_everything_for_playzone_via_saved_game(); }}
        >
          <Text style={styles.btnText}> Continue Previous </Text>
        </TouchableOpacity>
      )}
      {/* implement a go to home button at the bottom of the screen*/}
      <TouchableOpacity
        style={[styles.enterPlayzoneBtn, { width: '80%', marginTop: 'auto', marginBottom: 20 }]}
        onPress={() => { router.push('./HomeScreen'); }}
      >
        <Ionicons name="home" size={40} color="#e80505" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#094480',
    marginBottom: 20
  },
  modeTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#094480',
    marginVertical: 5
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
    marginTop: 40
  },
  enterPlayzoneBtn: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: 'white',
    margin: 8,
    borderWidth: 1.5,
    borderColor: '#e80505',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  btnText: {
    color: '#e80505',
    fontSize: 22,
    fontWeight: '500'
  }
});