import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface RatingBadgeProps {
  rating: number;
  size?: 'small' | 'medium' | 'large';
}

export const RatingBadge = ({ rating, size = 'medium' }: RatingBadgeProps) => {
  return (
    <View style={[styles.badge, size === 'small' ? styles.small : size === 'large' ? styles.large : styles.medium]}>
      <Text style={styles.prefix}>VPR</Text>
      <Text style={styles.ratingText}>{rating.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    borderColor: COLORS.padelOrange,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  prefix: {
    color: COLORS.padelOrange,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
