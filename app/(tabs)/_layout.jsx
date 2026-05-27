import { Tabs } from 'expo-router';

import CustomTabBar from '@/components/CustomTabBar';
import CustomHeader from '@/components/CustomHeader';
export default function TabLayout() {
  
    return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        header: ({options}) => ( 
        <CustomHeader title = {options.title} />
        ),
        
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="map" options={{ title: 'Map' }} />
      <Tabs.Screen name="report" options={{ title: 'Report' }} />
      <Tabs.Screen name="find" options={{ title: 'Find' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen
        name="officeModal"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="reportNextPage"
        options={{
          title: 'Report',
          href: null,
        }}
      />

      </Tabs>
    )
}