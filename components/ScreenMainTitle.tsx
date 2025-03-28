import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  subtitle: string;
}

export default function ScreenMainTitle({ title, subtitle }: Props) {
  return (
    <View style={styles.globalContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  globalContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    fontFamily: 'Inter',
    color: Colors.zinc[700],
  },
  subtitle: {
    fontSize: 36,
    fontFamily: 'Inter',
    color: Colors.zinc[700],
    fontWeight: 500,
    opacity: 0.3,
  },
})