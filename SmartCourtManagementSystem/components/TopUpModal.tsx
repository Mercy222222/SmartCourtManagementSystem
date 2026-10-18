import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { X, CreditCard, Check, ArrowRight, ShieldCheck, QrCode, Copy } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../constants/theme';
import { useAuthStore } from '../stores/useAuthStore';
import { useNotificationStore } from '../stores/useNotificationStore';
import { useLanguageStore } from '../stores/useLanguageStore';

interface TopUpModalProps {
  visible: boolean;
  onClose: () => void;
  initialAmount?: number;
}

const PRESET_AMOUNTS = [100000, 200000, 500000, 1000000, 2000000, 5000000];

export const TopUpModal = ({ visible, onClose, initialAmount }: TopUpModalProps) => {
  const { user, updateWallet } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const { language } = useLanguageStore();

  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount || 500000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'vnpay' | 'bank'>('momo');
  const [step, setStep] = useState<'select' | 'qr'>('select');
  const [isProcessing, setIsProcessing] = useState(false);

  const amountToPay = customAmount && parseInt(customAmount, 10) > 0 ? parseInt(customAmount, 10) : selectedAmount;

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleNextStep = () => {
    if (amountToPay < 50000) {
      Alert.alert('Số tiền không hợp lệ', 'Số tiền nạp tối thiểu là 50.000 VNĐ');
      return;
    }
    setStep('qr');
  };

  const handleConfirmTopUp = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      updateWallet(
        amountToPay,
        `Nạp tiền vào ví qua ${paymentMethod.toUpperCase()}`,
        paymentMethod.toUpperCase()
      );

      addNotification({
        title: '💰 Nạp tiền vào ví thành công',
        titleEn: '💰 Wallet Top-Up Successful',
        message: `Bạn đã nạp thành công ${formatVND(amountToPay)} qua ${paymentMethod.toUpperCase()}. Số dư ví hiện tại: ${formatVND((user?.walletBalance || 0) + amountToPay)}.`,
        messageEn: `Successfully topped up ${formatVND(amountToPay)} via ${paymentMethod.toUpperCase()}. Current balance: ${formatVND((user?.walletBalance || 0) + amountToPay)}.`,
        type: 'wallet',
      });

      Alert.alert(
        '🎉 Nạp Tiền Thành Công!',
        `Đã cộng ${formatVND(amountToPay)} vào ví Infinity Padel của bạn.\nSố dư mới: ${formatVND((user?.walletBalance || 0) + amountToPay)}`,
        [
          {
            text: 'Tuyệt vời',
            onPress: () => {
              setStep('select');
              onClose();
            },
          },
        ]
      );
    }, 1500);
  };

  const memoCode = `NAP-${(user?.id || 'PADEL').toUpperCase().slice(-4)}-${Date.now().toString().slice(-4)}`;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.iconBox}>
                <CreditCard size={18} color="#FFF" />
              </View>
              <Text style={styles.title}>Nạp Tiền Vào Ví Thành Viên</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {step === 'select' ? (
              <>
                {/* Current Balance */}
                <View style={styles.balanceCard}>
                  <Text style={styles.balanceLabel}>Số Dư Ví Hiện Tại</Text>
                  <Text style={styles.balanceValue}>{formatVND(user?.walletBalance || 0)}</Text>
                </View>

                {/* Preset Amounts */}
                <Text style={styles.sectionTitle}>Chọn Mệnh Giá Nạp</Text>
                <View style={styles.presetsGrid}>
                  {PRESET_AMOUNTS.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <TouchableOpacity
                        key={amt}
                        style={[styles.presetCard, isSelected && styles.presetCardActive]}
                        onPress={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                      >
                        <Text style={[styles.presetText, isSelected && styles.presetTextActive]}>
                          {formatVND(amt)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Custom Amount Input */}
                <Text style={styles.sectionTitle}>Hoặc Nhập Số Tiền Khác</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập số tiền (VD: 300000)"
                    placeholderTextColor={COLORS.textMuted}
                    keyboardType="numeric"
                    value={customAmount}
                    onChangeText={setCustomAmount}
                  />
                  <Text style={styles.currencySuffix}>VNĐ</Text>
                </View>

                {/* Payment Channel */}
                <Text style={styles.sectionTitle}>Cổng Thanh Toán Nạp Tiền</Text>
                <TouchableOpacity
                  style={[styles.channelItem, paymentMethod === 'momo' && styles.channelItemActive]}
                  onPress={() => setPaymentMethod('momo')}
                >
                  <View style={[styles.channelLogo, { backgroundColor: '#A50064' }]}>
                    <Text style={styles.logoText}>MoMo</Text>
                  </View>
                  <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>Ví Điện Tử MoMo</Text>
                    <Text style={styles.channelDesc}>Quét mã QR MoMo nạp tiền tự động 24/7</Text>
                  </View>
                  {paymentMethod === 'momo' && <Check size={18} color={COLORS.emerald} />}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.channelItem, paymentMethod === 'vnpay' && styles.channelItemActive]}
                  onPress={() => setPaymentMethod('vnpay')}
                >
                  <View style={[styles.channelLogo, { backgroundColor: '#005BAA' }]}>
                    <Text style={styles.logoText}>VNPAY</Text>
                  </View>
                  <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>Cổng VNPAY-QR</Text>
                    <Text style={styles.channelDesc}>Quét QR từ App của 40+ Ngân Hàng Việt Nam</Text>
                  </View>
                  {paymentMethod === 'vnpay' && <Check size={18} color={COLORS.emerald} />}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.channelItem, paymentMethod === 'bank' && styles.channelItemActive]}
                  onPress={() => setPaymentMethod('bank')}
                >
                  <View style={[styles.channelLogo, { backgroundColor: COLORS.emerald }]}>
                    <Text style={styles.logoText}>VietQR</Text>
                  </View>
                  <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>Chuyển Khoản Ngân Hàng 24/7</Text>
                    <Text style={styles.channelDesc}>Vietcombank - Khớp lệnh tự động trong 3 giây</Text>
                  </View>
                  {paymentMethod === 'bank' && <Check size={18} color={COLORS.emerald} />}
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueBtn} onPress={handleNextStep}>
                  <Text style={styles.continueBtnText}>Tiếp Tục Nạp {formatVND(amountToPay)}</Text>
                  <ArrowRight size={16} color="#FFF" />
                </TouchableOpacity>
              </>
            ) : (
              /* QR Code Payment Screen */
              <View style={styles.qrContainer}>
                <Text style={styles.qrTitle}>Quét Mã QR Để Hoàn Tất Nạp Tiền</Text>
                <Text style={styles.qrSub}>
                  Mở ứng dụng ngân hàng hoặc {paymentMethod === 'momo' ? 'MoMo' : 'VNPAY'} để quét mã bên dưới
                </Text>

                <View style={styles.qrBox}>
                  <QRCode
                    value={`https://payment.infinitypadel.vn/topup?amount=${amountToPay}&memo=${memoCode}`}
                    size={180}
                    color="#000"
                    backgroundColor="#FFF"
                  />
                  <Text style={styles.qrAmountText}>{formatVND(amountToPay)}</Text>
                </View>

                {/* Transfer Info */}
                <View style={styles.infoCard}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ngân hàng thụ hưởng:</Text>
                    <Text style={styles.infoVal}>Vietcombank (CN TP.HCM)</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Số tài khoản:</Text>
                    <Text style={styles.infoValHighlight}>9908 189 189</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Chủ tài khoản:</Text>
                    <Text style={styles.infoVal}>CONG TY CP INFINITY PADEL VIET NAM</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nội dung chuyển khoản:</Text>
                    <Text style={styles.infoValHighlight}>{memoCode}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.confirmPaidBtn, isProcessing && styles.btnDisabled]}
                  onPress={handleConfirmTopUp}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <>
                      <ShieldCheck size={18} color="#FFF" />
                      <Text style={styles.confirmPaidText}>Tôi Đã Chuyển Khoản Thành Công</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.backBtn} onPress={() => setStep('select')}>
                  <Text style={styles.backBtnText}>Chọn Mệnh Giá Khác</Text>
                </TouchableOpacity>
              </View>
            )}
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
    gap: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#0D2319',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.emerald,
    marginBottom: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  presetCard: {
    width: '31%',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  presetCardActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: COLORS.emerald,
  },
  presetText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  presetTextActive: {
    color: COLORS.emeraldLight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    paddingVertical: 12,
  },
  currencySuffix: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  channelItemActive: {
    borderColor: COLORS.emerald,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  channelLogo: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  channelDesc: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  continueBtn: {
    backgroundColor: COLORS.emerald,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 14,
  },
  continueBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  qrContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  qrTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
  },
  qrSub: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  qrBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  qrAmountText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  infoVal: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  infoValHighlight: {
    color: COLORS.padelOrange,
    fontSize: 12,
    fontWeight: '800',
  },
  confirmPaidBtn: {
    backgroundColor: COLORS.emerald,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    marginBottom: 10,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  confirmPaidText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  backBtn: {
    paddingVertical: 8,
  },
  backBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
});
