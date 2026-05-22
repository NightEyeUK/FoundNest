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

export default function ReportNextPage() {
  const router = useRouter();
  
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openClock, setOpenClock] = useState(false);

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
        <TouchableOpacity 
          onPress={() => {
            setOpenCalendar(true); 
          }}
        >
          <View style={styles.dataPickerButton}>
        
            <Text>{date.toLocaleDateString()}</Text>
            <MaterialIcons name="calendar-month" size={24} color={AppColors?.background || '#000'} />
          </View>
        </TouchableOpacity>

        
        <Text style={styles.sectionTitle}>Time Lost</Text>
        <TouchableOpacity 
          onPress={() => {
            setOpenClock(true); 
          }}
        >
          <View style={styles.dataPickerButton}>
            {/* Show dynamic time instead of static mm/dd/yyyy */}
            <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <MaterialIcons name="access-time" size={24} color={AppColors?.background || '#000'} />
          </View>
        </TouchableOpacity>

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
            
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>  

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
    marginHorizontal: 20, // 4. Fixed: Removed string quotes from numbers
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
    padding: 10, // 4. Fixed: Removed string quotes from numbers
    paddingHorizontal: 30,
    backgroundColor: AppColors?.background || '#000',
    borderRadius: 10
  },
  cancelButton:{
    padding: 10, // 4. Fixed: Removed string quotes from numbers
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
    alignItems: 'center', // Centers the text and icon vertically
    flexDirection: 'row',
    marginHorizontal: 20,
    padding: 12, 
    backgroundColor: '#fff', // Added background so it stands out from the screen
    borderRadius: 8,
  }
});