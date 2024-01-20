import { Field, Form, Formik } from 'formik';
import { useMemo } from 'react';
import { Modal } from '../../components/Modal';
import { trainScheduleValidationSchema } from '../../utils/validationSchemas';
import { Button, DialogActions, Grid, InputAdornment } from '@mui/material';
import { splitCamelCase } from '../../utils/commonFunctions';
import { Input } from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';

interface IUpdateTrainScheduleProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (values: any) => void;
}

const formFields = [
  { name: 'from' },
  { name: 'to' },
  // { name: 'departureTime' },
  // { name: 'arrivalTime' },
  { name: 'status', component: Dropdown, options: [] },
  { name: 'carriageType', component: Dropdown, options: [] },
  {
    name: 'price',
    type: 'number',
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">$</InputAdornment>
      ),
    }
  },
];


export const UpdateTrainSchedule = ({
  open,
  handleClose,
  handleSubmit,
}: IUpdateTrainScheduleProps) => {
  const initialValues = useMemo(() => ([]), []);

  return (
    <Modal
      withButtons={false}
      open={open}
      handleClose={handleClose}
    >
      <Formik
        validateOnChange
        initialValues={initialValues}
        validationSchema={trainScheduleValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container spacing={2} marginTop={2}>
            {formFields.map((field) => (
              <Grid item xs={6}>
                <Field
                  {...field}
                  label={splitCamelCase(field.name)}
                  name={field.name}
                  type={field.type || 'text'}
                  placeholder={`Enter ${splitCamelCase(field.name)}`}
                  component={field.component || Input}
                />
              </Grid>
            ))}
          </Grid>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Form>
      </Formik>
    </Modal>
  );
};
