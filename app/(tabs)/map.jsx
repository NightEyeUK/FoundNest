import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

// 1. Tell MapLibre we don't need a paid API key
MapLibreGL.setAccessToken(null);

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapLibreGL.MapView
        style={styles.map}
        // 2. Load a 100% free, open-source map style design
        styleURL="https://demotiles.maplibre.org/style.json" 
        logoEnabled={false}
        attributionEnabled={true}
      >
        {/* 3. The Camera controls where the map looks (Manila Area) */}
        <MapLibreGL.Camera
          zoomLevel={13}
          centerCoordinate={[120.9842, 14.5995]} // [Longitude, Latitude]
          animationDuration={0}
        />

        {/* 4. A Native Pinpoint Marker */}
        <MapLibreGL.PointAnnotation
          id="lostItemMarker"
          coordinate={[120.9842, 14.5995]} // [Longitude, Latitude]
        >
          {/* You can design this marker using standard View/Text styling */}
          <View style={styles.markerContainer}>
            <View style={styles.markerCore} />
          </View>
        </MapLibreGL.PointAnnotation>

      </MapLibreGL.MapView>
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
  markerContainer: {
    height: 24,
    width: 24,
    backgroundColor: 'rgba(144, 0, 0, 0.2)', // Light red halo
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerCore: {
    height: 12,
    width: 12,
    backgroundColor: '#900000', // Solid red center matching your brand
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  }
});