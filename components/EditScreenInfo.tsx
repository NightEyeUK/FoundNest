import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppColors from '@/constants/AppColors';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';

type Tone = 'on-brand' | 'on-surface';

export default function EditScreenInfo({ path, tone = 'on-surface' }: { path: string; tone?: Tone }) {
  const isBrand = tone === 'on-brand';

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={[styles.getStartedText, isBrand ? styles.onBrandText : styles.onSurfaceText]}>
          Open up the code for this screen:
        </Text>

        <View
          style={[
            styles.codeHighlightContainer,
            styles.homeScreenFilename,
            isBrand ? styles.codeOnBrand : styles.codeOnSurface,
          ]}>
          <MonoText style={isBrand ? styles.monoOnBrand : styles.monoOnSurface}>{path}</MonoText>
        </View>

        <Text style={[styles.getStartedText, isBrand ? styles.onBrandText : styles.onSurfaceText]}>
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text style={[styles.helpLinkText, isBrand ? styles.linkOnBrand : styles.linkOnSurface]}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  codeOnBrand: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  codeOnSurface: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  onBrandText: {
    color: 'rgba(255,255,255,0.9)',
  },
  onSurfaceText: {
    color: AppColors.textMuted,
  },
  monoOnBrand: {
    color: 'rgba(255,255,255,0.95)',
  },
  monoOnSurface: {
    color: AppColors.textOnLight,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  linkOnBrand: {
    color: AppColors.surface,
    textDecorationLine: 'underline',
  },
  linkOnSurface: {
    color: AppColors.link,
    textDecorationLine: 'underline',
  },
});
