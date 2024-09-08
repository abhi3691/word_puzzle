/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView} from 'react-native';
import React from 'react';
import Routes from './src/routes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import colors from './src/assets/constants/colors';
import {
  TourGuideProvider, // Main provider
} from 'rn-tourguide';
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.black}}>
        <TourGuideProvider>
          <Routes />
        </TourGuideProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default App;
