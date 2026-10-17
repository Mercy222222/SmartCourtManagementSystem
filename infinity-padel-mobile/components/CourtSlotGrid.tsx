import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Clock, Check } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { TimeSlot } from '../types';

interface CourtSlotGridProps {
  slots: TimeSlot[];
  selectedSlotId: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const CourtSlotGrid: React.FC<CourtSlotGridProps> = ({
  slots,
  selectedSlotId,
  onSelectSlot,
}) => {
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.slotAvailable }]} />
          <Text style={styles.legendText}>Trống</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.slotHold }]} />
          <Text style={styles.legendText}>Giữ chỗ (5p)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.slotBooked }]} />
          <Text style={styles.legendText}>Đã đặt</Text>
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
              disabled={!isAvailable}
              onPress={() => onSelectSlot(slot)}
              style={[
                styles.slotCard,
                isAvailable && styles.cardAvailable,
                isHold && styles.cardHold,
                isBooked && styles.cardBooked,
                isSelected && styles.cardSelected,
              ]}
            >
              <View style={styles.timeRow}>
                <Clock size={13} color={isSelected ? '#FFF' : isAvailable ? COLORS.emeraldLight : COLORS.textMuted} />
                <Text style={[styles.timeText, isSelected && styles.textWhite]}>
                  {slot.startTime} - {slot.endTime}
                </Text>
              </View>

              <Text style={[styles.priceText, isSelected && styles.textWhite]}>
                {formatVND(slot.price)}
              </Text>

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
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  slotCard: {
    width: '48%',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  cardAvailable: {
    backgroundColor: COLORS.cardBackground,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  cardHold: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderColor: COLORS.padelOrange,
  },
  cardBooked: {
    backgroundColor: '#161F30',
    borderColor: '#233047',
    opacity: 0.6,
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
    fontSize: 14,
    fontWeight: '700',
  },
  priceText: {
    color: COLORS.emeraldLight,
    fontSize: 13,
    fontWeight: '600',
  },
  textWhite: {
    color: '#FFF',
  },
  checkIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
