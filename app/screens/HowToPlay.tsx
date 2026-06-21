import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';

export default function HowToPlay() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Sudoku Tips and Tricks</Text>

        {/* <View style={styles.YTcontainer}>
            <WebView
                style={styles.video}
                javaScriptEnabled={true}
                // source={{ uri: 'https://www.youtube.com/watch?v=8zRXDsGydeQ' }}
                // just show the video like embedding it, not the whole youtube page
                source={{ html: '<iframe width="100%" height="400" src="https://www.youtube.com/embed/8zRXDsGydeQ" frameborder="0" allowfullscreen></iframe>' }}
            />
        </View> */}


        <Text style={styles.subHeading}>Introduction</Text>
        <Text style={styles.paragraph}>
          Sudoku is a popular logic-based number puzzle that challenges your thinking, patience, and
          pattern recognition skills. The goal is to fill a 9x9 grid with digits so that each column,
          each row, and each of the nine 3x3 subgrids contains all of the digits from 1 to 9 without
          repetition. Although the rules are simple, solving Sudoku can range from easy to extremely
          difficult depending on the puzzle level. The good news is that with the right strategies,
          anyone can improve significantly and solve puzzles faster and more efficiently. Below are
          detailed tips and tricks to help you master Sudoku step by step.
        </Text>

        <Text style={styles.subHeading}>1. Start with the Obvious and Easy Numbers</Text>
        <Text style={styles.paragraph}>
          Always begin by scanning the entire grid for obvious placements. Look for rows, columns, or
          boxes that already contain 7 or 8 numbers, as these often have only one or two missing values.
          Fill in any single-candidate cells immediately. This early momentum helps unlock more
          possibilities across the board. Avoid guessing—only place numbers when you are completely sure.
        </Text>

        <Text style={styles.subHeading}>2. Scan Systematically (Row, Column, Box Method)</Text>
        <Text style={styles.paragraph}>
          Develop a consistent scanning pattern. Check each number from 1 to 9 and see where it can
          possibly fit in every row, column, and 3x3 box. This method reduces confusion and ensures you
          don’t miss hidden placements. Many beginners randomly look around the grid, but systematic
          scanning is far more effective and reduces errors significantly.
        </Text>

        <Text style={styles.subHeading}>3. Use the “What’s Missing?” Strategy</Text>
        <Text style={styles.paragraph}>
          Instead of focusing only on filled numbers, look at what is missing in each row, column, or
          box. Ask yourself: “Which numbers from 1 to 9 are not present here?” Then check where those
          missing numbers can legally go. This approach helps you narrow down options logically and is
          especially useful in mid-game situations.
        </Text>

        <Text style={styles.subHeading}>4. Apply the Elimination Technique</Text>
        <Text style={styles.paragraph}>
          Elimination is one of the most powerful Sudoku techniques. For each empty cell, list possible
          numbers and cross out those already present in the same row, column, or box. As you eliminate
          more numbers, some cells will eventually be reduced to a single possibility. This technique
          becomes more powerful as the puzzle progresses.
        </Text>

        <Text style={styles.subHeading}>5. Look for Naked Singles</Text>
        <Text style={styles.paragraph}>
          A naked single occurs when a cell has only one possible number left. These are the easiest
          moves in Sudoku and should always be filled immediately. After placing a naked single, re-check
          the affected row, column, and box, as it may unlock new singles elsewhere on the board.
        </Text>

        <Text style={styles.subHeading}>6. Identify Hidden Singles</Text>
        <Text style={styles.paragraph}>
          A hidden single happens when a number can only fit in one specific cell within a row, column,
          or box—even if that cell has other candidates. These are easy to miss but extremely important.
          Regularly scan for hidden singles, especially in partially filled regions.
        </Text>

        <Text style={styles.subHeading}>7. Work on One Number at a Time</Text>
        <Text style={styles.paragraph}>
          Instead of trying to solve everything at once, pick a number (for example, all 5s) and scan
          the entire grid to see where they can go. This focused approach helps reduce cognitive load
          and often reveals patterns you might miss when looking at the full grid randomly.
        </Text>

        <Text style={styles.subHeading}>8. Use Pencil Marking (Candidate Notes)</Text>
        <Text style={styles.paragraph}>
          In harder puzzles, lightly note possible numbers in empty cells. This helps you visualize
          possibilities and reduces guessing. As you eliminate options, update your notes. Many advanced
          Sudoku strategies rely on strong candidate tracking, so this habit is very important for
          improvement.
        </Text>

        <Text style={styles.subHeading}>9. Watch for Box-Line Interactions</Text>
        <Text style={styles.paragraph}>
          Sometimes a number in a 3x3 box is restricted to a single row or column. This means that same
          number cannot appear in that row or column outside the box. Recognizing these patterns helps
          eliminate possibilities and unlock difficult sections of the puzzle.
        </Text>

        <Text style={styles.subHeading}>10. Avoid Guessing at All Costs</Text>
        <Text style={styles.paragraph}>
          Sudoku is designed to be solved logically. Guessing can lead to contradictions and force you to
          backtrack. If you feel stuck, revisit earlier steps, re-scan the grid, and look for missed
          eliminations or hidden singles instead of guessing.
        </Text>

        <Text style={styles.subHeading}>11. Break the Grid into Sections</Text>
        <Text style={styles.paragraph}>
          Instead of looking at the entire board, divide it mentally into smaller sections. Focus on one
          box at a time and try to complete it. Completing a box often makes surrounding rows and columns
          much easier to solve.
        </Text>

        <Text style={styles.subHeading}>12. Recheck After Every Move</Text>
        <Text style={styles.paragraph}>
          Every time you place a number, take a moment to reassess the grid. A single placement can
          create new singles or eliminate multiple possibilities elsewhere. Continuous re-evaluation is
          key to efficient solving.
        </Text>

        <Text style={styles.subHeading}>13. Recognize Patterns with Practice</Text>
        <Text style={styles.paragraph}>
          As you solve more Sudoku puzzles, you will begin to recognize recurring patterns such as pairs,
          triples, and chains. These patterns are essential for solving medium and hard puzzles and come
          naturally with consistent practice.
        </Text>

        <Text style={styles.subHeading}>14. Stay Patient and Consistent</Text>
        <Text style={styles.paragraph}>
          Sudoku is not a race. Some puzzles take time to unfold, and progress can feel slow at times.
          Staying calm and consistent helps you think more clearly and avoid mistakes. Over time, your
          speed and accuracy will naturally improve.
        </Text>

        <Text style={styles.subHeading}>Conclusion</Text>
        <Text style={styles.paragraph}>
          Sudoku is a rewarding puzzle that strengthens logical thinking and concentration. By using
          structured techniques like elimination, scanning, hidden singles, and careful candidate
          tracking, you can dramatically improve your solving ability. Regular practice is the key to
          mastering even the hardest puzzles. Keep challenging yourself, and enjoy the process of
          becoming more skilled with every grid you solve. Happy solving!
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e80505',
    marginBottom: 20,
    marginTop: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#b30e14',
    paddingTop: 30,
  },
  YTcontainer: {
    flex: 1
  },
  video: {
    flex: 1,
    height: 400,
    width: '100%'
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#e80505'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
  },
});
