import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { X, Bell, AlertTriangle, Calendar, Wallet, Users, CheckCheck, Trash2 } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useNotificationStore } from '../stores/useNotificationStore';
import { useLanguageStore } from '../stores/useLanguageStore';

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NotificationModal = ({ visible, onClose }: NotificationModalProps) => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotificationStore();
  const { language, t } = useLanguageStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <AlertTriangle size={20} color="#EF4444" />;
      case 'booking':
        return <Calendar size={20} color={COLORS.emerald} />;
      case 'wallet':
        return <Wallet size={20} color="#3B82F6" />;
      case 'match':
        return <Users size={20} color={COLORS.padelOrange} />;
      default:
        return <Bell size={20} color="#FBBF24" />;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.bellIconBox}>
                <Bell size={18} color={COLORS.emerald} />
              </View>
              <Text style={styles.title}>{t.notificationCenterTitle}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.markAllBtn} onPress={markAllAsRead}>
              <CheckCheck size={14} color={COLORS.emeraldLight} />
              <Text style={styles.markAllText}>{t.markAllAsRead}</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>
              {notifications.filter((n) => !n.isRead).length} chưa đọc / {notifications.length} tổng
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
            {notifications.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Bell size={40} color={COLORS.textMuted} />
                <Text style={styles.emptyText}>{t.noNotifications}</Text>
              </View>
            ) : (
              notifications.map((item) => {
                const title = language === 'en' ? item.titleEn : item.title;
                const message = language === 'en' ? item.messageEn : item.message;
                const isMaintenance = item.type === 'maintenance';

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => markAsRead(item.id)}
                    style={[
                      styles.card,
                      !item.isRead && styles.cardUnread,
                      isMaintenance && styles.cardMaintenance,
                    ]}
                  >
                    <View style={styles.cardHeader}>
                      <View style={styles.typeRow}>
                        <View style={styles.iconCircle}>{getIcon(item.type)}</View>
                        <Text style={[styles.cardTitle, !item.isRead && styles.titleBold]}>
                          {title}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => deleteNotification(item.id)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Trash2 size={14} color={COLORS.textMuted} />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.cardMessage}>{message}</Text>

                    <View style={styles.cardFooter}>
                      <Text style={styles.timestamp}>{item.timestamp}</Text>
                      {!item.isRead && <View style={styles.unreadDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })
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
    maxHeight: '85%',
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
  bellIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0B1120',
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  markAllText: {
    color: COLORS.emeraldLight,
    fontSize: 12,
    fontWeight: '600',
  },
  counterText: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardUnread: {
    borderColor: COLORS.emerald,
    backgroundColor: '#162338',
  },
  cardMaintenance: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    paddingRight: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  titleBold: {
    fontWeight: '800',
    color: '#F8FAFC',
  },
  cardMessage: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    color: COLORS.textMuted,
    fontSize: 11,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.emerald,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});
