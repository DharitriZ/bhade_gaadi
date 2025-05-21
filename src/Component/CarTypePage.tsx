import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { CarTypeAction, AllCarAction, DeleteCarAction, UpdateCarAction } from '../Redux/Action/CarTypeAction';

function CarTypePage() {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<{ id: string, type: string, description: string } | null>(null);

    const dispatch = useAppDispatch();
    const carTypes = useAppSelector(state => state.car);
    // const controllerRef = useRef<AbortController | null>(null);

    useEffect(() => {

        dispatch(AllCarAction());
    }, [dispatch]);

    const CarTypeSchema = Yup.object().shape({
        type: Yup.string().required('Car type is required'),
        description: Yup.string().required('Description is required'),
    });

    const handleDeactivate = (id: string) => {
        console.log("Deactivate ID:", id);
        dispatch(DeleteCarAction({ id }));
    };

    const handleEdit = (car: any) => {
        setEditData({ id: car.id, type: car.name, description: car.description });
        // dispatch(UpdateCarAction({ id: car.id, name: car.name, description: car.description }))
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditData(null);
    };

    return (
        <div className="relative h-full">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Car Type</h1>
                <p className="text-gray-600 mt-1">Add type of car available.</p>
            </header>

            <div className="flex w-full justify-end">
                <button
                    onClick={() => setShowForm(true)}
                    className="flex rounded-lg bg-cyan-800 w-max text-lg font-bold text-white p-3"
                >
                    Add Car
                </button>
            </div>

            {/* Overlay Form Section */}
            {showForm && (
                <div className="absolute w-full h-full inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative">
                        <Formik
                            initialValues={{
                                type: editData?.type || '',
                                description: editData?.description || ''
                            }}
                            enableReinitialize
                            validationSchema={CarTypeSchema}
                            onSubmit={async (values, { resetForm }) => {
                                if (editData) {
                                    // handleEdit(values);
                                    await dispatch(UpdateCarAction({ id: editData.id, name: values.type, description: values.description }));
                                } else {
                                    await dispatch(CarTypeAction(values));
                                }
                                resetForm();
                                handleFormClose();
                                dispatch(AllCarAction()); // Refresh list
                            }}

                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4">
                                    <div>
                                        <label className="block font-medium">Car Type</label>
                                        <Field
                                            type="text"
                                            name="type"
                                            className="w-full p-2 border rounded"
                                            placeholder="e.g., SUV"
                                        />
                                        <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div>
                                        <label className="block font-medium">Description</label>
                                        <Field
                                            type="text"
                                            name="description"
                                            as="textarea"
                                            rows="5"
                                            className="w-full p-2 border rounded"
                                            placeholder="Describe the car type"
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={handleFormClose}
                                            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 bg-cyan-800 text-white rounded hover:bg-cyan-900"
                                        >
                                            {editData ? 'Update' : 'Submit'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}

            {/* Car List */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">All Car Types</h2>
                <div className="space-y-4">
                    {carTypes.map(car => (
                        <div
                            key={car.id}
                            className="flex justify-between items-center border p-4 rounded bg-white shadow"
                        >
                            <div>
                                <h3 className="font-bold text-lg">{car.name}</h3>
                                <p className="text-gray-600">{car.description}</p>
                                <p className={`text-sm ${car.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                    {car.isActive ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(car)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeactivate(car.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Deactivate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarTypePage;
