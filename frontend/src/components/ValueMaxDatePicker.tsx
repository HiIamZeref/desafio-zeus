import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

interface ValueMaxDatePickerProps {
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export const ValueMaxDatePicker = ({
  value,
  onChange,
  style,
}: ValueMaxDatePickerProps) => {
  const handleDateChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <DatePicker
      style={style}
      format={dateFormat}
      minDate={dayjs("01/01/2020", dateFormat)}
      maxDate={dayjs()}
      size="large"
      value={dayjs(value, dateFormat)}
      onChange={(date) => handleDateChange(date.format(dateFormat))}
      inputReadOnly
    />
  );
};
