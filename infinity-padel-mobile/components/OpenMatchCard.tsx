import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import type { OpenMatch } from '../types';
import { RatingBadge } from './RatingBadge';

interface OpenMatchCardProps {
  match: OpenMatch;
  onJoin: (match: OpenMatch) => void;
}

export const OpenMatchCard = ({ match, onJoin }: OpenMatchCardProps) => {
  const emptySlotsCount = match.players.filter((p) => !p.userId).length;

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.clubInfo}>
          <Text style={styles.clubName}>{match.club.name}</Text>
          <View style={styles.locationRow}>
            <MapPin size={12} color={COLORS.textSecondary} />
            <Text style={styles.locationText}>{match.court.name}</Text>
          </View>
        </View>
        <View style={styles.levelTag}>
          <Text style={styles.levelText}>
            Yêu cầu VPR: {match.requiredRatingMin} - {match.requiredRatingMax}
          </Text>
        </View>
      </View>

      <View style={styles.dateTimeRow}>
        <View style={styles.timeTag}>
          <Calendar size={13} color={COLORS.emeraldLight} />
          <Text style={styles.dateTimeText}>{match.date}</Text>
        </View>
        <View style={styles.timeTag}>
          <Clock size={13} color={COLORS.emeraldLight} />
          <Text style={styles.dateTimeText}>{match.startTime} - {match.endTime}</Text>
        </View>
      </View>

      {/* 4 Player Slots Visualization */}
      <View style={styles.courtBox}>
        <Text style={styles.courtBoxTitle}>Đội hình trận đấu (4 người):</Text>
        <View style={styles.playerGrid}>
          {match.players.map((slot) => {
            if (slot.user) {
              return (
                <View key={slot.position} style={styles.playerItem}>
                  <Image source={{ uri: slot.user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }} style={styles.playerAvatar} />
                  <Text style={styles.playerName} numberOfLines={1}>{slot.user.name.split(' ')[0]}</Text>
                  <RatingBadge rating={slot.user.vprRating} size="small" />
                </View>
              );
            }
            return (
              <View key={slot.position} style={[styles.playerItem, styles.playerItemEmpty]}>
                <View style={styles.emptyAvatar}>
                  <Plus size={16} color={COLORS.padelOrange} />
                </View>
                <Text style={styles.emptySlotText}>Trống</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Giá mỗi người (1/4 sân):</Text>
          <Text style={styles.priceVal}>{formatVND(match.pricePerPlayer)}</Text>
        </View>

        <TouchableOpacity style={styles.joinBtn} onPress={() => onJoin(match)}>
          <Text style={styles.joinBtnText}>
            {emptySlotsCount > 0 ? `Ghép trận (${emptySlotsCount} chỗ trống)` : 'Đã đủ 4 người'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  clubInfo: {
    flex: 1,
    marginRight: 10,
  },
  clubName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  levelTag: {
    backgroundColor: 'rgba(249, 115, 22, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.3)',
  },
  levelText: {
    color: COLORS.padelOrange,
    fontSize: 11,
    fontWeight: '700',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cardSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  dateTimeText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  courtBox: {
    backgroundColor: '#070D1B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  courtBoxTitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 10,
  },
  playerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerItem: {
    alignItems: 'center',
    width: '22%',
  },
  playerItemEmpty: {
    opacity: 0.8,
  },
  playerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: COLORS.emerald,
  },
  emptyAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: COLORS.padelOrange,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 115, 22, 0.05)',
    marginBottom: 4,
  },
  playerName: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  emptySlotText: {
    color: COLORS.padelOrange,
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.cardSecondary,
    paddingTop: 12,
  },
  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  priceVal: {
    color: COLORS.emeraldLight,
    fontSize: 16,
    fontWeight: '800',
  },
  joinBtn: {
    backgroundColor: COLORS.padelOrange,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: COLORS.padelOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  joinBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
