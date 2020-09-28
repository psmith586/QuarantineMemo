# QuarantineMemo

Description
------------
The main purpose of Quarantine Memo is to allow the user to keep track of their symptoms and whereabouts daily so this information can help health officials treat patients who are COVID-19 positive more effectively--potentially saving many lives.

Video Demonstration: https://www.youtube.com/watch?v=Sr88OL4tS4E

Requirements 
------------

Android Studio
build-tools: latest
SDK command line tools: latest
Android Emulator: 30^
SDK platform tools: 29^
Intell HAXM installer: latest

Initialize:
-----------
Follow steps to create an Project with an Android App in Firebase Console  

$ git clone repo

--> copy "google-services.json" to ./android/app/
--> create a file "local.properties" in ./android/ (if it does not already exist)

GOTO "SDK Manager" in Android Studio
Copy "Android SDK Location:"
Write "sdk.dir = Android SDK Location" into local.properties
    For example: "sdk.dir = /Users/Robin/Library/Android/sdk"

$ npm install
$ cd android 
$ ./gradlew clean

Build:
--------
Android Studio:

open android/ in Android Studio (gradle should sync automatically)
Click "Build" (hammer icon)

Node:
cd android && ./gradlew clean

Run:
---------
Step 1:

--> Start Metro Server:

  QuarantineMemo$ npm start 

Step 2 (choose 1):

  --> Android Studio:

  Click Run 'app' in Android Studio (play button)

  --> 2nd terminal (with metro server running in first terminal)
  
  QuarantineMemo$ react-native run-android
