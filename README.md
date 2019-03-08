# Automation approach and environment setup document

## INTRODUCTION

This document contains the instructions to setup the environment and the other procedures.


## Tools that need to be installed

1. Java Development Kit (JDK version 8 - java version 1.8)
2. Android SDK Package
3. NodeJS
4. Appium Desktop client (for local testing and element inspection)
5. Visual Studio Code (IDE)

## Dependencies that need to be installed
1. Mocha
2. chai
3. Webdriverio
4. appium-doctor

### Download and Install Java Development Kit (JDK) and ANDROID SDK

1. Click on this [link](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to download the File
2. Click on **Accept License Agreement**
3. Select the appropriate file to download in the **Downloads** Column (depending on the OS being used)
4. Follow the [link](https://www.wikihow.com/Install-the-Java-Software-Development-Kit)
5. Check to verify if Java Development Kit was successfully installed
    1. Open Terminal
    2. Type in `java -version` and it should show the version of java installed
    3. Type in `javac -version` and it should show the version of the java compiller installed
6. **Setting up the JAVA_HOME Environment Variables**
    * setup process: [Windows and MAC](http://www.baeldung.com/java-home-on-windows-7-8-10-mac-os-x-linux)

   
### Installation proccess for NodeJS

1. download NodeJS installer from this [link](https://nodejs.org/en/download/)
2. select the appropriate OS that is being used (Windows Installer for Windows and MacOS installer for MAC)
3. Open file Location for the downloaded file (e.g. Downloads Folder)
4. Install NodeJS (follow the step by step instructions)


### Download and Install Appium

1. Open Terminal and enter floowing comman
    * `npm install -g appium` then enter (wait for the process to finish)

### Download and Install Appium Desktop (Client)

1. Download Appium Desktop Client - **version 1.7.2**:
    * For MAC OS [link](https://github.com/appium/appium-desktop/releases/download/v1.5.0/appium-desktop-1.5.0-mac.zip)
    * For Windows 32bit [link](https://github.com/appium/appium-desktop/releases/download/v1.5.0/appium-desktop-Setup-1.5.0-ia32.exe)
    * For Windows 64bit [link](https://github.com/appium/appium-desktop/releases/download/v1.6.1/appium-desktop-setup-1.5.0.exe)

2. For the Installation process [link](http://www.automationtestinghub.com/appium-desktop/)

### Download and Install Android SDK

  1. Open Terminal
  2. type in `nano ~/.bash_profile` to open the bash_profile
  3. enter what was exported:
      * `export ANDROID_HOME=/path/to/sdk/directory`
      * `export PATH=$ANDROID_HOME/platform-tools:$PATH`
      * `export PATH=$ANDROID_HOME/tools:$PATH`
      * `export PATH=$ANDROID_HOME/build-tools/19.1.0:$PATH`
      * Press **control + X** in the keyboard
      * Press **Y**
      * Press **return** (to save and exit)
  4. type in `source ~/.bash_profile` to tell the operating system that there are changes in the bash_profile

### Download and Install other Tools and Dependencies via NPM**

#### appium-doctor

  1. Open Terminal
  2. type in `npm install -g appium-doctor` then enter (wait for the process to finish)
   
#### Type in the Following to install the dependencies

* `npm install -g appium-uiautomator2-driver` then enter (wait for the process to finish)
* `npm install -g mocha` then enter (wait for the process to finish)
* `npm install -g chai` then enter (wait for the process to finish)
* `npm install -g chai-as-promised` then enter (wait for the process to finish)
* `npm install -g wd` then enter (wait for the process to finish)
* `npm install -g wdio-appium-service -D` then enter (wait for the process to finish)
* `npm install -g webdriverio -D` then enter (wait for the process to finish)  **Recommended Version:** 4.10.0
* `npm install -g wdio-mocha-framework -D` then enter (wait for the process to finish)
* `npm install simple-node-logger —save` then enter (wait for the process to finish)


  **NOTE:**
  * These are the tools and dependencies that is needed in order for the tools to run properly.
  
### Things to Know

* Used JAVASCRIPT (.js Extension) for all the scripts
* The structure followed is from the mocha framework

### Code / Test Script Structure

* Header Comments - where documentations will be put
* Required libraries - where the initialization of the dependencies
* Desired Capabilities
* Hooks: the `before()` and `after()` methods are initialize
* Test Suite: `describe()`
* Test Specs: `it()`

### Steps to Execute the script

* In order to run the script. you need to go to the root directory of the project via terminal and then type in npm run test:smoke:android 
