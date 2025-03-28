import CategoriesSection from '@/components/CategoriesSection';
import ScreenMainTitle from '@/components/ScreenMainTitle';
import { categories } from '@/config/categories';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'short' });

  return (
    <SafeAreaView style={styles.globalContainer}>
      <ScreenMainTitle title={'Today'} subtitle={day + ' ' + month} />
      <CategoriesSection categories={categories} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    margin: 20,
    flexDirection: 'column',
    gap: 32,
  },
}); 