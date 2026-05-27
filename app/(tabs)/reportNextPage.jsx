import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { MaterialIcons } from '@expo/vector-icons';
import AppColors from '@/constants/AppColors';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Ensure these match your actual file paths!
import { bulsuColleges } from '@/constants/centerLocation';
import { gates } from '@/constants/Gates';
import { sharedStudentSpaces } from '@/constants/SharedStudentSpaces';


// --- 1. CUSTOM CHECKBOX COMPONENT ---
const CustomCheckbox = ({ label, value, onValueChange }) => {
  return (
    <TouchableOpacity 
      style={styles.checkboxContainer} 
      onPress={() => onValueChange(!value)} 
    >
      <MaterialIcons 
        name={value ? "check-box" : "check-box-outline-blank"} 
        size={24} 
        color={AppColors?.background || '#000'} 
      />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};


// --- 2. EXPANDABLE DROPDOWN COMPONENT ---
const ExpandableDropdown = ({ title, data, onSelectionChange }) => {
  
  // FIXED: Hooks must be inside the component!
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }]
    }
  });

  // Safely format the incoming data. 
  const formattedData = Array.isArray(data) 
    ? data.map(item => (typeof item === 'object' && item !== null && item.name) ? item.name : item)
    : [];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); 

  const handlePress = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    rotation.value = withTiming(nextState ? 180 : 0, { duration: 300 });
  };

  const toggleCheckbox = (item) => {
    let newSelection = [...selectedItems];
    if (newSelection.includes(item)) {
      newSelection = newSelection.filter((i) => i !== item); 
    } else {
      newSelection.push(item); 
    }
    setSelectedItems(newSelection);
    
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  return (
    <View style={styles.dropdownWrapper}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.dataPickerButton}>
          <Text>{title}</Text>
          <Animated.View style={animatedStyle}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={AppColors?.background || '#000'}/>
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Renders the list only if open and if formattedData has items */}
      {isOpen && formattedData.length > 0 && (
        <View style={styles.dropdownList}>
          {formattedData.map((item, index) => (
            <CustomCheckbox
              key={index}
              label={item}
              value={selectedItems.includes(item)} 
              onValueChange={() => toggleCheckbox(item)}
            />
          ))}
        </View>
      )}
    </View>
  );
};


