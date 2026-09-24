import { Autocomplete, TextField } from '@mui/material';

interface AssigneeFilterProps {
  assignees: string[];
  value: string | null;
  onChange: (assignee: string | null) => void;
}

export function AssigneeFilter({ assignees, value, onChange }: AssigneeFilterProps) {
  return (
    <Autocomplete
      size='small'
      fullWidth
      options={assignees}
      value={value}
      onChange={(_, assignee) => onChange(assignee)}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Assignee'
          placeholder='All'
          slotProps={{ ...params.slotProps, inputLabel: { ...params.slotProps.inputLabel, shrink: true } }}
        />
      )}
    />
  );
}
