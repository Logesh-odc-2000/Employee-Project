import React, { Fragment, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Action from './actions';
import Lisiting from './Listing';
import { BsPersonFillAdd } from "react-icons/bs";
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




const initialValues = {
  name: 'Akash',
  dob: '09-19-2002',
  email: 'aksh@gmail.com',
  salary: '30000',
  height: '150',
  startDate: ''
};

//Validation Functionality
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z.]+$/, "*Name must contain only letters and dots")
    .required("*Name is required"),
  dob: Yup.date()
    .required("*Date of birth is required")
    .max(new Date("12-31-2005"), "Maximum allowed date is 12-31-2005")
    .min(new Date("01-01-1970"), "Minimum allowed date is 01-01-1970"),
  email: Yup.string()
    .email("*Invalid email format")
    .required("*Email is required"),
  salary: Yup.number()
    .required("*Salary is required")
    .typeError("*Salary must be a number")
    .positive("*Salary must be a positive value")
    .min(100, "*Minimum salary allowed is 100 Rupees"),
  height: Yup.number()
    .typeError("*Height must be a number")
    .positive("*Height must be a positive value")
    .max(300, "*Height must be less than or equal to 300cm")
    .required("*Height is required"),

});


export default function HomePage() {

  const { Save, Edit } = Action;
  const Dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPerson, setSeletedPerson] = useState(null)
  const [startDate, setStartDate] = useState(null);
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  const people = useSelector((state) => state.employee.people);
  const state = useSelector((state) => state);
  console.log(state);

  const handleDateChange = (date) => {
    setStartDate(date);
  };


  const handleSubmit = (values, { resetForm }) => {
    if (isEditing) {
      Dispatch(Edit({ id: editId, values }));
    } else {
      Dispatch(Save(values));
    }
    setIsEditing(false);
    setEditId(null);
    setIsOpen(false);
    resetForm();
  };

  const handleEditClick = (id) => {
    setIsEditing(true);
    setEditId(id);
    const _selectedPerson = people?.find((person) => person.id === id);
    setSeletedPerson(_selectedPerson);
    console.log(_selectedPerson, id)
    setIsOpen(true);
  };

  const calculateDuration = () => {
    if (startDate) {
      const currentDate = new Date();
      const diffInMilliseconds = Math.abs(currentDate - startDate);
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

      const years = Math.floor(diffInDays / 365);
      const months = Math.floor((diffInDays % 365) / 30);
      const days = diffInDays % 30;

      return `${years} year(s) ${months} month(s) ${days} day(s)`;
    }

    return '';
  };


  return (
    <>
      <div>
        <header className="container py-10">
          <h1 className='text-center text-gray-800 text-4xl  '>Employee Details</h1>
        </header>
        <div className='flex flex-col items-center justify-center'>
          <button onClick={openModal} type="button" class="text-white bg-gray-600 hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-20 py-2.5 text-center mr-2 mb-2 ">
            <BsPersonFillAdd className='inline-block h-30 w-30 text-4xl  ' />
          </button>
        </div>


        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div>
                      <div className="flex min-h-full flex-col justify-center py-2 sm:px-6 ">
                        <button className="flex justify-end" onClick={closeModal}>
                          <AiOutlineCloseCircle className='text-2xl bg-red-500   text-white rounded-xl' />
                        </button>
                        <div className='text-center py-2 text-gray- text-2xl font-bold'>Employee Form</div>
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                          <Formik
                            initialValues={isEditing ? selectedPerson : initialValues}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}

                          >
                            <Form className="space-y-6">
                              <div >
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <div className='py-2'>
                                  <Field type="text" id="name" name="name" className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <ErrorMessage name="name" component="div" className="text-red-500" />
                              </div>
                              <div>
                                <label htmlFor="dob" className="block uppercase text-sm font-medium text-gray-700">Dob (MM/DD/YYYY)</label>
                                <div className='py-2'>
                                  <Field type="date" id="name" name="dob" className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div> 
                                <ErrorMessage name="dob" component="div" className="text-red-500" />
                              </div>

                              <div  >
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <div className='py-2'>
                                  <Field type="email" id="email" name="email" className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                              </div>

                              <div className="mt-1" >
                                <label htmlFor="height" className="block text-sm font-medium text-gray-700">Date of the joining</label>
                                <div className='py-2'>
                                <DatePicker
                                        name="startDate"
                                        id="startDate"
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        dateFormat="dd-MM-yyyy"
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <ErrorMessage name="height" component="div" className="text-red-500" />
                              </div>

                              <div className="mt-1">
                                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                                <div className='py-2'>
                                  <Field type="number" id="salary" name="salary" className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <ErrorMessage name="salary" component="div" className="text-red-500" />
                              </div>

                              <div className="mt-1">
                                <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
                                <div className='py-2'>
                                  <Field type="number" id="height" name="height" className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <ErrorMessage name="height" component="div" className="text-red-500" />
                              </div>
                              

                              <div className="py-4">
                                <button name='Save' type="submit" className="flex w-full   justify-center rounded-md border border-transparent bg-gray-700 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"> {isEditing ? 'Update' : 'Submit'}</button>
                              </div>
                            </Form>
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        <div className='py-6 '>
          <div className="table-container">
            <Lisiting handleEditClick={handleEditClick} calculateDuration={calculateDuration} />
          </div>
        </div>
      </div>
    </>
  );
};

