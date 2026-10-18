import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ticket, QrCode, MapPin, Calendar, Clock, CheckCircle2, Award } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { useBookingStore } from '../../stores/useBookingStore';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { QRCodeModal } from '../../components/QRCodeModal';
import { Booking, CoachingBooking } from '../../types';

export default function HistoryScreen() {
  const { bookings, coachingBookings } = useBookingStore();
  const { t } = useLanguageStore();

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState<'court' | 'coach'>('court');

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.ticketsTitle}</Text>
        <Text style={styles.subtitle}>{t.ticketsSubtitle}</Text>

        {/* Tab Filter */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'court' && styles.tabBtnActive]}
            onPress={() => setActiveTab('court')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'court' && styles.tabBtnTextActive]}>
              Vé Đặt Sân ({bookings.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'coach' && styles.tabBtnActive]}
            onPress={() => setActiveTab('coach')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'coach' && styles.tabBtnTextActive]}>
              Lịch Học HLV ({coachingBookings.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'court' ? (
          bookings.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ticket size={48} color={COLORS.textMuted} />
              <Text style={styles.emptyText}>{t.noTickets}</Text>
            </View>
          ) : (
            bookings.map((item) => (
              <View key={item.id} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                  <View style={styles.statusRow}>
                    <CheckCircle2 size={14} color={COLORS.emerald} />
                    <Text style={styles.statusText}>{t.statusPaidValid}</Text>
                  </View>
                  <Text style={styles.ticketId}>#{item.id}</Text>
                </View>

                <Text style={styles.courtName}>{item.court.name}</Text>

                <View style={styles.clubLocRow}>
                  <MapPin size={13} color={COLORS.textSecondary} />
                  <Text style={styles.clubName}>{item.club.name}</Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.tag}>
                    <Calendar size={13} color={COLORS.emeraldLight} />
                    <Text style={styles.tagText}>{item.date}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Clock size={13} color={COLORS.emeraldLight} />
                    <Text style={styles.tagText}>{item.startTime} - {item.endTime}</Text>
                  </View>
                </View>

                <View style={styles.ticketFooter}>
                  <View>
                    <Text style={styles.priceLabel}>Tổng tiền:</Text>
                    <Text style={styles.priceVal}>{formatVND(item.totalPrice)}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.qrBtn}
                    onPress={() => setSelectedBooking(item)}
                    activeOpacity={0.8}
                  >
                    <QrCode size={16} color="#FFF" />
                    <Text style={styles.qrBtnText}>{t.openQrBtn}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )
        ) : (
          /* Coaching Sessions History */
          coachingBookings.length === 0 ? (
            <View style={styles.emptyBox}>
              <Award size={48} color={COLORS.textMuted} />
              <Text style={styles.emptyText}>Chưa có buổi học HLV nào được đặt</Text>
            </View>
          ) : (
            coachingBookings.map((cBooking) => (
              <View key={cBooking.id} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                  <View style={styles.statusRow}>
                    <CheckCircle2 size={14} color={COLORS.padelOrange} />
                    <Text style={[styles.statusText, { color: COLORS.padelOrange }]}>
                      LỊCH HỌC HLV ĐÃ XÁC NHẬN
                    </Text>
                  </View>
                  <Text style={styles.ticketId}>#{cBooking.id}</Text>
                </View>

                <Text style={styles.courtName}>{cBooking.coach.name}</Text>
                <Text style={styles.coachTitleSub}>{cBooking.coach.title}</Text>

                <View style={styles.clubLocRow}>
                  <MapPin size={13} color={COLORS.textSecondary} />
                  <Text style={styles.clubName}>{cBooking.club.name}</Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.tag}>
                    <Calendar size={13} color={COLORS.emeraldLight} />
                    <Text style={styles.tagText}>{cBooking.date}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Clock size={13} color={COLORS.emeraldLight} />
                    <Text style={styles.tagText}>{cBooking.timeSlot}</Text>
                  </View>
                </View>

                <View style={styles.ticketFooter}>
                  <View>
                    <Text style={styles.priceLabel}>Học phí HLV:</Text>
                    <Text style={styles.priceVal}>{formatVND(cBooking.totalPrice)}</Text>
                  </View>

                  <View style={styles.hotlineTag}>
                    <Text style={styles.hotlineTagText}>Hotline: {cBooking.coach.phone}</Text>
                  </View>
                </View>
              </View>
            ))
          )
        )}
      </ScrollView>

      {/* QR Code Modal Check-in Pass */}
      <QRCodeModal
        visible={!!selectedBooking}
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 10,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: COLORS.emerald,
  },
  tabBtnText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  tabBtnTextActive: {
    color: '#FFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 8,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  ticketCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    color: COLORS.emeraldLight,
    fontSize: 11,
    fontWeight: '800',
  },
  ticketId: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  courtName: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },
  coachTitleSub: {
    color: COLORS.emeraldLight,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  clubLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  clubName: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cardSecondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.cardSecondary,
    paddingTop: 12,
  },
  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  priceVal: {
    color: COLORS.emeraldLight,
    fontSize: 16,
    fontWeight: '800',
  },
  qrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  qrBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  hotlineTag: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  hotlineTagText: {
    color: COLORS.padelOrange,
    fontSize: 11,
    fontWeight: '700',
  },
});
