import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Bell } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useAuthStore } from '../stores/useAuthStore';
import { RatingBadge } from './RatingBadge';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { user } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        <View style={styles.avatarRing}>
          <Image
            source={{ uri: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }}
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.greeting}>{subtitle || 'Chào bạn,'}</Text>
          <Text style={styles.userName}>{title || user?.name || 'Infinity Player'}</Text>
        </View>
      </View>

      <View style={styles.rightRow}>
        {user && <RatingBadge rating={user.vprRating} />}
        <TouchableOpacity style={styles.bellButton}>
          <Bell size={20} color={COLORS.textPrimary} />
          <View style={styles.badgeDot} />
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 18,
    fontWeight: '700',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  },
  badgeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.padelOrange,
  },
});
