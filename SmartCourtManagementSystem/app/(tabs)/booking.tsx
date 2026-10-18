import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MapPin, Info, ArrowRight, ShieldAlert, Award, Star, Phone, Sparkles } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { MOCK_CLUBS, MOCK_COACHES } from '../../constants/mockData';
import { CourtSlotGrid } from '../../components/CourtSlotGrid';
import { CoachingModal } from '../../components/CoachingModal';
import { useBookingStore } from '../../stores/useBookingStore';
import { useLanguageStore } from '../../stores/useLanguageStore';
import type { TimeSlot, Coach } from '../../types';

export default function BookingScreen() {
  const router = useRouter();
  const { t } = useLanguageStore();
  const {
    selectedClub,
    selectedCourt,
    selectedDate,
    selectedSlot,
    setSelectedClub,
    setSelectedCourt,
    setSelectedDate,
    setSelectedSlot,
    getCourtsForSelectedClub,
    getSlotsForCourtAndDate,
  } = useBookingStore();

  const [activeTab, setActiveTab] = useState<'courts' | 'coaches'>('courts');
  const [coachingModalVisible, setCoachingModalVisible] = useState(false);
  const [activeCoachForModal, setActiveCoachForModal] = useState<Coach | undefined>(undefined);

  const dates = [
    { label: 'Hôm nay', date: '2026-10-18', day: 'CN, 18' },
    { label: 'Ngày mai', date: '2026-10-19', day: 'T2, 19' },
    { label: '', date: '2026-10-20', day: 'T3, 20' },
    { label: '', date: '2026-10-21', day: 'T4, 21' },
    { label: '', date: '2026-10-22', day: 'T5, 22' },
  ];

  // Dynamic courts filtered by currently selected branch
  const courtsForClub = getCourtsForSelectedClub();

  // Dynamic slots for selected court and date based on real bookings
  const dynamicSlots = getSlotsForCourtAndDate(selectedCourt.id, selectedDate);

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleProceedCheckout = () => {
    if (!selectedSlot) return;
    router.push('/checkout');
  };

  const handleOpenCoachModal = (coach: Coach) => {
    setActiveCoachForModal(coach);
    setCoachingModalVisible(true);
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>{t.bookingTitle}</Text>
        <Text style={styles.headerSubtitle}>{t.bookingSubtitle}</Text>

        {/* Tab Switcher: Sân Thi Đấu vs Thuê Coaching */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.mainTab, activeTab === 'courts' && styles.mainTabActive]}
            onPress={() => setActiveTab('courts')}
          >
            <Text style={[styles.mainTabText, activeTab === 'courts' && styles.mainTabTextActive]}>
              {t.tabCourts}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mainTab, activeTab === 'coaches' && styles.mainTabActive]}
            onPress={() => setActiveTab('coaches')}
          >
            <Sparkles size={13} color={activeTab === 'coaches' ? '#FFF' : COLORS.padelOrange} />
            <Text style={[styles.mainTabText, activeTab === 'coaches' && styles.mainTabTextActive]}>
              {t.tabCoaches}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'courts' ? (
          <>
            {/* Club Selector Carousel (3 Branches) */}
            <Text style={styles.sectionHeading}>{t.selectClub}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {MOCK_CLUBS.map((club) => {
                const isSelected = selectedClub.id === club.id;
                return (
                  <TouchableOpacity
                    key={club.id}
                    onPress={() => setSelectedClub(club)}
                    style={[styles.clubTab, isSelected && styles.clubTabSelected]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.clubTabText, isSelected && styles.textWhite]}>{club.name}</Text>
                    <View style={styles.clubTabLoc}>
                      <MapPin size={11} color={isSelected ? '#FFF' : COLORS.textSecondary} />
                      <Text style={[styles.clubTabLocText, isSelected && styles.textWhite]}>
                        {club.city} • {club.totalCourts} sân
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Date Selector Strip */}
            <Text style={styles.sectionHeading}>{t.selectDate}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {dates.map((d) => {
                const isSelected = selectedDate === d.date;
                return (
                  <TouchableOpacity
                    key={d.date}
                    onPress={() => setSelectedDate(d.date)}
                    style={[styles.dateTab, isSelected && styles.dateTabSelected]}
                    activeOpacity={0.8}
                  >
                    {d.label ? <Text style={[styles.dateLabel, isSelected && styles.textWhite]}>{d.label}</Text> : null}
                    <Text style={[styles.dateDay, isSelected && styles.textWhite]}>{d.day}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Court List - FILTERED BY CURRENT CLUB ONLY */}
            <Text style={styles.sectionHeading}>
              {t.selectCourt} ({courtsForClub.length} sân tại {selectedClub.city})
            </Text>
            <View style={styles.courtList}>
              {courtsForClub.map((court) => {
                const isSelected = selectedCourt.id === court.id;
                return (
                  <TouchableOpacity
                    key={court.id}
                    onPress={() => setSelectedCourt(court)}
                    style={[styles.courtCard, isSelected && styles.courtCardSelected]}
                    activeOpacity={0.8}
                  >
                    <View style={styles.courtCardHeader}>
                      <Text style={[styles.courtName, isSelected && styles.textWhite]}>
                        {court.name}
                      </Text>
                      <Text style={[styles.courtPrice, isSelected && styles.textWhite]}>
                        {formatVND(court.pricePerHour)}/h
                      </Text>
                    </View>

                    <Text style={[styles.courtSurface, isSelected && styles.textWhite70]}>
                      Mặt sân: {court.surface}
                    </Text>

                    {court.lighting && (
                      <Text style={[styles.courtSpec, isSelected && styles.textWhite70]}>
                        Đèn: {court.lighting} • Kính: {court.glassThickness || '12mm'}
                      </Text>
                    )}

                    {court.features && court.features.length > 0 && (
                      <View style={styles.featuresRow}>
                        {court.features.map((f, i) => (
                          <View key={i} style={styles.featurePill}>
                            <Text style={styles.featurePillText}>✓ {f}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Real-time Dynamic Time Slots Grid (Vietnam GMT+7) */}
            <View style={styles.slotHeaderRow}>
              <Text style={styles.sectionHeading}>{t.availableSlotsTitle}</Text>
              <View style={styles.antiDoubleTag}>
                <ShieldAlert size={12} color={COLORS.padelOrange} />
                <Text style={styles.antiDoubleText}>{t.slotLockNotice}</Text>
              </View>
            </View>

            <CourtSlotGrid
              slots={dynamicSlots}
              selectedSlotId={selectedSlot?.id || null}
              onSelectSlot={handleSelectSlot}
            />

            <View style={styles.noteBox}>
              <Info size={14} color={COLORS.emeraldLight} />
              <Text style={styles.noteText}>{t.courtCancellationNote}</Text>
            </View>
          </>
        ) : (
          /* Coaching Section (Huấn Luyện Viên Quốc Tế) */
          <View style={styles.coachesSection}>
            <View style={styles.coachesHeaderBanner}>
              <Award size={20} color="#FBBF24" />
              <View style={styles.coachesHeaderText}>
                <Text style={styles.coachesTitle}>{t.coachesTitle}</Text>
                <Text style={styles.coachesSub}>{t.coachesSubtitle}</Text>
              </View>
            </View>

            {MOCK_COACHES.map((coach) => (
              <View key={coach.id} style={styles.coachCardBig}>
                <View style={styles.coachTopRow}>
                  <Image source={coach.avatarSource || { uri: coach.avatarUrl }} style={styles.coachBigImg} />
                  <View style={styles.coachBigInfo}>
                    <Text style={styles.coachBigName}>{coach.name}</Text>
                    <Text style={styles.coachBigTitle}>{coach.title}</Text>
                    <View style={styles.coachRatingRow}>
                      <Star size={12} color="#FBBF24" fill="#FBBF24" />
                      <Text style={styles.coachRatingNum}>{coach.rating}</Text>
                      <Text style={styles.coachReviews}>• {coach.experienceYears} năm KN</Text>
                    </View>
                  </View>
                  <View style={styles.coachPriceBox}>
                    <Text style={styles.coachPriceVal}>{formatVND(coach.pricePerHour)}</Text>
                    <Text style={styles.coachPriceLabel}>/buổi (90p)</Text>
                  </View>
                </View>

                <Text style={styles.coachBigBio}>{coach.bio}</Text>

                {/* Specialties */}
                <View style={styles.coachSpecialtiesRow}>
                  {coach.specialties.map((s, idx) => (
                    <View key={idx} style={styles.specBadge}>
                      <Text style={styles.specBadgeText}>✓ {s}</Text>
                    </View>
                  ))}
                </View>

                {/* Schedule Days & Hotline */}
                <View style={styles.coachMetaBox}>
                  <Text style={styles.coachMetaLabel}>
                    📅 Lịch dạy: {coach.availableDays.join(', ')}
                  </Text>
                  <Text style={styles.coachMetaLabel}>
                    📞 Hotline / Zalo: {coach.phone}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.bookCoachActionBtn}
                  onPress={() => handleOpenCoachModal(coach)}
                >
                  <Text style={styles.bookCoachActionText}>Đặt Lịch Học Với {coach.name}</Text>
                  <ArrowRight size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom Checkout Bar (when court slot selected) */}
      {selectedSlot && activeTab === 'courts' && (
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomLabel}>
              {selectedCourt.name.split('-')[0]} • {selectedSlot.startTime} - {selectedSlot.endTime}
            </Text>
            <Text style={styles.bottomPrice}>{formatVND(selectedSlot.price)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleProceedCheckout}>
            <Text style={styles.checkoutBtnText}>{t.btnHoldAndBook}</Text>
            <ArrowRight size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Coaching Modal */}
      <CoachingModal
        visible={coachingModalVisible}
        onClose={() => setCoachingModalVisible(false)}
        selectedCoach={activeCoachForModal}
      />
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
    paddingBottom: 6,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 3,
    marginBottom: 6,
  },
  mainTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 9,
  },
  mainTabActive: {
    backgroundColor: COLORS.emerald,
  },
  mainTabText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  mainTabTextActive: {
    color: '#FFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  sectionHeading: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 8,
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
    minWidth: 160,
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
    paddingRight: 8,
  },
  courtPrice: {
    color: COLORS.emeraldLight,
    fontSize: 13,
    fontWeight: '700',
  },
  courtSurface: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 2,
  },
  courtSpec: {
    color: COLORS.textMuted,
    fontSize: 10,
    marginBottom: 6,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  featurePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  featurePillText: {
    color: COLORS.emeraldLight,
    fontSize: 10,
    fontWeight: '600',
  },
  slotHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 4,
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
    maxWidth: 180,
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
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  checkoutBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  coachesSection: {
    marginTop: 10,
  },
  coachesHeaderBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  coachesHeaderText: {
    flex: 1,
  },
  coachesTitle: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: '800',
  },
  coachesSub: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  coachCardBig: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  coachTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  coachBigImg: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: COLORS.padelOrange,
    marginRight: 10,
  },
  coachBigInfo: {
    flex: 1,
  },
  coachBigName: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  coachBigTitle: {
    color: COLORS.emeraldLight,
    fontSize: 11,
    fontWeight: '600',
    marginVertical: 2,
  },
  coachRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coachRatingNum: {
    color: '#FBBF24',
    fontSize: 11,
    fontWeight: '700',
  },
  coachReviews: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  coachPriceBox: {
    alignItems: 'flex-end',
  },
  coachPriceVal: {
    color: COLORS.emeraldLight,
    fontSize: 15,
    fontWeight: '800',
  },
  coachPriceLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
  },
  coachBigBio: {
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  coachSpecialtiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  specBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  specBadgeText: {
    color: COLORS.emeraldLight,
    fontSize: 10,
    fontWeight: '600',
  },
  coachMetaBox: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    gap: 3,
  },
  coachMetaLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  bookCoachActionBtn: {
    backgroundColor: COLORS.padelOrange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 10,
  },
  bookCoachActionText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  textWhite: {
    color: '#FFF',
  },
  textWhite70: {
    color: 'rgba(255,255,255,0.7)',
  },
});
