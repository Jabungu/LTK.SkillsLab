import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountMenu from './components/AccountMenu';
import BasicForm from './components/BasicForm'
import { updateTodo } from './redux/actions'

export default function App() {

	const dispatch = useDispatch()
	const openForm = useSelector((state) => state.openForm)
	const todo = useSelector((state) => state.todo)

	const handleOnClick = () => {
		dispatch({ type: "TOGGLE_FORM" })
	}

	const handleFormSubmit = (values) => {
		dispatch(updateTodo(values.todo))
	}

  return (
    <Container maxWidth="sm">
			<AccountMenu onClick={handleOnClick} />
			{openForm && <BasicForm onSubmit={handleFormSubmit} todoValues={todo}/>}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React Skills test
        </Typography>
      </Box>
    </Container>
  );
}
