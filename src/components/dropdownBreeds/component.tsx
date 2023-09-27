import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { getBreeds } from '../../services';
import { Box, Typography } from '@mui/material';

export interface Option {
  label: string;
  value: string;
}

export interface DropdownBreedsProps {
  onChange: (value: MultiValue<Option>) => void;
}
const DropdownBreeds = ({ onChange }: DropdownBreedsProps) => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const resp = await getBreeds();
      setBreeds(resp);
    };
    fetchBreeds();
  }, []);

  return (
    <Box>
      <Typography>Breed:</Typography>
      <Select
        isMulti
        onChange={onChange}
        options={breeds.map((breed) => ({ value: breed, label: breed }))}
      />
    </Box>
  );
};

export default DropdownBreeds;
