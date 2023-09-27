import styled from "styled-components";

export const ResponsiveLabel = styled.span`
  .desktop-long-label {
    display: none;
  }

  @media screen and (min-width: 720px) {
    .mobile-short-label {
      display: none;
    }
    .desktop-long-label {
      display: initial;
    }
  }
`;