import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { BACKGROUND_COLORS, TAG_COLORS, TEXT_COLORS } from '../constants/colors';
import { FONT_SIZES } from '../constants/font';

/**
 * CustomCard Component
 *
 * @param {{
 *   theme: 'findCompetition' | 'competitionRoom' | 'createCompetition',
 *   title: string,
 *   background: string,
 *   tags: Array<{ label: string, category: string }>,
 *   additionalInfo: string,
 *   footer: string,
 * }} props
 */

const CustomCard = ({ title, tags, additionalInfo, footer }) => {
  return (
    <View style={styles.card}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: TAG_COLORS[tag.category] }]}>
              <Text style={styles.tagText}>{tag.label}</Text>
            </View>
          ))}
        </View>
        {footer && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>{footer}</Text>
          </View>
        )}
      </View>
      <View style={styles.additionalInfo}>
        <Image source={require('../assets/images/sun.png')} />
        <Text style={styles.additionalInfoText}>{additionalInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND_COLORS.greyDark,
    justifyContent: 'space-between',
    width: '100%',
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
    color: TEXT_COLORS.primary,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalInfoText: {
    fontSize: FONT_SIZES.xs,
    color: TEXT_COLORS.primary,
    marginLeft: 4,
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
    color: TEXT_COLORS.primary,
    marginLeft: 4,
    fontSize: FONT_SIZES.xs,
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: FONT_SIZES.xs,
    color: TEXT_COLORS.primary,
  },
});

export default CustomCard;
