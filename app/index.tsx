
import React from 'react'
import { View } from 'react-native';
import { GlobalStyles } from '../styles';
import SplashScreen from './SplashScreen';
import {  useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { StatusBar } from 'expo-status-bar';

const index = () => {
  const accountInfo = useSelector((state: RootState) => state.accountInfo); 
  return(
    <View style={GlobalStyles.container}>
      <SplashScreen/> 
      <StatusBar style='dark' />
    </View>
  )
}
export default index