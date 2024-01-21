import { Field, Form, Formik } from 'formik';
import { useMemo } from 'react';
import { Button, DialogActions, Grid, InputAdornment } from '@mui/material';

import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { Dropdown } from '../../components/Dropdown';
import { DatePicker } from '../../components/DatePicker';

import { ECarriage } from '../../utils/types';
import { trainScheduleValidationSchema } from '../../utils/validationSchemas';
import { splitCamelCase } from '../../utils/commonFunctions';
import { trainCarriageOptions, trainStatusOptions } from '../../utils/constants';

interface IUpdateTrainScheduleProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (values: any) => void;
}

const formFields = [
  { name: 'from' },
  { name: 'to' },
  { name: 'departureTime', component: DatePicker, pickerType: 'DatePicker', withTime: true },
  { name: 'arrivalTime', component: DatePicker, pickerType: 'DatePicker', withTime: true },
  { name: 'status', component: Dropdown, options: trainStatusOptions },
  { name: 'carriageType', component: Dropdown, options: trainCarriageOptions },
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
  const initialValues = useMemo(() => ({
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    status: 'OnTime',
    carriageType: ECarriage.Compartment,
    price: 0,
  }), []);

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
        {({ setFieldValue, values, initialValues }) => {
          console.log('vvv', values, initialValues);
          return (
            <Form>
              <Grid container spacing={2} marginTop={2}>
                {formFields.map((field) => (
                  <Grid item xs={6}>
                    <Field
                      {...field}
                      label={splitCamelCase(field.name)}
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
          )
        }}
      </Formik>
    </Modal>
  );
};
