import { Colors } from "@/constants/Colors";
import { Category } from "@/constants/Types";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";

interface Props {
  categories: Category[],
}

function CategoryItem({ title, color, icon }: Category) {
  return (
    <View style={[styles.categoryContainer, { backgroundColor: color }]}>
      <Image source={icon} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryCount}>0</Text>
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
    </View>
  )
}

export default function CategoriesSection({ categories }: Props) {
  return (
    <View>
      <FlatList 
        data={categories}
        numColumns={2}
        key={2}
        renderItem={({ item }) => <CategoryItem title={item.title} color={item.color} icon={item.icon} />}
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
