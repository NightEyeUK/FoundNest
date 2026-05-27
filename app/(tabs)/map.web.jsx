import { StyleSheet, Text, View } from 'react-native';

import AppColors from '@/constants/AppColors';

export default function MapScreenWeb() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      <Text style={styles.message}>
        The map runs on the FoundNest mobile app (iOS or Android). Use a simulator or device
        with your development build to open this tab.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.surface,
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
});
