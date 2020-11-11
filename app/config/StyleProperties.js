import colors from './Colors';
export const radius = { borderRadius: 25 };
export const height = { height: '100%' };
export const iconButtonSize = { width: 50, height: 50 };
export const normalText = { color: colors.white };
export const normalTextBold = { ...normalText, fontWeight: 'bold' };
export const bigText = { ...normalText, fontSize: 30 };
export const bigTextBold = { ...bigText, ...normalTextBold };
export const centerAllFlexRow = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
export const centerAllFlexColumn = {
  ...centerAllFlexRow,
  flexDirection: 'column',
};
