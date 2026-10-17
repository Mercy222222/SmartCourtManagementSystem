import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, Users, Wallet, Trophy, MapPin, Star, ArrowRight, Zap } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { Header } from '../../components/Header';
import { MOCK_CLUBS, MOCK_BOOKINGS } from '../../constants/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const nextBooking = MOCK_BOOKINGS[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Header subtitle="Sẵn sàng ra sân," />

        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroTag}>
            <Zap size={13} color="#FFF" />
            <Text style={styles.heroTagText}>TOURNAMENT 2026</Text>
          </View>
          <Text style={styles.heroTitle}>Infinity Padel Championship</Text>
          <Text style={styles.heroDesc}>Tổng giải thưởng 150.000.000 VNĐ. Đăng ký đôi nam/nữ ngay hôm nay!</Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>Xem chi tiết</Text>
            <ArrowRight size={14} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Next Match Widget */}
        {nextBooking && (
          <View style={styles.nextMatchCard}>
            <View style={styles.nextMatchHeader}>
              <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>TRẬN ĐẤU SẮP TỚI</Text>
              </View>
              <Text style={styles.matchDate}>{nextBooking.date}</Text>
            </View>

            <Text style={styles.matchCourtName}>{nextBooking.court.name}</Text>
            
            <View style={styles.matchDetailRow}>
              <View style={styles.iconText}>
                <MapPin size={13} color={COLORS.emeraldLight} />
                <Text style={styles.matchDetailText}>{nextBooking.club.name}</Text>
              </View>
              <Text style={styles.matchTimeText}>{nextBooking.startTime} - {nextBooking.endTime}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkInBtn}
              onPress={() => router.push('/(tabs)/history')}
            >
              <Text style={styles.checkInBtnText}>Mở Vé QR Check-In</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Action Buttons */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => router.push('/(tabs)/booking')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Calendar size={22} color={COLORS.emerald} />
            </View>
            <Text style={styles.actionLabel}>Đặt Sân</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => router.push('/(tabs)/matches')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(249, 115, 22, 0.15)' }]}>
              <Users size={22} color={COLORS.padelOrange} />
            </View>
            <Text style={styles.actionLabel}>Ghép Trận</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
              <Wallet size={22} color="#3B82F6" />
            </View>
            <Text style={styles.actionLabel}>Nạp Ví</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(234, 179, 8, 0.15)' }]}>
              <Trophy size={22} color="#EAB308" />
            </View>
            <Text style={styles.actionLabel}>Bảng Xếp Hạng</Text>
          </TouchableOpacity>
        </View>

        {/* Clubs Near You */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Câu Lạc Bộ Gần Bạn</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/booking')}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {MOCK_CLUBS.map((club) => (
          <TouchableOpacity
            key={club.id}
            style={styles.clubCard}
            onPress={() => router.push('/(tabs)/booking')}
          >
            <Image source={{ uri: club.imageUrl }} style={styles.clubImg} />
            <View style={styles.clubCardContent}>
              <View style={styles.clubTitleRow}>
                <Text style={styles.clubCardName}>{club.name}</Text>
                <View style={styles.ratingBox}>
                  <Star size={12} color="#FBBF24" fill="#FBBF24" />
                  <Text style={styles.ratingVal}>{club.rating}</Text>
                </View>
              </View>

              <View style={styles.clubLocRow}>
                <MapPin size={12} color={COLORS.textSecondary} />
                <Text style={styles.clubLocText} numberOfLines={1}>{club.address}</Text>
              </View>

              <View style={styles.amenitiesRow}>
                <Text style={styles.courtBadge}>{club.totalCourts} sân tiêu chuẩn WPT</Text>
                <Text style={styles.distanceBadge}>{club.distanceKm} km</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  heroBanner: {
    marginHorizontal: 20,
    backgroundColor: '#0F291E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    marginBottom: 20,
  },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  heroTagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  heroDesc: {
    color: '#A7F3D0',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '700',
  },
  nextMatchCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.emerald,
    marginBottom: 24,
  },
  nextMatchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.emerald,
  },
  liveText: {
    color: COLORS.emeraldLight,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  matchDate: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  matchCourtName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  matchDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchDetailText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  matchTimeText: {
    color: COLORS.padelOrange,
    fontSize: 13,
    fontWeight: '700',
  },
  checkInBtn: {
    backgroundColor: COLORS.emerald,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkInBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 28,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  seeAllText: {
    color: COLORS.emeraldLight,
    fontSize: 13,
    fontWeight: '600',
  },
  clubCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  clubImg: {
    width: '100%',
    height: 140,
  },
  clubCardContent: {
    padding: 14,
  },
  clubTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  clubCardName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingVal: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
  clubLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  clubLocText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    flex: 1,
  },
  amenitiesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  courtBadge: {
    backgroundColor: COLORS.cardSecondary,
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  distanceBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: COLORS.emeraldLight,
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
