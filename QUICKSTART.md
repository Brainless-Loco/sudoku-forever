# Quick Start Guide

## 🚀 Getting Started with Sudoku Forever

This is your complete guide to running the migrated Sudoku app!

### ⚡ 5-Minute Quick Start

```bash
# 1. Navigate to the project
cd "d:\Tonmoy Personal\Sudoku\Sudoku-forever-new-version"

# 2. Install dependencies (first time only)
npm install

# 3. Start the development server
npm start

# 4. Select your platform:
#    Press 'i' for iOS simulator
#    Press 'a' for Android emulator  
#    Press 'w' for Web browser
#    Or scan QR code with Expo Go app
```

## 📋 What Was Migrated

### Core Migrations ✅

| Component | Status | Details |
|-----------|--------|---------|
| **Redux Store** | ✅ Complete | Migrated to TypeScript with full type support |
| **Firebase Config** | ✅ Complete | Updated to latest Firebase SDK v10.8.0 |
| **Game Components** | ✅ Complete | All 6 components converted to TypeScript |
| **Screen Layouts** | ✅ Complete | All 10+ screens migrated with modern structure |
| **Routing System** | ✅ Complete | Upgraded to Expo Router from native stack navigator |
| **Utilities** | ✅ Complete | Sudoku generator and API utilities migrated |

### Technology Upgrades ✅

```
Old Version:
- React Native 0.70.8
- React 18.1.0
- Expo 47.0.12
- JavaScript

↓ ↓ ↓

New Version:
✅ React Native 0.81.5 (11 versions newer)
✅ React 19.1.0 (1 major version newer)
✅ Expo 54.0.34 (7 versions newer)
✅ Full TypeScript Support
```

## 🎮 First Time Setup

### Step 1: Install Dependencies
```bash
npm install
```
This installs ~150+ packages including:
- React Native & Expo
- Redux & React-Redux
- Firebase SDKs
- Navigation libraries
- UI components

### Step 2: Configure Firebase (Optional but Recommended)

Edit `firebase/firebaseConfig.ts`:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

Get these values from [Firebase Console](https://console.firebase.google.com)

### Step 3: Run the App

#### Option A: On Physical Device
```bash
npm start
```
Scan the QR code with your phone using Expo Go app

#### Option B: On Simulator/Emulator
```bash
npm start
# Then press 'i' for iOS or 'a' for Android
```

#### Option C: Web Browser
```bash
npm start
# Then press 'w' for web
```

## 🧪 Testing the App

### Create Test Account
1. Open the app → Click "Sign Up"
2. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test@123`
3. Click "Sign Up"

### Play a Game
1. Login with your account
2. Click "Playzone" on home screen
3. Select difficulty (Easy/Medium/Hard)
4. Start playing!

### Test Features
- **Number Input:** Tap a cell, then tap a number
- **Undo:** Click undo button to revert last move
- **Lock/Unlock:** Toggle to lock a single number
- **Pause:** Pause the game timer
- **Navigate:** Use buttons to go between screens

## 📱 Platform Requirements

### iOS
- macOS with Xcode
- iOS 13.0 or higher
- Apple Developer Account (optional for testing on device)

### Android
- Android Studio or Android SDK
- Android 7.0 or higher
- Android Emulator or physical device

### Web
- Modern browser (Chrome, Firefox, Safari, Edge)
- No additional setup needed

## 🐛 Troubleshooting

### Issue: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
npm start -c
```

### Issue: "Metro bundler error"
```bash
npx expo start --clear
```

### Issue: "Firebase authentication not working"
1. Check internet connection
2. Verify Firebase credentials in `firebaseConfig.ts`
3. Ensure Authentication is enabled in Firebase Console

### Issue: "App crashes on startup"
```bash
# Clear all cache
npm start -c

# Or reset everything
npm run reset-project
npm install
npm start
```

## 📂 Project Structure Quick Reference

```
app/                    ← Screen components
├── screens/           ← All game screens
└── _layout.tsx        ← Navigation setup (Redux provider here)

components/            ← Game board components
├── BigSquare.tsx      ← 9x9 grid
├── MediumSquare.tsx   ← 3x3 box
├── SmallSquareBox.tsx ← Single cell
└── NumberBtnList.tsx  ← Number pad

redux/                 ← State management
├── store.ts
├── types.ts
├── actions/
└── reducers/

firebase/              ← Backend
└── firebaseConfig.ts
```

## 🚀 Next Steps

### For Development
1. ✅ App is running
2. 📝 Check components in `components/` folder
3. 🎮 Explore game logic in `redux/`
4. 🔧 Customize in `app.json` and `package.json`

### For Production
1. Create Firebase project
2. Set up proper authentication
3. Configure signing certificates for iOS/Android
4. Use EAS for building: `npm install -g eas-cli`
5. Run: `eas build`

## 📖 Useful Commands

```bash
# Start development
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web

# Lint code
npm run lint

# Check types
npx tsc --noEmit

# Reset project
npm run reset-project

# View dependencies
npm ls
```

## 🔗 Helpful Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Redux Guide](https://redux.js.org)
- [Firebase Docs](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 💡 Pro Tips

- Use Expo Go app for fastest development
- Check console output for error messages
- Use Redux DevTools browser extension for debugging
- Test on physical device before release
- Keep Firebase security rules restrictive

## ❓ FAQ

**Q: Can I run on my phone without Xcode/Android Studio?**
A: Yes! Install Expo Go app and scan QR code

**Q: Do I need a Firebase project to test locally?**
A: Not immediately - Auth screens will show errors but game mechanics work

**Q: How do I build for App Store/Play Store?**
A: Use EAS Build (`eas build`) - see docs for setup

**Q: Why is the app slow?**
A: Try `npm start -c` to clear cache

**Q: Can I modify the game logic?**
A: Yes! Core game is in `redux/reducers/PlayzoneReducer.ts`

---

## ✨ You're All Set!

The app is ready to run. Start with:
```bash
npm start
```

Then select your platform (i, a, or w) and enjoy! 🎮

For detailed migration info, see [MIGRATION.md](./MIGRATION.md)
For full features, see [README.md](./README.md)
