import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  current_grid_update,
  increase_mistake_count,
  insert_action_history,
  selected_Button_update,
  update_selected_small_square_index,
} from '../redux/actions/gridActions';
import { RootState } from '../redux/store';

export const NumberBtnList: React.FC = () => {
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const dispatch = useDispatch();

  const update_selected_button = (id: number) => dispatch(selected_Button_update(id) as any);
  const square_update = (id: number, val: number) => dispatch(current_grid_update(id, val) as any);
  const insert_an_action = (id: number, val: number) => dispatch(insert_action_history(id, val) as any);
  const did_a_mistake = () => dispatch(increase_mistake_count() as any);
  const select_this_square_for_update = (id: number) => dispatch(update_selected_small_square_index(id) as any);

  const selected_index = useSelector((state: RootState) => state.selected_small_square_index);
  const selected_index_value = useSelector((state: RootState) => state.selected_small_square_value);
  const lock_btn_status = useSelector((state: RootState) => state.is_Num_Button_Locked);
  const locked_btn_id = useSelector((state: RootState) => state.selected_Button);
  const is_pause = useSelector((state: RootState) => state.is_paused);
  const remainingNumbers = useSelector((state: RootState) => state.remainingNums);
  const GRID = useSelector((state: RootState) => state.grid);

  const selected_index_row = selected_index ? (Math.floor(selected_index / 10) % 10) - 1 : 0;
  const selected_index_col = selected_index ? (selected_index % 10) - 1 : 0;

  const correct_value = useSelector((state: RootState) => state.grid[selected_index_row]?.[selected_index_col] || 0);

  return (
    <View style={styles.container}>
      <View style={styles.midContainer}>
        {nums.map((num) => {
          const numValue = parseInt(num);
          const isCompleted = remainingNumbers[numValue] === 0;

          return (
            <Pressable
              disabled={isCompleted}
              style={[
                styles.btn,
                lock_btn_status && locked_btn_id === numValue && styles.locked_btn,
                lock_btn_status && locked_btn_id !== numValue && styles.unlocked_btn,
                !lock_btn_status && styles.locked_btn,
                isCompleted && styles.completed_btn,
              ]}
              key={num}
              onPress={() => {
                if (!is_pause) {
                  update_selected_button(numValue);
                  if (!lock_btn_status && selected_index) {
                    insert_an_action(selected_index, selected_index_value);
                    square_update(selected_index, numValue);
                    if (numValue !== correct_value) did_a_mistake();
                  } else {
                    select_this_square_for_update(0);
                  }
                }
              }}
            >
              <Text style={styles.text}>{num}</Text>
              <Text style={styles.countText}>{remainingNumbers[numValue]}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'white',
    borderColor: '#000099',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    minHeight: 65,
    width: '100%',
  } as any,
  midContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: 'white',
    height: 'auto',
    width: '100%',
  } as any,
  btn: {
    backgroundColor: '#000099',
    width: '10%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  } as any,
  locked_btn: {
    backgroundColor: '#000099',
  },
  unlocked_btn: {
    backgroundColor: '#a8a8a8',
  },
  completed_btn: {
    backgroundColor: '#4d944d',
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countText: {
    color: 'white',
    fontSize: 10,
  },
});
