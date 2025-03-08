📱 Project React Native

Ini adalah proyek React Native yang menggunakan NativeWind untuk styling.

📌 Prasyarat

Sebelum memulai, pastikan kamu sudah menginstal semua dependensi yang dibutuhkan:

1️⃣ Instalasi Node.js & pnpm

Node.js: Download Node.js

pnpm (manajer paket cepat):

npm install -g pnpm

2️⃣ Instalasi React Native CLI & Android Studio

Jalankan perintah berikut untuk menginstal React Native CLI secara global:

pnpm add -g react-native-cli

3️⃣ Instalasi Android Studio (untuk Android)

Download & install Android Studio dari sini

Pastikan Android SDK dan emulator sudah dikonfigurasi dengan benar.

Tambahkan environment variable untuk ANDROID_HOME:

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH

4️⃣ Instalasi Xcode (untuk iOS)

Install Xcode dari Mac App Store

Install CocoaPods untuk dependencies iOS:

sudo gem install cocoapods

🚀 Cara Menjalankan Proyek

Setelah semua syarat terpenuhi, jalankan perintah berikut:

1️⃣ Clone Repository

git clone https://github.com/BeniSyach/peminjaman_mobile.git
cd peminjaman_mobile

2️⃣ Install Dependencies

pnpm install

3️⃣ Jalankan Aplikasi

Untuk Android:

pnpm run android

Untuk iOS:

pnpm run ios

📄 Lisensi

Proyek ini menggunakan lisensi MIT.
