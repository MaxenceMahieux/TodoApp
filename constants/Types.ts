import { ImageSourcePropType } from 'react-native';

export type Category = {
  title: string;
  color: string;
  icon: ImageSourcePropType;
}

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  categoryId: string;
}