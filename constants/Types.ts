import { ImageSourcePropType } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type Category = {
  title: string;
  color: string;
  icon: React.FC<SvgProps>;
}

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  categoryId: string;
}