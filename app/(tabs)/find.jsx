import { StyleSheet, Text, View } from 'react-native';

import AppColors from '@/constants/AppColors';

export default function FindScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find</Text>
      <Text style={styles.subtitle}>Search people, pets, and posts.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.background,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.surface,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
});
