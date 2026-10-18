import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { X, Trophy, Zap, Calendar, MapPin, Users, Award, ShieldCheck } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useNotificationStore } from '../stores/useNotificationStore';

interface TournamentModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TournamentModal = ({ visible, onClose }: TournamentModalProps) => {
  const { addNotification } = useNotificationStore();

  const handleRegister = () => {
    addNotification({
      title: '🏆 Đăng Ký Giải Đấu Thành Công',
      titleEn: '🏆 Tournament Registration Successful',
      message: 'Bạn đã đăng ký tham gia Infinity Padel Championship 2026. Ban tổ chức sẽ gửi lịch bốc thăm vòng bảng qua số điện thoại của bạn.',
      messageEn: 'Successfully registered for Infinity Padel Championship 2026. Draw schedule will be sent via SMS.',
      type: 'system',
    });

    Alert.alert(
      '🎉 Đăng Ký Thành Công!',
      'Hồ sơ VĐV của bạn đã được ghi nhận vào giải đấu Infinity Padel Championship 2026.\n\nThời gian bốc thăm: 25/10/2026 tại Thảo Điền Arena.',
      [{ text: 'Hoàn Tất', onPress: onClose }]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.tag}>
              <Zap size={13} color="#FFF" />
              <Text style={styles.tagText}>GIẢI ĐẤU QUỐC TẾ WPT 2026</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <Text style={styles.mainTitle}>Infinity Padel Championship 2026</Text>
            <Text style={styles.prizeHighlight}>Tổng Giải Thưởng: 150.000.000 VNĐ</Text>

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Calendar size={18} color={COLORS.padelOrange} />
                <Text style={styles.infoTitle}>Thời gian</Text>
                <Text style={styles.infoDesc}>01/11 - 05/11/2026</Text>
              </View>

              <View style={styles.infoCard}>
                <MapPin size={18} color={COLORS.emeraldLight} />
                <Text style={styles.infoTitle}>Địa điểm</Text>
                <Text style={styles.infoDesc}>Thảo Điền & An Phú</Text>
              </View>

              <View style={styles.infoCard}>
                <Users size={18} color="#3B82F6" />
                <Text style={styles.infoTitle}>Quy mô</Text>
                <Text style={styles.infoDesc}>64 Cặp Đôi Nam/Nữ</Text>
              </View>

              <View style={styles.infoCard}>
                <Award size={18} color="#FBBF24" />
                <Text style={styles.infoTitle}>Hạng mục</Text>
                <Text style={styles.infoDesc}>Pro & Advanced</Text>
              </View>
            </View>

            <View style={styles.prizeStructure}>
              <Text style={styles.prizeTitle}>Cơ Cấu Giải Thưởng Hấp Dẫn:</Text>
              <Text style={styles.prizeItem}>🥇 Giải Nhất (Vô địch): 80.000.000 VNĐ + Cúp Vàng + 2 Vợt Nox Pro</Text>
              <Text style={styles.prizeItem}>🥈 Giải Nhì (Á quân): 40.000.000 VNĐ + Huy Chương Bạc</Text>
              <Text style={styles.prizeItem}>🥉 Đồng Giải Ba: 15.000.000 VNĐ / cặp + Huy Chương Đồng</Text>
              <Text style={styles.prizeItem}>🏅 Giải Cặp Đôi Ấn Tượng: 5.000.000 VNĐ</Text>
            </View>

            <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
              <ShieldCheck size={18} color="#FFF" />
              <Text style={styles.registerBtnText}>Đăng Ký Tham Gia Ngay (Miễn Phí)</Text>
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
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.padelOrange,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  mainTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  prizeHighlight: {
    color: '#FBBF24',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  infoTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 2,
  },
  infoDesc: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  prizeStructure: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  prizeTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  prizeItem: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  registerBtn: {
    backgroundColor: COLORS.emerald,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  registerBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
