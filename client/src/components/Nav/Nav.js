import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 0
  },
  title: {
    flexGrow: 1
  },
}))

function Nav() {
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Typography variant="h6" component={ Link } to="/">PET SYNC</Typography>
            <Typography variant="h6" component={ Link } to="/profile">Profile</Typography>
            <Box ml={8} mr={3}>
            <Button color="inherit" variant="outlined" component={ Link } to="/signup">Добавить питомца</Button>
            </Box>
            <Button color="secondary" variant="contained" component={ Link } to="/login">Войти</Button>
            <Button color="secondary" variant="contained" component={ Link } to="/reg">Reg</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Nav
