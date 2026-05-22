import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';

import AppColors from '@/constants/AppColors';
import EditScreenInfo from '@/components/EditScreenInfo';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  
  const [search, setSearch] = useState("")
  const router = useRouter();

  const studentData = {
    fullName:{
      firstName: "Ben David",
      lastName: "Senin",
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View>
      <Text style={styles.title}>Hello, {studentData.fullName.firstName}!</Text>
      <Text style={styles.title}>Searching for something?</Text>
      <View style={styles.separator} />
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search" size={20} color="#000"/>
        <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder='Search the Nest (e.g, Wallet, Bag, etc...)'
          />
      </View>

      <Text style={styles.subtitle} paddingBottom={10}>How can the Nest help you today?</Text>

      {/*3 layers choice */}
      
      <View style={styles.choiceContainer}>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}
      onPress={()=>{router.push('/(tabs)/report')}}>
        
        {/* Left Icon: Document with Plus Sign */}
        <View style={styles.iconContainer}>
           <Ionicons name="document-text-outline" size={55} color={AppColors.background} />
        </View>

        {/* Middle Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Lost an Item?</Text>
          <Text style={styles.subTitleText}>
            File a detailed report to start the search.
          </Text>
        </View>

        {/* Right Arrow Icon */}
        <View style={styles.arrowContainer}>
           <Ionicons name="chevron-forward-outline" size={24} color={AppColors.background} />
        </View>

      </TouchableOpacity>
    </View>

    <View style={styles.choiceContainer}>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}
      onPress={()=>{router.push('/(tabs)/find')}}>
        
        {/* Left Icon: Document with Plus Sign */}
        <View style={styles.iconContainer}>
          <Ionicons name="search" size={55} color={AppColors.background} />
        </View>

        {/* Middle Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Looking for an Item?</Text>
          <Text style={styles.subTitleText}>
            Check for your lost item here!
          </Text>
        </View>

        {/* Right Arrow Icon */}
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward-outline" size={24} color={AppColors.background} />
        </View>

      </TouchableOpacity>
    </View>

    <View style={styles.choiceContainer}>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}
      onPress={()=>{router.push('/(tabs)/map')}}>
        
        {/* Left Icon: Document with Plus Sign */}
        <View style={styles.iconContainer}>
          <Ionicons name="location-outline" size={55} color={AppColors.background} />
        </View>

        {/* Middle Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>Found an Item?</Text>
          <Text style={styles.subTitleText}>
            Find authorized offices to surrender or claim an item
          </Text>
        </View>

        {/* Right Arrow Icon */}
        <View style={styles.arrowContainer}>
           <Ionicons name="chevron-forward-outline" size={24} color={AppColors.background} />
        </View>

      </TouchableOpacity>
    </View>
        

        
        
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    padding: 20,
    paddingTop: 30
  },
  title:{
    color: AppColors.surface,
    fontSize: 25,
    fontWeight: '900'
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  searchSection: {
    marginTop: 25, 
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 13,
    paddingHorizontal: 10,
    elevation:10
  },
   searchIcon: {
    color: AppColors.background,
    padding: 10,
  },
  subtitle:{
    color: AppColors.surface,
    fontSize: 20,
    fontWeight: '600',
    borderBottomColor: '#e4e4e473',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingBottom: 10
  },
  //CSS for card
  choiceContainer: {
    flex: 1,
    backgroundColor: AppColors.background, // Deep red background from the image perimeter
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF8F0', // Warm off-white/cream background
    borderRadius: 24, // Generous rounded corners
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
    width: '100%',
    // Subtle bottom/right shadow to mimic the 3D pop effect in the image
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 0, 
    elevation: 4, // Elevation fallback for Android
  },
  iconContainer: {
    marginRight: 14,
  },
  textContainer: {
    flex: 1, // Takes up remaining middle space pushing the arrow to the right
    paddingRight: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#900000', // Matching dark red text color
    marginBottom: 4,
  },
  subTitleText: {
    fontSize: 15,
    color: '#5C4A42', // Soft, muted dark brown/grey for body copy
    lineHeight: 20,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});
