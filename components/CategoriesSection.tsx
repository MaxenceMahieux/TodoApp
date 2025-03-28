import { Colors } from "@/constants/Colors";
import { Category } from "@/constants/Types";
import { Dimensions, FlatList, Image, StyleSheet, Text, View, Pressable } from "react-native";
import { router } from 'expo-router';
import { useTasks } from '@/contexts/TasksContext';
import { useMemo } from 'react';

interface Props {
  categories: Category[],
}

interface CategoryItemProps extends Category {
  taskCount: number;
}

function CategoryItem({ title, color, icon, taskCount }: CategoryItemProps) {
  const handlePress = () => {
    router.push(`/category/${title.toLowerCase()}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.categoryContainer, { backgroundColor: color }]}>
        <Image source={icon} />
        <View style={styles.textContainer}>
          <Text style={styles.categoryCount}>{taskCount}</Text>
          <Text style={styles.categoryTitle}>{title}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default function CategoriesSection({ categories }: Props) {
  const { tasks } = useTasks();

  const categoriesWithCount = useMemo(() => 
    categories.map(category => ({
      ...category,
      taskCount: tasks.filter(task => task.categoryId === category.title.toLowerCase()).length
    })), [categories, tasks]
  );

  return (
    <View>
      <FlatList 
        data={categoriesWithCount}
        numColumns={2}
        renderItem={({ item }) => (
          <CategoryItem 
            title={item.title} 
            color={item.color} 
            icon={item.icon}
            taskCount={item.taskCount}
          />
        )}
        columnWrapperStyle={{ gap }}
        scrollEnabled={false}
      />
    </View>
  )
}

const { width } = Dimensions.get('window');
const containerWidth = width - 40;
const gap = 8;
const categoryWidth = (containerWidth - gap) / 2;

const styles = StyleSheet.create({
  categoryContainer: {
    width: categoryWidth,
    flexDirection: 'column',
    padding: 16,
    marginBottom: gap,
    borderRadius: 12,
    gap: 16,
  },
  categoryTitle: {
    color: Colors.zinc[500],
    fontWeight: 500,
    fontFamily: 'Inter',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 4
  },
  categoryCount: {
    fontWeight: 700,
    fontFamily: 'Inter',
    color: Colors.zinc[700],
  }
});
