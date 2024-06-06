
import { IconType } from "react-icons";

interface IconProps {
  IconComponent: IconType;
  color: string;
}

const Icon: React.FC<IconProps> = ({ IconComponent, color }) => (
  <div className="icon">
    <IconComponent color={color} style={{ width: "100%", height: "100%" }} />
  </div>
);

export default Icon;
