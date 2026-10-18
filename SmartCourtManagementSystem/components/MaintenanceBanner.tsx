import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertTriangle, X, ChevronRight } from 'lucide-react-native';
import { useNotificationStore } from '../stores/useNotificationStore';
import { useLanguageStore } from '../stores/useLanguageStore';

interface MaintenanceBannerProps {
  onPressDetails?: () => void;
}

export const MaintenanceBanner = ({ onPressDetails }: MaintenanceBannerProps) => {
  const { maintenanceNotice, showMaintenanceBanner, dismissMaintenanceBanner } = useNotificationStore();
  const { language } = useLanguageStore();

  if (!maintenanceNotice.active || !showMaintenanceBanner) {
    return null;
  }

  const title = language === 'en' ? maintenanceNotice.titleEn : maintenanceNotice.title;
  const message = language === 'en' ? maintenanceNotice.messageEn : maintenanceNotice.message;

  return (
    <View style={styles.banner}>
      <View style={styles.left}>
        <View style={styles.iconCircle}>
          <AlertTriangle size={16} color="#EF4444" />
        </View>
        <TouchableOpacity style={styles.textContainer} onPress={onPressDetails} activeOpacity={0.8}>
          <View style={styles.titleRow}>
            <Text style={styles.tag}>BẢO TRÌ & CẬP NHẬT</Text>
            <Text style={styles.timeTag}>{maintenanceNotice.scheduledTime}</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.desc} numberOfLines={2}>{message}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={dismissMaintenanceBanner} style={styles.dismissBtn}>
        <X size={16} color="rgba(255, 255, 255, 0.6)" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#1E1420',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
    paddingRight: 6,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#EF4444',
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5,
  },
  timeTag: {
    color: '#FCA5A5',
    fontSize: 10,
    fontWeight: '600',
  },
  title: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  desc: {
    color: '#E2E8F0',
    fontSize: 11,
    lineHeight: 15,
  },
  dismissBtn: {
    padding: 4,
  },
});