// --- 3. MAIN PAGE COMPONENT ---
export default function ReportNextPage() {
  const router = useRouter();
  
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openClock, setOpenClock] = useState(false);
  
  // State to hold the final selected data
  const [cantRemember, setCantRemember] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [selectedGates, setSelectedGates] = useState([]);
  const [showLocation, setShowLocation] = useState(false);

  // NEW: Animation for the Main "Select Location" button
  const mainRotation = useSharedValue(0);
  const mainAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${mainRotation.value}deg` }]
    };
  });

  const handleMainLocationPress = () => {
    const nextState = !showLocation;
    setShowLocation(nextState);
    mainRotation.value = withTiming(nextState ? 180 : 0, { duration: 300 });
  };

  // Submit Function
  const handleSubmit = () => {
    const reportData = {
      date: date.toLocaleDateString(),
      time: time.toLocaleTimeString(),
      colleges: selectedColleges,
      spaces: selectedSpaces,
      gates: selectedGates,
      cantRemember: cantRemember
    };
    
    console.log("Submitting this report:", JSON.stringify(reportData, null, 2));
    // TODO: Send reportData to your backend API here
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={openCalendar}
        date={date}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(selectedDate) => {
          setOpenCalendar(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpenCalendar(false); 
        }}
      />
      
      {/* Time Picker Modal */}
      <DatePicker
        modal
        open={openClock}
        mode="time"
        date={time}
        onConfirm={(selectedTime) => {
          setOpenClock(false);
          setTime(selectedTime);
        }}
        onCancel={() => {
          setOpenClock(false); 
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Lost Item Report Form</Text>
        <Text style={styles.subTitle}>When & Where</Text>
        
        <Text style={styles.sectionTitle}>Date Lost</Text>
        <TouchableOpacity onPress={() => setOpenCalendar(true)}>
          <View style={styles.dataPickerButton}>
            <Text>{date.toLocaleDateString()}</Text>
            <MaterialIcons name="calendar-month" size={24} color={AppColors?.background || '#000'} />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Time Lost</Text>
        <TouchableOpacity onPress={() => setOpenClock(true)}>
          <View style={styles.dataPickerButton}>
            <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <MaterialIcons name="access-time" size={24} color={AppColors?.background || '#000'} />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Select Location</Text>
        
        {/* Main Select Location Button with Animation and Conditional Styling */}
        <TouchableOpacity onPress={handleMainLocationPress} style={styles.dropdownWrapper}>
          <View style={[
            styles.dataPickerButton, 
            { backgroundColor: showLocation ? '#c7c7c7' : '#ffffff' }
          ]}>
            <Text style={{ fontWeight: '600' }}>Select Location</Text>
            <Animated.View style={mainAnimatedStyle}>
              <MaterialIcons name="keyboard-arrow-down" size={24} color={AppColors?.background || '#000'}/>
            </Animated.View>
          </View>
        </TouchableOpacity>
        
        {/* Conditionally render the sub-locations */}
        {showLocation && (
          <View style={styles.nestedLocations}>
            <ExpandableDropdown 
              title="College Buildings" 
              data={bulsuColleges} 
              onSelectionChange={setSelectedColleges}
            />

            <ExpandableDropdown 
              title="Shared Student Space" 
              data={sharedStudentSpaces} 
              onSelectionChange={setSelectedSpaces}
            />
          
            <ExpandableDropdown 
              title="Gates" 
              data={gates} 
              onSelectionChange={setSelectedGates}
            />
          
            <CustomCheckbox 
              label="Can't Remember Location" 
              value={cantRemember}
              onValueChange={setCantRemember}
            />
          </View>
        )}

        {/* Next Section */}
        <View style={styles.nextSection}>
          <Text style={styles.pageIndicator}>Page 2 out of 2</Text>
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => { router.push('/(tabs)/report') }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>  

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- 4. STYLESHEET ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1E0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  title: {
    backgroundColor: AppColors?.background || '#000',
    fontSize: 22,
    fontWeight: '700',
    color: AppColors?.surface || '#fff',
    padding: 20,
  },
  subTitle: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    fontSize: 17,
    fontWeight: '900',
    color: AppColors?.textOnLight || '#000',
    padding: 20,
    paddingLeft: 10,
    paddingBottom: 15,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  nextSection:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20, 
    marginTop: 20,
    paddingVertical: 30,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.24)',
    alignItems: 'center'
  },
  pageIndicator:{
    fontWeight: 'bold'
  },
  submitButton:{
    padding: 10, 
    paddingHorizontal: 30,
    backgroundColor: AppColors?.background || '#000',
    borderRadius: 10
  },
  cancelButton:{
    padding: 10, 
    paddingHorizontal: 30,
    backgroundColor: AppColors?.background || '#000',
    borderRadius: 10
  },
  buttonText:{
    color: AppColors?.surface || '#fff'
  },
  buttonSection:{
    display: 'flex',
    gap: 5,
    flexDirection: 'row'
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: AppColors?.textOnLight || '#000',
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  dataPickerButton:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', 
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10, 
    padding: 12, 
    backgroundColor: '#fff', 
    borderRadius: 8,
  },
  nestedLocations: {
    // Optional: Add a slight left margin or border here if you want 
    // the sub-dropdowns to visually look "inside" the Select Location tab
    marginTop: 5,
  },
  // Checkbox Styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 5,
    paddingRight: 10
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: AppColors?.textOnLight || '#000',
  },
  // Dropdown Styles
  dropdownWrapper: {
    marginBottom: 10,
  },
  dropdownList: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingTop: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -15, 
    paddingBottom: 10,
  },
});