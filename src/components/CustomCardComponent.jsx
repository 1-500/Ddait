import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { BACKGROUND_COLORS } from '../constants/colors';

/**
 * CustomCard Component
 *
 * @param {{
 *   title: string,
 *   background: string,
 *   tags: Array<{ label: string, color: string }>,
 *   additionalInfo: React.ReactNode,
 *   footer: React.ReactNode,
 * }} props
 */

const CustomCard = ({ title, tags, additionalInfo, footer }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {additionalInfo && <View style={styles.additionalInfo}>{additionalInfo}</View>}
      </View>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: tag.color }]}>
            <Text style={styles.tagText}>{tag.label}</Text>
          </View>
        ))}
      </View>
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  additionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomCard;
