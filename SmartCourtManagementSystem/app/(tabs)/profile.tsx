import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Wallet, Trophy, Award, Shield, Settings, ChevronRight, LogOut, CreditCard } from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { useAuthStore } from '../../stores/useAuthStore';
import { RatingBadge } from '../../components/RatingBadge';

export default function ProfileScreen() {
  const { user } = useAuthStore();

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>

          <View style={styles.badgeRow}>
            {user && <RatingBadge rating={user.vprRating} size="large" />}
            <View style={styles.tierTag}>
              <Text style={styles.tierText}>{user?.levelTitle}</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Trophy size={20} color="#FBBF24" />
            <Text style={styles.statNumber}>{user?.matchesPlayed}</Text>
            <Text style={styles.statLabel}>Trận đã chơi</Text>
          </View>

          <View style={styles.statBox}>
            <Award size={20} color={COLORS.emeraldLight} />
            <Text style={styles.statNumber}>{user?.winRate}%</Text>
            <Text style={styles.statLabel}>Tỉ lệ thắng</Text>
          </View>

          <View style={styles.statBox}>
            <Shield size={20} color={COLORS.padelOrange} />
            <Text style={styles.statNumber}>Hạng #14</Text>
            <Text style={styles.statLabel}>BXH CLB</Text>
          </View>
        </View>

        {/* Wallet Balance Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletLeft}>
            <View style={styles.walletIcon}>
              <Wallet size={20} color="#FFF" />
            </View>
            <View>
              <Text style={styles.walletTitle}>Số Dư Ví Thành Viên</Text>
              <Text style={styles.walletAmount}>{formatVND(user?.walletBalance || 0)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.topUpBtn}>
            <CreditCard size={14} color="#000" />
            <Text style={styles.topUpBtnText}>Nạp ví</Text>
          </TouchableOpacity>
        </View>

        {/* Settings List */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={18} color={COLORS.textSecondary} />
            <Text style={styles.menuText}>Cài Đặt Tài Khoản & Thông Báo</Text>
            <ChevronRight size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Award size={18} color={COLORS.textSecondary} />
            <Text style={styles.menuText}>Lịch Sử Trận Đấu & VPR Rating</Text>
            <ChevronRight size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Shield size={18} color={COLORS.textSecondary} />
            <Text style={styles.menuText}>Chính Sách & Điều Khoản Sân</Text>
            <ChevronRight size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <LogOut size={18} color="#EF4444" />
            <Text style={styles.logoutText}>Đăng Xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.emerald,
    marginBottom: 12,
  },
  userName: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  userEmail: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tierTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  tierText: {
    color: COLORS.emeraldLight,
    fontSize: 12,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    width: '31%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  statNumber: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F261D',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.emerald,
    marginBottom: 24,
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletTitle: {
    color: '#A7F3D0',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  walletAmount: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  topUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  topUpBtnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  menuSection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardSecondary,
  },
  menuText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 12,
  },
});
