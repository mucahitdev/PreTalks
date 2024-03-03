#!/bin/bash
# outputIos=$(eas build:version:get -p ios)
outputAndroid=$(eas build:version:get -p android)
# currentIosVersion=${outputIos#*buildNumber - }
currentAndroidVersion=${outputAndroid#*versionCode - }

# PRETALKS_IOS_BUILD_NUMBER=$((currentIosVersion+1))
PRETALKS_ANDROID_VERSION_CODE=$((currentAndroidVersion+1))

# bash -c "PRETALKS_IOS_BUILD_NUMBER=$PRETALKS_IOS_BUILD_NUMBER PRETALKS_ANDROID_VERSION_CODE=$PRETALKS_ANDROID_VERSION_CODE $*"
bash -c "PRETALKS_ANDROID_VERSION_CODE=$PRETALKS_ANDROID_VERSION_CODE $*"