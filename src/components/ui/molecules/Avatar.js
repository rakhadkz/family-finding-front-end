import ReactAvatar from 'react-avatar';

export const Avatar = ({ name, size = "large", ratio = 2.5 }) => {
  
  return (
    <ReactAvatar name={name} color="#c1c7d0" fgColor="#FFFFFF" round size={calculate_size(size)} textSizeRatio={ratio} textMarginRatio={.17}/>
  )
}

const calculate_size = (size_name) => {
  switch(size_name){
    case "xsmall":
      return "16px"
    case "small":
      return "24px"
    case "medium":
      return "32px"
    case "large":
      return "40px"
    case "xlarge":
      return "96px"
    case "xxlarge":
      return "128px"
    default:
      return "32px"
  }
}