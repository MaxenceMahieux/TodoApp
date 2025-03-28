import ScreenMainTitle from '@/components/ScreenMainTitle';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'short' });
  
  return (
    <SafeAreaView style={styles.globalContainer}>
      <ScreenMainTitle title={'Today'} subtitle={day + ' ' + month} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    margin: 20,
  }
});
