import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Flag_sh: FC<SvgProps> = (props) => (
  <Svg
    id="flag-icons-sh"
    width={30}
    height={30}
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#012169" d="M0 0h512v512H0z" />
    <Path
      fill="#FFF"
      d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z"
    />
    <Path
      fill="#C8102E"
      d="m184 324 11 34L42 512H0v-3l184-185zm124-12 54 8 150 147v45L308 312zM512 0 320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z"
    />
    <Path fill="#FFF" d="M176 0v512h160V0H176zM0 176v160h512V176H0z" />
    <Path fill="#C8102E" d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z" />
  </Svg>
);
export default Flag_sh;
