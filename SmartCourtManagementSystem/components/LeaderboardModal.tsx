import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { X, Trophy, Medal, Star, Flame } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useAuthStore } from '../stores/useAuthStore';
import { COACH_AVATARS } from '../constants/mockData';

interface LeaderboardModalProps {
  visible: boolean;
  onClose: () => void;
}

const LEADERBOARD_PLAYERS: Array<{ rank: number; name: string; vpr: number; winRate: number; matches: number; avatar: string; avatarSource?: any; isMe?: boolean }> = [
  { rank: 1, name: 'Nguyễn Thành Nam', vpr: 5.65, winRate: 88, matches: 92, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { rank: 2, name: 'Phạm Đức Huy', vpr: 5.40, winRate: 84, matches: 78, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
  { rank: 3, name: 'Lê Hoàng Long', vpr: 5.25, winRate: 81, matches: 64, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100' },
  { rank: 4, name: 'Carlos Martinez (HLV)', vpr: 5.20, winRate: 90, matches: 110, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', avatarSource: COACH_AVATARS.coach_01 },
  { rank: 5, name: 'Trần Minh Quang', vpr: 4.85, winRate: 77, matches: 53, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100' },
  { rank: 14, name: 'Hoàng Minh Triều (Bạn)', vpr: 4.25, winRate: 72, matches: 48, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', isMe: true },
];

export const LeaderboardModal = ({ visible, onClose }: LeaderboardModalProps) => {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<'vpr' | 'matches' | 'winrate'>('vpr');

  const getMedalColor = (rank: number) => {
    if (rank === 1) return '#FBBF24'; // Gold
    if (rank === 2) return '#E2E8F0'; // Silver
    if (rank === 3) return '#CD7F32'; // Bronze
    return COLORS.textMuted;
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Trophy size={20} color="#FBBF24" />
              <Text style={styles.title}>Bảng Xếp Hạng VPR Quốc Gia</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Filter Row */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterBtn, filter === 'vpr' && styles.filterBtnActive]}
              onPress={() => setFilter('vpr')}
            >
              <Text style={[styles.filterText, filter === 'vpr' && styles.textWhite]}>Điểm VPR Rating</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterBtn, filter === 'winrate' && styles.filterBtnActive]}
              onPress={() => setFilter('winrate')}
            >
              <Text style={[styles.filterText, filter === 'winrate' && styles.textWhite]}>Tỉ Lệ Thắng (%)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterBtn, filter === 'matches' && styles.filterBtnActive]}
              onPress={() => setFilter('matches')}
            >
              <Text style={[styles.filterText, filter === 'matches' && styles.textWhite]}>Số Trận Đã Chơi</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
            {LEADERBOARD_PLAYERS.map((p) => {
              const isMe = p.isMe;
              return (
                <View key={p.rank} style={[styles.playerCard, isMe && styles.myCard]}>
                  <View style={styles.rankBox}>
                    {p.rank <= 3 ? (
                      <Medal size={22} color={getMedalColor(p.rank)} />
                    ) : (
                      <Text style={[styles.rankText, isMe && styles.rankTextHighlight]}>#{p.rank}</Text>
                    )}
                  </View>

                  <Image source={isMe ? { uri: user?.avatarUrl || p.avatar } : (p.avatarSource || { uri: p.avatar })} style={styles.avatar} />

                  <View style={styles.info}>
                    <Text style={[styles.name, isMe && styles.nameHighlight]}>
                      {isMe ? `${user?.name || p.name} (Bạn)` : p.name}
                    </Text>
                    <Text style={styles.sub}>{p.matches} trận • Thắng {p.winRate}%</Text>
                  </View>

                  <View style={styles.scoreBox}>
                    <Text style={styles.vprLabel}>VPR</Text>
                    <Text style={[styles.vprVal, isMe && styles.vprHighlight]}>
                      {isMe ? (user?.vprRating || p.vpr).toFixed(2) : p.vpr.toFixed(2)}
                    </Text>
                  </View>
                </View>
              );
            })}
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
    gap: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 6,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: '#0B1120',
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#1E293B',
  },
  filterBtnActive: {
    backgroundColor: COLORS.emerald,
  },
  filterText: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  textWhite: {
    color: '#FFF',
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  myCard: {
    borderColor: COLORS.emerald,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  rankBox: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  rankTextHighlight: {
    color: COLORS.emeraldLight,
    fontWeight: '900',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  nameHighlight: {
    color: COLORS.emeraldLight,
  },
  sub: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  scoreBox: {
    alignItems: 'flex-end',
  },
  vprLabel: {
    color: COLORS.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  vprVal: {
    color: '#FBBF24',
    fontSize: 16,
    fontWeight: '900',
  },
  vprHighlight: {
    color: COLORS.emeraldLight,
  },
});
