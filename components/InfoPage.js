/* @flow */
// https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native
import React, { useState, useEffect, memo } from 'react'
import {FlatList, StyleSheet, Image, View, ScrollView} from 'react-native';
import { Appbar, Text, Button, List, DefaultTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

/* this is the entry point for the file */
export const InfoPage = ({ navigation }) => {

  /* Render to Phone */
  return (
    <>
      {/* Similar to NavBar but without navigation */}
      <Appbar>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={'COVID-19 Guideline'} />
      </Appbar>

      <ScrollView>
          <Appbar style = {style.header}>
            <Appbar.Content title={'Help Prevent COVID-19 Spread'} style={style.headerText} />
          </Appbar>

          <View style = {style.logo}>
            <Image source={require('./resources/who.png')} style={style.icon}/>
          </View>

          <View style = {style.tips}>

          <View style = {style.tipRow}>
            <Image source={require('./resources/stayhome.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipRed}>STAY</Text>
                <Text style={style.tipBlack}> home as much as you can</Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/distance.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipRed}>KEEP</Text>
                <Text style={style.tipBlack}> a safe distance</Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/wash.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipRed}>WASH</Text>
                <Text style={style.tipBlack}> hands often</Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/cover.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipRed}>COVER</Text>
                <Text style={style.tipBlack}> your cough</Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/call.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipRed}>SICK?</Text>
                <Text style={style.tipBlack}> Call ahead</Text>
            </View>
          </View>
          </View>

          <Appbar style = {style.header}>
            <Appbar.Content title={'Experiencing Symptoms?'} style={style.headerText}/>
          </Appbar>

          <View style = {style.tips}>

          <View style = {style.tipRow}>
            <Image source={require('./resources/indoor.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipBlack}>Do not go to school or work and avoid outdoor activites</Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/home.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipBlack}>Take a rest at home and monitor your symptoms for 3-4 days</Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/hospital.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipBlack}>Consult with the CDC, when a fever continues or other symptoms get worse </Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/facemask.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipBlack}>Use a personal vehicle and wear a facemask when visiting a health facility</Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/history.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipBlack}>Inform health officials if you have been in contact with people experiencing symptoms</Text>
            </View>
          </View>

          <View style = {style.tipRow}>
            <Image source={require('./resources/doctor.png')} style={style.tipIcon}/>
            <View style={style.tipText}>
                <Text style={style.tipBlack}>Please follow guidance provided by public health authorities</Text>
            </View>
          </View>
          </View>

      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  header: {
    backgroundColor: "#0D3B66"
  },
  headerText: {
    alignItems: 'center'
  },
  icon: {
    height: 70,
    width: 229
  },
  logo: {
    alignItems: 'center',
    paddingTop: 15
  },
  tips: {
    paddingLeft: 50,
    paddingTop: 30,
    paddingBottom: 30
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  },
  tipIcon: {
    height: 90,
    width: 90
  },
  tipRed: {
    fontWeight: 'bold',
    color: '#F95F62',
    fontSize: 15
  },
  tipBlack: {
    fontSize: 15,
    flexWrap: 'wrap',
    width: 200
  },
  tipText: {
    flexDirection: 'row',
    padding: 15
  },
});

export default memo(InfoPage);
