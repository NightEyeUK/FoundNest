import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  Image,
  ActivityIndicator // Added to show loading spinner
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { category } from '@/constants/category';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker'; 
import * as FileSystem from 'expo-file-system/legacy'; // Added for Base64 conversion
import { DescribeItem } from '@/constants/geminiAI'
import AppColors from '@/constants/AppColors';
import { useRouter } from 'expo-router';
import { getCategories } from '@/constants/category'; // Import the function to fetch categories

export default function Report() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [contents, setContents] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const router = useRouter();
  const [categoriesFromAPI, setCategoriesFromAPI] = useState([]); // Initialize with an empty array


  // Fetch categories from the backend API
  React.useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategoriesFromAPI(categories);
      console.log("Categories set in state:", categories); // Log the categories to verify they are set
    };
    fetchCategories();
  }, []);
getCategories();
  // AI Processing Function
  const analyzeImage = async (uri) => {
     // Fetch categories from the backend API
    setIsLoading(true);
    try {
      // 1. Convert local URI to Base64
      const base64Data = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64'
      });

      // 2. Send to Gemini
      const aiResult = await DescribeItem({
        base64Data: base64Data,
        mimeType: "image/jpeg"
      });

      // 3. Auto-fill the inputs if Gemini returns data
      if (aiResult) {
        setItemName(aiResult.itemName || "");
        setDetailedDescription(aiResult.detailedDescription || "");
        setContents(aiResult.contents || "");
        
        if (category.includes(aiResult.category)) {
          setSelectedCategory(aiResult.category);
        }
      }
    } catch (error) {
      console.error("AI Analysis Failed:", error);
      Alert.alert("AI Error", "Failed to auto-fill details. Please fill them out manually.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImagePickOptions = () => {
    Alert.alert(
      "Upload Item Photo",
      "Choose a source for your photo:",
      [
        {
          text: "Use Camera",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            if (!permissionResult.granted) {
              Alert.alert("Permission Denied", "You need to allow camera access to take photos.");
              return;
            }
            
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: false,
              aspect: [4, 3],
              quality: 0.8,
            });

            if (!result.canceled) {
              const uri = result.assets[0].uri;
              setSelectedImage(uri);
              analyzeImage(uri); // Trigger AI analysis
            }
          }
        },
        {
          text: "Pick from Gallery",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
              Alert.alert("Permission Denied", "You need to allow library access to select files.");
              return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: false,
              aspect: [4, 3],
              quality: 0.8,
            });

            if (!result.canceled) {
              const uri = result.assets[0].uri;
              setSelectedImage(uri);
              analyzeImage(uri); // Trigger AI analysis
            }
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screenContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Lost Item Report Form</Text>
        <Text style={styles.subTitle}>Item Description</Text>
        
        <View style={styles.uploadCardWrapper}>
          <View style={styles.card}>
            
            <TouchableOpacity 
              style={styles.uploadTarget} 
              activeOpacity={0.7}
              onPress={handleImagePickOptions}
              disabled={isLoading} // Prevent taps while loading
            >
              {/* Display Loading Spinner, Image, or Add Button */}
              {isLoading ? (
                <View style={[styles.dashedRing, { borderColor: '#CCC' }]}>
                   <ActivityIndicator size="large" color="#900000" />
                </View>
              ) : selectedImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: selectedImage }} style={styles.previewImage} />
                  <View style={styles.changeBadge}>
                    <MaterialIcons name="edit" size={16} color="#FFFFFF" />
                  </View>
                </View>
              ) : (
                <View style={styles.dashedRing}>
                  <View style={styles.solidCircle}>
                    <MaterialIcons name="add" size={32} color="#FFFFFF" />
                  </View>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.titleText}>
              {isLoading ? "Analyzing image..." : "Upload Item Photo (Optional)"}
            </Text>
            <Text style={styles.subText}>
              *FoundNest AI will help auto-fill details based on your photo.
            </Text>
          </View>
        </View>

        {/* Category */}
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.picker}>
          <Picker 
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Select a category..." value="" color="#8C7A70" />
            {category.map((cat, index) => (
              <Picker.Item key={index} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        {/* Item Name */}
        <Text style={styles.sectionTitle}>Item Name</Text>
        <TextInput 
          style={styles.picker}
          placeholder='e.g., iPhone 13 Pro Max, Bag, Umbrella'
          placeholderTextColor="#8C7A70"
          value={itemName}
          onChangeText={(text) => setItemName(text)}
        />

        {/* Detailed Description */}
        <Text style={styles.sectionTitle}>Detailed Description</Text>
        <TextInput 
          style={[styles.picker, styles.multilineInput]} 
          multiline={true}
          numberOfLines={8}
          textAlignVertical='top'
          placeholder='Brand, Model, Size, Color, Material, etc.'
          placeholderTextColor="#8C7A70"
          value={detailedDescription}
          onChangeText={(text) => setDetailedDescription(text)}
        />
          
        {/* Contents */}
        <Text style={styles.sectionTitle}>Contents (if applicable)</Text>
        <TextInput 
          style={styles.picker}
          placeholder='e.g., wallet contents, keys, notes...'
          placeholderTextColor="#8C7A70"
          value={contents}
          onChangeText={(text) => setContents(text)}
        />


        {/*Next Section*/}
        <View style={styles.nextSection}>
          <Text style={styles.pageIndicator}>Page 1 out of 2</Text>
          <TouchableOpacity style={styles.nextButton}
          onPress={()=> router.push('/reportNextPage')}
          >
            
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF1E0', 
    paddingBottom: 40,
  },
  title: {
    backgroundColor: AppColors.background,
    fontSize: 22,
    fontWeight: '700',
    color: AppColors.surface,
    padding: 20,
  },
  subTitle: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    fontSize: 17,
    fontWeight: '900',
    color: AppColors.textOnLight,
    padding: 20,
    paddingLeft: 10,
    paddingBottom: 15,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  uploadCardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: AppColors.surface, 
    borderRadius: 28, 
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 450,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  uploadTarget: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedRing: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    borderWidth: 1.5,
    borderColor: '#900000', 
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  solidCircle: {
    width: 60,
    height: 60,
    borderRadius: 30, 
    backgroundColor: '#900000', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#6B5A52', 
    textAlign: 'center',
    marginBottom: 14,
  },
  subText: {
    fontSize: 13,
    color: '#8C7A70', 
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: AppColors.textOnLight,
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  picker: {
    marginHorizontal: 20,
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: 'center',
    fontSize: 16,
  },
  multilineInput: {
    height: 140,
    paddingTop: 12,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFF1E0', 
  },
  imagePreviewContainer: {
    width: 110,
    height: 110,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20, 
  },
  changeBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#900000',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nextSection:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '20',
    marginTop: '20',
    paddingVertical: '30',
    borderTopWidth:1,
    borderColor: 'rgba(0, 0, 0, 0.24)',
 
    alignItems: 'center'
  },
  pageIndicator:{
    fontWeight: 'bold'
  },
  nextButton:{
    padding: '10',
    paddingHorizontal: 30,
    backgroundColor: AppColors.background,
    color: AppColors.surface,
    borderRadius: 10
  },
  buttonText:{
    color: AppColors.surface
  }
});