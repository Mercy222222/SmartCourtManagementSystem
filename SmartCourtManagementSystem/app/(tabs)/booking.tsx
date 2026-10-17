import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MapPin, Info, ArrowRight, ShieldAlert } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { MOCK_CLUBS, MOCK_COURTS, MOCK_TIME_SLOTS } from '../../constants/mockData';
import { CourtSlotGrid } from '../../components/CourtSlotGrid';
import { useBookingStore } from '../../stores/useBookingStore';
import type { TimeSlot } from '../../types';

export default function BookingScreen() {
  const router = useRouter();
  const {
    selectedClub,
    selectedCourt,
    selectedDate,
    selectedSlot,
    setSelectedClub,
    setSelectedCourt,
    setSelectedDate,
    setSelectedSlot,
  } = useBookingStore();

  const dates = [
    { label: 'Hôm nay', date: '2026-10-18', day: 'CN, 18' },
    { label: 'Ngày mai', date: '2026-10-19', day: 'T2, 19' },
    { label: '', date: '2026-10-20', day: 'T3, 20' },
    { label: '', date: '2026-10-21', day: 'T4, 21' },
    { label: '', date: '2026-10-22', day: 'T5, 22' },
  ];

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleProceedCheckout = () => {
    if (!selectedSlot) return;
    router.push('/checkout');
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Đặt Sân Padel</Text>
        <Text style={styles.headerSubtitle}>Khung giờ chuẩn quốc tế WPT</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Club Selector Carousel */}
        <Text style={styles.sectionHeading}>Chọn Câu Lạc Bộ</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {MOCK_CLUBS.map((club) => {
            const isSelected = selectedClub.id === club.id;
            return (
              <TouchableOpacity
                key={club.id}
                onPress={() => setSelectedClub(club)}
                style={[styles.clubTab, isSelected && styles.clubTabSelected]}
              >
                <Text style={[styles.clubTabText, isSelected && styles.textWhite]}>{club.name}</Text>
                <View style={styles.clubTabLoc}>
                  <MapPin size={11} color={isSelected ? '#FFF' : COLORS.textSecondary} />
                  <Text style={[styles.clubTabLocText, isSelected && styles.textWhite]}>{club.city}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Date Selector Strip */}
        <Text style={styles.sectionHeading}>Chọn Ngày Chơi</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {dates.map((d) => {
            const isSelected = selectedDate === d.date;
            return (
              <TouchableOpacity
                key={d.date}
                onPress={() => setSelectedDate(d.date)}
                style={[styles.dateTab, isSelected && styles.dateTabSelected]}
              >
                {d.label ? <Text style={[styles.dateLabel, isSelected && styles.textWhite]}>{d.label}</Text> : null}
                <Text style={[styles.dateDay, isSelected && styles.textWhite]}>{d.day}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Court Type Selector */}
        <Text style={styles.sectionHeading}>Chọn Sân Thi Đấu</Text>
        <View style={styles.courtList}>
          {MOCK_COURTS.map((court) => {
            const isSelected = selectedCourt.id === court.id;
            return (
              <TouchableOpacity
                key={court.id}
                onPress={() => setSelectedCourt(court)}
                style={[styles.courtCard, isSelected && styles.courtCardSelected]}
              >
                <View style={styles.courtCardHeader}>
                  <Text style={[styles.courtName, isSelected && styles.textWhite]}>{court.name}</Text>
                  <Text style={[styles.courtPrice, isSelected && styles.textWhite]}>
                    {formatVND(court.pricePerHour)}/h
                  </Text>
                </View>
                <Text style={[styles.courtSurface, isSelected && styles.textWhite70]}>
                  Mặt sân: {court.surface}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Real-time Time Slots Grid */}
        <View style={styles.slotHeaderRow}>
          <Text style={styles.sectionHeading}>Khung Giờ Còn Trống (90 phút)</Text>
          <View style={styles.antiDoubleTag}>
            <ShieldAlert size={12} color={COLORS.padelOrange} />
            <Text style={styles.antiDoubleText}>Khóa slot 5p khi chọn</Text>
          </View>
        </View>

        <CourtSlotGrid
          slots={MOCK_TIME_SLOTS}
          selectedSlotId={selectedSlot?.id || null}
          onSelectSlot={handleSelectSlot}
        />

        <View style={styles.noteBox}>
          <Info size={14} color={COLORS.emeraldLight} />
          <Text style={styles.noteText}>
            Hủy sân miễn phí trước 6 tiếng. Vào sân vui lòng mang giày thể thao đế bằng không đánh dấu sân.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Checkout Bar */}
      {selectedSlot && (
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomLabel}>Khung giờ: {selectedSlot.startTime} - {selectedSlot.endTime}</Text>
            <Text style={styles.bottomPrice}>{formatVND(selectedSlot.price)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleProceedCheckout}>
            <Text style={styles.checkoutBtnText}>Giữ Chỗ & Đặt Sân</Text>
            <ArrowRight size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeading: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 10,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  clubTab: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  clubTabSelected: {
    backgroundColor: COLORS.emerald,
    borderColor: COLORS.emeraldLight,
  },
  clubTabText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  clubTabLoc: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clubTabLocText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  dateTab: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 75,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  dateTabSelected: {
    backgroundColor: COLORS.padelOrange,
    borderColor: COLORS.padelOrangeLight,
  },
  dateLabel: {
    color: COLORS.emeraldLight,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },
  dateDay: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  courtList: {
    gap: 10,
  },
  courtCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  courtCardSelected: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: COLORS.emerald,
  },
  courtCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  courtName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  courtPrice: {
    color: COLORS.emeraldLight,
    fontSize: 13,
    fontWeight: '700',
  },
  courtSurface: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  slotHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 6,
  },
  antiDoubleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  antiDoubleText: {
    color: COLORS.padelOrange,
    fontSize: 10,
    fontWeight: '700',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    padding: 12,
    borderRadius: 12,
    marginTop: 14,
  },
  noteText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  bottomLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 2,
  },
  bottomPrice: {
    color: COLORS.emeraldLight,
    fontSize: 18,
    fontWeight: '800',
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  checkoutBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  textWhite: {
    color: '#FFF',
  },
  textWhite70: {
    color: 'rgba(255,255,255,0.7)',
  },
});
