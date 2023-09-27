import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import DropdownBreeds, {
  Option,
} from '../../components/dropdownBreeds/component';
import { Dog } from '../../models';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  SearchFilter,
  SearchResponse,
  getDogs,
  matchDog,
  searchDogs,
} from '../../services';
import { MultiValue } from 'react-select';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Home = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favoritesDogs, setFavoritesDogs] = useState<{ [key: string]: Dog }>(
    {}
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<SearchFilter>({
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 100,
    sort: 'breed:asc',
  });
  const [page, setPage] = useState<number>(0);
  const [searchInformation, setSearchInformation] = useState<SearchResponse>();

  useEffect(() => {
    const fetchDogs = async () => {
      const resp = await searchDogs({
        ...filter,
        size: rowsPerPage,
        from: page * rowsPerPage,
      });
      setSearchInformation(resp);

      const data = await getDogs(resp.resultIds);
      setDogs(data);
    };
    fetchDogs();
  }, [page, rowsPerPage, filter]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangBreeds = (breedsOptions: MultiValue<Option>) => {
    const breeds = breedsOptions.map((breed) => breed.value);
    setFilter({ ...filter, breeds });
  };

  const matchOneDog = async (dog: Dog) => {
    await matchDog([dog.id]);
    setFavoritesDogs({ ...favoritesDogs, [dog.id]: dog });
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h4">Search dogs</Typography>
      <Box>
        <Box>
          <DropdownBreeds onChange={handleChangBreeds} />
        </Box>
      </Box>
      <Box width="70%" maxWidth={800}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">zip_code</TableCell>
                <TableCell align="right">breed</TableCell>
                <TableCell align="center">Favorite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dogs.map((dog) => (
                <TableRow
                  key={
                    dog.id +
                    '-' +
                    dog.name +
                    '-' +
                    dog.age +
                    '-' +
                    dog.zip_code +
                    '-' +
                    dog.breed
                  }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    <Avatar
                      sx={{ width: 38, height: 38 }}
                      alt={dog.name + '-look'}
                      src={dog.img}
                    />
                  </TableCell>
                  <TableCell align="right">{dog.name}</TableCell>
                  <TableCell align="right">{dog.age}</TableCell>
                  <TableCell align="right">{dog.zip_code}</TableCell>
                  <TableCell align="right">{dog.breed}</TableCell>
                  <TableCell align="center">
                    {favoritesDogs[dog.id] ? (
                      <FavoriteIcon sx={{ color: 'red' }} />
                    ) : (
                      <IconButton onClick={() => matchOneDog(dog)}>
                        <FavoriteBorderOutlinedIcon sx={{ color: 'red' }} />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={searchInformation?.total || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Home;
