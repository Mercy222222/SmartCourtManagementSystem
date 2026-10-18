import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Sparkles } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { MOCK_OPEN_MATCHES } from '../../constants/mockData';
import { OpenMatchCard } from '../../components/OpenMatchCard';
import { CreateMatchModal } from '../../components/CreateMatchModal';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNotificationStore } from '../../stores/useNotificationStore';
import { useLanguageStore } from '../../stores/useLanguageStore';
import type { OpenMatch } from '../../types';

export default function MatchesScreen() {
  const { user, updateWallet } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const { t } = useLanguageStore();

  const [selectedTier, setSelectedTier] = useState<'all' | 'casual' | 'inter' | 'pro'>('all');
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleJoinMatch = (match: OpenMatch) => {
    const fee = match.pricePerPlayer;

    Alert.alert(
      t.confirmJoinTitle,
      `Bạn có muốn tham gia trận đấu tại ${match.club.name} lúc ${match.startTime} - ${match.endTime}?\n\nChi phí chia đều: ${formatVND(fee)} (trừ trực tiếp vào ví thành viên).`,
      [
        { text: 'Hủy' },
        {
          text: t.joinMatchBtn,
          onPress: () => {
            if ((user?.walletBalance || 0) < fee) {
              Alert.alert(
                'Số Dư Ví Không Đủ',
                `Bạn cần có ít nhất ${formatVND(fee)} để tham gia trận đấu này. Vui lòng nạp thêm tiền vào ví tại mục "Cá Nhân".`
              );
              return;
            }

            updateWallet(-fee, `Phí tham gia trận đấu tại ${match.club.name}`, 'Ví Infinity');

            addNotification({
              title: '🎾 Đã Tham Gia Trận Đấu',
              titleEn: '🎾 Joined Match Successfully',
              message: `Bạn đã tham gia trận đấu lúc ${match.startTime} tại ${match.club.name}. Đã trừ ${formatVND(fee)} vào ví thành viên.`,
              messageEn: `Joined match at ${match.startTime} at ${match.club.name}. Fee: ${formatVND(fee)}.`,
              type: 'match',
            });

            Alert.alert(
              '🎉 Thành Công!',
              `Bạn đã ghi danh vào trận đấu thành công!\n\nThông báo và số điện thoại liên lạc của bạn đã được gửi đến 3 bạn chơi còn lại.`
            );
          },
        },
      ]
    );
  };

  const filteredMatches = MOCK_OPEN_MATCHES.filter((m) => {
    if (selectedTier === 'casual') return m.requiredRatingMin < 3.0;
    if (selectedTier === 'inter') return m.requiredRatingMin >= 3.0 && m.requiredRatingMax <= 4.5;
    if (selectedTier === 'pro') return m.requiredRatingMax >= 4.5;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t.matchesTitle}</Text>
          <Text style={styles.subtitle}>{t.matchesSubtitle}</Text>
        </View>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => setCreateModalVisible(true)}
          activeOpacity={0.8}
        >
          <Plus size={16} color="#FFF" />
          <Text style={styles.createBtnText}>{t.createMatchBtn}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* AI Recommendation Banner */}
        <View style={styles.aiBanner}>
          <Sparkles size={18} color="#FBBF24" />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>{t.aiMatchmakerTitle}</Text>
            <Text style={styles.aiDesc}>{t.aiMatchmakerDesc}</Text>
          </View>
        </View>

        {/* Level Filter Tabs */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterTab, selectedTier === 'all' && styles.filterTabActive]}
            onPress={() => setSelectedTier('all')}
          >
            <Text style={[styles.filterText, selectedTier === 'all' && styles.textWhite]}>
              {t.filterAll}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterTab, selectedTier === 'casual' && styles.filterTabActive]}
            onPress={() => setSelectedTier('casual')}
          >
            <Text style={[styles.filterText, selectedTier === 'casual' && styles.textWhite]}>
              {'VPR < 3.0'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterTab, selectedTier === 'inter' && styles.filterTabActive]}
            onPress={() => setSelectedTier('inter')}
          >
            <Text style={[styles.filterText, selectedTier === 'inter' && styles.textWhite]}>
              3.0 - 4.5
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterTab, selectedTier === 'pro' && styles.filterTabActive]}
            onPress={() => setSelectedTier('pro')}
          >
            <Text style={[styles.filterText, selectedTier === 'pro' && styles.textWhite]}>
              VPR 4.5+
            </Text>
          </TouchableOpacity>
        </View>

        {/* Match List */}
        {filteredMatches.map((match) => (
          <OpenMatchCard key={match.id} match={match} onJoin={handleJoinMatch} />
        ))}
      </ScrollView>

      {/* Create Match Modal */}
      <CreateMatchModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.padelOrange,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  createBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  aiTextContainer: {
    flex: 1,
  },
  aiTitle: {
    color: '#FBBF24',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  aiDesc: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterTab: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  filterTabActive: {
    backgroundColor: COLORS.emerald,
    borderColor: COLORS.emeraldLight,
  },
  filterText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  textWhite: {
    color: '#FFF',
  },
});
