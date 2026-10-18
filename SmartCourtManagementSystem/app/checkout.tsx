import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, MapPin, Calendar, Clock, CreditCard, Check, Share2, PlusCircle, AlertCircle } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useBookingStore } from '../stores/useBookingStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useNotificationStore } from '../stores/useNotificationStore';
import { useLanguageStore } from '../stores/useLanguageStore';
import { PaymentMethod } from '../types';
import { TopUpModal } from '../components/TopUpModal';
import { PaymentGatewayModal } from '../components/PaymentGatewayModal';

export default function CheckoutScreen() {
  const router = useRouter();
  const { selectedClub, selectedCourt, selectedDate, selectedSlot, addBooking } = useBookingStore();
  const { user, updateWallet } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const { t } = useLanguageStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wallet');
  const [isSplitBill, setIsSplitBill] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [topUpModalVisible, setTopUpModalVisible] = useState(false);
  const [gatewayModalVisible, setGatewayModalVisible] = useState(false);

  if (!selectedSlot) {
    return (
      <View style={styles.emptyContainer}>
        <AlertCircle size={40} color={COLORS.textMuted} />
        <Text style={styles.emptyText}>{t.emptySlotMsg}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Quay Lại Chọn Sân</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalPrice = selectedSlot.price;
  const payAmount = isSplitBill ? Math.round(totalPrice / 4) : totalPrice;
  const walletBalance = user?.walletBalance || 0;
  const isWalletInsufficient = walletBalance < payAmount;

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const finalizeBooking = () => {
    // Add to bookings store
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

    // Notify user
    addNotification({
      title: '🎉 Đặt Sân Thành Công!',
      titleEn: '🎉 Booking Confirmed!',
      message: `Bạn đã thanh toán thành công vé ${selectedCourt.name} (${selectedSlot.startTime} - ${selectedSlot.endTime}) ngày ${selectedDate}.`,
      messageEn: `Successfully paid for ${selectedCourt.name} (${selectedSlot.startTime} - ${selectedSlot.endTime}) on ${selectedDate}.`,
      type: 'booking',
    });

    Alert.alert(
      '🎉 Đặt Sân Thành Công!',
      `Bạn đã đặt thành công ${selectedCourt.name} (${selectedSlot.startTime} - ${selectedSlot.endTime}).\n\nMã vé QR đã được tạo sẵn trong mục "Vé Của Tôi".`,
      [
        {
          text: 'Mở Vé Check-In Ngay',
          onPress: () => {
            router.replace('/(tabs)/history');
          },
        },
      ]
    );
  };

  const handleConfirmPayment = () => {
    // 1. Strict Validation: Wallet Payment Check
    if (paymentMethod === 'wallet') {
      if (isWalletInsufficient) {
        Alert.alert(
          '⚠️ Số Dư Ví Không Đủ',
          `Số dư ví của bạn hiện có: ${formatVND(walletBalance)}.\nSố tiền cần thanh toán: ${formatVND(payAmount)}.\n\nVui lòng nạp thêm ${formatVND(payAmount - walletBalance)} để hoàn tất đặt sân!`,
          [
            { text: 'Đổi Phương Thức' },
            {
              text: 'Nạp Tiền Ngay',
              onPress: () => setTopUpModalVisible(true),
            },
          ]
        );
        return;
      }

      // If wallet has sufficient balance, deduct and complete
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        updateWallet(
          -payAmount,
          `Thanh toán ${selectedCourt.name} (${selectedSlot.startTime} - ${selectedSlot.endTime})`,
          'Ví Infinity'
        );
        finalizeBooking();
      }, 1000);
      return;
    }

    // 2. Strict Validation: If MoMo / VNPay, open dynamic Payment Gateway Modal with QR
    setGatewayModalVisible(true);
  };

  const handleGatewaySuccess = () => {
    setGatewayModalVisible(false);
    finalizeBooking();
  };

  return (
    <>
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
          activeOpacity={0.8}
        >
          <View style={styles.splitLeft}>
            <Share2 size={20} color={isSplitBill ? COLORS.padelOrange : COLORS.textSecondary} />
            <View>
              <Text style={styles.splitTitle}>{t.splitBillTitle}</Text>
              <Text style={styles.splitSub}>
                Chỉ thanh toán 1/4 chi phí ({formatVND(totalPrice / 4)}), tạo link mời 3 bạn chơi
              </Text>
            </View>
          </View>
          <View style={[styles.checkbox, isSplitBill && styles.checkboxActive]}>
            {isSplitBill && <Check size={14} color="#FFF" />}
          </View>
        </TouchableOpacity>

        {/* Payment Methods */}
        <Text style={styles.sectionTitle}>{t.paymentMethodsTitle}</Text>

        {/* Wallet Option with Live Balance and Quick Top Up */}
        <TouchableOpacity
          style={[
            styles.methodItem,
            paymentMethod === 'wallet' && styles.methodItemActive,
            isWalletInsufficient && paymentMethod === 'wallet' && styles.methodItemWarning,
          ]}
          onPress={() => setPaymentMethod('wallet')}
          activeOpacity={0.8}
        >
          <View style={styles.methodLeft}>
            <View style={[styles.methodLogo, { backgroundColor: COLORS.emerald }]}>
              <CreditCard size={18} color="#FFF" />
            </View>
            <View>
              <Text style={styles.methodName}>{t.walletOptionName}</Text>
              <Text style={[styles.methodDesc, isWalletInsufficient && styles.balanceWarning]}>
                Số dư: {formatVND(walletBalance)} {isWalletInsufficient ? '(Chưa đủ tiền)' : '(Khả dụng)'}
              </Text>
            </View>
          </View>

          <View style={styles.methodRight}>
            {paymentMethod === 'wallet' && <Check size={18} color={COLORS.emerald} />}
            {isWalletInsufficient && (
              <TouchableOpacity
                style={styles.quickTopUpBtn}
                onPress={() => setTopUpModalVisible(true)}
              >
                <PlusCircle size={12} color="#FFF" />
                <Text style={styles.quickTopUpText}>Nạp ví</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        {/* MoMo Option */}
        <TouchableOpacity
          style={[styles.methodItem, paymentMethod === 'momo' && styles.methodItemActive]}
          onPress={() => setPaymentMethod('momo')}
          activeOpacity={0.8}
        >
          <View style={styles.methodLeft}>
            <View style={[styles.methodLogo, { backgroundColor: '#A50064' }]}>
              <Text style={styles.momoText}>MoMo</Text>
            </View>
            <View>
              <Text style={styles.methodName}>{t.momoOptionName}</Text>
              <Text style={styles.methodDesc}>{t.momoOptionDesc}</Text>
            </View>
          </View>
          {paymentMethod === 'momo' && <Check size={18} color={COLORS.emerald} />}
        </TouchableOpacity>

        {/* VNPay Option */}
        <TouchableOpacity
          style={[styles.methodItem, paymentMethod === 'vnpay' && styles.methodItemActive]}
          onPress={() => setPaymentMethod('vnpay')}
          activeOpacity={0.8}
        >
          <View style={styles.methodLeft}>
            <View style={[styles.methodLogo, { backgroundColor: '#005BAA' }]}>
              <Text style={styles.vnpayText}>VNPAY</Text>
            </View>
            <View>
              <Text style={styles.methodName}>{t.vnpayOptionName}</Text>
              <Text style={styles.methodDesc}>{t.vnpayOptionDesc}</Text>
            </View>
          </View>
          {paymentMethod === 'vnpay' && <Check size={18} color={COLORS.emerald} />}
        </TouchableOpacity>

        {/* Total & Price Breakdown */}
        <View style={styles.priceBreakdown}>
          <View style={styles.breakdownRow}>
            <Text style={styles.bdLabel}>{t.courtRentalFee}</Text>
            <Text style={styles.bdVal}>{formatVND(totalPrice)}</Text>
          </View>
          {isSplitBill && (
            <View style={styles.breakdownRow}>
              <Text style={styles.bdLabel}>{t.yourPortionFee}</Text>
              <Text style={styles.bdVal}>{formatVND(payAmount)}</Text>
            </View>
          )}
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>{t.totalPaymentLabel}</Text>
            <Text style={styles.totalVal}>{formatVND(payAmount)}</Text>
          </View>
        </View>

        {/* Warning if wallet is chosen and insufficient */}
        {paymentMethod === 'wallet' && isWalletInsufficient && (
          <View style={styles.warningNotice}>
            <AlertCircle size={16} color="#EF4444" />
            <Text style={styles.warningText}>
              Số dư ví chưa đủ để thanh toán. Vui lòng bấm "Nạp ví" hoặc đổi sang MoMo / VNPAY.
            </Text>
          </View>
        )}

        <TouchableOpacity
          disabled={isProcessing}
          style={[
            styles.confirmBtn,
            isProcessing && styles.confirmBtnDisabled,
            paymentMethod === 'wallet' && isWalletInsufficient && styles.confirmBtnWarning,
          ]}
          onPress={handleConfirmPayment}
          activeOpacity={0.8}
        >
          <ShieldCheck size={18} color="#FFF" />
          <Text style={styles.confirmBtnText}>
            {isProcessing
              ? t.btnProcessing
              : paymentMethod === 'wallet' && isWalletInsufficient
              ? `Nạp Tiền Để Thanh Toán (${formatVND(payAmount)})`
              : `${t.btnPayNow} ${formatVND(payAmount)}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Top Up Modal */}
      <TopUpModal
        visible={topUpModalVisible}
        onClose={() => setTopUpModalVisible(false)}
        initialAmount={payAmount}
      />

      {/* Dynamic Payment Gateway QR Modal */}
      <PaymentGatewayModal
        visible={gatewayModalVisible}
        onClose={() => setGatewayModalVisible(false)}
        onPaymentSuccess={handleGatewaySuccess}
        amount={payAmount}
        paymentMethod={paymentMethod}
        courtName={selectedCourt.name}
        slotTime={`${selectedSlot.startTime} - ${selectedSlot.endTime}`}
      />
    </>
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
    padding: 20,
    gap: 12,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
  backBtn: {
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  backBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
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
  methodItemWarning: {
    borderColor: '#EF4444',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  methodRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  balanceWarning: {
    color: '#EF4444',
    fontWeight: '600',
  },
  quickTopUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quickTopUpText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  priceBreakdown: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    marginBottom: 14,
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
  warningNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  warningText: {
    color: '#FCA5A5',
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
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
  confirmBtnWarning: {
    backgroundColor: '#DC2626',
    shadowColor: '#DC2626',
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
