import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, ShieldCheck, FileText, PhoneCall } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { COURT_POLICIES } from '../constants/mockData';
import { useLanguageStore } from '../stores/useLanguageStore';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TermsModal = ({ visible, onClose }: TermsModalProps) => {
  const { language } = useLanguageStore();
  const policies = COURT_POLICIES[language] || COURT_POLICIES.vi;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.iconBox}>
                <FileText size={18} color={COLORS.emerald} />
              </View>
              <Text style={styles.title}>{policies.title}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <View style={styles.badgeBanner}>
              <ShieldCheck size={16} color={COLORS.emeraldLight} />
              <Text style={styles.badgeText}>
                Áp dụng cho toàn bộ 3 chi nhánh Thảo Điền, An Phú và Mỹ Khê Beach Club
              </Text>
            </View>

            {policies.sections.map((section, idx) => (
              <View key={idx} style={styles.sectionCard}>
                <Text style={styles.sectionHeading}>{section.heading}</Text>
                <Text style={styles.sectionContent}>{section.content}</Text>
              </View>
            ))}

            <TouchableOpacity style={styles.closeActionBtn} onPress={onClose}>
              <Text style={styles.closeActionText}>Đã Hiểu & Đồng Ý Điều Khoản</Text>
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
    gap: 10,
    flex: 1,
    paddingRight: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  closeBtn: {
    padding: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
  },
  badgeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  badgeText: {
    color: COLORS.emeraldLight,
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  sectionCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionHeading: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionContent: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  closeActionBtn: {
    backgroundColor: COLORS.emerald,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  closeActionText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
