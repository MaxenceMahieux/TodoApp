import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, Pressable, SafeAreaView, TextInput, FlatList } from 'react-native';
import { categories } from '@/config/categories';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ScreenMainTitle from '@/components/ScreenMainTitle';
import { useState } from 'react';
import { Task } from '@/constants/Types';
import { useTasks } from '@/hooks/useTasks';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  const category = categories.find(cat => cat.title.toLowerCase() === id);
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskText, setNewTaskText] = useState('');

  if (!category) {
    return (
      <View style={styles.globalContainer}>
        <Text>Catégorie non trouvée</Text>
      </View>
    );
  }

  const categoryTasks = tasks.filter(task => task.categoryId === category.title.toLowerCase());

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        categoryId: category.title.toLowerCase()
      };
      addTask(newTask);
      setNewTaskText('');
    }
  };

  return (
    <SafeAreaView style={[styles.globalContainer, { backgroundColor: category.color }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={Colors.zinc[700]} />
          </Pressable>
          <ScreenMainTitle title={category.title} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={newTaskText}
            onChangeText={setNewTaskText}
            placeholder="Ajouter une tâche..."
            placeholderTextColor={Colors.zinc[400]}
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
          />
        </View>

        <FlatList
          data={categoryTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.taskItem}
              onPress={() => toggleTask(item.id)}
            >
              <IconSymbol 
                name={item.completed ? "checkmark.circle.fill" : "circle"} 
                size={24} 
                color={item.completed ? Colors.green[500] : Colors.zinc[400]} 
              />
              <Text style={[
                styles.taskText,
                item.completed && styles.completedTask
              ]}>
                {item.text}
              </Text>
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
          )}
        />
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
    flex: 1,
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
    alignItems: 'center',
    gap: 10,
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.zinc[100],
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: Colors.zinc[700],
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
  }
}); 