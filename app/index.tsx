import CategoriesSection from '@/components/CategoriesSection';
import ScreenMainTitle from '@/components/ScreenMainTitle';
import { categories } from '@/config/categories';
import { Text, StyleSheet, Pressable, SafeAreaView, FlatList, View } from 'react-native';
import { useTasks } from '@/contexts/TasksContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'short' });
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(parseInt(a.id));
    const dateB = new Date(parseInt(b.id));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <SafeAreaView style={styles.globalContainer}>
      <ScreenMainTitle title={'Today'} subtitle={day + ' ' + month} />
      <CategoriesSection categories={categories} />

      <FlatList 
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const category = categories.find(cat => cat.title.toLowerCase() === item.categoryId);
          
          return (
            <Pressable 
              style={styles.taskItem}
              onPress={() => toggleTask(item.id)}
            >
              <IconSymbol 
                name={item.completed ? "checkmark.circle.fill" : "circle"} 
                size={24} 
                color={item.completed ? Colors.green[500] : Colors.zinc[400]} 
              />
              <View style={styles.taskContent}>
                <Text style={[
                  styles.taskText,
                  item.completed && styles.completedTask
                ]}>
                  {item.text}
                </Text>
                <View style={styles.categoryBadge}>
                  <View style={[styles.categoryColor, { backgroundColor: category?.color }]} />
                  <Text style={styles.categoryText}>{category?.title}</Text>
                </View>
              </View>
              <Pressable 
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <IconSymbol 
                  name="trash" 
                  size={20} 
                  color={Colors.zinc[400]} 
                />
              </Pressable>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    margin: 20,
    flexDirection: 'column',
    gap: 32,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.zinc[100],
    borderRadius: 12,
    marginBottom: 8,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: Colors.zinc[700],
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: Colors.zinc[400],
  },
  deleteButton: {
    padding: 4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.zinc[200],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.zinc[700],
    fontWeight: '500',
  }
}); 