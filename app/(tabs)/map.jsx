import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, Text } from 'react-native';
import { Camera, Map, Marker, NativeUserLocation } from '@maplibre/maplibre-react-native';
import * as Location from 'expo-location';

import OfficeModal from './officeModal';
import { bulsuColleges } from '@/constants/centerLocation';

useEffect(() => {
    fetch("http://foundnest-backend.onrender.com/api/colleges")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
     
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

const BULSU_CENTER = [120.8142, 14.8582];

const highDetailHybridStyle = {
  version: 8,
  sources: {
    'google-hybrid': {
      type: 'raster',
      tiles: ['https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'],
      tileSize: 256,
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: 'google-hybrid-layer',
      type: 'raster',
      source: 'google-hybrid',
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

export default function MapScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isWakingGPS, setIsWakingGPS] = useState(true);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [cameraConfig, setCameraConfig] = useState({
    center: BULSU_CENTER,
    zoom: 17, 
    animationDuration: 2000,
  });

  useEffect(() => {
    async function activateAndFetchGPS() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert(
            'Location access',
            'FoundNest can still show campus offices. Enable location to see your distance from them.',
          );
          setIsWakingGPS(false);
          return;
        }

        setHasPermission(true);

        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      } catch (err) {
        console.warn('GPS lock failed:', err);
      } finally {
        setIsWakingGPS(false);
      }
    }

    activateAndFetchGPS();
  }, []);

  function handleMarkerPress(college) {
    setSelectedOffice(college);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
    setSelectedOffice(null);
  }

  return (
    <View style={styles.container}>
      {isWakingGPS && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#900000" />
        </View>
      )}

      <Map
        style={styles.map}
        mapStyle={JSON.stringify(highDetailHybridStyle)}
        logoEnabled={false}
        attributionEnabled={false}>
        <Camera
          center={cameraConfig.center}
          zoom={cameraConfig.zoom}
          animationDuration={cameraConfig.animationDuration}
        />

        {hasPermission && !isWakingGPS && <NativeUserLocation />}

        {bulsuColleges.map((college) => (
          <Marker
            key={college.id}
            id={college.id}
            lngLat={college.coordinates}
            anchor="bottom" // Ensures the pointy tip rests exactly on the coordinate
            onPress={() => handleMarkerPress(college)}>
            
            <View style={styles.markerContainer}>
              
              {/* Main Rounded Bubble holding the Text */}
              <View style={[styles.pinBubble, { backgroundColor: college.color }]}>
                {/* We can include the emoji from your database here too! */}
                <Text style={styles.pinText}>{college.emoji} {college.acronym}</Text>
              </View>

              {/* The sharp downward triangle that creates the "Pin" look */}
              <View style={[styles.pinTriangle, { borderTopColor: college.color }]} />
              
            </View>

          </Marker>
        ))}
      </Map>

      <OfficeModal visible={modalVisible} onClose={handleCloseModal} office={selectedOffice} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 241, 224, 0.8)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    // Adds a slight drop shadow to the entire pin
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  pinBubble: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  pinTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 0,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1.5, // Pulls the triangle slightly up so it perfectly merges with the bubble's border
  }
}); 