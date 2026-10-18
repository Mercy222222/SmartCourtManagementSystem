import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { X, ShieldCheck, QrCode, Clock, CheckCircle2, AlertCircle } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../constants/theme';
import { PaymentMethod } from '../types';

interface PaymentGatewayModalProps {
  visible: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
  paymentMethod: PaymentMethod;
  courtName: string;
  slotTime: string;
}

export const PaymentGatewayModal = ({
  visible,
  onClose,
  onPaymentSuccess,
  amount,
  paymentMethod,
  courtName,
  slotTime,
}: PaymentGatewayModalProps) => {
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes timer
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setSecondsLeft(300);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [visible]);

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const transactionCode = `INFINITY-${Date.now().toString().slice(-6)}`;

  const handleVerifyPayment = () => {
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      onPaymentSuccess();
    }, 1800);
  };

  const getMethodTitle = () => {
    if (paymentMethod === 'momo') return 'Thanh Toán MoMo QR';
    if (paymentMethod === 'vnpay') return 'Cổng VNPAY-QR';
    return 'Chuyển Khoản Ngân Hàng VietQR';
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={[styles.methodBadge, paymentMethod === 'momo' ? styles.momoBg : styles.vnpayBg]}>
                <Text style={styles.methodBadgeText}>
                  {paymentMethod === 'momo' ? 'MoMo' : 'VNPAY'}
                </Text>
              </View>
              <Text style={styles.title}>{getMethodTitle()}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* Timer countdown */}
            <View style={styles.timerRow}>
              <Clock size={14} color={secondsLeft < 60 ? '#EF4444' : COLORS.padelOrange} />
              <Text style={[styles.timerText, secondsLeft < 60 && styles.timerAlert]}>
                Giao dịch hết hạn sau: {timerDisplay}
              </Text>
            </View>

            {/* QR Code */}
            <View style={styles.qrBox}>
              <QRCode
                value={`https://pay.infinitypadel.vn/checkout?code=${transactionCode}&amount=${amount}`}
                size={170}
                color="#000"
                backgroundColor="#FFF"
              />
              <Text style={styles.qrAmount}>{formatVND(amount)}</Text>
            </View>

            {/* Bank details & memo */}
            <View style={styles.detailsCard}>
              <View style={styles.row}>
                <Text style={styles.label}>Nội dung chuyển khoản:</Text>
                <Text style={styles.codeText}>{transactionCode}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Ngân hàng:</Text>
                <Text style={styles.val}>Vietcombank (9908 189 189)</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Đặt sân:</Text>
                <Text style={styles.val}>{courtName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Khung giờ:</Text>
                <Text style={styles.val}>{slotTime}</Text>
              </View>
            </View>

            {/* Verification Button */}
            <TouchableOpacity
              style={[styles.verifyBtn, isVerifying && styles.btnDisabled]}
              onPress={handleVerifyPayment}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <ActivityIndicator size="small" color="#FFF" />
                  <Text style={styles.verifyText}>Đang Kiểm Tra Biến Động Số Dư...</Text>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} color="#FFF" />
                  <Text style={styles.verifyText}>Tôi Đã Quét QR & Chuyển Tiền Xong</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Hủy Giao Dịch / Chọn Phương Thức Khác</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 34,
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
  methodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  momoBg: {
    backgroundColor: '#A50064',
  },
  vnpayBg: {
    backgroundColor: '#005BAA',
  },
  methodBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
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
    alignItems: 'center',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 14,
  },
  timerText: {
    color: COLORS.padelOrange,
    fontSize: 12,
    fontWeight: '700',
  },
  timerAlert: {
    color: '#EF4444',
  },
  qrBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 14,
  },
  qrAmount: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 10,
  },
  detailsCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  val: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  codeText: {
    color: COLORS.padelOrange,
    fontSize: 12,
    fontWeight: '800',
  },
  verifyBtn: {
    backgroundColor: COLORS.emerald,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    marginBottom: 8,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  verifyText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelBtn: {
    paddingVertical: 8,
  },
  cancelText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
});
