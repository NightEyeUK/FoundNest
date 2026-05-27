import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AppColors from '@/constants/AppColors';

function OfficeBanner({ office }) {
  const [imageFailed, setImageFailed] = useState(false);
  
  const imageUri = typeof office.image === 'string' ? office.image.trim() : null;
  console.log(imageUri)
  const localImage = typeof office.image === 'number' ? office.image : null;

  useEffect(() => {
    setImageFailed(false);
  }, [office.id, imageUri, localImage]);

  const showImage = (localImage != null || Boolean(imageUri)) && !imageFailed;

  return (
    <View style={styles.imageBanner}>
      {showImage ? (
        <Image
          source={localImage != null ? localImage : { uri: imageUri }}
          style={styles.bannerImage}
          resizeMode="cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <View style={[styles.bannerFallback, { backgroundColor: office.color || AppColors.background }]}>
          <Text style={styles.bannerFallbackAcronym}>{office.acronym}</Text>
        </View>
      )}

      <View style={styles.imageOverlay}>
        <Text style={styles.imageTextHeader}>
          {office.emoji} {office.building}
        </Text>
        <Text style={styles.imageTextSub}>Hours: {office.operatingHours}</Text>
      </View>
    </View>
  );
}

export default function OfficeModal({ visible, onClose, office }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  if (!office) {
    return null;
  }

  const headerTitle = `${office.building} — FoundNest Office`;
  const subtitle = `${office.acronym} · ${office.name}`;

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}>
        <TouchableOpacity style={styles.backgroundTap} onPress={onClose} activeOpacity={1} />

        <View style={styles.sheetContainer}>
          <View style={styles.dragHandle} />
          <View style={styles.header}>
            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle} numberOfLines={3}>
                {headerTitle}
              </Text>
              <Text style={styles.headerSubtitle} numberOfLines={2}>
                {subtitle}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <OfficeBanner office={office} />

            <View style={styles.contentPadding}>
              <Text style={styles.description}>{office.description}</Text>

              <View style={styles.divider} />

              <View style={styles.ratingOverview}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.hugeScore}>5.0</Text>
                  <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                  <Text style={styles.reviewCount}>(1)</Text>
                </View>
                <View style={styles.barsContainer}>
                  <View style={styles.barRow}>
                    <View style={[styles.bar, { width: '100%' }]} />
                  </View>
                  <View style={styles.barRow}>
                    <View style={[styles.bar, { width: '0%' }]} />
                  </View>
                  <View style={styles.barRow}>
                    <View style={[styles.bar, { width: '0%' }]} />
                  </View>
                  <View style={styles.barRow}>
                    <View style={[styles.bar, { width: '0%' }]} />
                  </View>
                  <View style={styles.barRow}>
                    <View style={[styles.bar, { width: '0%' }]} />
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Rate and Review</Text>
              <View style={styles.starSelector}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Text style={[styles.starIcon, rating >= star && styles.starSelected]}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                style={styles.textInput}
                placeholder="Tell others about your experience at this office."
                multiline
                numberOfLines={4}
                value={reviewText}
                onChangeText={setReviewText}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={[styles.postButton, reviewText.length > 0 && styles.postButtonActive]}>
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.avatar} />
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerId}>2023100450</Text>
                    <Text style={styles.smallStars}>⭐⭐⭐⭐⭐</Text>
                  </View>
                  <Text style={styles.timeAgo}>1 hour ago</Text>
                </View>
                <Text style={styles.reviewBody}>
                  Office was easy to find. Just follow the map pins in the app.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backgroundTap: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: AppColors.surface,
    height: '85%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDDDDD',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.background,
  },
  headerSubtitle: {
    fontSize: 12,
    color: AppColors.textMuted,
    marginTop: 4,
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 18,
    color: AppColors.background,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageBanner: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    backgroundColor: AppColors.separator,
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerFallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerFallbackEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  bannerFallbackAcronym: {
    fontSize: 22,
    fontWeight: '800',
    color: AppColors.surface,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 12,
  },
  imageTextHeader: {
    color: AppColors.surface,
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageTextSub: {
    color: AppColors.surface,
    fontWeight: '500',
    fontSize: 14,
    marginTop: 4,
  },
  contentPadding: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.textOnLight,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  hugeScore: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  stars: {
    fontSize: 12,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  barsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 60,
  },
  barRow: {
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.separator,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  starIcon: {
    fontSize: 32,
    color: '#CCCCCC',
  },
  starSelected: {
    color: '#FFD700',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    height: 100,
    backgroundColor: '#FAFAFA',
  },
  postButton: {
    backgroundColor: '#A09696',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  postButtonActive: {
    backgroundColor: AppColors.background,
  },
  postButtonText: {
    color: AppColors.surface,
    fontWeight: 'bold',
  },
  reviewItem: {
    marginTop: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#A0A0FF',
    marginRight: 10,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerId: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  smallStars: {
    fontSize: 10,
  },
  timeAgo: {
    fontSize: 10,
    color: '#888',
  },
  reviewBody: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});