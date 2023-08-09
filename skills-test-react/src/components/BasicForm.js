import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from '@mui/material';

const BasicForm = ({ onSubmit, todoValue }) => (
  <div>
    <h1>TODO</h1>
    <Formik
      initialValues={{
        todo: todoValue
      }}
      onSubmit={onSubmit}
    >
      <Form>
        <label htmlFor="todo">Add ToDo </label>
        <Field id="todo" name="Add ToDo" placeholder="TextHere" />
        <Button type="submit" color="primary" variant="contained">Submit</Button>
      </Form>
    </Formik>
    { todoValue && <div>Todo: {todoValue}</div>}
  </div>
);

export default BasicForm
