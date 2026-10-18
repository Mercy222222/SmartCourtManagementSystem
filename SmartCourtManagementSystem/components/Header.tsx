import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Bell, Globe } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useAuthStore } from '../stores/useAuthStore';
import { useNotificationStore } from '../stores/useNotificationStore';
import { useLanguageStore } from '../stores/useLanguageStore';
import { RatingBadge } from './RatingBadge';
import { NotificationModal } from './NotificationModal';
import { EditProfileModal } from './EditProfileModal';
import { AuthModal } from './AuthModal';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { user, isAuthenticated } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const { language, toggleLanguage, t } = useLanguageStore();

  const [notifVisible, setNotifVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);

  const unread = unreadCount();

  const handleAvatarPress = () => {
    if (isAuthenticated) {
      setProfileVisible(true);
    } else {
      setAuthVisible(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.leftRow} onPress={handleAvatarPress} activeOpacity={0.8}>
          <View style={styles.avatarRing}>
            <Image
              source={{ uri: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }}
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.greeting}>{subtitle || t.greeting}</Text>
            <Text style={styles.userName}>
              {title || user?.name || (language === 'vi' ? 'Khách (Chạm để đăng nhập)' : 'Guest (Tap to sign in)')}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.rightRow}>
          {/* Language Toggle Pill */}
          <TouchableOpacity style={styles.langPill} onPress={toggleLanguage} activeOpacity={0.7}>
            <Globe size={13} color={COLORS.emeraldLight} />
            <Text style={styles.langText}>{language === 'vi' ? 'VIE' : 'ENG'}</Text>
          </TouchableOpacity>

          {user && <RatingBadge rating={user.vprRating} />}

          {/* Interactive Bell Button */}
          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => setNotifVisible(true)}
            activeOpacity={0.7}
          >
            <Bell size={20} color={COLORS.textPrimary} />
            {unread > 0 && (
              <View style={styles.badgeBox}>
                <Text style={styles.badgeNumber}>{unread > 9 ? '9+' : unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <NotificationModal visible={notifVisible} onClose={() => setNotifVisible(false)} />
      <EditProfileModal visible={profileVisible} onClose={() => setProfileVisible(false)} />
      <AuthModal visible={authVisible} onClose={() => setAuthVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  avatarRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: COLORS.emerald,
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  userName: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  langText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    position: 'relative',
  },
  badgeBox: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#0F172A',
  },
  badgeNumber: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
  },
});
