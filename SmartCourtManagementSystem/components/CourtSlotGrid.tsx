import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Check, Lock, ShieldAlert } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import type { TimeSlot } from '../types';
import { useLanguageStore } from '../stores/useLanguageStore';

interface CourtSlotGridProps {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const CourtSlotGrid = ({
  slots,
  selectedSlotId,
  onSelectSlot,
}: CourtSlotGridProps) => {
  const { t } = useLanguageStore();

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <View style={styles.container}>
      {/* 3 Status Legends */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.slotAvailable }]} />
          <Text style={styles.legendText}>{t.legendAvailable}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.slotHold }]} />
          <Text style={styles.legendText}>{t.legendHold}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.slotBooked }]} />
          <Text style={styles.legendText}>{t.legendBooked}</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {slots.map((slot) => {
          const isSelected = selectedSlotId === slot.id;
          const isAvailable = slot.status === 'available';
          const isHold = slot.status === 'hold';
          const isBooked = slot.status === 'booked';

          return (
            <TouchableOpacity
              key={slot.id}
              disabled={isBooked}
              onPress={() => onSelectSlot(slot)}
              style={[
                styles.slotCard,
                isAvailable && styles.cardAvailable,
                isHold && styles.cardHold,
                isBooked && styles.cardBooked,
                isSelected && styles.cardSelected,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.timeRow}>
                <Clock
                  size={13}
                  color={
                    isSelected
                      ? '#FFF'
                      : isAvailable
                      ? COLORS.emeraldLight
                      : isHold
                      ? COLORS.padelOrange
                      : COLORS.textMuted
                  }
                />
                <Text
                  style={[
                    styles.timeText,
                    isSelected && styles.textWhite,
                    isBooked && styles.textMuted,
                  ]}
                >
                  {slot.startTime} - {slot.endTime}
                </Text>
              </View>

              <View style={styles.bottomRow}>
                <Text
                  style={[
                    styles.priceText,
                    isSelected && styles.textWhite,
                    isBooked && styles.textMuted,
                  ]}
                >
                  {formatVND(slot.price)}
                </Text>

                {isBooked && (
                  <View style={styles.bookedTag}>
                    <Lock size={10} color="#94A3B8" />
                    <Text style={styles.bookedTagText}>Đã Đặt</Text>
                  </View>
                )}

                {isHold && !isSelected && (
                  <View style={styles.holdTag}>
                    <ShieldAlert size={10} color={COLORS.padelOrange} />
                    <Text style={styles.holdTagText}>Đang Giữ</Text>
                  </View>
                )}
              </View>

              {isSelected && (
                <View style={styles.checkIcon}>
                  <Check size={12} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slotCard: {
    width: '48.5%',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    minHeight: 76,
  },
  cardAvailable: {
    backgroundColor: COLORS.cardBackground,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  cardHold: {
    backgroundColor: 'rgba(249, 115, 22, 0.12)',
    borderColor: COLORS.padelOrange,
  },
  cardBooked: {
    backgroundColor: '#0F1522',
    borderColor: '#1E293B',
    opacity: 0.55,
  },
  cardSelected: {
    backgroundColor: COLORS.emerald,
    borderColor: COLORS.emeraldLight,
    shadowColor: COLORS.emerald,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  timeText: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    color: COLORS.emeraldLight,
    fontSize: 12,
    fontWeight: '700',
  },
  bookedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#1E293B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bookedTagText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
  },
  holdTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  holdTagText: {
    color: COLORS.padelOrange,
    fontSize: 10,
    fontWeight: '700',
  },
  textWhite: {
    color: '#FFF',
  },
  textMuted: {
    color: '#64748B',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
