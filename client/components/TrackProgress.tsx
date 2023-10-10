import { Grid, Slider, Typography } from '@mui/material';
import { addLeadingZero } from '@/helpers/helpers';

enum VALUE_FORMATS {
  TIME = 'TIME',
  NUMBER = 'NUMBER',
}

interface ITrackProgressProps {
  max: number;
  value: number;
  onChange?: (value: number) => void;
  isTimeFormat?: boolean;
  hideSlider?: boolean;
}

const formatValue = (value: number, format: VALUE_FORMATS): string => {
  switch (format) {
    case VALUE_FORMATS.TIME: {
      const time = new Date(value * 1000);
      return `${addLeadingZero(time.getUTCMinutes())}:${addLeadingZero(
        time.getUTCSeconds()
      )}`;
    }
    case VALUE_FORMATS.NUMBER:
      return value.toString();
    default:
      return value.toString();
  }
};

export const TrackProgress: React.FC<ITrackProgressProps> = ({
  max = 0,
  value = 0,
  isTimeFormat = false,
  hideSlider = false,
  onChange,
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      return null;
    }

    onChange?.(newValue as number);
  };

  return (
    <Grid container alignItems="center" direction="row" wrap="nowrap">
      {!hideSlider && (
        <Slider
          value={value}
          min={0}
          max={max}
          onChange={handleChange}
          sx={{ width: '200px' }}
        />
      )}
      <Typography noWrap sx={{ ml: 1, minWidth: 80, textAlign: 'right' }}>
        {formatValue(
          value,
          isTimeFormat ? VALUE_FORMATS.TIME : VALUE_FORMATS.NUMBER
        )}{' '}
        /{' '}
        {formatValue(
          max,
          isTimeFormat ? VALUE_FORMATS.TIME : VALUE_FORMATS.NUMBER
        )}
      </Typography>
    </Grid>
  );
};

export default TrackProgress;
