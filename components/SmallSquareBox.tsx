import { Pressable, StyleSheet, Text, StatusBar } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  current_grid_update,
  increase_mistake_count,
  insert_action_history,
  update_selected_small_square_index,
} from '../redux/actions/gridActions';
import { RootState } from '../redux/store';

interface SmallSquareBoxProps {
  id: number;
}

export const SmallSquareBox: React.FC<SmallSquareBoxProps> = ({ id }) => {
  const dispatch = useDispatch();

  const square_update = (id: number, val: number) => dispatch(current_grid_update(id, val) as any);
  const select_this_square_for_update = (id: number) => dispatch(update_selected_small_square_index(id) as any);
  const insert_an_action = (id: number, val: number) => dispatch(insert_action_history(id, val) as any);
  const did_a_mistake = () => dispatch(increase_mistake_count() as any);

  const row = (Math.floor(id / 10) % 10) - 1;
  const col = (id % 10) - 1;

  const correct_value = useSelector((state: RootState) => state.grid[row]?.[col] || 0);
  const value = useSelector((state: RootState) => state.current_playing_grid[row]?.[col] || 0);
  const is_locked = useSelector((state: RootState) => state.is_Num_Button_Locked);
  const locked_button_key = useSelector((state: RootState) => state.selected_Button);
  const locked_square = useSelector((state: RootState) => state.selected_small_square_index);
  const is_editable_square = useSelector((state: RootState) => state.is_editable[row]?.[col] || false);
  const is_pause = useSelector((state: RootState) => state.is_paused);

  const getTextStyle = () => {
    if (is_locked && id !== locked_square && value === locked_button_key) {
      return styles.locked_text;
    }
    if (is_editable_square) {
      return correct_value === value ? styles.correct_value : styles.incorrect_value;
    }
    if (is_locked && value === locked_button_key) {
      return styles.locked_text;
    }
    return styles.unselected_text;
  };

  return (
    <Pressable
      style={[
        styles.container,
        !is_editable_square ? styles.uneditable_square : locked_square === id ? styles.selected_square : styles.unselected_square,
        is_pause && { backgroundColor: 'white', borderColor: 'red' },
        is_locked && value === locked_button_key && styles.locked_btn_style,
      ]}
      onPress={() => {
        if (is_editable_square) {
          select_this_square_for_update(id);
          if (is_locked && locked_button_key && !is_pause) {
            insert_an_action(id, value);
            square_update(id, locked_button_key);
            if (locked_button_key !== correct_value) did_a_mistake();
          }
        } else {
          select_this_square_for_update(0);
        }
      }}
    >
      <Text style={getTextStyle()}>{value && !is_pause ? value : ''}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    height: 32,
    width: '31%',
    borderWidth: 2,
    borderRadius: 4,
  },
  uneditable_square: {
    backgroundColor: '#a30707',
    borderColor: 'transparent',
  },
  unselected_square: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#a30707',
  },
  unselected_text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  selected_square: {
    backgroundColor: '#ededed',
    borderColor: '#ed2d07',
    borderWidth: 2,
  },
  selected_text: {
    color: '#ed2d07',
    fontSize: 15,
    fontWeight: 'bold',
  },
  correct_value: {
    color: '#11c90a',
    fontWeight: 'bold',
    fontSize: 15,
  },
  incorrect_value: {
    color: '#7a7a7a',
    fontWeight: 'bold',
    fontSize: 15,
  },
  locked_btn_style: {
    borderColor: '#ed2d07',
  },
  locked_text: {
    color: '#ed2d07',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
