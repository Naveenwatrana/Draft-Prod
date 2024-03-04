export type IconProps = {
    color?: string;
    size?: number;
    onClick?: (event?: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
    active?: boolean;
    hasNotification?: boolean;
    className?: string;
    variant?: string;
};

export type DefaultProfileProps = {
    className?: string;
    width?: number;
    height?: number;
}
