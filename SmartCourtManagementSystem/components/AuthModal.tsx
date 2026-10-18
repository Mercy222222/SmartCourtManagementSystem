import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { X, Lock, Mail, Phone, User, Zap, LogIn, UserPlus } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useAuthStore } from '../stores/useAuthStore';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal = ({ visible, onClose, initialMode = 'login' }: AuthModalProps) => {
  const { login, quickLogin, register } = useAuthStore();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [identifier, setIdentifier] = useState('trieuhi@infinitypadel.vn');
  const [password, setPassword] = useState('123456');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (mode === 'login') {
      if (!identifier.trim()) {
        setLoading(false);
        Alert.alert('Lỗi', 'Vui lòng nhập Email hoặc Số điện thoại.');
        return;
      }
      await login(identifier, password);
      setLoading(false);
      Alert.alert('Chào Mừng Trở Lại', 'Đăng nhập tài khoản thành công!');
      onClose();
    } else {
      if (!fullName.trim() || !identifier.trim()) {
        setLoading(false);
        Alert.alert('Lỗi', 'Vui lòng điền đầy đủ họ tên và email.');
        return;
      }
      await register(fullName, identifier, phone);
      setLoading(false);
      Alert.alert('Thành Công', 'Tài khoản thành viên mới đã được kích hoạt!');
      onClose();
    }
  };

  const handleQuick = (type: 'trieu' | 'alex' | 'guest') => {
    quickLogin(type);
    onClose();
    Alert.alert('Đăng Nhập Nhanh', 'Đã chuyển sang tài khoản thành công!');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.modeTabs}>
              <TouchableOpacity
                style={[styles.modeTab, mode === 'login' && styles.modeTabActive]}
                onPress={() => setMode('login')}
              >
                <LogIn size={14} color={mode === 'login' ? '#FFF' : COLORS.textMuted} />
                <Text style={[styles.modeTabText, mode === 'login' && styles.modeTabTextActive]}>
                  Đăng Nhập
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modeTab, mode === 'register' && styles.modeTabActive]}
                onPress={() => setMode('register')}
              >
                <UserPlus size={14} color={mode === 'register' ? '#FFF' : COLORS.textMuted} />
                <Text style={[styles.modeTabText, mode === 'register' && styles.modeTabTextActive]}>
                  Đăng Ký
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* Quick Demo Login Buttons */}
            <Text style={styles.quickTitle}>⚡ Đăng Nhập Nhanh 1-Chạm (Tài Khoản Mẫu):</Text>
            <View style={styles.quickRow}>
              <TouchableOpacity style={styles.quickBtn} onPress={() => handleQuick('trieu')}>
                <Zap size={12} color={COLORS.emeraldLight} />
                <Text style={styles.quickBtnText}>Hoàng Minh Triều (VPR 4.25)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickBtn} onPress={() => handleQuick('alex')}>
                <Zap size={12} color="#3B82F6" />
                <Text style={styles.quickBtnText}>Alexandre Nguyễn (VPR 4.10)</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickBtn} onPress={() => handleQuick('guest')}>
                <Zap size={12} color="#FBBF24" />
                <Text style={styles.quickBtnText}>Tài Khoản Khách Mới (0đ)</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>hoặc nhập thông tin</Text>
              <View style={styles.dividerLine} />
            </View>

            {mode === 'register' && (
              <View style={styles.inputWrap}>
                <User size={16} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="Họ và tên của bạn"
                  placeholderTextColor={COLORS.textMuted}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            )}

            <View style={styles.inputWrap}>
              <Mail size={16} color={COLORS.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Email hoặc Số điện thoại"
                placeholderTextColor={COLORS.textMuted}
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
              />
            </View>

            {mode === 'register' && (
              <View style={styles.inputWrap}>
                <Phone size={16} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  placeholder="Số điện thoại liên hệ"
                  placeholderTextColor={COLORS.textMuted}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            )}

            <View style={styles.inputWrap}>
              <Lock size={16} color={COLORS.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu (ít nhất 6 ký tự)"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, loading && styles.btnDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <Text style={styles.submitBtnText}>
                  {mode === 'login' ? 'Đăng Nhập Ngay' : 'Kích Hoạt Tài Khoản Thành Viên'}
                </Text>
              )}
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
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 3,
    gap: 4,
  },
  modeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  modeTabActive: {
    backgroundColor: COLORS.emerald,
  },
  modeTabText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  modeTabTextActive: {
    color: '#FFF',
  },
  closeBtn: {
    padding: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  quickTitle: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  quickRow: {
    gap: 8,
    marginBottom: 16,
  },
  quickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  quickBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    marginBottom: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    paddingVertical: 12,
  },
  submitBtn: {
    backgroundColor: COLORS.emerald,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
