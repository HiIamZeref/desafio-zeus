import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

interface ValueMaxDatePickerProps {
  maxDate: string;
  value: string;
  onChange?: (value: string) => void;
}

export const ValueMaxDatePicker = ({
  maxDate,
  value,
  onChange,
}: ValueMaxDatePickerProps) => {
  const handleDateChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <DatePicker
      minDate={dayjs("2020-01-01", dateFormat)}
      maxDate={dayjs(maxDate, dateFormat)}
      size="large"
      value={dayjs(value, dateFormat)}
      onChange={(date) => handleDateChange(date.format(dateFormat))}
    />
  );
};
