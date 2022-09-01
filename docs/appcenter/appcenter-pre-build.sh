!/usr/bin/env bash
# echo "Uninstalling all CocoaPods versions"
# gem uninstall cocoapods --all --executables
# echo "Installing CocoaPods version 1.8.4"
# gem install cocoapods -v 1.10.0
(echo ""; echo "org.gradle.java.home=/Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk/Contents/Home/") >> $APPCENTER_SOURCE_DIRECTORY/gradle.properties
chmod +x appcenter-pre-build.sh
cd ./android 
./gradlew clean 
cd ..

APP_NAME_FILE=$APPCENTER_SOURCE_DIRECTORY/app.json
APP_NAME_FILE_PROD=$APPCENTER_SOURCE_DIRECTORY/app-prod.json
APP_NAME_FILE_STAG=$APPCENTER_SOURCE_DIRECTORY/app-stag.json
APP_NAME_FILE_DEV=$APPCENTER_SOURCE_DIRECTORY/app-dev.json

GOOGLE_SERVICE_FILE_QA=$APPCENTER_SOURCE_DIRECTORY/android/app/src/qa/google-services.json
GOOGLE_SERVICE_FILE_DEV=$APPCENTER_SOURCE_DIRECTORY/android/app/src/dev/google-services.json
GOOGLE_SERVICE_FILE_STAG=$APPCENTER_SOURCE_DIRECTORY/android/app/src/stag/google-services.json
GOOGLE_SERVICE_FILE=$APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json

IOS_GOOGLE_SERVICE_FILE=$APPCENTER_SOURCE_DIRECTORY/ios/<Project Name>/GoogleService-Info.plist
IOS_GOOGLE_SERVICE_FILE_DEV=$APPCENTER_SOURCE_DIRECTORY/ios/<Project Name>/GoogleServices/Qa/GoogleService-Info.plist
IOS_GOOGLE_SERVICE_FILE_STAG=$APPCENTER_SOURCE_DIRECTORY/ios/<Project Name>/GoogleServices/Staging/GoogleService-Info.plist

IOS_INFO_PLIST_FILE=$APPCENTER_SOURCE_DIRECTORY/ios/<Project Name>/Info.plist

cat ./src/configuration/env-configs/prod.ts

if [ "$APPCENTER_BRANCH" == "develop" ];
then
    sed 's/host\: .*/host\: `http:\/\/[SUB_DOMAIN].qa.<Backend Domain>.com\/api`,/g' ./src/configuration/env-configs/prod.ts > ./tmp.ts && mv ./tmp.ts ./src/configuration/env-configs/prod.ts
    sed 's/buildEnv\: .*/buildEnv\: "dev",/g' ./src/configuration/env-configs/prod.ts > ./tmp.ts && mv ./tmp.ts ./src/configuration/env-configs/prod.ts
    sed 's/mixpanel_token\: .*/mixpanel_token\: "16cfc8a69b159ae9a7e073104a1546ec",/g' ./src/configuration/env-configs/prod.ts > ./tmp.ts && mv ./tmp.ts ./src/configuration/env-configs/prod.ts
    sed -n 'p' $GOOGLE_SERVICE_FILE_QA > $GOOGLE_SERVICE_FILE
    echo "Updating Android Google Services to $GOOGLE_SERVICE_FILE in environments.ts for QA"
    cat $GOOGLE_SERVICE_FILE
    sed -n 'p' $IOS_GOOGLE_SERVICE_FILE_DEV > $IOS_GOOGLE_SERVICE_FILE
    echo "Updating Ios Google Services to $IOS_GOOGLE_SERVICE_FILE in environments.ts for QA"
    cat $IOS_GOOGLE_SERVICE_FILE
    #IOS
    if [ -e "$IOS_INFO_PLIST_FILE" ]
    then
        plutil -replace CFBundleDisplayName -string "<App Name With Branch Dev>" $IOS_INFO_PLIST_FILE
        plutil -replace CFBundleIdentifier -string "<Bundle Id With Branch Dev>" $IOS_INFO_PLIST_FILE
        echo 'Info plist content:'
        cat $IOS_INFO_PLIST_FILE
    fi
fi

if [ "$APPCENTER_BRANCH" == "production" ];
then
    sed 's/host\: .*/host\: `https:\/\/[SUB_DOMAIN].<Backend Domain>.com\/api`,/g' ./src/configuration/env-configs/prod.ts > ./tmp.ts && mv ./tmp.ts ./src/configuration/env-configs/prod.ts
    sed 's/buildEnv\: .*/buildEnv\: "prod",/g' ./src/configuration/env-configs/prod.ts > ./tmp.ts && mv ./tmp.ts ./src/configuration/env-configs/prod.ts
    sed 's/mixpanel_token\: .*/mixpanel_token\: "7e3ee6a6a6cb0da0a3d8c7893b04d18d",/g' ./src/configuration/env-configs/prod.ts > ./tmp.ts && mv ./tmp.ts ./src/configuration/env-configs/prod.ts
fi

