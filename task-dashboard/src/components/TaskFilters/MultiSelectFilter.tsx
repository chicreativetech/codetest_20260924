import { Checkbox, ListItemText, MenuItem, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import styles from './TaskFilters.module.scss';

interface MultiSelectFilterProps<T extends string> {
  label: string;
  options: readonly T[];
  optionLabels: Record<T, string>;
  value: T[];
  onChange: (value: T[]) => void;
}

export function MultiSelectFilter<T extends string>({
  label,
  options,
  optionLabels,
  value,
  onChange
}: MultiSelectFilterProps<T>) {
  // For a multiple select, MUI puts the selected array on `event.target.value`.
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value as unknown as T[]);
  const renderValue = (selected: unknown) => {
    const options = selected as T[];
    if (options.length === 0) return <span className={styles.placeholder}>All</span>;
    return options.map((option) => optionLabels[option]).join(', ');
  };

  return (
    <TextField
      select
      fullWidth
      size='small'
      label={label}
      value={value}
      onChange={handleChange}
      slotProps={{ inputLabel: { shrink: true }, select: { multiple: true, displayEmpty: true, renderValue } }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          <Checkbox size='small' checked={value.includes(option)} disableRipple />
          <ListItemText primary={optionLabels[option]} />
        </MenuItem>
      ))}
    </TextField>
  );
}
