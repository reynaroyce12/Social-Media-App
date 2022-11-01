import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const [userAccount, setUserAccount] = useState('')
  const history = useHistory();

  const searchPost = () => {
    if ((search.trim() || tags) && !userAccount) {
      // console.log(userAccount)
      dispatch(getPostsBySearch({ search, tags: tags.join(','),  }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else if (userAccount) {
      dispatch(getPostsByCreator(userAccount))
      history.push(`/creators/${userAccount}`)
    } else {
      history.push('/');
    }
  };


  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar style={{ borderRadius: 15 }} className={classes.appBarSearch} position="static" color="inherit">
              <TextField autoComplete='off' onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Posts" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <TextField autoComplete='off' onKeyDown={handleKeyPress} name="creator" variant="outlined" label="Search Users" fullWidth value={userAccount} onChange={(e) => setUserAccount(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
            <Button style={{ borderRadius: 25 }} onClick={searchPost} className={classes.searchButton} variant="contained" color="secondary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper style={{ borderRadius: 15 }} className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
