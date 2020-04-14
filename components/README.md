set up: 

install android studio
  SDK Platforms
  --------------
  SDK: 9.0 (Pie)
  platform: 28
  //might use
  Sources: for 28
  Google APIs: both available images
  Google Play: both available images

  SDK Tools
  --------------
  build-tools: 28.03 (29.03 also installed)
  SDK command line tools: latest
  Android Emulator: 30.05
  SDK platform tools: 29.06
  Intell HAXM installer: latest

  Emulator
  --------------
  Pixel 3a API 28

init:
  git clone repo

  copy google-services.json to ./android/app/ (from firebase concole)

  npm install

  cd android && ./gradlew clean (--stacktrace, --debug 'some warning command')

build:
  open android/ in android studio (gradle should sync automatically)

run:
QuarantineMemo$ npm start 
//mock js server should start, react native icon displayed in shell

//in android studio configuration button should display 'app' with emulator //Pixel 3...

Click Run 'app'

//emulator should begin compiling code from mock server and display the app