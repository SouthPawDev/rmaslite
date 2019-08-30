import styled from 'styled-components'

const Th = styled.th`
  border: ${props => (props.isSelected ? '2px solid blue' : '')} !important;
  background-color: ${props => (props.isSorted ? 'lightblue' : '')} !important;
  color: ${props => (props.isSecondarySorted ? 'blue' : '')} !important;
`
export default Th
