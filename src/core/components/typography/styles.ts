import styled from '@emotion/styled';
import { Variants } from './Variant';

export const typographyH1 = styled.h1``;
export const typographyH2 = styled.h2``;
export const typographyH3 = styled.h3``;
export const typographyH4 = styled.h4``;
export const typographyH5 = styled.h5``;
export const typographyH6 = styled.h6``;
export const typographyBody = styled.p``;
export const typographyBody2 = styled.p``;
export const typographySmall = styled.p``;
export const typographyMedium = styled.p``;
export const typographyLarge = styled.p``;

export const variants = {
  [Variants.H1]: typographyH1,
  [Variants.H2]: typographyH2,
  [Variants.H3]: typographyH3,
  [Variants.H4]: typographyH4,
  [Variants.H5]: typographyH5,
  [Variants.H6]: typographyH6,
  [Variants.Body]: typographyBody,
  [Variants.Body2]: typographyBody2,
  [Variants.Small]: typographySmall,
  [Variants.Medium]: typographyMedium,
  [Variants.Large]: typographyLarge,
};
