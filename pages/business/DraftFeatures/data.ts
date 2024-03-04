import lang from 'common/lang';

const {
  featureText,
} = lang.businessPage.draftVsOther;

export const features = Object.values(featureText).map((text, index) => ({
  title: text,
  id: index + 1,
}));
