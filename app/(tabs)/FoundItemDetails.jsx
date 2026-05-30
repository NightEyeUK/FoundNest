import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLocalSearchParams, router } from 'expo-router';

const ItemDetails = () => {
  const { itemString } = useLocalSearchParams();
  const item = itemString ? JSON.parse(itemString) : null;
  
  // State to control the visibility of the "How to Claim" modal
  const [claimModalVisible, setClaimModalVisible] = useState(false);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <Text style={{color: '#666'}}>Loading item details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Details</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.imageUrl }} style={styles.mainImage} />
          <TouchableOpacity style={styles.expandIcon}>
            <Icon name="expand-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.itemTitle}>{item.title}</Text>

          <View style={styles.divider} />

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{item.category}</Text>
          </View>

          {item.description ? (
            <View style={styles.infoBlock}>
              <Text style={styles.label}>Description</Text>
              <Text style={[styles.value, {fontWeight: '400', lineHeight: 20}]}>{item.description}</Text>
            </View>
          ) : null}

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Location Found</Text>
            <Text style={styles.value}>{item.location}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Date & Time Found</Text>
            <Text style={styles.value}>{item.date}</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Current Location</Text>
            <Text style={styles.value}>{item.currentLocation}</Text>
          </View>

          <View style={styles.divider} />

          {/* Trigger the Modal to open */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setClaimModalVisible(true)}
          >
            <Text style={styles.primaryButtonText}>How to claim?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>View Office Location</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* How to Claim Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={claimModalVisible}
        onRequestClose={() => setClaimModalVisible(false)}
      >
        {/* Pressing the dark background will close the modal */}
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setClaimModalVisible(false)}
        >
          {/* Prevent touches inside the white card from closing the modal */}
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.dragHandle} />
              <Text style={styles.modalTitle}>How to Claim?</Text>
              
              <Text style={styles.stepTitle}>Step 1: Bring Proof</Text>
              <Text style={styles.stepDescription}>
                Please bring your BulSU Student ID/COR/or any form of identification and be ready to provide proof of ownership (e.g., describing a unique detail on an item, showing a photo of you while holding the item, or unlocking the item for devices).
              </Text>
              
              <Text style={styles.stepTitle}>Step 2: Visit the Office</Text>
              <Text style={styles.stepDescription}>
                Proceed to the FoundNest Office listed on the item details.
              </Text>
              
              <Text style={styles.stepTitle}>Step 3: Final Photo</Text>
              <Text style={styles.stepDescription}>
                Our staff will take a quick photo of the turnover for our security records and to finalize the process.
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAF5F0' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#A31D1D', 
    paddingVertical: 15, 
    paddingHorizontal: 15 
  },
  backButton: { 
    padding: 5, 
    backgroundColor: 'rgba(255,255,255,0.3)', 
    borderRadius: 20 
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  scrollContent: { 
    padding: 15, 
    paddingBottom: 40 
  },
  imageWrapper: { 
    width: '100%', 
    height: 300, 
    borderRadius: 15, 
    overflow: 'hidden', 
    marginBottom: 20, 
    backgroundColor: '#ccc' 
  },
  mainImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  expandIcon: { 
    position: 'absolute', 
    bottom: 15, 
    right: 15, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    padding: 8, 
    borderRadius: 20 
  },
  detailsCard: { 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    padding: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 5, 
    elevation: 2 
  },
  itemTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#000', 
    marginBottom: 8 
  },
  statusBadge: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#f0f0f0', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 12, 
    marginBottom: 15 
  },
  statusText: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#A31D1D' 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#EBEBEB', 
    marginBottom: 15 
  },
  infoBlock: { 
    marginBottom: 15 
  },
  label: { 
    fontSize: 13, 
    color: '#555', 
    marginBottom: 4 
  },
  value: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#000' 
  },
  primaryButton: { 
    backgroundColor: '#A31D1D', 
    borderRadius: 10, 
    paddingVertical: 15, 
    alignItems: 'center', 
    marginBottom: 12, 
    marginTop: 10 
  },
  primaryButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 15 
  },
  secondaryButton: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    borderWidth: 1.5, 
    borderColor: '#A31D1D', 
    paddingVertical: 14, 
    alignItems: 'center' 
  },
  secondaryButtonText: { 
    color: '#A31D1D', 
    fontWeight: 'bold', 
    fontSize: 15 
  },
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  /* --- Modal Styles --- */
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    paddingBottom: 80, // Extra padding at the bottom for navigation bar clearance
    width: '100%',
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#EBEBEB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default ItemDetails;