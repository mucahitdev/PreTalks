import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// ProgressBar bileşeni
type ProgressBarProps = {
  progress: number; // 0 ile 1 arasında bir değer
  color: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  // Animated API kullanarak ilerleme çubuğunu animasyonlu hale getiriyoruz
  const width = React.useRef(new Animated.Value(0)).current;

  // Progress değiştiğinde animasyonu tetikle
  React.useEffect(() => {
    Animated.timing(width, {
      toValue: progress * 100, // 0-100 arası bir değer
      duration: 500, // Animasyon süresi
      useNativeDriver: false, // width animasyonunu yapabilmek için
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: width.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10, // İlerleme çubuğunun yüksekliği
    width: '100%', // Tam genişlik
    backgroundColor: '#e0e0e0', // Çubuğun arka plan rengi
    borderRadius: 5, // Kenarların yuvarlatılması
    overflow: 'hidden', // Kenarlara taşma engelleniyor
  },
  progressBar: {
    height: '100%', // Yüksekliği tam olmalı
    borderRadius: 5, // Kenar yuvarlama
  },
});

export default ProgressBar;
