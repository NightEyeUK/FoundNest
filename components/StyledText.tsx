import { Text, type TextProps } from 'react-native';

import AppColors from '@/constants/AppColors';

export function MonoText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: 'SpaceMono', color: AppColors.textOnLight },
        props.style,
      ]}
    />
  );
}
