import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { X, Plus, Calendar, Clock, MapPin, Users, Award } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { MOCK_CLUBS } from '../constants/mockData';
import { useAuthStore } from '../stores/useAuthStore';
import { useNotificationStore } from '../stores/useNotificationStore';

interface CreateMatchModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CreateMatchModal = ({ visible, onClose }: CreateMatchModalProps) => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const [selectedClub, setSelectedClub] = useState(MOCK_CLUBS[0]);
  const [selectedDate, setSelectedDate] = useState('Hôm nay, 18/10');
  const [selectedTime, setSelectedTime] = useState('19:00 - 20:30');
  const [tier, setTier] = useState<'casual' | 'inter' | 'pro'>('inter');

  const handleCreate = () => {
    addNotification({
      title: '🎾 Đã Tạo Trận Đấu Mới Thành Công',
      titleEn: '🎾 Match Created Successfully',
      message: `Trận đấu của bạn tại ${selectedClub.name} (${selectedTime}) đã được công khai trên hệ thống. Đang đợi 3 người chơi cùng trình độ tham gia.`,
      messageEn: `Your match at ${selectedClub.name} (${selectedTime}) is now public. Waiting for 3 players to join.`,
      type: 'match',
    });

    Alert.alert(
      '🎉 Tạo Trận Thành Công!',
      `Trận đấu của bạn tại ${selectedClub.name} (${selectedTime}) đã được đăng lên sàn Ghép Trận.\n\nThông báo sẽ được gửi tới bạn ngay khi có người chơi tham gia!`,
      [{ text: 'Xong', onPress: onClose }]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Plus size={18} color={COLORS.padelOrange} />
              <Text style={styles.title}>Tạo Trận Đấu Mới (Host Match)</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <Text style={styles.label}>1. Chọn Chi Nhánh Thi Đấu</Text>
            {MOCK_CLUBS.map((club) => {
              const isSelected = selectedClub.id === club.id;
              return (
                <TouchableOpacity
                  key={club.id}
                  onPress={() => setSelectedClub(club)}
                  style={[styles.choiceItem, isSelected && styles.choiceItemActive]}
                >
                  <MapPin size={14} color={isSelected ? COLORS.emeraldLight : COLORS.textMuted} />
                  <Text style={[styles.choiceText, isSelected && styles.textWhite]}>{club.name}</Text>
                </TouchableOpacity>
              );
            })}

            <Text style={styles.label}>2. Chọn Ngày Thi Đấu</Text>
            <View style={styles.dateRow}>
              {['Hôm nay, 18/10', 'Ngày mai, 19/10', 'T3, 20/10'].map((d) => {
                const isSelected = selectedDate === d;
                return (
                  <TouchableOpacity
                    key={d}
                    onPress={() => setSelectedDate(d)}
                    style={[styles.dateBtn, isSelected && styles.dateBtnActive]}
                  >
                    <Text style={[styles.dateText, isSelected && styles.textWhite]}>{d}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>3. Chọn Khung Giờ</Text>
            <View style={styles.timeGrid}>
              {['17:00 - 18:30', '18:30 - 20:00', '20:00 - 21:30', '21:30 - 23:00'].map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setSelectedTime(t)}
                    style={[styles.timeBtn, isSelected && styles.timeBtnActive]}
                  >
                    <Clock size={12} color={isSelected ? '#FFF' : COLORS.textMuted} />
                    <Text style={[styles.timeText, isSelected && styles.textWhite]}>{t}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>4. Yêu Cầu Trình Độ (VPR Rating)</Text>
            <View style={styles.tierRow}>
              <TouchableOpacity
                style={[styles.tierBtn, tier === 'casual' && styles.tierBtnActive]}
                onPress={() => setTier('casual')}
              >
                <Text style={[styles.tierText, tier === 'casual' && styles.textWhite]}>VPR &lt; 3.0</Text>
                <Text style={styles.tierSub}>Giao lưu vui vẻ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tierBtn, tier === 'inter' && styles.tierBtnActive]}
                onPress={() => setTier('inter')}
              >
                <Text style={[styles.tierText, tier === 'inter' && styles.textWhite]}>VPR 3.0 - 4.5</Text>
                <Text style={styles.tierSub}>Bán chuyên</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tierBtn, tier === 'pro' && styles.tierBtnActive]}
                onPress={() => setTier('pro')}
              >
                <Text style={[styles.tierText, tier === 'pro' && styles.textWhite]}>VPR 4.5+</Text>
                <Text style={styles.tierSub}>Chuyên nghiệp</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.splitCostBox}>
              <Users size={16} color={COLORS.padelOrange} />
              <Text style={styles.splitCostText}>
                Chi phí chia đều: 110.000 VNĐ / người (Tổng 4 người). Hệ thống tự thu tự động.
              </Text>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleCreate}>
              <Text style={styles.submitBtnText}>Xác Nhận Tạo Trận & Mời Bạn</Text>
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
    maxHeight: '90%',
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
  },
  label: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 8,
  },
  choiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  choiceItemActive: {
    borderColor: COLORS.emerald,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  choiceText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
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
  dateBtnActive: {
    backgroundColor: COLORS.padelOrange,
    borderColor: COLORS.padelOrangeLight,
  },
  dateText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '700',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  timeBtn: {
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
  timeBtnActive: {
    backgroundColor: COLORS.emerald,
    borderColor: COLORS.emeraldLight,
  },
  timeText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  tierRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tierBtn: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  tierBtnActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: COLORS.emerald,
  },
  tierText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  tierSub: {
    color: COLORS.textMuted,
    fontSize: 10,
  },
  splitCostBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  splitCostText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },
  submitBtn: {
    backgroundColor: COLORS.padelOrange,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  textWhite: {
    color: '#FFF',
  },
});
