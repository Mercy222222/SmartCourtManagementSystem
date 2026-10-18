import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { X, Check, Camera, User, Phone, Mail } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useAuthStore } from '../stores/useAuthStore';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200',
];

export const EditProfileModal = ({ visible, onClose }: EditProfileModalProps) => {
  const { user, updateProfile } = useAuthStore();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarUrl || PRESET_AVATARS[0]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Họ và tên không được để trống.');
      return;
    }

    updateProfile({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      avatarUrl: selectedAvatar,
    });

    Alert.alert('Thành Công', 'Đã cập nhật thông tin hồ sơ và ảnh đại diện thành công!');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Chỉnh Sửa Hồ Sơ & Ảnh Đại Diện</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {/* Current Avatar Preview */}
            <View style={styles.avatarPreviewContainer}>
              <Image source={{ uri: selectedAvatar }} style={styles.avatarLarge} />
              <View style={styles.cameraBadge}>
                <Camera size={14} color="#FFF" />
              </View>
            </View>

            {/* Choose Avatar Presets */}
            <Text style={styles.sectionHeading}>Chọn Ảnh Đại Diện (Preset Đẹp)</Text>
            <View style={styles.avatarRow}>
              {PRESET_AVATARS.map((uri, idx) => {
                const isSelected = selectedAvatar === uri;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setSelectedAvatar(uri)}
                    style={[styles.avatarChoice, isSelected && styles.avatarChoiceSelected]}
                  >
                    <Image source={{ uri }} style={styles.avatarChoiceImg} />
                    {isSelected && (
                      <View style={styles.checkBadge}>
                        <Check size={10} color="#FFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Input Fields */}
            <Text style={styles.sectionHeading}>Thông Tin Cá Nhân</Text>

            <View style={styles.fieldBox}>
              <Text style={styles.fieldLabel}>Họ và Tên</Text>
              <View style={styles.inputWrap}>
                <User size={16} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Nhập họ và tên của bạn"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>
            </View>

            <View style={styles.fieldBox}>
              <Text style={styles.fieldLabel}>Số Điện Thoại</Text>
              <View style={styles.inputWrap}>
                <Phone size={16} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Nhập số điện thoại"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.fieldBox}>
              <Text style={styles.fieldLabel}>Địa Chỉ Email</Text>
              <View style={styles.inputWrap}>
                <Mail size={16} color={COLORS.textMuted} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Nhập địa chỉ email"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="email-address"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Check size={18} color="#FFF" />
              <Text style={styles.saveBtnText}>Lưu Thay Đổi</Text>
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
  title: {
    color: '#FFF',
    fontSize: 17,
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
  avatarPreviewContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  avatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.emerald,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.emerald,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  sectionHeading: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 6,
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatarChoice: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  avatarChoiceSelected: {
    borderColor: COLORS.emerald,
  },
  avatarChoiceImg: {
    width: '100%',
    height: '100%',
    borderRadius: 21,
  },
  checkBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.emerald,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldBox: {
    marginBottom: 14,
  },
  fieldLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    paddingVertical: 12,
  },
  saveBtn: {
    backgroundColor: COLORS.emerald,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
