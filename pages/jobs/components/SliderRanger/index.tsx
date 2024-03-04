import { Range } from 'react-range';

type SliderProps = {
    step?: number;
    min?: number;
    max?: number;
    val?: number[];
    onChange?: (values:number[]) => void;
    showThumb: boolean,
    rangeStyle?: any,
};

const SliderRanger = ({
  step, min, max, val, onChange, showThumb, rangeStyle,
}: SliderProps) => {
  return (
    <Range
      step={step || 1}
      min={min || 1}
      max={max || 7}
      values={val || [4]}
      onChange={(values) => { onChange ? onChange(values) : false; }}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '4px',
            backgroundColor: '#39363B',
            ...rangeStyle,
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '15px',
            width: '15px',
            borderRadius: '8px',
            backgroundColor: '#5ff088',
            display: `${(showThumb) ? 'flex' : 'none'}`,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
      renderMark={({ props, index }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '4px',
            width: '4px',
            marginTop: '0px',
            borderRadius: '3px',
            backgroundColor: '#5ff088',
          }}
        />
      )}
    />
  );
};

export default SliderRanger;
