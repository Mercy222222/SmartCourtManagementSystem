import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Wallet,
  Trophy,
  Award,
  Shield,
  Settings,
  ChevronRight,
  LogOut,
  CreditCard,
  Edit3,
  Globe,
  LogIn,
  Bell,
  FileText
} from 'lucide-react-native';
import { COLORS } from '../../constants/theme';
import { useAuthStore } from '../../stores/useAuthStore';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { RatingBadge } from '../../components/RatingBadge';
import { TopUpModal } from '../../components/TopUpModal';
import { EditProfileModal } from '../../components/EditProfileModal';
import { AuthModal } from '../../components/AuthModal';
import { TermsModal } from '../../components/TermsModal';
import { NotificationModal } from '../../components/NotificationModal';
import { LeaderboardModal } from '../../components/LeaderboardModal';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { language, toggleLanguage, t } = useLanguageStore();

  const [topUpModalVisible, setTopUpModalVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const [leaderboardModalVisible, setLeaderboardModalVisible] = useState(false);

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const handleLogout = () => {
    Alert.alert(
      t.logoutConfirmTitle,
      t.logoutConfirmMsg,
      [
        { text: 'Hủy' },
        {
          text: t.logoutBtn,
          style: 'destructive',
          onPress: () => {
            logout();
            Alert.alert('Đã Đăng Xuất', 'Bạn đã đăng xuất an toàn khỏi tài khoản.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Profile Card */}
        {isAuthenticated && user ? (
          <View style={styles.profileCard}>
            <Image
              source={{ uri: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email || user.phone}</Text>

            <View style={styles.badgeRow}>
              <RatingBadge rating={user.vprRating} size="large" />
              <View style={styles.tierTag}>
                <Text style={styles.tierText}>{user.levelTitle}</Text>
              </View>
            </View>

            {/* Edit Name & Avatar Button */}
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditProfileVisible(true)}
              activeOpacity={0.8}
            >
              <Edit3 size={14} color="#FFF" />
              <Text style={styles.editBtnText}>{t.editProfileBtn}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Logged Out State Banner */
          <View style={styles.loggedOutCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }}
              style={[styles.avatar, { borderColor: COLORS.textMuted }]}
            />
            <Text style={styles.userName}>{t.loginPromptTitle}</Text>
            <Text style={styles.userEmail}>{t.loginPromptDesc}</Text>

            <TouchableOpacity
              style={styles.loginNowBtn}
              onPress={() => setAuthModalVisible(true)}
              activeOpacity={0.8}
            >
              <LogIn size={16} color="#FFF" />
              <Text style={styles.loginNowText}>{t.btnLoginNow}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Trophy size={20} color="#FBBF24" />
            <Text style={styles.statNumber}>{user?.matchesPlayed || 0}</Text>
            <Text style={styles.statLabel}>{t.matchesPlayedStat}</Text>
          </View>

          <View style={styles.statBox}>
            <Award size={20} color={COLORS.emeraldLight} />
            <Text style={styles.statNumber}>{user?.winRate || 0}%</Text>
            <Text style={styles.statLabel}>{t.winRateStat}</Text>
          </View>

          <TouchableOpacity
            style={styles.statBox}
            onPress={() => setLeaderboardModalVisible(true)}
            activeOpacity={0.8}
          >
            <Shield size={20} color={COLORS.padelOrange} />
            <Text style={styles.statNumber}>Hạng #14</Text>
            <Text style={styles.statLabel}>{t.rankStat}</Text>
          </TouchableOpacity>
        </View>

        {/* Member Wallet Balance Card - Interactive Top Up */}
        <View style={styles.walletCard}>
          <View style={styles.walletLeft}>
            <View style={styles.walletIcon}>
              <Wallet size={20} color="#FFF" />
            </View>
            <View>
              <Text style={styles.walletTitle}>{t.memberWalletTitle}</Text>
              <Text style={styles.walletAmount}>{formatVND(user?.walletBalance || 0)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.topUpBtn}
            onPress={() => setTopUpModalVisible(true)}
            activeOpacity={0.8}
          >
            <CreditCard size={14} color="#000" />
            <Text style={styles.topUpBtnText}>{t.topUpWalletBtn}</Text>
          </TouchableOpacity>
        </View>

        {/* Settings & Menu List - ALL BUTTONS 100% OPERATIONAL */}
        <View style={styles.menuSection}>
          {/* Notification Center */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setNotifModalVisible(true)}
            activeOpacity={0.7}
          >
            <Bell size={18} color={COLORS.emeraldLight} />
            <Text style={styles.menuText}>{t.notificationCenterTitle}</Text>
            <ChevronRight size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Match History & VPR Leaderboard */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setLeaderboardModalVisible(true)}
            activeOpacity={0.7}
          >
            <Trophy size={18} color="#FBBF24" />
            <Text style={styles.menuText}>{t.menuMatchHistory}</Text>
            <ChevronRight size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Court Policies & Rules */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setTermsModalVisible(true)}
            activeOpacity={0.7}
          >
            <FileText size={18} color="#38BDF8" />
            <Text style={styles.menuText}>{t.menuPolicies}</Text>
            <ChevronRight size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Language Switcher */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={toggleLanguage}
            activeOpacity={0.7}
          >
            <Globe size={18} color={COLORS.padelOrange} />
            <Text style={styles.menuText}>{t.menuLanguage}</Text>
            <View style={styles.langBadge}>
              <Text style={styles.langBadgeText}>{language === 'vi' ? 'Tiếng Việt' : 'English'}</Text>
            </View>
          </TouchableOpacity>

          {/* Login or Logout */}
          {isAuthenticated ? (
            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <LogOut size={18} color="#EF4444" />
              <Text style={styles.logoutText}>{t.logoutBtn}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={() => setAuthModalVisible(true)}
              activeOpacity={0.7}
            >
              <LogIn size={18} color={COLORS.emeraldLight} />
              <Text style={[styles.logoutText, { color: COLORS.emeraldLight }]}>
                {t.btnLoginNow}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      <TopUpModal
        visible={topUpModalVisible}
        onClose={() => setTopUpModalVisible(false)}
      />
      <EditProfileModal
        visible={editProfileVisible}
        onClose={() => setEditProfileVisible(false)}
      />
      <AuthModal
        visible={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
      />
      <TermsModal
        visible={termsModalVisible}
        onClose={() => setTermsModalVisible(false)}
      />
      <NotificationModal
        visible={notifModalVisible}
        onClose={() => setNotifModalVisible(false)}
      />
      <LeaderboardModal
        visible={leaderboardModalVisible}
        onClose={() => setLeaderboardModalVisible(false)}
      />
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
  loggedOutCard: {
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
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
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
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
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  editBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  loginNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.emerald,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  loginNowText: {
    color: '#FFF',
    fontSize: 14,
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
    marginBottom: 20,
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
  langBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  langBadgeText: {
    color: COLORS.padelOrange,
    fontSize: 11,
    fontWeight: '700',
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
