import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { categories } from '@/config/categories';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ScreenMainTitle from '@/components/ScreenMainTitle';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const category = categories.find(cat => cat.title.toLowerCase() === id);

  if (!category) {
    return (
      <View style={styles.globalContainer}>
        <Text>Catégorie non trouvée</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.globalContainer, { backgroundColor: category.color }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={Colors.zinc[700]} />
          </Pressable>
          <ScreenMainTitle title={category.title} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
  },
  container: {
    marginHorizontal: 20,
  },
  backButton: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.zinc[700],
  },
  header: {
    flexDirection: 'row',
    gap: 10,
  }
}); 