import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Alert, Linking } from 'react-native';
import { X, Calendar, Clock, Phone, Star, ShieldCheck, Check, MapPin, Award } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { Coach, Club } from '../types';
import { MOCK_COACHES, MOCK_CLUBS } from '../constants/mockData';
import { useBookingStore } from '../stores/useBookingStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useNotificationStore } from '../stores/useNotificationStore';
import { useLanguageStore } from '../stores/useLanguageStore';

interface CoachingModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCoach?: Coach;
}

export const CoachingModal = ({ visible, onClose, selectedCoach }: CoachingModalProps) => {
  const { addCoachingBooking } = useBookingStore();
  const { user, updateWallet } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const { language } = useLanguageStore();

  const [activeCoach, setActiveCoach] = useState<Coach>(selectedCoach || MOCK_COACHES[0]);
  const [selectedClub, setSelectedClub] = useState<Club>(MOCK_CLUBS[0]);
  const [selectedDate, setSelectedDate] = useState('2026-10-19');
  const [selectedSlot, setSelectedSlot] = useState(activeCoach.availableTimeSlots[0] || '17:30 - 19:00');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'momo' | 'vnpay'>('wallet');

  // Update when selectedCoach prop changes
  React.useEffect(() => {
    if (selectedCoach) {
      setActiveCoach(selectedCoach);
      setSelectedSlot(selectedCoach.availableTimeSlots[0] || '17:30 - 19:00');
    }
  }, [selectedCoach]);

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleCallCoach = (phone: string) => {
    Alert.alert(
      'Liên Hệ Hotline HLV',
      `Bạn có muốn kết nối cuộc gọi hoặc Zalo tới số điện thoại của ${activeCoach.name}?\nSĐT: ${phone}`,
      [
        { text: 'Hủy' },
        {
          text: 'Gọi Ngay',
          onPress: () => {
            Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`).catch(() => {
              Alert.alert('Thông báo', `Số điện thoại của HLV: ${phone}`);
            });
          },
        },
      ]
    );
  };

  const handleConfirmBooking = () => {
    const fee = activeCoach.pricePerHour;

    if (paymentMethod === 'wallet') {
      if ((user?.walletBalance || 0) < fee) {
        Alert.alert(
          'Số Dư Ví Không Đủ',
          `Bạn cần có ít nhất ${formatVND(fee)} trong ví để thanh toán buổi tập. Vui lòng nạp thêm tiền hoặc chọn thanh toán MoMo/VNPay.`
        );
        return;
      }
      updateWallet(-fee, `Thuê HLV ${activeCoach.name} (${selectedSlot})`, 'Ví Infinity');
    }

    addCoachingBooking({
      id: `COACH-${Date.now().toString().slice(-6)}`,
      userId: user?.id || 'usr_001',
      coach: activeCoach,
      club: selectedClub,
      date: selectedDate,
      timeSlot: selectedSlot,
      totalPrice: fee,
      paymentMethod,
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
    });

    addNotification({
      title: '🎾 Đặt Lịch Huấn Luyện Viên Thành Công!',
      titleEn: '🎾 Coach Booking Confirmed!',
      message: `Bạn đã đặt lịch học cùng ${activeCoach.name} vào ${selectedDate} (${selectedSlot}) tại ${selectedClub.name}. HLV sẽ liên hệ bạn qua SĐT ${activeCoach.phone}.`,
      messageEn: `Booking with coach ${activeCoach.name} on ${selectedDate} (${selectedSlot}) at ${selectedClub.name} is confirmed. Coach hotline: ${activeCoach.phone}.`,
      type: 'booking',
    });

    Alert.alert(
      '🎉 Đặt Lịch HLV Thành Công!',
      `Bạn đã đặt thành công buổi huấn luyện cùng ${activeCoach.name}.\n\nThời gian: ${selectedSlot}, Ngày ${selectedDate}\nĐịa điểm: ${selectedClub.name}\nHotline HLV: ${activeCoach.phone}\n\nHLV sẽ đón bạn tại quầy lễ tân trước 10 phút để khởi động!`,
      [{ text: 'Hoàn Tất', onPress: onClose }]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Award size={18} color={COLORS.padelOrange} />
              <Text style={styles.title}>Đặt Lịch Huấn Luyện Viên (Coaching)</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {/* Coach Selector Carousel if multiple */}
            <Text style={styles.label}>1. Chọn Huấn Luyện Viên</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coachList}>
              {MOCK_COACHES.map((c) => {
                const isSelected = activeCoach.id === c.id;
                return (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => {
                      setActiveCoach(c);
                      setSelectedSlot(c.availableTimeSlots[0] || '17:30 - 19:00');
                    }}
                    style={[styles.coachCard, isSelected && styles.coachCardSelected]}
                  >
                    <Image source={c.avatarSource || { uri: c.avatarUrl }} style={styles.coachThumb} />
                    <Text style={[styles.coachNameText, isSelected && styles.textWhite]}>{c.name}</Text>
                    <Text style={[styles.coachRatingText, isSelected && styles.textWhite70]}>
                      ★ {c.rating} ({c.experienceYears} năm KN)
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Coach Bio & Hotline Card */}
            <View style={styles.coachProfileBox}>
              <View style={styles.profileTop}>
                <Image source={activeCoach.avatarSource || { uri: activeCoach.avatarUrl }} style={styles.coachPhoto} />
                <View style={styles.profileInfo}>
                  <Text style={styles.activeCoachName}>{activeCoach.name}</Text>
                  <Text style={styles.activeCoachTitle}>{activeCoach.title}</Text>
                  <View style={styles.starRow}>
                    <Star size={13} color="#FBBF24" fill="#FBBF24" />
                    <Text style={styles.ratingVal}>{activeCoach.rating}</Text>
                    <Text style={styles.reviewCount}>({activeCoach.reviewCount} đánh giá)</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.coachBioText}>{activeCoach.bio}</Text>

              {/* Specialties Tag */}
              <View style={styles.specialtiesWrap}>
                {activeCoach.specialties.map((s, idx) => (
                  <View key={idx} style={styles.specialtyBadge}>
                    <Text style={styles.specialtyText}>✓ {s}</Text>
                  </View>
                ))}
              </View>

              {/* Direct Call Button */}
              <TouchableOpacity
                style={styles.callHotlineBtn}
                onPress={() => handleCallCoach(activeCoach.phone)}
              >
                <Phone size={14} color="#FFF" />
                <Text style={styles.callHotlineText}>
                  Hotline / Zalo: {activeCoach.phone} (Nhấn để gọi)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Select Club Branch */}
            <Text style={styles.label}>2. Chọn Chi Nhánh Tập Luyện</Text>
            <View style={styles.clubSelector}>
              {MOCK_CLUBS.map((club) => {
                const isSelected = selectedClub.id === club.id;
                return (
                  <TouchableOpacity
                    key={club.id}
                    onPress={() => setSelectedClub(club)}
                    style={[styles.clubBtn, isSelected && styles.clubBtnSelected]}
                  >
                    <Text style={[styles.clubBtnText, isSelected && styles.textWhite]}>
                      {club.name.split('-')[1]?.trim() || club.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Date Selector */}
            <Text style={styles.label}>3. Chọn Ngày Học</Text>
            <View style={styles.dateSelector}>
              {['2026-10-19', '2026-10-20', '2026-10-21', '2026-10-22'].map((d, idx) => {
                const isSelected = selectedDate === d;
                const labels = ['T2, 19/10', 'T3, 20/10', 'T4, 21/10', 'T5, 22/10'];
                return (
                  <TouchableOpacity
                    key={d}
                    onPress={() => setSelectedDate(d)}
                    style={[styles.dateBtn, isSelected && styles.dateBtnSelected]}
                  >
                    <Text style={[styles.dateBtnText, isSelected && styles.textWhite]}>
                      {labels[idx]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Available Schedule Slots */}
            <Text style={styles.label}>4. Khung Giờ Của HLV</Text>
            <View style={styles.slotGrid}>
              {activeCoach.availableTimeSlots.map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    onPress={() => setSelectedSlot(slot)}
                    style={[styles.slotBtn, isSelected && styles.slotBtnSelected]}
                  >
                    <Clock size={13} color={isSelected ? '#FFF' : COLORS.emeraldLight} />
                    <Text style={[styles.slotBtnText, isSelected && styles.textWhite]}>{slot}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Fee & Confirm */}
            <View style={styles.feeCard}>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Học phí HLV (90 phút):</Text>
                <Text style={styles.feeVal}>{formatVND(activeCoach.pricePerHour)}</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Tiền thuê sân:</Text>
                <Text style={styles.feeIncluded}>ĐÃ BAO GỒM TRONG GÓI</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmBooking}>
              <ShieldCheck size={18} color="#FFF" />
              <Text style={styles.confirmBtnText}>
                Xác Nhận Đặt Lịch ({formatVND(activeCoach.pricePerHour)})
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  label: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 8,
  },
  coachList: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  coachCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    width: 110,
    borderWidth: 1,
    borderColor: '#334155',
  },
  coachCardSelected: {
    borderColor: COLORS.emerald,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  coachThumb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 6,
  },
  coachNameText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  coachRatingText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  coachProfileBox: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 14,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  coachPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.emerald,
  },
  profileInfo: {
    flex: 1,
  },
  activeCoachName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  activeCoachTitle: {
    color: COLORS.emeraldLight,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingVal: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
  reviewCount: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  coachBioText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  specialtiesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  specialtyBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  specialtyText: {
    color: COLORS.emeraldLight,
    fontSize: 11,
    fontWeight: '600',
  },
  callHotlineBtn: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 10,
  },
  callHotlineText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  clubSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  clubBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  clubBtnSelected: {
    backgroundColor: COLORS.emerald,
    borderColor: COLORS.emeraldLight,
  },
  clubBtnText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  dateSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  dateBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  dateBtnSelected: {
    backgroundColor: COLORS.padelOrange,
    borderColor: COLORS.padelOrangeLight,
  },
  dateBtnText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  slotBtn: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  slotBtnSelected: {
    backgroundColor: COLORS.emerald,
    borderColor: COLORS.emeraldLight,
  },
  slotBtnText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  feeCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  feeLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  feeVal: {
    color: COLORS.emeraldLight,
    fontSize: 14,
    fontWeight: '800',
  },
  feeIncluded: {
    color: COLORS.padelOrange,
    fontSize: 11,
    fontWeight: '700',
  },
  confirmBtn: {
    backgroundColor: COLORS.emerald,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  textWhite: {
    color: '#FFF',
  },
  textWhite70: {
    color: 'rgba(255,255,255,0.7)',
  },
});
