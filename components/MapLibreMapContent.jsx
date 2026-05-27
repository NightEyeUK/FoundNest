import { Map } from '@maplibre/maplibre-react-native';
import { StyleSheet, View } from 'react-native';

export default function MapLibreMapContent() {
  return (
    <View style={styles.container}>
      <Map style={styles.map} mapStyle="https://demotiles.maplibre.org/style.json" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1E0',
  },
  map: {
    flex: 1,
  },
});
