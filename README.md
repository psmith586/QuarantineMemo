# QuarantineMemo

set up: 
---------

install android studio with...
SDK Platforms
  
SDK: 9.0 (Pie)
platform: 28
Sources: for 28
Google APIs: both available images
Google Play: both available images

SDK Tools
  
build-tools: 28.03 (29.03 also installed)
SDK command line tools: latest
Android Emulator: 30.05
SDK platform tools: 29.06
Intell HAXM installer: latest

Emulator
  
Pixel 3a API 28

init:
--------
download "google-services.json" from online firebase GUI
download "Android Studio" and set up Emulator 

$ git clone repo

copy "google-services.json" to ./android/app/

create a file "local.properties" in ./android/
GOTO "SDK Manager" in Android Studio
Copy "Android SDK Location:"
Write "sdk.dir = Android SDK Location" into local.properties
    For example: "sdk.dir = /Users/Robin/Library/Android/sdk"

$ npm install
$ cd android 
$ ./gradlew clean

build:
--------
open android/ in Android Studio (gradle should sync automatically)
Click "Build" (hammer icon)

run:
---------
QuarantineMemo$ npm start 

//mock js server should start, react native icon displayed in shell
//in android studio configuration button should display 'app' with emulator //Pixel 3...

Click Run 'app' in Android Studio (play button)

//emulator should begin compiling code from mock server and display the app
