import styled from "@emotion/styled";

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-auto-rows: 300px;
  gap: 36px;

  @media (max-width: 991.98px) {
    grid-template-columns: repeat(2, 300px);
  }

  @media (max-width: 767.98px) {
    grid-template-columns: repeat(1, 300px);
  }
`;

export default CollectionGrid;
