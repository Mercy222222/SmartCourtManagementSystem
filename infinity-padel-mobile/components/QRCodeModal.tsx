import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { X, QrCode, ShieldCheck, MapPin } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import type { Booking } from '../types';

interface QRCodeModalProps {
  visible: boolean;
  booking: Booking | null;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ visible, booking, onClose }) => {
  if (!booking) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <ShieldCheck size={28} color={COLORS.emerald} />
            </View>
            <Text style={styles.title}>Vé Điện Tử Check-In Sân</Text>
            <Text style={styles.subtitle}>Quét mã tại cửa kiểm soát hoặc bảng điểm sân</Text>
          </View>

          {/* QR Container */}
          <View style={styles.qrWrapper}>
            <View style={styles.mockQr}>
              <QrCode size={180} color="#000" />
            </View>
            <Text style={styles.qrTokenText}>{booking.qrCodeToken}</Text>
          </View>

          {/* Ticket Information */}
          <View style={styles.infoCard}>
            <Text style={styles.courtName}>{booking.court.name}</Text>
            
            <View style={styles.infoRow}>
              <MapPin size={14} color={COLORS.emeraldLight} />
              <Text style={styles.infoText}>{booking.club.name}</Text>
            </View>

            <View style={styles.dateTimeGrid}>
              <View style={styles.gridCol}>
                <Text style={styles.colLabel}>Ngày:</Text>
                <Text style={styles.colVal}>{booking.date}</Text>
              </View>
              <View style={styles.gridCol}>
                <Text style={styles.colLabel}>Khung giờ:</Text>
                <Text style={styles.colVal}>{booking.startTime} - {booking.endTime}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.actionBtn} onPress={onClose}>
            <Text style={styles.actionBtnText}>Xong</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.emerald,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  qrWrapper: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.emerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  mockQr: {
    padding: 10,
  },
  qrTokenText: {
    color: '#334155',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 8,
    letterSpacing: 1,
  },
  infoCard: {
    width: '100%',
    backgroundColor: COLORS.cardSecondary,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  courtName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  dateTimeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceBorder,
    paddingTop: 10,
  },
  gridCol: {
    flex: 1,
  },
  colLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 2,
  },
  colVal: {
    color: COLORS.emeraldLight,
    fontSize: 13,
    fontWeight: '700',
  },
  actionBtn: {
    width: '100%',
    backgroundColor: COLORS.emerald,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
