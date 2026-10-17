import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Sparkles } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { MOCK_OPEN_MATCHES } from '../../constants/mockData';
import { OpenMatchCard } from '../../components/OpenMatchCard';
import type { OpenMatch } from '../../types';

export default function MatchesScreen() {
  const [selectedTier, setSelectedTier] = useState<'all' | 'casual' | 'inter' | 'pro'>('all');

  const handleJoinMatch = (match: OpenMatch) => {
    Alert.alert(
      'Xác Nhận Tham Gia Trận Đấu',
      `Bạn có muốn tham gia trận đấu tại ${match.club.name} lúc ${match.startTime}?\n\nChi phí chia đều: 110.000 VNĐ (trừ trực tiếp vào ví hoặc quét mã MoMo).`,
      [
        { text: 'Hủy' },
        {
          text: 'Vào Trận Ngay',
          onPress: () => {
            Alert.alert('Thành Công!', 'Bạn đã tham gia trận đấu. Thông báo đã được gửi đến 3 người chơi còn lại!');
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
          <Text style={styles.title}>Ghép Trận Padel</Text>
          <Text style={styles.subtitle}>Giao lưu bạn chơi cùng điểm trình độ VPR</Text>
        </View>
        <TouchableOpacity style={styles.createBtn}>
          <Plus size={16} color="#FFF" />
          <Text style={styles.createBtnText}>Tạo Trận</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* AI Recommendation Banner */}
        <View style={styles.aiBanner}>
          <Sparkles size={18} color="#FBBF24" />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>Gợi ý từ AI Matchmaker</Text>
            <Text style={styles.aiDesc}>
              Với chỉ số VPR 4.25 của bạn, chúng tôi đề xuất tham gia trận đấu lúc 19:00 tại Thảo Điền Club để tích thêm +15 điểm LP!
            </Text>
          </View>
        </View>

        {/* Level Filter Tabs */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterTab, selectedTier === 'all' && styles.filterTabActive]}
            onPress={() => setSelectedTier('all')}
          >
            <Text style={[styles.filterText, selectedTier === 'all' && styles.textWhite]}>Tất cả</Text>
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
