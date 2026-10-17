import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, MapPin, Calendar, Clock, CreditCard, Check, Share2 } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useBookingStore } from '../stores/useBookingStore';
import { useAuthStore } from '../stores/useAuthStore';
import { PaymentMethod } from '../types';

export default function CheckoutScreen() {
  const router = useRouter();
  const { selectedClub, selectedCourt, selectedDate, selectedSlot, addBooking } = useBookingStore();
  const { user, updateWallet } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [isSplitBill, setIsSplitBill] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedSlot) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Chưa có khung giờ nào được chọn.</Text>
      </View>
    );
  }

  const totalPrice = selectedSlot.price;
  const payAmount = isSplitBill ? totalPrice / 4 : totalPrice;

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (paymentMethod === 'wallet') {
        if ((user?.walletBalance || 0) < payAmount) {
          Alert.alert('Số dư ví không đủ', 'Vui lòng chọn hình thức thanh toán MoMo/VNPay hoặc nạp thêm tiền vào ví.');
          return;
        }
        updateWallet(-payAmount);
      }

      // Add to bookings
      addBooking({
        id: `BK-${Date.now().toString().slice(-6)}`,
        userId: user?.id || 'usr_001',
        club: selectedClub,
        court: selectedCourt,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        totalPrice: payAmount,
        paymentMethod: paymentMethod,
        paymentStatus: 'paid',
        qrCodeToken: `INFINITY_PASS_VERIFIED_${Date.now()}`,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        '🎉 Đặt Sân Thành Công!',
        `Bạn đã đặt thành công ${selectedCourt.name} (${selectedSlot.startTime} - ${selectedSlot.endTime}).\n\nMã vé QR đã được tạo sẵn trong mục "Vé Của Tôi".`,
        [
          {
            text: 'Mở Vé Check-In',
            onPress: () => {
              router.replace('/(tabs)/history');
            },
          },
        ]
      );
    }, 1200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Booking Summary Card */}
      <View style={styles.card}>
        <Text style={styles.courtName}>{selectedCourt.name}</Text>
        <View style={styles.locRow}>
          <MapPin size={13} color={COLORS.emeraldLight} />
          <Text style={styles.locText}>{selectedClub.name}</Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Calendar size={13} color={COLORS.padelOrange} />
            <Text style={styles.metaText}>{selectedDate}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={13} color={COLORS.padelOrange} />
            <Text style={styles.metaText}>{selectedSlot.startTime} - {selectedSlot.endTime}</Text>
          </View>
        </View>
      </View>

      {/* Split Bill Option */}
      <TouchableOpacity
        style={[styles.splitBox, isSplitBill && styles.splitBoxActive]}
        onPress={() => setIsSplitBill(!isSplitBill)}
      >
        <View style={styles.splitLeft}>
          <Share2 size={20} color={isSplitBill ? COLORS.padelOrange : COLORS.textSecondary} />
          <View>
            <Text style={styles.splitTitle}>Chia tiền sân tự động (Split Bill)</Text>
            <Text style={styles.splitSub}>Chỉ thanh toán 1/4 chi phí ({formatVND(totalPrice / 4)}), tạo link mời 3 bạn chơi</Text>
          </View>
        </View>
        <View style={[styles.checkbox, isSplitBill && styles.checkboxActive]}>
          {isSplitBill && <Check size={14} color="#FFF" />}
        </View>
      </TouchableOpacity>

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>Phương Thức Thanh Toán</Text>

      <TouchableOpacity
        style={[styles.methodItem, paymentMethod === 'momo' && styles.methodItemActive]}
        onPress={() => setPaymentMethod('momo')}
      >
        <View style={styles.methodLeft}>
          <View style={[styles.methodLogo, { backgroundColor: '#A50064' }]}>
            <Text style={styles.momoText}>MoMo</Text>
          </View>
          <View>
            <Text style={styles.methodName}>Ví Điện Tử MoMo</Text>
            <Text style={styles.methodDesc}>Quét mã QR hoặc thanh toán một chạm</Text>
          </View>
        </View>
        {paymentMethod === 'momo' && <Check size={18} color={COLORS.emerald} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.methodItem, paymentMethod === 'vnpay' && styles.methodItemActive]}
        onPress={() => setPaymentMethod('vnpay')}
      >
        <View style={styles.methodLeft}>
          <View style={[styles.methodLogo, { backgroundColor: '#005BAA' }]}>
            <Text style={styles.vnpayText}>VNPAY</Text>
          </View>
          <View>
            <Text style={styles.methodName}>Cổng VNPAY-QR / Thẻ ATM</Text>
            <Text style={styles.methodDesc}>Hỗ trợ tất cả ngân hàng tại Việt Nam</Text>
          </View>
        </View>
        {paymentMethod === 'vnpay' && <Check size={18} color={COLORS.emerald} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.methodItem, paymentMethod === 'wallet' && styles.methodItemActive]}
        onPress={() => setPaymentMethod('wallet')}
      >
        <View style={styles.methodLeft}>
          <View style={[styles.methodLogo, { backgroundColor: COLORS.emerald }]}>
            <CreditCard size={18} color="#FFF" />
          </View>
          <View>
            <Text style={styles.methodName}>Ví Infinity Padel</Text>
            <Text style={styles.methodDesc}>Số dư: {formatVND(user?.walletBalance || 0)}</Text>
          </View>
        </View>
        {paymentMethod === 'wallet' && <Check size={18} color={COLORS.emerald} />}
      </TouchableOpacity>

      {/* Total & Confirm Button */}
      <View style={styles.priceBreakdown}>
        <View style={styles.breakdownRow}>
          <Text style={styles.bdLabel}>Tiền sân (90 phút):</Text>
          <Text style={styles.bdVal}>{formatVND(totalPrice)}</Text>
        </View>
        {isSplitBill && (
          <View style={styles.breakdownRow}>
            <Text style={styles.bdLabel}>Phần thanh toán của bạn (1/4):</Text>
            <Text style={styles.bdVal}>{formatVND(payAmount)}</Text>
          </View>
        )}
        <View style={[styles.breakdownRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Tổng Thanh Toán:</Text>
          <Text style={styles.totalVal}>{formatVND(payAmount)}</Text>
        </View>
      </View>

      <TouchableOpacity
        disabled={isProcessing}
        style={[styles.confirmBtn, isProcessing && styles.confirmBtnDisabled]}
        onPress={handleConfirmPayment}
      >
        <ShieldCheck size={18} color="#FFF" />
        <Text style={styles.confirmBtnText}>
          {isProcessing ? 'Đang Xử Lý Giao Dịch...' : `Thanh Toán ${formatVND(payAmount)}`}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 16,
  },
  courtName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  locRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  locText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardSecondary,
    paddingTop: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  splitBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 20,
  },
  splitBoxActive: {
    borderColor: COLORS.padelOrange,
    backgroundColor: 'rgba(249, 115, 22, 0.08)',
  },
  splitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  splitTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  splitSub: {
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: COLORS.padelOrange,
    borderColor: COLORS.padelOrange,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  methodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 10,
  },
  methodItemActive: {
    borderColor: COLORS.emerald,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  momoText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
  },
  vnpayText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '900',
  },
  methodName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  methodDesc: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  priceBreakdown: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bdLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  bdVal: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.cardSecondary,
    paddingTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  totalVal: {
    color: COLORS.emeraldLight,
    fontSize: 18,
    fontWeight: '800',
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.emerald,
    paddingVertical: 15,
    borderRadius: 14,
    shadowColor: COLORS.emerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmBtnDisabled: {
    opacity: 0.6,
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
